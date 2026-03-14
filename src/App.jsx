// App.jsx — Demo version
// No slug detection. School is hardcoded. Role switching happens in sidebar.

import { useState } from "react";
import { DEMO_SCHOOL } from "./data/school.js";
import { getUserByRole } from "./data/users.js";
import Login from "./ui/Login.jsx";
import StudentPortal from "./portals/StudentPortal.jsx";
import AdminPortal from "./portals/AdminPortal.jsx";
import { TeacherPortal, ParentPortal, AlumniPortal } from "./portals/OtherPortals.jsx";
import "./ui/styles/globals.css";

const school = DEMO_SCHOOL;

// Apply school brand color on load
document.documentElement.style.setProperty("--brand", school.brandColor);
document.documentElement.style.setProperty("--brand-light", school.brandColor + "14");
document.documentElement.style.setProperty("--brand-mid",   school.brandColor + "33");
document.title = school.name;

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(resolvedUser) {
    setUser(resolvedUser);
  }

  function handleSwitchRole(role) {
    setUser(getUserByRole(role));
  }

  function handleLogout() {
    setUser(null);
  }

  if (!user) return <Login school={school} onLogin={handleLogin} />;

  const props = { user, school, onLogout: handleLogout, onSwitchRole: handleSwitchRole };

  const portals = {
    student: <StudentPortal {...props} />,
    admin:   <AdminPortal   {...props} />,
    teacher: <TeacherPortal {...props} />,
    parent:  <ParentPortal  {...props} />,
    alumni:  <AlumniPortal  {...props} />,
  };

  return portals[user.role] || <Login school={school} onLogin={handleLogin} />;
}
