import {
    createSvgThumbnail,
    parseDxfsFromGlob,
    renderAllOrOne,
    toSvgFromDxfText,
} from './functionalViewer'

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
  'lwpolyline_flip_test',
]
const resources = import.meta.glob('../resources/*.dxf', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const dxfs = parseDxfsFromGlob({ names, glob: resources })
const items = dxfs.map(({ name, dxfText }) => ({
  name,
  svg: toSvgFromDxfText(dxfText),
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
