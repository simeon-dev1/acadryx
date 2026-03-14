// PORTAL: AdminPortal.jsx — PageRunner

import { useState } from "react";
import { getStudents } from "../data/magazine.js";
import { getMagazine } from "../data/magazine.js";
import { getNavByRole } from "../data/nav.js";
import { formatCurrency } from "../utils/format.js";
import { AppShell } from "../ui/layout.jsx";
import {
  Card, StatCard, SectionHeader, Badge,
  Btn, ListItem, Avatar, Modal,
} from "../ui/components.jsx";

// ADMIN HOME
function AdminHome({ school, onTabChange }) {
  const outstanding = school.totalStudents * school.pricePerStudent;

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>School Overview 🏫</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{school.shortName} · {school.term} · {school.session}</div>
      </div>

      <Card style={{ background: "rgba(245,158,11,0.08)", border: "1.5px solid rgba(245,158,11,0.3)", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#92400e" }}>⚠️ Outstanding Balance</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#b45309", marginTop: 4 }}>
              {formatCurrency(outstanding, school.currency)}
            </div>
            <div style={{ fontSize: 12, color: "#92400e", marginTop: 2 }}>
              {school.totalStudents.toLocaleString()} students × {formatCurrency(school.pricePerStudent, school.currency)} · Publish to charge
            </div>
          </div>
          <Btn size="sm" style={{ background: "#f59e0b", color: "#fff", border: "none" }}>Pay Now</Btn>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatCard label="Total Students" value={school.totalStudents.toLocaleString()} sub="↑ +34 this term" icon="👨‍🎓" />
        <StatCard label="Teaching Staff"  value={school.totalStaff}                    sub="↑ +3 new"        icon="👩‍🏫" />
        <StatCard label="Avg Attendance"  value="91%"   trend="↓ -2% vs last term" />
        <StatCard label="Pending"         value="8"     sub="Review now"            icon="📝" />
      </div>

      <SectionHeader title="Quick Actions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[
          { icon: "📊", label: "Review & Publish Results", tab: "results"  },
          { icon: "📰", label: "Approve Magazine",         tab: "magazine" },
          { icon: "👤", label: "Create New User",          tab: null       },
          { icon: "📢", label: "Launch New Event",         tab: null       },
          { icon: "📅", label: "Configure Timetable",      tab: null       },
          { icon: "⚙️", label: "School Settings",          tab: "settings" },
        ].map((a, i) => (
          <Card key={i} onClick={() => a.tab && onTabChange(a.tab)} style={{ display: "flex", alignItems: "center", gap: 10, padding: 14 }}>
            <div style={{ fontSize: 22 }}>{a.icon}</div>
            <div style={{ fontWeight: 500, fontSize: 13, lineHeight: 1.3 }}>{a.label}</div>
          </Card>
        ))}
      </div>

      <Card style={{ background: "var(--brand-light)", border: "1px solid var(--brand-mid)" }}>
        <div style={{ fontSize: 12, color: "var(--brand)", fontWeight: 600, marginBottom: 6 }}>💡 Acadryx Insight</div>
        <div style={{ fontWeight: 700, fontSize: 16, color: "var(--brand)" }}>
          Save {formatCurrency(490000, school.currency)}/year
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
          Switch to the Acadryx digital magazine. Same quality, zero printing cost.
        </div>
      </Card>
    </div>
  );
}

// ADMIN RESULTS
function AdminResults({ school }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const classes = [
    { name: "SSS 2A — All Subjects", status: "ready",      scores: "42/42", subjects: "9/9" },
    { name: "SSS 2B — All Subjects", status: "ready",      scores: "38/38", subjects: "9/9" },
    { name: "SSS 1A — All Subjects", status: "pending",    scores: "40/40", subjects: "7/9" },
    { name: "JSS 3A — All Subjects", status: "incomplete", scores: "47/47", subjects: "4/9" },
    { name: "JSS 2A — All Subjects", status: "ready",      scores: "44/44", subjects: "8/8" },
  ];

  const statusConfig = {
    ready:      { label: "Ready",      color: "#16a34a", bg: "rgba(22,163,74,0.1)"   },
    pending:    { label: "Pending",    color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
    incomplete: { label: "Incomplete", color: "#dc2626", bg: "rgba(220,38,38,0.1)"   },
  };

  const readyClasses = classes.filter(c => c.status === "ready");
  const readyStudents = 1047;
  const charge = formatCurrency(readyStudents * school.pricePerStudent, school.currency);

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Result Review" />
      <Card style={{ background: "var(--brand)", marginBottom: 16 }}>
        <div style={{ color: "#fff" }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{readyClasses.length} classes ready to publish</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
            {readyStudents.toLocaleString()} students · {charge} will be charged
          </div>
        </div>
        <Btn onClick={() => setShowConfirm(true)} style={{ marginTop: 12, background: "#fff", color: "var(--brand)", border: "none", fontWeight: 700, padding: "10px 20px", borderRadius: "var(--radius-sm)", width: "100%", fontSize: 14 }}>
          🚀 Publish All Ready Classes
        </Btn>
      </Card>

      <Card style={{ padding: "8px 16px" }}>
        {classes.map((c, i) => {
          const s = statusConfig[c.status];
          return (
            <div key={i} style={{ padding: "14px 0", borderBottom: i < classes.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                <Badge color={s.color} bg={s.bg}>{s.label}</Badge>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                {c.scores} scores · {c.subjects} subjects
              </div>
            </div>
          );
        })}
      </Card>

      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Confirm Publication</div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
            Publishing results for <strong>{readyClasses.length} classes</strong> and <strong>{readyStudents.toLocaleString()} students</strong>.<br /><br />
            This will charge <strong>{charge}</strong> to your Acadryx balance. Results become <strong>permanently immutable</strong>.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setShowConfirm(false)} style={{ flex: 1 }}>Cancel</Btn>
            <Btn onClick={() => setShowConfirm(false)} style={{ flex: 2 }}>Publish — {charge}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ADMIN STUDENTS
function AdminStudents({ school }) {
  const students = getStudents();
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        <StatCard label="Students" value={school.totalStudents.toLocaleString()} />
        <StatCard label="Parents"  value="320" />
        <StatCard label="Staff"    value={school.totalStaff} />
      </div>
      <SectionHeader title="Students" action="Add New" />
      <Card style={{ padding: "8px 16px" }}>
        {students.map((s, i, arr) => (
          <ListItem key={i}
            left={<Avatar initials={s.initials} size={38} />}
            title={s.name}
            sub={`${s.class} · Admitted ${s.year}`}
            right={<span style={{ fontSize: 18, color: "var(--text-muted)" }}>›</span>}
            onClick={() => {}} divider={i < arr.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}

// ADMIN MAGAZINE
function AdminMagazine({ school }) {
  const mag = getMagazine();
  if (!mag) return <div style={{ padding: 16 }}>No magazine data.</div>;
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="Magazine" />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontWeight: 600 }}>{mag.title}</div>
          <Badge>Published</Badge>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{mag.readers.toLocaleString()} readers · {mag.volume}</div>
      </Card>
      {mag.pending.length > 0 && (
        <>
          <SectionHeader title="Pending Approvals" />
          <Card style={{ padding: "8px 16px" }}>
            {mag.pending.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < mag.pending.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn variant="secondary" size="sm">Approve</Btn>
                  <Btn variant="danger" size="sm">Reject</Btn>
                </div>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}

// ADMIN SETTINGS
function AdminSettings({ school }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="School Settings" />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Brand Color</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["#1a6bff", "#7c3aed", "#059669", "#dc2626", "#d97706", "#0891b2"].map(c => (
            <div key={c}
              onClick={() => {
                document.documentElement.style.setProperty("--brand", c);
                document.documentElement.style.setProperty("--brand-light", c + "14");
                document.documentElement.style.setProperty("--brand-mid", c + "33");
              }}
              style={{ width: 36, height: 36, borderRadius: "50%", background: c, cursor: "pointer", border: c === school.brandColor ? "3px solid #000" : "3px solid transparent", transition: "border 0.2s" }}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>Click to preview brand color</div>
      </Card>
      <Card>
        {[
          { label: "School Name",    value: school.name },
          { label: "School Code",    value: school.code },
          { label: "Active Term",    value: `${school.term} · ${school.session}` },
          { label: "Subscription",   value: "Active · Pay per publish" },
          { label: "Currency",       value: school.currency },
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

// PAGERUNNER
export default function AdminPortal({ user, school, onLogout, onSwitchRole }) {
  const nav = getNavByRole("admin");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    home:     <AdminHome     school={school} onTabChange={setActiveTab} />,
    students: <AdminStudents school={school} />,
    results:  <AdminResults  school={school} />,
    magazine: <AdminMagazine school={school} />,
    settings: <AdminSettings school={school} />,
  };

  return (
    <AppShell
      school={school} user={user} nav={nav}
      activeTab={activeTab}
      onTabChange={(id) => { setActiveTab(id); setSidebarOpen(false); }}
      onLogout={onLogout}
      sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen(o => !o)}
    >
      {pages[activeTab] || pages.home}
    </AppShell>
  );
}
