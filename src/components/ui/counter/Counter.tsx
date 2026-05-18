"use client";

import { useEffect, useRef, useState } from "react";
import SarmentsText from "../sarmentsText/SarmentsText";
import "./counter.css";
type CounterProps = {
  end: number;
  children: React.ReactNode;
  duration?: number; // en ms
};

export default function Counter({ end, children, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing out (démarre vite, ralentit à la fin)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div className="counter">
      <span ref={ref} className="counter_num">
        {count}
      </span>
      <SarmentsText format="text" isDark>
        {children}
      </SarmentsText>
    </div>
  );
}
