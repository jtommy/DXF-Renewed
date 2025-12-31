#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any


@dataclass
class FixtureResult:
    file: str
    acadver: str | None
    entities_total: int
    entity_types: dict[str, int]
    audit_errors: int
    audit_fixes: int
    audit_warnings: int
    audit_has_fatal_error: bool


def _get_acadver(doc: Any) -> str | None:
    try:
        return str(doc.header.get("$ACADVER"))
    except Exception:
        return None


def _count_entity_types(doc: Any) -> tuple[int, dict[str, int]]:
    counts: dict[str, int] = {}
    total = 0

    try:
        msp = doc.modelspace()
    except Exception:
        return 0, {}

    for e in msp:
        total += 1
        t = getattr(e, "dxftype", None)
        if callable(t):
            t = t()
        t = str(t) if t is not None else "UNKNOWN"
        counts[t] = counts.get(t, 0) + 1

    return total, dict(sorted(counts.items(), key=lambda kv: kv[0]))


def _audit(doc: Any) -> tuple[int, int, int, bool]:
    # ezdxf audit returns an auditor object with attributes.
    auditor = doc.audit()

    errors = len(getattr(auditor, "errors", []) or [])
    fixes = len(getattr(auditor, "fixes", []) or [])
    warnings = len(getattr(auditor, "warnings", []) or [])

    has_fatal = False
    # Some ezdxf versions expose fatal_error as bool/str.
    fatal_error = getattr(auditor, "fatal_error", None)
    if fatal_error:
        has_fatal = True

    return errors, fixes, warnings, has_fatal


def validate_fixture(path: Path) -> FixtureResult:
    import ezdxf  # type: ignore

    doc = ezdxf.readfile(str(path))

    acadver = _get_acadver(doc)
    entities_total, entity_types = _count_entity_types(doc)
    audit_errors, audit_fixes, audit_warnings, audit_has_fatal_error = _audit(doc)

    return FixtureResult(
        file=str(path),
        acadver=acadver,
        entities_total=entities_total,
        entity_types=entity_types,
        audit_errors=audit_errors,
        audit_fixes=audit_fixes,
        audit_warnings=audit_warnings,
        audit_has_fatal_error=audit_has_fatal_error,
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate DXF fixtures in test/resources using ezdxf"
    )
    parser.add_argument(
        "--resources",
        default=str(Path(__file__).resolve().parents[1] / "test" / "resources"),
        help="Path to test/resources directory",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Output machine-readable JSON",
    )
    parser.add_argument(
        "--fail-on-audit-errors",
        action="store_true",
        help="Exit non-zero if ezdxf audit reports errors or fatal errors",
    )

    args = parser.parse_args()

    resources_dir = Path(args.resources)
    if not resources_dir.exists() or not resources_dir.is_dir():
        raise SystemExit(f"resources dir not found: {resources_dir}")

    dxf_files = sorted(resources_dir.glob("*.dxf"))

    results: list[FixtureResult] = []
    failures: list[str] = []

    for f in dxf_files:
        try:
            results.append(validate_fixture(f))
        except Exception as e:
            failures.append(f"{f.name}: {e}")

    if args.json:
        payload = {
            "resources": str(resources_dir),
            "count": len(results),
            "results": [asdict(r) for r in results],
            "read_failures": failures,
        }
        print(json.dumps(payload, indent=2, sort_keys=True))
    else:
        print(f"Validated {len(results)} fixture(s) from {resources_dir}")
        if failures:
            print("\nRead failures:")
            for msg in failures:
                print(f"- {msg}")

        # Print a compact per-file summary, sorted by filename.
        for r in sorted(results, key=lambda x: os.path.basename(x.file)):
            base = os.path.basename(r.file)
            print(
                f"{base}: acadver={r.acadver} entities={r.entities_total} "
                f"audit(errors={r.audit_errors}, fixes={r.audit_fixes}, warnings={r.audit_warnings}, fatal={r.audit_has_fatal_error})"
            )

    # Failure policy:
    # - Always fail if any file cannot be read by ezdxf.
    # - Optionally fail on audit errors/fatal errors.
    if failures:
        return 2

    if args.fail_on_audit_errors:
        for r in results:
            if r.audit_has_fatal_error or r.audit_errors > 0:
                return 3

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
