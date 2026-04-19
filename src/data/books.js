import coverAlgorithms from "../assets/cover-algorithms.svg";
import coverArchitecture from "../assets/cover-architecture.svg";
import coverDesign from "../assets/cover-design.svg";
import coverData from "../assets/cover-data.svg";

export const books = [
  {
    id: "1",
    title: "Clean Code Campus Edition",
    author: "Robert C. Martin",
    category: "Software Engineering",
    difficulty: "Medium",
    readability: "Highly readable",
    tags: ["Medium difficulty", "Highly readable", "Project friendly"],
    cover: coverAlgorithms,
    rating: 4.8,
    pages: 464,
    students: 1284,
    description:
      "A practical guide to writing maintainable code that still feels approachable for semester projects and internships.",
    feedback: [
      "Great for students building real-world coding habits.",
      "Dense in places, but the examples stay useful.",
      "Best read alongside a software design class."
    ]
  },
  {
    id: "2",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Data Systems",
    difficulty: "Advanced",
    readability: "Deep dive",
    tags: ["Advanced", "Systems thinking", "Worth revisiting"],
    cover: coverData,
    rating: 4.9,
    pages: 616,
    students: 903,
    description:
      "A modern systems book that helps students connect distributed systems, databases, and production architecture.",
    feedback: [
      "Excellent once you've seen databases and networks before.",
      "Heavy but incredibly rewarding for backend interviews.",
      "A must-save for capstone season."
    ]
  },
  {
    id: "3",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Design",
    difficulty: "Too early",
    readability: "Highly readable",
    tags: ["Too early", "Highly readable", "User empathy"],
    cover: coverDesign,
    rating: 4.7,
    pages: 368,
    students: 1110,
    description:
      "A foundational design book that introduces usability thinking in a clear, engaging way for any student.",
    feedback: [
      "Perfect starter read for UI/UX students.",
      "Makes you notice bad interfaces everywhere.",
      "Very readable even outside design majors."
    ]
  },
  {
    id: "4",
    title: "Computer Architecture: A Quantitative Approach",
    author: "John Hennessy",
    category: "Computer Science",
    difficulty: "Advanced",
    readability: "Reference-heavy",
    tags: ["Advanced", "Exam prep", "Detailed"],
    cover: coverArchitecture,
    rating: 4.6,
    pages: 856,
    students: 672,
    description:
      "A rigorous architecture text for students moving into performance, processors, and low-level systems.",
    feedback: [
      "Not casual reading, but unbeatable for depth.",
      "A lifesaver in advanced architecture courses.",
      "Use the tag filters before jumping in."
    ]
  },
  {
    id: "5",
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    category: "Algorithms",
    difficulty: "Advanced",
    readability: "Structured",
    tags: ["Advanced", "Core theory", "Interview staple"],
    cover: coverAlgorithms,
    rating: 4.8,
    pages: 1312,
    students: 1490,
    description:
      "The classic algorithms reference for students who want a serious academic and interview-ready foundation.",
    feedback: [
      "Better as a semester companion than a cover-to-cover read.",
      "Excellent problem-solving resource.",
      "A little intimidating at first."
    ]
  },
  {
    id: "6",
    title: "Sprint: Solve Big Problems and Test New Ideas",
    author: "Jake Knapp",
    category: "Product",
    difficulty: "Too early",
    readability: "Highly readable",
    tags: ["Too early", "Practical", "Team workflows"],
    cover: coverDesign,
    rating: 4.5,
    pages: 288,
    students: 540,
    description:
      "A fast-moving read for student founders and product teams experimenting with ideas and prototypes.",
    feedback: [
      "Feels actionable right away.",
      "Good for hackathons and project clubs.",
      "More product-oriented than technical."
    ]
  },
  {
    id: "7",
    title: "Operating Systems: Three Easy Pieces",
    author: "Remzi Arpaci-Dusseau",
    category: "Systems",
    difficulty: "Medium",
    readability: "Guided",
    tags: ["Medium difficulty", "Concept-first", "Course companion"],
    cover: coverArchitecture,
    rating: 4.7,
    pages: 744,
    students: 827,
    description:
      "A student-friendly systems book with a memorable teaching style and a strong balance of theory and intuition.",
    feedback: [
      "One of the better textbooks for self-study.",
      "Still technical, but easier to stick with.",
      "Helpful before OS exams."
    ]
  },
  {
    id: "8",
    title: "Storytelling With Data",
    author: "Cole Nussbaumer Knaflic",
    category: "Data Visualization",
    difficulty: "Too early",
    readability: "Highly readable",
    tags: ["Too early", "Presentation skills", "Visual clarity"],
    cover: coverData,
    rating: 4.6,
    pages: 288,
    students: 468,
    description:
      "A strong pick for students who want to communicate data clearly in coursework, research, or internships.",
    feedback: [
      "Makes charts dramatically better.",
      "Useful beyond data science majors.",
      "Short and very approachable."
    ]
  },
  {
    id: "9",
    title: "Signals and Systems for Engineers",
    author: "Alan V. Oppenheim",
    category: "Electronics Engineering",
    difficulty: "Advanced",
    readability: "Structured",
    tags: ["Advanced", "Core theory", "Engineering math"],
    cover: coverArchitecture,
    rating: 4.5,
    pages: 720,
    students: 612,
    description:
      "A foundational engineering text for students working through signals, transforms, and system behavior.",
    feedback: [
      "Very useful for ECE students after the basics click.",
      "Heavy on concepts, but worth keeping for semesters ahead.",
      "Strong companion for signal processing courses."
    ]
  },
  {
    id: "10",
    title: "Engineering Mechanics: Statics",
    author: "R. C. Hibbeler",
    category: "Mechanical Engineering",
    difficulty: "Medium",
    readability: "Guided",
    tags: ["Medium difficulty", "Problem solving", "Course companion"],
    cover: coverAlgorithms,
    rating: 4.4,
    pages: 672,
    students: 578,
    description:
      "A practical mechanics book that helps engineering students build confidence with forces, equilibrium, and structure analysis.",
    feedback: [
      "Good worked examples for assignments.",
      "Best when paired with class problem sets.",
      "A strong introduction before dynamics."
    ]
  },
  {
    id: "11",
    title: "Electrical Engineering Principles",
    author: "Allan R. Hambley",
    category: "Electrical Engineering",
    difficulty: "Medium",
    readability: "Highly readable",
    tags: ["Medium difficulty", "Highly readable", "Circuit basics"],
    cover: coverData,
    rating: 4.6,
    pages: 912,
    students: 701,
    description:
      "An accessible introduction to core electrical engineering topics including circuits, devices, and systems.",
    feedback: [
      "Readable enough for early semesters.",
      "Helpful diagrams and explanations.",
      "A solid all-rounder for EE fundamentals."
    ]
  },
  {
    id: "12",
    title: "Materials Science and Engineering",
    author: "William D. Callister Jr.",
    category: "Materials Engineering",
    difficulty: "Medium",
    readability: "Guided",
    tags: ["Medium difficulty", "Lab support", "Engineering fundamentals"],
    cover: coverDesign,
    rating: 4.5,
    pages: 992,
    students: 533,
    description:
      "A broad engineering materials text covering structure, properties, and performance across real-world applications.",
    feedback: [
      "Great reference for first materials classes.",
      "Useful figures and summary tables.",
      "Works well for both exams and labs."
    ]
  }
];

export const featuredIds = ["2", "3", "7", "8"];
