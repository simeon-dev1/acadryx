// DATA: magazine.js

export const DEMO_MAGAZINE = {
  title:      "The myDemo Tribune",
  volume:     "Vol III · Issue 2 · 2024/25",
  readers:    847,
  savedPrint: 338800,
  currency:   "₦",
  articles: [
    { cat: "Achievement", title: "We Won the State Science Olympiad",      author: "Chidi Eze",   date: "Jan 14", icon: "🏆" },
    { cat: "Culture",     title: "Art Exhibition 2025: Colours of Tomorrow", author: "Amaka Obi",  date: "Jan 10", icon: "🎨" },
    { cat: "Science",     title: "A Tour of Our New Chemistry Lab",         author: "Staff",       date: "Jan 8",  icon: "🔬" },
    { cat: "Poem",        title: "The River Knows My Name",                 author: "Fatima Musa", date: "Jan 6",  icon: "✏️" },
    { cat: "Sports",      title: "Football Season Recap: A Historic Year",  author: "Taiwo Adamu", date: "Jan 5",  icon: "⚽" },
  ],
  pending: [
    "Science fair write-up — Chidi Eze",
    "New poem submission — Fatima Musa",
    "Sports article — Taiwo Adamu",
  ],
};

export function getMagazine() {
  return DEMO_MAGAZINE;
}

export function getStudents() {
  return [
    { name: "Adeyemi, Blessing",  admNo: "STU-01230", class: "SSS 2A", year: 2022, initials: "AB" },
    { name: "Chukwuemeka, Obi",   admNo: "STU-01234", class: "SSS 2A", year: 2022, initials: "CO" },
    { name: "Dankwa, Emeka",      admNo: "STU-01238", class: "SSS 2A", year: 2022, initials: "DE" },
    { name: "Fagbemi, Ife",       admNo: "STU-01242", class: "JSS 3B", year: 2021, initials: "FI" },
    { name: "Garba, Aminu",       admNo: "STU-01246", class: "JSS 1A", year: 2023, initials: "GA" },
    { name: "Musa, Fatima",       admNo: "STU-01250", class: "SSS 2A", year: 2022, initials: "MF" },
  ];
}
