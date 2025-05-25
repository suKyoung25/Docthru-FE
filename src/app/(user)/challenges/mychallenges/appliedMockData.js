export const appliedMockData = [
  {
    id: 1,
    docType: "프론트엔드",
    category: "React",
    title: "React로 챌린지 앱 만들기",
    maxParticipant: 10,
    createdAt: "2025-05-20",
    updatedAt: "2025-06-01",
    application: {
      adminStatus: "APPROVE"
    }
  },
  {
    id: 2,
    docType: "백엔드",
    category: "Node.js",
    title: "Node.js로 API 만들기",
    maxParticipant: 8,
    createdAt: "2025-05-21",
    updatedAt: "2025-06-03",
    application: {
      adminStatus: "PENDING"
    }
  },
  {
    id: 3,
    docType: "AI",
    category: "머신러닝",
    title: "챗봇 만들기",
    maxParticipant: 5,
    createdAt: "2025-05-22",
    updatedAt: "2025-06-05",
    application: {
      adminStatus: "REJECT"
    }
  },
  ...Array.from({ length: 50 }, (_, i) => {
    const id = i + 4;
    const docTypes = ["프론트엔드", "백엔드", "AI", "DevOps", "모바일"];
    const categories = ["React", "Node.js", "머신러닝", "Docker", "Flutter"];
    const statuses = ["APPROVE", "PENDING", "REJECT"];
    const date = new Date(2025, 4, 23 + (i % 7)); // 2025-05-23부터 시작
    const createdAt = date.toISOString().split("T")[0];
    const updatedAt = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 10).toISOString().split("T")[0];

    return {
      id,
      docType: docTypes[i % docTypes.length],
      category: categories[i % categories.length],
      title: `${categories[i % categories.length]} 챌린지 ${id}`,
      maxParticipant: 5 + (i % 10),
      createdAt,
      updatedAt,
      application: {
        adminStatus: statuses[i % statuses.length]
      }
    };
  })
];
