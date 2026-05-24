"use client";

import "./toggle.css";

type ToggleProps = {
  options: [string, string];
  value?: number;
  onChange?: (index: number) => void;
};

export default function Toggle({ options, value = 0, onChange }: ToggleProps) {
  const handleClick = (index: number) => {
    onChange?.(index);
  };

  return (
    <div className="custom_toggle">
      <div className="custom_toggle_slider" style={{ transform: `translateX(${value * 100}%)` }} />
      {options.map((label, i) => (
        <button
          key={label}
          type="button"
          className={`custom_toggle_option ${value === i ? "custom_toggle_option_active" : ""}`}
          onClick={() => handleClick(i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
