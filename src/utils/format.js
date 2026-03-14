// UTILS: format.js
// Generic helpers — no app imports, no side effects

export function formatCurrency(amount, currency = "₦") {
  return `${currency}${Number(amount).toLocaleString()}`;
}

export function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function getScoreColor(score) {
  if (score >= 70) return "#16a34a";
  if (score >= 50) return "#f59e0b";
  return "#dc2626";
}
