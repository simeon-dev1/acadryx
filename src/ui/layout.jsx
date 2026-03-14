// UI: layout.jsx
// All layout components receive everything via props — no app imports

import { Avatar } from "./components.jsx";

// HEADER
export function Header({ school, user, onMenuToggle }) {
  return (
    <>
      {/* Demo banner */}
      <div style={{
        background: "rgba(245,158,11,0.1)", borderBottom: "1px solid rgba(245,158,11,0.2)",
        padding: "7px 16px", textAlign: "center",
        fontSize: 12, color: "#92400e", fontWeight: 500,
      }}>
        🧪 Demo mode — use the sidebar to switch roles and explore freely
      </div>
      <header style={{
      height: "var(--header-height)",
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center",
      padding: "0 16px",
      position: "sticky", top: 0, zIndex: 50,
      gap: 12,
    }}>
      <button
        onClick={onMenuToggle}
        style={{ background: "none", border: "none", fontSize: 20, padding: "4px 6px", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", cursor: "pointer" }}
      >
        ☰
      </button>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{school?.shortName}</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{school?.term} · {school?.session}</div>
      </div>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name.split(" ")[0]}</div>
            <div style={{ fontSize: 11, color: "var(--brand)", fontWeight: 500, textTransform: "capitalize" }}>{user.role}</div>
          </div>
          <Avatar initials={user.initials} size={34} />
        </div>
      )}
    </header>
    </>
  );
}

// BOTTOM NAV
export function BottomNav({ nav, activeTab, onTabChange }) {
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: "var(--nav-height)",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      zIndex: 50,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {nav.map(item => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none",
              color: active ? "var(--brand)" : "var(--text-muted)",
              fontSize: 10, fontWeight: active ? 600 : 400,
              padding: "8px 12px", borderRadius: "var(--radius-sm)",
              cursor: "pointer", transition: "color 0.15s",
              minWidth: 52,
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

// SIDEBAR
export function Sidebar({ open, school, user, nav, activeTab, onTabChange, onLogout, onSwitchRole }) {
  return (
    <>
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 59 }} />
      )}

      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: "var(--sidebar-width)",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        zIndex: 60,
        display: "flex", flexDirection: "column",
        transition: "transform 0.25s ease",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        overflowY: "auto",
      }}>
        {/* Brand */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, background: "var(--brand)", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 16,
            }}>{school?.name?.charAt(0)}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{school?.shortName}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{school?.term} · {school?.session}</div>
            </div>
          </div>
        </div>

        {/* User */}
        {user && (
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials={user.initials} size={38} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "var(--brand)", fontWeight: 500, textTransform: "capitalize" }}>{user.role}</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px" }}>
          {nav.map(item => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px", borderRadius: "var(--radius-sm)",
                  background: active ? "var(--brand-light)" : "none",
                  border: "none",
                  color: active ? "var(--brand)" : "var(--text-secondary)",
                  fontWeight: active ? 600 : 400,
                  fontSize: 14, cursor: "pointer", marginBottom: 2, textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface-2)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Role switcher */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", padding: "0 12px", marginBottom: 6 }}>Switch Role</div>
          {[
            { id: "student", icon: "🎒", label: "Student"  },
            { id: "teacher", icon: "📋", label: "Teacher"  },
            { id: "parent",  icon: "👨‍👩‍👧", label: "Parent"   },
            { id: "admin",   icon: "⚙️",  label: "Admin"    },
            { id: "alumni",  icon: "🎓", label: "Alumni"   },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => onSwitchRole(r.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", borderRadius: "var(--radius-sm)",
                background: user?.role === r.id ? "var(--brand-light)" : "none",
                border: "none",
                color: user?.role === r.id ? "var(--brand)" : "var(--text-muted)",
                fontWeight: user?.role === r.id ? 600 : 400,
                fontSize: 13, cursor: "pointer", textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (user?.role !== r.id) e.currentTarget.style.background = "var(--surface-2)"; }}
              onMouseLeave={e => { if (user?.role !== r.id) e.currentTarget.style.background = "none"; }}
            >
              <span style={{ fontSize: 15 }}>{r.icon}</span>
              {r.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

// APP SHELL — wraps all portal content
export function AppShell({ school, user, nav, activeTab, onTabChange, onLogout, onSwitchRole, sidebarOpen, onMenuToggle, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar
        open={sidebarOpen}
        school={school}
        user={user}
        nav={nav}
        activeTab={activeTab}
        onTabChange={(id) => { onTabChange(id); }}
        onLogout={onLogout}
        onSwitchRole={onSwitchRole}
      />

      <div style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        marginLeft: 0,
      }}>
        <Header school={school} user={user} onMenuToggle={onMenuToggle} />

        <main className="scrollable" style={{
          flex: 1,
          paddingBottom: "calc(var(--nav-height) + 16px)",
          overflowY: "auto",
        }}>
          {children}
        </main>

        <BottomNav nav={nav} activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}
