const config = {
  theme: {
    screens: {
      // 🌐 커스텀 브레이크포인트
      sm: "375px", // 모바일
      md: "744px", // 태블릿 (iPad Mini)
      lg: "890px", // 챌린지 기타 페이지
      xl: "996px", // 챌린지 조회 페이지
      "2xl": "1200px" // 데스크탑
    }
  },
  plugins: ["@tailwindcss/postcss"]
};

export default config;
