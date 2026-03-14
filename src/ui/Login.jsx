// UI: Login.jsx — Demo role selector
// No access code. Just pick a role and enter.

import { useState } from "react";
import { getUserByRole } from "../data/users.js";
import { Btn } from "./components.jsx";

const ROLES = [
  { id: "student", icon: "🎒", label: "Student",  sub: "Results, timetable, magazine"  },
  { id: "teacher", icon: "📋", label: "Teacher",  sub: "Classes, scores, attendance"   },
  { id: "parent",  icon: "👨‍👩‍👧", label: "Parent",   sub: "Ward progress & fees"          },
  { id: "admin",   icon: "⚙️",  label: "Admin",    sub: "Full school management"        },
  { id: "alumni",  icon: "🎓", label: "Alumni",   sub: "Stay connected to your school" },
];

export default function Login({ school, onLogin }) {
  const [selected, setSelected] = useState("student");

  function handleEnter() {
    const user = getUserByRole(selected);
    onLogin(user);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", flexDirection: "column", gap: 0,
    }}>
      {/* Demo banner */}
      <div style={{
        background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: "var(--radius-md)", padding: "10px 18px",
        fontSize: 13, color: "#92400e", fontWeight: 500,
        marginBottom: 24, textAlign: "center", maxWidth: 420, width: "100%",
      }}>
        🧪 This is a live demo. Pick any role and explore freely.
      </div>

      <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.4s ease forwards" }}>
        {/* School brand */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, background: "var(--brand)",
            borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 900, fontSize: 26, margin: "0 auto 14px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
          }}>
            {school.name.charAt(0)}
          </div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "var(--text-primary)" }}>{school.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{school.term} · {school.session}</div>
        </div>

        {/* Role picker */}
        <div style={{
          background: "var(--surface)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)", overflow: "hidden",
          boxShadow: "var(--shadow-sm)", marginBottom: 16,
        }}>
          {ROLES.map((role, i) => (
            <div
              key={role.id}
              onClick={() => setSelected(role.id)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 18px", cursor: "pointer",
                borderBottom: i < ROLES.length - 1 ? "1px solid var(--border)" : "none",
                background: selected === role.id ? "var(--brand-light)" : "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (selected !== role.id) e.currentTarget.style.background = "var(--surface-2)"; }}
              onMouseLeave={e => { if (selected !== role.id) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius-sm)", flexShrink: 0,
                background: selected === role.id ? "var(--brand)" : "var(--surface-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, transition: "background 0.15s",
              }}>{role.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: selected === role.id ? "var(--brand)" : "var(--text-primary)" }}>{role.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{role.sub}</div>
              </div>
              {selected === role.id && (
                <div style={{ width: 20, height: 20, background: "var(--brand)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</div>
              )}
            </div>
          ))}
        </div>

        <Btn onClick={handleEnter} style={{ width: "100%" }} size="lg">
          Enter as {ROLES.find(r => r.id === selected)?.label} →
        </Btn>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "var(--text-muted)" }}>
          Powered by <span style={{ color: "var(--brand)", fontWeight: 600 }}>Acadryx</span> · School infrastructure, simplified
        </div>
      </div>
    </div>
  );
}
