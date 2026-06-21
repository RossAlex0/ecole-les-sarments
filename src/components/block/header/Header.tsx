"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { headerNavigation } from "@/utils/navigation/navigation";

import "./header.css";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll & close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <Link href="/" aria-label="Accueil — École Les Sarments" onClick={closeMenu}>
        <Image
          src="/logo/light-logo-text.svg"
          height={80}
          width={210}
          alt="École Les Sarments, école à Toulouse"
          loading="eager"
          className="header_logo"
        />
      </Link>

      {/* Desktop navigation */}
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

      {/* Mobile burger */}
      <button
        type="button"
        className="header_burger"
        aria-label="Ouvrir le menu"
        aria-expanded={menuOpen}
        onClick={openMenu}
      >
        <IoMenu />
      </button>

      {/* Mobile bottom sheet */}
      {menuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="mobile_nav_overlay" onClick={closeMenu}>
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              className="mobile_nav_sheet"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile_nav_topbar">
                <span className="mobile_nav_handle" />
                <button
                  type="button"
                  className="mobile_nav_close"
                  aria-label="Fermer le menu"
                  onClick={closeMenu}
                >
                  <IoClose />
                </button>
              </div>

              <ul className="mobile_nav_list">
                {headerNavigation.map((item) => (
                  <li key={item.link} className="mobile_nav_item">
                    {item.style === "button" ? (
                      <SarmentsButton href={item.link} onClick={closeMenu}>
                        {item.label}
                      </SarmentsButton>
                    ) : (
                      <Link href={item.link} onClick={closeMenu}>
                        <SarmentsText
                          format="semi-title"
                          className={`mobile_nav_link ${pathname === item.link ? "active" : ""}`}
                        >
                          {item.label}
                        </SarmentsText>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
