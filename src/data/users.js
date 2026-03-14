// DATA: users.js — Demo users, one per role

export const DEMO_USERS = [
  { accessCode: "ADM001", name: "Mrs. Adeyemi J.",    initials: "AJ", role: "admin"   },
  { accessCode: "TCH001", name: "Mr. Babatunde O.",   initials: "BO", role: "teacher" },
  { accessCode: "STU001", name: "Chukwuemeka Obi",    initials: "CO", role: "student" },
  { accessCode: "STU002", name: "Fatima Musa",        initials: "FM", role: "student" },
  { accessCode: "PAR001", name: "Mr. Obi Sr.",        initials: "OS", role: "parent"  },
  { accessCode: "ALM001", name: "Chidi Eze",          initials: "CE", role: "alumni"  },
];

export function getUserByRole(role) {
  return DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
}
