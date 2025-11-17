/**
 * Convert DXF ACI (AutoCAD Color Index) to RGB color
 * Based on AutoCAD's standard 256 color palette
 */
export default function dxfColorToRGB(colorNumber: number): { r: number; g: number; b: number } {
  // Standard AutoCAD Color Index (ACI) colors
  const aciColors: Array<[number, number, number]> = [
    [0, 0, 0],       // 0 - ByBlock
    [255, 0, 0],     // 1 - Red
    [255, 255, 0],   // 2 - Yellow
    [0, 255, 0],     // 3 - Green
    [0, 255, 255],   // 4 - Cyan
    [0, 0, 255],     // 5 - Blue
    [255, 0, 255],   // 6 - Magenta
    [255, 255, 255], // 7 - White/Black (depends on background)
    [128, 128, 128], // 8 - Gray
    [192, 192, 192], // 9 - Light Gray
  ]

  // Handle special cases
  if (colorNumber === 0 || colorNumber === 256) {
    // ByBlock or ByLayer - return black as default
    return { r: 0, g: 0, b: 0 }
  }

  if (colorNumber === 7) {
    // White/Black - return black for light backgrounds
    return { r: 0, g: 0, b: 0 }
  }

  // Colors 1-9 are standard
  if (colorNumber >= 1 && colorNumber <= 9) {
    const [r, g, b] = aciColors[colorNumber]
    return { r, g, b }
  }

  // Colors 10-249 follow a pattern
  // Simplified approximation for extended colors
  if (colorNumber >= 10 && colorNumber <= 249) {
    const base = colorNumber - 10
    const hue = (base % 10) * 36
    const lightness = Math.floor(base / 10) * 10 + 50
    
    // Convert HSL to RGB (simplified)
    const c = (1 - Math.abs(2 * lightness / 100 - 1)) * 100
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
    const m = lightness - c / 2
    
    let r = 0
    let g = 0
    let b = 0
    
    if (hue < 60) {
      r = c
      g = x
    } else if (hue < 120) {
      r = x
      g = c
    } else if (hue < 180) {
      g = c
      b = x
    } else if (hue < 240) {
      g = x
      b = c
    } else if (hue < 300) {
      r = x
      b = c
    } else {
      r = c
      b = x
    }
    
    return {
      r: Math.round((r + m) * 2.55),
      g: Math.round((g + m) * 2.55),
      b: Math.round((b + m) * 2.55),
    }
  }

  // Grayscale colors 250-255
  if (colorNumber >= 250 && colorNumber <= 255) {
    const gray = Math.round(((colorNumber - 250) / 5) * 255)
    return { r: gray, g: gray, b: gray }
  }

  // Default to black for unknown colors
  return { r: 0, g: 0, b: 0 }
}

/**
 * Convert RGB object to SVG color string
 */
export function rgbToSVGColor(rgb: { r: number; g: number; b: number }): string {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`
}

/**
 * Convert DXF color number directly to SVG color string
 */
export function dxfColorToSVG(colorNumber: number | undefined): string {
  if (colorNumber === undefined) {
    return 'currentColor'
  }
  const rgb = dxfColorToRGB(colorNumber)
  return rgbToSVGColor(rgb)
}
