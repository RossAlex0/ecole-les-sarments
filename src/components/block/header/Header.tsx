"use client";

import Image from "next/image";
import Link from "next/link";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { headerNavigation } from "@/utils/navigation/navigation";
import { usePathname } from "next/navigation";

import "./header.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" aria-label="Accueil — École Les Sarments">
        <Image
          src="/logo/light-logo-text.svg"
          height={80}
          width={210}
          alt="École Les Sarments, école à Toulouse"
          loading="eager"
        />
      </Link>
      <nav className="header_nav">
        <ul className="header_nav_list">
          {headerNavigation.map((item) => (
            <li key={item.link} className="header_nav_item">
              {item.style === "button" ? (
                <SarmentsButton href={item.link}>{item.label}</SarmentsButton>
              ) : (
                <Link href={item.link}>
                  <SarmentsText
                    format="view"
                    className={`header_nav_link ${pathname === item.link ? "active" : ""}`}
                  >
                    {item.label}
                  </SarmentsText>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
