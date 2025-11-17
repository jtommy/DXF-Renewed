# List of DXF 2D Entities

This list was generated based on the AutoCAD 2012 DXF reference documentation. It catalogs 2D entities, indicating whether they have already been implemented in this project.

| Entity | Implemented | Description |
| :--- | :---: | :--- |
| **ARC** | ✅ | A circular arc. |
| **CIRCLE** | ✅ | A circle. |
| **ELLIPSE** | ✅ | An ellipse or elliptical arc. |
| **HATCH** | ✅ | Fills a bounded area with a pattern, solid color, or gradient. |
| **LINE** | ✅ | A straight line segment. |
| **LWPOLYLINE** | ✅ | A lightweight 2D polyline. |
| **MTEXT** | ✅ | Multi-line text with advanced formatting. |
| **POINT** | ✅ | A point entity. |
| **POLYLINE** | ✅ | A 2D or 3D polyline (with vertices). |
| **SOLID** | ✅ | A 2D area filled with solid color. |
| **SPLINE** | ✅ | A spline curve. |
| **TEXT** | ✅ | A single line of text. |
| **DIMENSION** | ✅ | Dimension entity (linear, angular, radial, etc.). **Complete implementation**: text and styleName parsing, DIMSTYLE integration (68+ properties), rendering of 6 dimension types with extension lines, arrows, text rotation, color support (DIMCLRD, DIMCLRE, DIMCLRT) and line weights (DIMLWD, DIMLWE). See `docs/DIMENSION_IMPLEMENTATION_PLAN.md` for details. |
| **INSERT** | ✅ | A block insertion (block reference). |
| **ATTDEF** | ✅ | Attribute definition for a block. |
| **ATTRIB** | ✅ | An attribute instance attached to a block. |
| **OLE2FRAME** | ✅ | An OLE (Object Linking and Embedding) object. |
| **LEADER** | ❌ | A leader line, used for annotations. Creates a line that connects the annotation to a feature in a drawing. |
| **MLINE** | ❌ | A multi-line entity with parallel lines. |
| **RAY** | ❌ | A semi-infinite line that extends infinitely in one direction from its start point. |
| **SHAPE** | ❌ | A shape from a shape file (.shx). Inserts a named shape from a shape file that has already been loaded using the LOAD command. |
| **TOLERANCE** | ❌ | A geometric tolerance. Creates geometric tolerances contained in a feature control frame. |
| **TRACE** | ❌ | A solid 2D line with width. |
| **WIPEOUT** | ❌ | An area that masks other objects with the background color. |
| **XLINE** | ❌ | An infinite construction line. |

---

## 3D Entities (For Reference)

| Entity | Implemented | Description |
| :--- | :---: | :--- |
| **3DFACE** | ✅ | A three-dimensional face. |
| **3DSOLID** | ❌ | A 3D ACIS solid object. Displays 3D solids as wireframe or shaded objects. |
| **BODY** | ❌ | A 3D ACIS body object. |
| **HELIX** | ❌ | A 3D helix. |
| **IMAGE** | ❌ | A raster image. |
| **LIGHT** | ❌ | A light source. |
| **MESH** | ❌ | A 3D mesh. |
| **REGION** | ❌ | A closed 2D area (region). |
| **SECTION** | ❌ | A section object. |
| **SUN** | ❌ | A sun light object. |
| **SURFACE** | ❌ | A 3D surface (extruded, loft, etc.). |
| **TABLE** | ❌ | A table entity. |
| **UNDERLAY** | ❌ | An underlay (e.g., DWF, DGN, PDF). |
| **VIEWPORT** | ✅ | A viewport in paper space. |

*Note: The `POLYLINE` implementation may include 3D vertices, but the entity itself is often used for 2D shapes.*
