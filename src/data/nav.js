// DATA: nav.js
// Supabase swap: roles and nav items could eventually come from a roles table
// allowing schools to have custom roles with custom nav permissions

const NAV = {
  student: [
    { id: "home",     label: "Home",      icon: "🏠" },
    { id: "results",  label: "Results",   icon: "📊" },
    { id: "magazine", label: "Magazine",  icon: "📰" },
    { id: "chat",     label: "Chat",      icon: "💬" },
    { id: "profile",  label: "Profile",   icon: "👤" },
  ],
  teacher: [
    { id: "home",       label: "Home",      icon: "🏠" },
    { id: "scores",     label: "Scores",    icon: "📝" },
    { id: "attendance", label: "Attend.",   icon: "📅" },
    { id: "chat",       label: "Chat",      icon: "💬" },
    { id: "profile",    label: "Profile",   icon: "👤" },
  ],
  parent: [
    { id: "home",    label: "Home",    icon: "🏠" },
    { id: "results", label: "Results", icon: "📊" },
    { id: "fees",    label: "Fees",    icon: "💰" },
    { id: "chat",    label: "Chat",    icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ],
  admin: [
    { id: "home",     label: "Home",     icon: "🏠" },
    { id: "students", label: "Students", icon: "👨‍🎓" },
    { id: "results",  label: "Results",  icon: "📊" },
    { id: "magazine", label: "Magazine", icon: "📰" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ],
  alumni: [
    { id: "home",     label: "Home",    icon: "🏠" },
    { id: "magazine", label: "Magazine", icon: "📰" },
    { id: "chat",     label: "Chat",    icon: "💬" },
    { id: "donate",   label: "Donate",  icon: "❤️" },
    { id: "profile",  label: "Profile", icon: "👤" },
  ],
};

export function getNavByRole(role) {
  return NAV[role] || [];
}
