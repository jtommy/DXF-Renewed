# ezdxf Reference Sitemap (Stable)

This project uses the official **ezdxf** documentation as the primary, practical reference when implementing DXF parsing behavior.

- Reference home: <https://ezdxf.readthedocs.io/en/stable/reference.html>

## What to use for what

- **High-level DXF structure (sections/tables/blocks/entities/objects):**
  - Sections index: <https://ezdxf.readthedocs.io/en/stable/sections/index.html>
  - Tables index: <https://ezdxf.readthedocs.io/en/stable/tables/index.html>
  - Blocks index: <https://ezdxf.readthedocs.io/en/stable/blocks/index.html>

- **Entity-specific group codes and attributes (our roadmap A.1):**
  - DXF Entities index: <https://ezdxf.readthedocs.io/en/stable/dxfentities/index.html>

  Common 2D targets:
  - TEXT: <https://ezdxf.readthedocs.io/en/stable/dxfentities/text.html>
  - MTEXT: <https://ezdxf.readthedocs.io/en/stable/dxfentities/mtext.html>
  - DIMENSION: <https://ezdxf.readthedocs.io/en/stable/dxfentities/dimension.html>
  - LEADER: <https://ezdxf.readthedocs.io/en/stable/dxfentities/leader.html>
  - MLEADER: <https://ezdxf.readthedocs.io/en/stable/dxfentities/mleader.html>
  - IMAGE: <https://ezdxf.readthedocs.io/en/stable/dxfentities/image.html>
  - UNDERLAY: <https://ezdxf.readthedocs.io/en/stable/dxfentities/underlay.html>
  - WIPEOUT: <https://ezdxf.readthedocs.io/en/stable/dxfentities/wipeout.html>
  - RAY: <https://ezdxf.readthedocs.io/en/stable/dxfentities/ray.html>
  - XLINE: <https://ezdxf.readthedocs.io/en/stable/dxfentities/xline.html>
  - TRACE: <https://ezdxf.readthedocs.io/en/stable/dxfentities/trace.html>
  - REGION: <https://ezdxf.readthedocs.io/en/stable/dxfentities/region.html>
  - SHAPE: <https://ezdxf.readthedocs.io/en/stable/dxfentities/shape.html>
  - MLINE: <https://ezdxf.readthedocs.io/en/stable/dxfentities/mline.html>

- **Objects (our roadmap A.3):**
  - DXF Objects index: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/index.html>

  Common reference-based objects:
  - DICTIONARY: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/dictionary.html>
  - XRECORD: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/xrecord.html>
  - ImageDef / ImageDefReactor: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/imagedef.html>
  - UnderlayDefinition: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/underlaydef.html>
  - MLeaderStyle: <https://ezdxf.readthedocs.io/en/stable/dxfobjects/mleaderstyle.html>

- **Tables (our roadmap A.2):**
  - Layer: <https://ezdxf.readthedocs.io/en/stable/tables/layer_table_entry.html>
  - DimStyle: <https://ezdxf.readthedocs.io/en/stable/tables/dimstyle_table_entry.html>
  - Style: <https://ezdxf.readthedocs.io/en/stable/tables/style_table_entry.html>
  - Linetype: <https://ezdxf.readthedocs.io/en/stable/tables/linetype_table_entry.html>
  - View: <https://ezdxf.readthedocs.io/en/stable/tables/view_table_entry.html>
  - AppID: <https://ezdxf.readthedocs.io/en/stable/tables/appid_table_entry.html>
  - UCS: <https://ezdxf.readthedocs.io/en/stable/tables/ucs_table_entry.html>
  - BlockRecord: <https://ezdxf.readthedocs.io/en/stable/tables/blockrecord_table_entry.html>

## Notes

- ezdxf tracks DXF internals closely, but it is still an implementation. When behavior is ambiguous, treat Autodesk’s DXF reference as the authoritative source.
