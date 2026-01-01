import { Helper, config } from '../../src'

config.verbose = true

export function getSelectedIndex() {
  const raw = globalThis.location.hash.replace('#', '')
  if (!raw) return null

  const index = Number.parseInt(raw, 10)
  if (!Number.isFinite(index)) return null

  return index
}

export function clearElement(el) {
  while (el.firstChild) el.firstChild.remove()
}

export function renderAllOrOne({
  container,
  items,
  renderAll,
  renderOne,
}) {
  const index = getSelectedIndex()

  clearElement(container)

  if (index !== null && index >= 0 && index < items.length) {
    renderOne({ container, item: items[index], index })
    return
  }

  renderAll({ container, items })
}

export function createSvgThumbnail({ index, svg }) {
  const link = document.createElement('a')
  link.href = `#${index}`

  const wrapper = document.createElement('div')
  wrapper.style.display = 'inline-block'
  wrapper.style.margin = '20px'
  wrapper.style.padding = '20px'
  wrapper.style.backgroundColor = '#fff'
  wrapper.innerHTML = svg

  link.appendChild(wrapper)
  return link
}

export function parseDxfsFromGlob({ names, glob }) {
  const dxfs = names.map((name) => {
    const key = `../resources/${name}.dxf`
    const dxfText = glob[key]
    if (typeof dxfText !== 'string') {
      throw new TypeError(`Missing DXF fixture: ${key}`)
    }
    return { name, dxfText }
  })

  return dxfs
}

export function toSvgFromDxfText(dxfText) {
  return new Helper(dxfText).toSVG()
}
