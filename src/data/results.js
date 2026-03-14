// DATA: results.js — Demo results

const RESULTS = {
  STU001: {
    position: "3rd", outOf: 38, average: 78.4,
    teacherComment: "Chukwuemeka has demonstrated consistent effort throughout the term. His performance in Mathematics is commendable.",
    teacher: "Mrs. Adeyemi J.",
    subjects: [
      { name: "Mathematics",      icon: "➕", score: 88, grade: "A" },
      { name: "English Language", icon: "📖", score: 84, grade: "A" },
      { name: "Chemistry",        icon: "⚗️", score: 79, grade: "B" },
      { name: "Physics",          icon: "🔭", score: 76, grade: "B" },
      { name: "Economics",        icon: "📊", score: 72, grade: "C" },
      { name: "Data Processing",  icon: "💻", score: 82, grade: "A" },
    ],
  },
  STU002: {
    position: "1st", outOf: 38, average: 91.2,
    teacherComment: "Fatima is an exceptional student. Her dedication is unmatched in the class.",
    teacher: "Mrs. Adeyemi J.",
    subjects: [
      { name: "Mathematics",      icon: "➕", score: 95, grade: "A" },
      { name: "English Language", icon: "📖", score: 91, grade: "A" },
      { name: "Chemistry",        icon: "⚗️", score: 89, grade: "A" },
      { name: "Physics",          icon: "🔭", score: 93, grade: "A" },
      { name: "Economics",        icon: "📊", score: 88, grade: "A" },
      { name: "Data Processing",  icon: "💻", score: 90, grade: "A" },
    ],
  },
};

export function getResults(accessCode) {
  return RESULTS[accessCode] || null;
}
