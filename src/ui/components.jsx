// UI: components.jsx
// Pure components — receive everything via props, import nothing from the app

// CARD
export function Card({ children, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)",
        padding: "16px",
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.2s, transform 0.15s",
        ...style,
      }}
      onMouseEnter={e => { if (onClick) { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-1px)"; }}}
      onMouseLeave={e => { if (onClick) { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}}
    >
      {children}
    </div>
  );
}

// FEATURE CARD
export function FeatureCard({ icon, label, sub, onClick, badge }) {
  return (
    <Card onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, position: "relative", minHeight: 100 }}>
      {badge && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "var(--brand)", color: "#fff", fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "2px 7px" }}>
          {badge}
        </div>
      )}
      <div style={{ width: 44, height: 44, background: "var(--brand-light)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
      </div>
    </Card>
  );
}

// AVATAR
export function Avatar({ initials, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "var(--brand)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// BADGE
export function Badge({ children, color = "var(--brand)", bg }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: bg || "var(--brand-light)",
      color,
      fontSize: 11, fontWeight: 600,
      padding: "3px 8px", borderRadius: 20,
    }}>
      {children}
    </span>
  );
}

// STAT CARD
export function StatCard({ label, value, sub, icon, trend }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
        </div>
        {icon && <div style={{ fontSize: 24 }}>{icon}</div>}
      </div>
      {trend && (
        <div style={{ marginTop: 8, fontSize: 12, color: trend.startsWith("+") ? "#16a34a" : "#dc2626", fontWeight: 500 }}>
          {trend}
        </div>
      )}
    </Card>
  );
}

// SECTION HEADER
export function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
      {action && (
        <button onClick={onAction} style={{ background: "none", border: "none", color: "var(--brand)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          {action}
        </button>
      )}
    </div>
  );
}

// BTN
export function Btn({ children, onClick, variant = "primary", size = "md", style: extra = {}, disabled }) {
  const base = {
    border: "none", borderRadius: "var(--radius-sm)",
    fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    transition: "opacity 0.2s",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    opacity: disabled ? 0.5 : 1,
    padding: size === "sm" ? "8px 14px" : size === "lg" ? "14px 28px" : "10px 20px",
    fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
  };
  const variants = {
    primary:   { background: "var(--brand)", color: "#fff" },
    secondary: { background: "var(--brand-light)", color: "var(--brand)" },
    ghost:     { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    danger:    { background: "#fee2e2", color: "#dc2626" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...extra }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.82"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </button>
  );
}

// LIST ITEM
export function ListItem({ left, title, sub, right, onClick, divider = true }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 0",
      borderBottom: divider ? "1px solid var(--border)" : "none",
      cursor: onClick ? "pointer" : "default",
    }}>
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// INPUT
export function Input({ label, placeholder, value, onChange, type = "text", style: extra = {} }) {
  return (
    <div style={{ marginBottom: 16, ...extra }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--text-secondary)" }}>{label}</label>}
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{
          width: "100%", padding: "11px 14px",
          border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
          fontSize: 14, color: "var(--text-primary)", background: "var(--surface)",
          outline: "none", transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = "var(--brand)"}
        onBlur={e => e.target.style.borderColor = "var(--border)"}
      />
    </div>
  );
}

// EMPTY STATE
export function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-secondary)" }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// MODAL
export function Modal({ children, onClose }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}
    >
      <div
        style={{ background: "var(--surface)", borderRadius: "var(--radius-lg)", padding: 28, maxWidth: 400, width: "100%" }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
