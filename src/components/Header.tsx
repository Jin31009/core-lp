import React from "react";
import type { Page } from "../types";

type NavItem = { label: string; page: Page };

export default function Header({
  navItems,
  current,
  onNavigate,
}: {
  navItems: NavItem[];
  current: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            style={{
              background: current === item.page ? "black" : "white",
              color: current === item.page ? "white" : "black",
              padding: "6px 12px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}