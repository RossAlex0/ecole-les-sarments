type QuoteIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function Quote({ size = 100, color = "#3d5169", className }: QuoteIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <text
        x="100"
        y="155"
        fontSize="200"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="900"
        textAnchor="middle"
        fill={color}
      >
        “
      </text>
    </svg>
  );
}
