// PORTAL: TeacherPortal.jsx — PageRunner

import { useState } from "react";
import { getNavByRole } from "../data/nav.js";
import { greet } from "../utils/format.js";
import { AppShell } from "../ui/layout.jsx";
import { Card, StatCard, SectionHeader, Badge, Btn, ListItem, Avatar } from "../ui/components.jsx";

function TeacherHome({ user, school, onTabChange }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{greet()},</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{user.name.split(" ").slice(1).join(" ") || user.name} 👋</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{school.term} · {school.session}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatCard label="My Classes"    value="4"    sub="This term"      icon="🏫" />
        <StatCard label="Total Students" value="168" sub="Across classes" icon="👨‍🎓" />
        <StatCard label="Avg Score"     value="74%"  trend="+2.1 pts"    />
        <StatCard label="Pending Scores" value="12"  sub="Enter now"     icon="📝" />
      </div>

      <SectionHeader title="My Classes" />
      <Card style={{ padding: "8px 16px", marginBottom: 20 }}>
        {[
          { cls: "SSS 2A", subject: "Mathematics", students: 42, done: "40/42" },
          { cls: "SSS 2B", subject: "Mathematics", students: 38, done: "38/38" },
          { cls: "JSS 3A", subject: "Mathematics", students: 47, done: "30/47" },
          { cls: "JSS 2A", subject: "Mathematics", students: 44, done: "44/44" },
        ].map((c, i, arr) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.cls} — {c.subject}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{c.students} students · {c.done} scores entered</div>
            </div>
            <Btn variant="secondary" size="sm" onClick={() => onTabChange("scores")}>Enter Scores</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
}

function TeacherScores({ user }) {
  const students = [
    { name: "Chukwuemeka Obi", initials: "CO", score: 88 },
    { name: "Fatima Musa",     initials: "FM", score: 95 },
    { name: "Taiwo Adamu",     initials: "TA", score: 68 },
    { name: "Amaka Obi",       initials: "AO", score: 77 },
    { name: "Garba Aminu",     initials: "GA", score: 72 },
  ];

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Enter Scores — SSS 2A Mathematics" />
      <Card style={{ padding: "8px 16px" }}>
        {students.map((s, i, arr) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <Avatar initials={s.initials} size={36} />
            <div style={{ flex: 1, fontWeight: 500, fontSize: 14 }}>{s.name}</div>
            <input
              type="number" min="0" max="100"
              defaultValue={s.score}
              style={{
                width: 64, textAlign: "center", padding: "8px",
                border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
                fontSize: 14, fontWeight: 600, background: "var(--surface)",
              }}
              onFocus={e => e.target.style.borderColor = "var(--brand)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
          </div>
        ))}
      </Card>
      <Btn style={{ width: "100%", marginTop: 16 }}>💾 Save Scores</Btn>
    </div>
  );
}

function TeacherAttendance() {
  const students = ["Chukwuemeka Obi", "Fatima Musa", "Taiwo Adamu", "Amaka Obi", "Garba Aminu"];
  const [attendance, setAttendance] = useState(Object.fromEntries(students.map(s => [s, true])));

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Attendance — SSS 2A" />
      <Card style={{ padding: "8px 16px", marginBottom: 16 }}>
        {students.map((s, i, arr) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <Avatar initials={s.split(" ").map(w => w[0]).join("")} size={36} />
            <div style={{ flex: 1, fontWeight: 500, fontSize: 14 }}>{s}</div>
            <button
              onClick={() => setAttendance(a => ({ ...a, [s]: !a[s] }))}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "none",
                background: attendance[s] ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.1)",
                color: attendance[s] ? "#16a34a" : "#dc2626",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
              }}
            >
              {attendance[s] ? "✓ Present" : "✗ Absent"}
            </button>
          </div>
        ))}
      </Card>
      <Btn style={{ width: "100%" }}>💾 Save Attendance</Btn>
    </div>
  );
}

function TeacherProfile({ user, school }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <Card style={{ textAlign: "center", padding: "28px 20px", marginBottom: 16 }}>
        <Avatar initials={user.initials} size={72} />
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{school.shortName}</div>
        <Badge style={{ marginTop: 10 }}>Teacher</Badge>
      </Card>
      <Card>
        {[
          { label: "Access Code", value: user.accessCode },
          { label: "School",      value: school.name },
          { label: "Term",        value: `${school.term} · ${school.session}` },
        ].map((row, i, arr) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{row.label}</span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

export function TeacherPortal({ user, school, onLogout, onSwitchRole }) {
  const nav = getNavByRole("teacher");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    home:       <TeacherHome       user={user} school={school} onTabChange={setActiveTab} />,
    scores:     <TeacherScores     user={user} />,
    attendance: <TeacherAttendance />,
    chat:       <div style={{ padding: 16 }} className="fade-up"><Card><div style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>Chat coming soon</div></Card></div>,
    profile:    <TeacherProfile    user={user} school={school} />,
  };

  return (
    <AppShell school={school} user={user} nav={nav}
      activeTab={activeTab}
      onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      onLogout={onLogout} sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen(o => !o)}
    >
      {pages[activeTab] || pages.home}
    </AppShell>
  );
}


// PORTAL: ParentPortal

function ParentHome({ user, school, onTabChange }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{greet()},</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{user.name} 👋</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{school.term} · {school.session}</div>
      </div>

      <Card style={{ marginBottom: 16, background: "var(--brand-light)", border: "1px solid var(--brand-mid)" }}>
        <div style={{ fontSize: 12, color: "var(--brand)", fontWeight: 600, marginBottom: 6 }}>Ward</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials="CO" size={46} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Chukwuemeka Obi</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>SSS 2A · {school.shortName}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatCard label="Term Average" value="78.4%"  sub="Position: 3rd"   trend="+4.2 pts" />
        <StatCard label="Attendance"  value="94%"    sub="This term"        icon="📅" />
        <StatCard label="Fees Status" value="Paid"   sub={`${school.term}`} icon="✅" />
        <StatCard label="Behaviour"   value="Good"   sub="No issues"        icon="😊" />
      </div>

      <SectionHeader title="Quick Access" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: "📊", label: "View Results",     onClick: () => onTabChange("results") },
          { icon: "💰", label: "Fee Statement",    onClick: () => onTabChange("fees")    },
          { icon: "💬", label: "Message Teacher",  onClick: () => onTabChange("chat")    },
          { icon: "📰", label: "School Magazine",  onClick: () => {}                     },
        ].map((a, i) => (
          <Card key={i} onClick={a.onClick} style={{ display: "flex", alignItems: "center", gap: 10, padding: 14 }}>
            <div style={{ fontSize: 22 }}>{a.icon}</div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{a.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ParentFees({ school }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Fee Statement" />
      <Card style={{ marginBottom: 16, background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#15803d" }}>✅ Fees Paid — {school.term}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          Next payment due: {school.session.split("/")[1]} 1st Term
        </div>
      </Card>
      <Card style={{ padding: "8px 16px" }}>
        {[
          { desc: "Tuition Fee",       amount: 150000, status: "Paid" },
          { desc: "Development Levy",  amount: 25000,  status: "Paid" },
          { desc: "Exam Fee",          amount: 10000,  status: "Paid" },
          { desc: "Acadryx Platform",  amount: school.pricePerStudent, status: "Paid" },
        ].map((f, i, arr) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{f.desc}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{school.currency}{f.amount.toLocaleString()}</div>
            </div>
            <Badge color="#16a34a" bg="rgba(22,163,74,0.1)">{f.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}

export function ParentPortal({ user, school, onLogout, onSwitchRole }) {
  const nav = getNavByRole("parent");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    home:    <ParentHome user={user} school={school} onTabChange={setActiveTab} />,
    results: <div style={{ padding: 16 }} className="fade-up"><Card><div style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>Ward's results will appear here when published.</div></Card></div>,
    fees:    <ParentFees school={school} />,
    chat:    <div style={{ padding: 16 }} className="fade-up"><Card><div style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>Chat coming soon.</div></Card></div>,
    profile: <div style={{ padding: 16 }} className="fade-up"><Card style={{ textAlign: "center", padding: 28 }}><Avatar initials={user.initials} size={64} /><div style={{ fontWeight: 700, marginTop: 12 }}>{user.name}</div><Badge style={{ marginTop: 8 }}>Parent</Badge></Card></div>,
  };

  return (
    <AppShell school={school} user={user} nav={nav}
      activeTab={activeTab}
      onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      onLogout={onLogout} sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen(o => !o)}
    >
      {pages[activeTab] || pages.home}
    </AppShell>
  );
}


// PORTAL: AlumniPortal

export function AlumniPortal({ user, school, onLogout, onSwitchRole }) {
  const nav = getNavByRole("alumni");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const AlumniHome = () => (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{greet()},</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
          Alumni · {school.shortName}
        </div>
      </div>
      <Card style={{ marginBottom: 16, background: "var(--brand-light)", border: "1px solid var(--brand-mid)" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "var(--brand)" }}>🎓 Verified Graduate</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.6 }}>
          Your academic records from {school.name} are permanently stored and verifiable.
        </div>
        <Btn variant="secondary" size="sm" style={{ marginTop: 12 }}>View Academic Record</Btn>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: "📰", label: "School Magazine",   tab: "magazine" },
          { icon: "💬", label: "Alumni Network",    tab: "chat"     },
          { icon: "❤️", label: "Donate to School",  tab: "donate"   },
          { icon: "📜", label: "Transcript",        tab: null        },
        ].map((a, i) => (
          <Card key={i} onClick={() => a.tab && setActiveTab(a.tab)} style={{ display: "flex", alignItems: "center", gap: 10, padding: 14 }}>
            <div style={{ fontSize: 22 }}>{a.icon}</div>
            <div style={{ fontWeight: 500, fontSize: 13 }}>{a.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );

  const AlumniDonate = () => (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Support Your School" />
      <Card style={{ marginBottom: 16, textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>❤️</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Give back to {school.shortName}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 20 }}>
          Your contribution helps fund scholarships, facilities, and opportunities for current students.
        </div>
        {["₦5,000", "₦10,000", "₦25,000", "Custom"].map(amt => (
          <Btn key={amt} variant={amt === "₦10,000" ? "primary" : "ghost"} style={{ margin: "4px", minWidth: 90 }}>{amt}</Btn>
        ))}
      </Card>
    </div>
  );

  const pages = {
    home:     <AlumniHome />,
    magazine: <div style={{ padding: 16 }} className="fade-up"><Card><div style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>School magazine loads here.</div></Card></div>,
    chat:     <div style={{ padding: 16 }} className="fade-up"><Card><div style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>Alumni network coming soon.</div></Card></div>,
    donate:   <AlumniDonate />,
    profile:  <div style={{ padding: 16 }} className="fade-up"><Card style={{ textAlign: "center", padding: 28 }}><Avatar initials={user.initials} size={64} /><div style={{ fontWeight: 700, marginTop: 12 }}>{user.name}</div><Badge style={{ marginTop: 8 }}>Alumni</Badge></Card></div>,
  };

  return (
    <AppShell school={school} user={user} nav={nav}
      activeTab={activeTab}
      onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      onLogout={onLogout} sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen(o => !o)}
    >
      {pages[activeTab] || pages.home}
    </AppShell>
  );
}
