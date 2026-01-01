import { Helper, config } from '../../src'
import rgbToColorAttribute from '../../src/util/rgbToColorAttribute'
import {
    createSvgThumbnail,
    parseDxfsFromGlob,
    renderAllOrOne,
} from './functionalViewer'

config.verbose = true

const polylineToPath = (rgb, polyline) => {
  const colorAttrib = rgbToColorAttribute(rgb)
  const d = polyline.reduce(function (acc, point, i) {
    acc += i === 0 ? 'M' : 'L'
    acc += point[0] + ',' + point[1]
    return acc
  }, '')
  return `<path fill="none" stroke="${colorAttrib}" stroke-width="0.1%" d="${d}"/>`
}

/**
 * Convert the interpolate polylines to SVG
 */
const toSVG = ({ bbox, polylines }) => {
  const paths = polylines.map((polyline, i) => {
    const vertices = polyline.vertices.map((v) => {
      return [v[0], -v[1]]
    })
    return polylineToPath(polyline.rgb, vertices)
  })

  // If the DXF is empty the bounding box will have +-Infinity values,
  // so clamp values to zero in this case
  const viewBox =
    bbox.min.x === Infinity
      ? { x: 0, y: 0, width: 0, height: 0 }
      : {
          x: bbox.min.x,
          y: -bbox.max.y,
          width: bbox.max.x - bbox.min.x,
          height: bbox.max.y - bbox.min.y,
        }

  const svgString = `
<?xml version="1.0"?>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
    preserveAspectRatio="xMinYMin meet"
    viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"
    width="100%"
    height="100%"
  >
    ${paths.join('\n')}
</svg>`
  return svgString
}

const names = [
  'lines',
  'lwpolylines',
  'polylines',
  'squareandcircle',
  'circlesellipsesarcs',
  'ellipticalarcs',
  'ellipticalarcs2',
  'splines',
  'blocks1',
  'blocks2',
  'layers',
  'supported_entities',
  'empty',
  'floorplan',
  'Ceco.NET-Architecture-Tm-53',
  'openscad_export',
  'splineA',
  'elliptical-arc2',
  'issue21',
  'issue27a',
  'issue27b',
  'issue27c',
  'issue28',
  'issue29',
  'issue39',
  'issue42',
  'issue50',
  'issue52',
  'issue53',
  'threeDFaces',
  'array-rotated',
  'arrayed-holes',
  'squircle2',
  'alu-profile',
]
const resources = import.meta.glob('../resources/*.dxf', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const dxfs = parseDxfsFromGlob({ names, glob: resources })
const items = dxfs.map(({ name, dxfText }) => ({
  name,
  svg: toSVG(new Helper(dxfText).toPolylines()),
}))

const container = document.getElementById('contents')
if (!container) throw new TypeError('Expected #contents element')

function render() {
  renderAllOrOne({
    container,
    items,
    renderAll: ({ container, items }) => {
      const fragment = document.createDocumentFragment()
      items.forEach((item, index) => {
        fragment.appendChild(createSvgThumbnail({ index, svg: item.svg }))
      })
      container.appendChild(fragment)
    },
    renderOne: ({ container, item }) => {
      const wrapper = document.createElement('div')
      wrapper.style.backgroundColor = '#fff'
      wrapper.innerHTML = item.svg
      container.appendChild(wrapper)
    },
  })
}

globalThis.addEventListener('hashchange', render)
render()
