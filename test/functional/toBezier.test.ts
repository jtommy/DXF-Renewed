import { interpolateBSpline } from '../../src/entityToPolyline'
import { piecewiseToPaths } from '../../src/toSVG'
import toPiecewiseBezier from '../../src/util/toPiecewiseBezier'

const controlPoints = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
  { x: 0, y: 20 },
  { x: 10, y: 20 },
]
const k = 4
const knots = [0, 0, 0, 0, 1, 2, 3, 3, 3, 3]
const viewBox = '-1 -21 12 22'

const interpolated0 = interpolateBSpline(controlPoints, k - 1, knots)

const polylineToPathD = (polyline) => {
  return polyline.reduce(function (acc, point, i) {
    acc += i === 0 ? 'M' : 'L'
    acc += point[0] + ',' + point[1]
    return acc
  }, '')
}

const piecewise = toPiecewiseBezier(k, controlPoints, knots)
const interpolated1 = interpolateBSpline(
  piecewise.controlPoints,
  k - 1,
  piecewise.knots,
)
const paths = piecewiseToPaths(
  k,
  piecewise.knots,
  piecewise.controlPoints,
  k.knots,
)

const container = document.getElementById('contents')
if (!container) throw new TypeError('Expected #contents element')

function createSvg({ viewBox, innerG }) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
  svg.setAttribute('viewBox', viewBox)
  svg.setAttribute('width', '200')
  svg.setAttribute('height', '400')
  svg.innerHTML = innerG
  return svg
}

function createGWithPath(d) {
  return `
    <g stroke="#000" fill="none" stroke-width="0.1" transform="matrix(1,0,0,-1,0,0)">
      <path d="${d}" />
    </g>
  `
}

function createGWithRawPaths(pathsHtml) {
  return `
    <g stroke="#000" fill="none" stroke-width="0.1" transform="matrix(1,0,0,-1,0,0)">
      ${pathsHtml}
    </g>
  `
}

const svg0 = createSvg({ viewBox, innerG: createGWithPath(polylineToPathD(interpolated0)) })
const svg1 = createSvg({ viewBox, innerG: createGWithPath(polylineToPathD(interpolated1)) })
const svg2 = createSvg({ viewBox, innerG: createGWithRawPaths(paths) })

container.appendChild(svg0)
container.appendChild(svg1)
container.appendChild(svg2)
