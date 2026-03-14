// DATA: school.js — Demo instance
// One school, hardcoded, no slug detection needed for demo

export const DEMO_SCHOOL = {
  code:            "DEMO",
  name:            "myDemo School Int'l",
  shortName:       "myDemo Int'l",
  slug:            "demo",
  brandColor:      "#1a6bff",
  term:            "2nd Term",
  session:         "2024/2025",
  country:         "NG",
  currency:        "₦",
  pricePerStudent: 1000,
  totalStudents:   847,
  totalStaff:      52,
};

export function getSchoolBySlug() {
  return DEMO_SCHOOL;
}

export function detectSlug() {
  return "demo";
}
