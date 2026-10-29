"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import FlatIcon from "./FlatIcon";

interface PortalSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeId?: string;
  onSelectNav?: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
  badgeType?: "gold" | "green" | "blue" | "red";
  external?: boolean;
}

interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { id: "beranda", label: "Beranda", icon: "home", href: "/#beranda" },
      { id: "progres", label: "Progres Belajar", icon: "chart", href: "/#progres" },
    ],
  },
  {
    groupTitle: "For You",
    items: [
      { id: "langganan", label: "Langganan", icon: "card", href: "/#langganan", badge: "Akses", badgeType: "gold" },
      { id: "referral", label: "Referral Langganan", icon: "share", href: "/#referral" },
    ],
  },
  {
    groupTitle: "Learning",
    items: [
      { id: "kelas", label: "Kelas", icon: "book", href: "/#kelas" },
      { id: "learning-path", label: "Learning Path", icon: "layers", href: "/#learning-path" },
    ],
  },
  {
    groupTitle: "Catalog",
    items: [
      { id: "program", label: "Program Terbaru", icon: "rocket", href: "/#program", badge: "Beasiswa", badgeType: "blue" },
      { id: "blog", label: "Blog", icon: "document", href: "/#blog" },
      { id: "event", label: "Event", icon: "calendar", href: "/#event", badge: "Live", badgeType: "red" },
      { id: "mentoring", label: "Mentoring", icon: "chat", href: "/#mentoring" },
      { id: "jobs", label: "Jobs", icon: "briefcase", href: "/#jobs", badge: "Hiring", badgeType: "gold" },
    ],
  },
];

export default function PortalSidebar({
  collapsed,
  onToggle,
  activeId = "beranda",
  onSelectNav,
}: PortalSidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeId);

  // Sync if activeId changes from outside
  useEffect(() => {
    if (activeId) {
      setCurrentActive(activeId);
    }
  }, [activeId]);

  const handleItemClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.external) {
      setCurrentActive(item.id);
      return;
    }

    e.preventDefault();
    setCurrentActive(item.id);
    if (typeof window !== "undefined") {
      window.location.hash = item.id;
    }
    if (onSelectNav) {
      onSelectNav(item.id);
    }
  };

  return (
    <aside
      className={`portal-sidebar ${collapsed ? "collapsed" : "expanded"}`}
      aria-label="Navigasi Samping Siswa"
    >
      {/* Nav Groups List */}
      <div className="portal-sidebar-nav-wrap">
        {NAV_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="portal-sidebar-group">
            {!collapsed && group.groupTitle && (
              <div className="portal-sidebar-group-title">
                {group.groupTitle}
              </div>
            )}
            <ul className="portal-sidebar-menu">
              {group.items.map((item) => {
                const isActive = currentActive === item.id;
                const content = (
                  <>
                    <span className="portal-sidebar-item-icon">
                      <FlatIcon type={item.icon} size={18} />
                    </span>
                    {!collapsed && (
                      <span className="portal-sidebar-item-label">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className={`portal-sidebar-badge ${item.badgeType || "gold"}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                );

                return (
                  <li key={item.id}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`portal-sidebar-item ${isActive ? "active" : ""}`}
                        title={collapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ""}` : undefined}
                        onClick={(e) => handleItemClick(e, item)}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`portal-sidebar-item ${isActive ? "active" : ""}`}
                        title={collapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ""}` : undefined}
                        onClick={(e) => handleItemClick(e, item)}
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Toggle Collapse/Expand Strip */}
      <div className="portal-sidebar-footer">
        <button
          type="button"
          onClick={onToggle}
          className="portal-sidebar-toggle-action"
          title={collapsed ? "Perluas Menu Samping" : "Kecilkan Menu Samping (Hanya Ikon)"}
          aria-label={collapsed ? "Perluas menu samping" : "Kecilkan menu samping"}
        >
          <span className="portal-sidebar-toggle-icon">
            <FlatIcon type={collapsed ? "chevron-right" : "chevron-left"} size={16} />
          </span>
          {!collapsed && (
            <span className="portal-sidebar-toggle-text">Kecilkan Menu</span>
          )}
        </button>
      </div>
    </aside>
  );
}
