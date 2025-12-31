#!/usr/bin/env python3
"""Regenerate a small set of DXF fixtures using ezdxf.

These fixtures were previously handcrafted/minimal and ezdxf could not read them.
Regenerating them via ezdxf makes them valid DXF fixtures and unblocks
`yarn validate:fixtures`.

This script overwrites files in test/resources.

Usage:
  ./.venv-ezdxf/bin/python tools/ezdxf_regenerate_problem_fixtures.py
"""

from __future__ import annotations

from pathlib import Path

import ezdxf
from ezdxf.lldxf.tags import Tags


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RESOURCES_DIR = PROJECT_ROOT / "test" / "resources"


def _write(doc: ezdxf.document.Drawing, filename: str) -> None:
    target = RESOURCES_DIR / filename
    target.parent.mkdir(parents=True, exist_ok=True)
    doc.saveas(target)


def regenerate_leader_basic() -> None:
    doc = ezdxf.new("R2010")
    msp = doc.modelspace()

    # A simple leader with 3 vertices.
    msp.add_leader(vertices=[(0, 0), (100, 0), (100, 50)], dimstyle="EZDXF")

    _write(doc, "leader-basic.dxf")


def regenerate_tolerance_basic() -> None:
    doc = ezdxf.new("R2010")
    msp = doc.modelspace()

    tol = msp.new_entity(
        "TOLERANCE",
        {
            "layer": "0",
            "dimstyle": "Standard",
            "insert": (10.0, 20.0, 0.0),
            "content": "%%v%%v",
            "x_axis_vector": (1.0, 0.0, 0.0),
            "extrusion": (0.0, 0.0, 1.0),
        },
    )
    # Silence unused variable warning in some linters.
    _ = tol

    _write(doc, "tolerance-basic.dxf")


def regenerate_underlay_basic() -> None:
    doc = ezdxf.new("R2010")
    msp = doc.modelspace()

    underlay_def = doc.objects.add_underlay_def(
        filename="file.pdf",
        fmt="pdf",
        name="U1",
    )

    msp.add_underlay(
        underlay_def=underlay_def,
        insert=(10.0, 20.0, 0.0),
        scale=(1.0, 1.0, 1.0),
        rotation=0.0,
    )

    _write(doc, "underlay-basic.dxf")


def regenerate_imagedef_basic() -> None:
    doc = ezdxf.new("R2010")

    # A standalone IMAGEDEF is still a valid fixture.
    doc.objects.add_image_def(filename="my.png", size_in_pixel=(640, 480), name="I1")

    _write(doc, "imagedef-basic.dxf")


def regenerate_image_basic() -> None:
    doc = ezdxf.new("R2010")
    msp = doc.modelspace()

    image_def = doc.objects.add_image_def(filename="my.png", size_in_pixel=(640, 480), name="I1")

    # Place a 640x480 image at (1, 2) in drawing units.
    msp.add_image(
        image_def=image_def,
        insert=(1.0, 2.0, 0.0),
        size_in_units=(640.0, 480.0),
        rotation=0.0,
    )

    _write(doc, "image-basic.dxf")


def regenerate_xrecord_basic() -> None:
    doc = ezdxf.new("R2010")

    # Register under root dictionary.
    xr = doc.rootdict.add_xrecord("TEST")
    xr.tags = Tags([(1, "HELLO"), (40, 3.14)])

    _write(doc, "xrecord-basic.dxf")


def regenerate_block_basepoint_text_mtext_dimension() -> None:
    doc = ezdxf.new("R2010")

    blk = doc.blocks.new(name="B1", base_point=(5.0, 6.0, 0.0))

    blk.add_text("Hello", dxfattribs={"height": 1.0}).set_placement((6.0, 8.0, 0.0))
    blk.add_mtext("World", dxfattribs={"char_height": 1.0}).set_location((7.0, 9.0, 0.0))

    dim = blk.add_linear_dim(
        base=(8.0, 10.0, 0.0),
        p1=(8.0, 10.0, 0.0),
        p2=(12.0, 10.0, 0.0),
        location=(8.0, 10.0, 0.0),
        dimstyle="EZDXF",
    )
    dim.render()

    msp = doc.modelspace()
    msp.add_blockref("B1", insert=(100.0, 200.0, 0.0))

    _write(doc, "block-basepoint-text-mtext-dimension.dxf")


def main() -> int:
    missing = [
        name
        for name in [
            "leader-basic.dxf",
            "tolerance-basic.dxf",
            "underlay-basic.dxf",
            "image-basic.dxf",
            "imagedef-basic.dxf",
            "xrecord-basic.dxf",
            "block-basepoint-text-mtext-dimension.dxf",
        ]
        if not (RESOURCES_DIR / name).exists()
    ]

    # We still regenerate even if files are missing: this script is authoritative.
    regenerate_leader_basic()
    regenerate_tolerance_basic()
    regenerate_underlay_basic()
    regenerate_imagedef_basic()
    regenerate_image_basic()
    regenerate_xrecord_basic()
    regenerate_block_basepoint_text_mtext_dimension()

    if missing:
        print("Generated missing fixtures:")
        for name in missing:
            print(f"- {name}")

    print("Regenerated fixtures:")
    print("- leader-basic.dxf")
    print("- tolerance-basic.dxf")
    print("- underlay-basic.dxf")
    print("- imagedef-basic.dxf")
    print("- image-basic.dxf")
    print("- xrecord-basic.dxf")
    print("- block-basepoint-text-mtext-dimension.dxf")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
