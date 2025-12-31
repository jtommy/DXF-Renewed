# DXF Version Support

## Current Position

The parser is designed around DXF group codes and sections, and does not currently gate behavior on `$ACADVER`.

In practice, this means:

- We aim to **parse and render** supported entities across many DXF versions.
- We treat `$ACADVER` primarily as a fixture metadata signal and future compatibility hook.

## What “Latest AutoCAD DXF” Means Here

AutoCAD introduces newer DXF versions over time (reflected in `$ACADVER`). Supporting “the latest” is best defined as:

- The library can load DXF files produced by recent AutoCAD versions **without rejecting due to version**, and
- The library has fixtures that include a recent `$ACADVER` value, validated by ezdxf.

## Recommended Strategy

1. **Track `$ACADVER` in fixture validation**
   - Use `yarn validate:fixtures` to report `$ACADVER` for every fixture.

2. **Add at least one fixture exported from a recent AutoCAD version**
   - Keep it small and single-purpose.
   - Prefer a fixture that includes DIMENSION + text (to exercise newer text encoding and styles).

3. **Add an integration test for that fixture**
   - The goal is “does not throw + expected key SVG features exist”.

4. **Add a policy (doc + CI)**
   - Document which `$ACADVER` values are present in fixtures.
   - Optionally enforce a minimum accepted `$ACADVER` in fixtures if the project wants to keep up with AutoCAD releases.

## Non-Goals

- Guarantee support for every new entity introduced by new DXF versions.
- Guarantee binary DXF support (unless explicitly added).

## Follow-ups (If Needed)

If we need version-specific behavior later, add:

- A header helper that exposes `$ACADVER` in a typed way.
- Tests that cover version-specific parsing/rendering differences.
