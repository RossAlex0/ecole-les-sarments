"use client";

import Image from "next/image";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { headerNavigation } from "@/utils/navigation/navigation";
import { usePathname } from "next/navigation";

import "./header.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <Image
        src="/logo/light-logo-text.svg"
        height={60}
        width={200}
        alt="blason-sarments"
        loading="eager"
      />
      <nav className="header_nav">
        <ul className="header_nav_list">
          {headerNavigation.map((item) => (
            <li key={item.link} className="header_nav_item">
              {item.style === "button" ? (
                <SarmentsButton href={item.link}>{item.label}</SarmentsButton>
              ) : (
                <a href={item.link}>
                  <SarmentsText
                    format="view"
                    className={`header_nav_link ${pathname === item.link ? "active" : ""}`}
                  >
                    {item.label}
                  </SarmentsText>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
