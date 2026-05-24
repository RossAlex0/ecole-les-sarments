export type SeparatorProps = { color?: "gold" | "white" | "blue" };

export default function Separator({ color = "white" }: SeparatorProps) {
  return <hr className={`separator sp_${color}`} role="separator" aria-orientation="vertical" />;
}
