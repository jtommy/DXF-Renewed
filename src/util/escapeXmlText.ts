export default function escapeXmlText(value: string): string {
  // Escape text for use inside XML/SVG text nodes.
  // Keep it small and dependency-free.
  return value
    .split('&').join('&amp;')
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split('"').join('&quot;')
    .split("'").join('&apos;')
}
