export default function Divider({ title }: { title?: string }) {
  // Swiss style rarely uses explicit divider components with text, 
  // relying instead on spacing and borders within sections.
  // Rendering nothing or just a spacer to maintain compatibility with page.tsx
  return <div className="sr-only">{title}</div>;
}