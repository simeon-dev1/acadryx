// PORTAL: StudentPortal.jsx — PageRunner
// This file imports. Sub-pages receive props only.

import { useState } from "react";
import { getResults } from "../data/results.js";
import { getMagazine } from "../data/magazine.js";
import { getNavByRole } from "../data/nav.js";
import { greet, formatCurrency } from "../utils/format.js";
import { AppShell } from "../ui/layout.jsx";
import {
  Card, FeatureCard, StatCard, SectionHeader,
  Badge, Avatar, Btn, ListItem,
} from "../ui/components.jsx";

// STUDENT HOME
function StudentHome({ user, school, onTabChange }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{greet()},</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
          {school.term} · {school.session}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <StatCard label="Term Average" value="78.4%" sub="Position: 3rd of 42" trend="+4.2 pts" />
        <StatCard label="Attendance" value="94%" sub="This term" icon="📅" />
      </div>

      <SectionHeader title="Quick Access" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <FeatureCard icon="📊" label="My Results"     sub={school.term}        onClick={() => onTabChange("results")} />
        <FeatureCard icon="📅" label="Timetable"      sub="Today's classes" />
        <FeatureCard icon="📰" label="Magazine"       sub="Latest issue"        onClick={() => onTabChange("magazine")} badge="New" />
        <FeatureCard icon="📢" label="Announcements"  sub="3 new"               badge={3} />
        <FeatureCard icon="💬" label="Class Chat"     sub="SSS 2A"              onClick={() => onTabChange("chat")} />
        <FeatureCard icon="📚" label="Resources"      sub="Study materials" />
      </div>

      <SectionHeader title="Today's Classes" />
      <Card>
        {[
          { time: "7:30 – 8:20",  subject: "Mathematics", room: "Room 12", status: "done" },
          { time: "8:20 – 9:10",  subject: "English",     room: "Room 14", status: "done" },
          { time: "9:10 – 10:00", subject: "Chemistry",   room: "Lab A",   status: "now"  },
          { time: "10:20 – 11:10",subject: "Physics",     room: "Lab B",   status: "next" },
          { time: "11:10 – 12:00",subject: "Economics",   room: "Room 7",  status: ""     },
        ].map((cls, i, arr) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, flexShrink: 0,
              background: cls.status === "now" ? "var(--brand)" : cls.status === "done" ? "var(--border)" : "var(--surface-2)",
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: cls.status === "done" ? "var(--text-muted)" : "var(--text-primary)" }}>
                {cls.subject}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{cls.time} · {cls.room}</div>
            </div>
            {cls.status === "now" && <Badge>● Now</Badge>}
            {cls.status === "next" && <Badge color="var(--text-muted)" bg="var(--surface-2)">Next</Badge>}
          </div>
        ))}
      </Card>
    </div>
  );
}

// STUDENT RESULTS
function StudentResults({ user, school }) {
  const results = getResults(user.accessCode);

  if (!results) return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="My Results" />
      <Card style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Results not yet published</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>Check back after your school admin publishes.</div>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Position", value: results.position },
          { label: "Average",  value: `${results.average}%` },
          { label: "Best",     value: results.subjects.reduce((b, s) => s.grade === "A" ? "A" : b, "B") },
          { label: "Subjects", value: results.subjects.length },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: "12px 8px" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "var(--brand)" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <SectionHeader title="Subject Scores" />
      <Card style={{ padding: "8px 16px" }}>
        {results.subjects.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
            borderBottom: i < results.subjects.length - 1 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{ fontSize: 20, width: 32, textAlign: "center" }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{s.name}</div>
              <div style={{ marginTop: 6, height: 4, background: "var(--surface-2)", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${s.score}%`, background: "var(--brand)", borderRadius: 2, transition: "width 0.8s ease" }} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{s.score}</div>
              <Badge>{s.grade}</Badge>
            </div>
          </div>
        ))}
      </Card>

      <Card style={{ marginTop: 16, background: "var(--brand-light)", border: "1px solid var(--brand-mid)" }}>
        <div style={{ fontSize: 12, color: "var(--brand)", fontWeight: 600, marginBottom: 8 }}>Form Teacher's Comment</div>
        <div style={{ fontSize: 14, color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
          "{results.teacherComment}"
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>— {results.teacher}</div>
      </Card>

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 0", justifyContent: "center" }}>
        <span>🔒</span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Verified Academic Record · Permanently stored by Acadryx</span>
      </div>
    </div>
  );
}

// STUDENT MAGAZINE
function StudentMagazine({ school }) {
  const mag = getMagazine();
  if (!mag) return <div style={{ padding: 16 }}>No magazine yet.</div>;

  return (
    <div style={{ padding: 16 }} className="fade-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>{mag.title}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{mag.volume}</div>
          <div style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>
            💰 Saved {formatCurrency(mag.savedPrint, mag.currency)} vs print this year
          </div>
        </div>
        <Badge>{mag.readers.toLocaleString()} readers</Badge>
      </div>

      <Btn variant="secondary" size="sm" style={{ width: "100%", marginBottom: 20 }}>✍️ Submit Your Article</Btn>

      <SectionHeader title="Latest Articles" />
      <Card style={{ padding: "8px 16px" }}>
        {mag.articles.map((a, i) => (
          <ListItem
            key={i}
            left={<div style={{ fontSize: 24, width: 36, textAlign: "center" }}>{a.icon}</div>}
            title={a.title}
            sub={`${a.cat} · By ${a.author} · ${a.date}`}
            right={<span style={{ fontSize: 18, color: "var(--text-muted)" }}>›</span>}
            onClick={() => {}}
            divider={i < mag.articles.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}

// STUDENT CHAT (static for now)
function StudentChat() {
  const channels = [
    { name: "School Announcements", last: "Exams start Monday. Be prepared.", time: "2h", unread: 3, icon: "📢" },
    { name: "Class Chat",           last: "Who has the chemistry notes?",     time: "30m",unread: 12, icon: "🏫" },
    { name: "Events Feed",          last: "Inter-house Sports — Feb 14",      time: "3d", unread: 0,  icon: "📅" },
  ];
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <SectionHeader title="School Channels" />
      <Card style={{ padding: "8px 16px", marginBottom: 16 }}>
        {channels.map((c, i) => (
          <ListItem key={i}
            left={<div style={{ width: 40, height: 40, background: "var(--brand-light)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.icon}</div>}
            title={c.name} sub={c.last}
            right={<div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.time}</div>
              {c.unread > 0 && <Badge style={{ marginTop: 4 }}>{c.unread}</Badge>}
            </div>}
            onClick={() => {}} divider={i < channels.length - 1}
          />
        ))}
      </Card>
    </div>
  );
}

// STUDENT PROFILE
function StudentProfile({ user, school }) {
  return (
    <div style={{ padding: 16 }} className="fade-up">
      <Card style={{ textAlign: "center", padding: "28px 20px", marginBottom: 16 }}>
        <Avatar initials={user.initials} size={72} />
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{school.shortName}</div>
        <Badge style={{ marginTop: 10, textTransform: "capitalize" }}>{user.role}</Badge>
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

// PAGERUNNER
export default function StudentPortal({ user, school, onLogout, onSwitchRole }) {
  const nav = getNavByRole("student");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    home:     <StudentHome     user={user} school={school} onTabChange={setActiveTab} />,
    results:  <StudentResults  user={user} school={school} />,
    magazine: <StudentMagazine school={school} />,
    chat:     <StudentChat />,
    profile:  <StudentProfile  user={user} school={school} />,
  };

  return (
    <AppShell onSwitchRole={onSwitchRole}
      school={school}
      user={user}
      nav={nav}
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
