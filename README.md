# 📚Docthru (독스루) - 개발 문서 번역 챌린지 플랫폼

## 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#주요-기능-추후-gif-로-대체-예정)
3. [시스템 아키텍처](#-시스템-아키텍처)
4. [기술 스택](#️-기술-스택)
5. [팀 소개 및 문서](#-팀-소개)
6. [배포 주소](#배포-주소)
7. [개인별 주요 작업 내역](#개인별-주요-작업-내역)
8. [프로젝트 구조](#-프로젝트-구조)
9. [성능 최적화 전략](#-성능-최적화-전략)
10. [트러블 슈팅](#-트러블-슈팅)

## 📝 프로젝트 소개

Docthru는 개발 관련 영어 문서를 함께 번역하는 챌린지 플랫폼입니다. 영어로 작성된 개발 문서를 한국어로 번역하고, 피드백을 주고받으며 함께 성장하는 공간을 제공합니다.

## 배포 주소

🚀 [DocThru](https://6-docthru-3team-fe-dev.vercel.app/)

### 주요 기능 (추후 gif 로 대체 예정)

- 번역 챌린지 참여 및 관리
- 사용자 등급 시스템 (일반/전문가)
- 번역 작업 에디터
- 피드백 시스템
- 알림 시스템
- 관리자 시스템 (챌린지 승인/거절, 콘텐츠 관리)

## 📚 시스템 아키텍처

<div align="center">
  <img src="./public/images/architecture.png" alt="시스템 아키텍처" width="100%" />
</div>

## ⚙️ 기술 스택

### ✅ Language

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### ✅ Framework & Libraries

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

### ✅ Hosting & Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

### ✅ Version Control

![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

## 👥 팀 소개 및 문서

### 팀원 소개

| 이름   | 역할            | GitHub                                        | 개인 개발 보고서                                                 |
| ------ | --------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| 조성빈 | 🍉 팀장         | [@JJOBO](https://github.com/JJOBO/)           | [보고서](https://www.notion.so/1ec2facab63c81eca07af4d8f2bd39c0) |
| 심유빈 | 🍒 팀원         | [@shimyubin](https://github.com/shimyubin/)   | [보고서](https://www.notion.so/1f32facab63c8063af31e35ceaf5e7a8) |
| 오하영 | 🍑 팀원         | [@fiivxyxxng](https://github.com/fiivxyxxng/) | [보고서](https://www.notion.so/1f32facab63c8096b969da4f5399bd3a) |
| 김홍섭 | 🍇 백엔드마스터 | [@rakaso598](https://github.com/rakaso598/)   | [보고서](https://www.notion.so/1f32facab63c80088ad2eba91feb3155) |
| 황수정 | 🍎 팀원         | [@suejeong](https://github.com/suejeong/)     | [보고서](https://www.notion.so/1f32facab63c80b08333f61e56fa361e) |
| 김수경 | 🍊 팀원         | [@suKyoung25](https://github.com/suKyoung25/) | [보고서](https://www.notion.so/1f32facab63c806bb835c90523b6869b) |
| 박민규 | 🍈 프론트마스터 | [@gksktl111](https://github.com/gksktl111/)   | [보고서](https://www.notion.so/1f32facab63c80b4b1c0f468d3656e78) |

### 팀 문서

📝 [팀 노션](https://www.notion.so/1ec2facab63c808d9b80ca0759018768?v=1ec2facab63c8156b3aa000c4b136520)

## 개인별 주요 작업 내역

<details>
<summary>👑 조성빈 (팀장)</summary>

- **챌린지 카드 컴포넌트**

  - 챌린지 정보를 카드 형태로 시각적 구현
  - 카테고리/상태를 위한 chip 컴포넌트 개발
  - 참여 인원, 마감일, 드롭다운 UI 구현
  - 모바일/태블릿/PC 대응 반응형 디자인 적용

- **유저 관련 API 구조 설계**

  - 사용자 정보 조회 API 구현 (`/users/me`)
  - 나의 챌린지 목록 API 구현 (필터링, 페이지네이션)
  - 챌린지 신청 목록 API 구현
  - 서버 액션을 통한 인증 토큰 처리

- **챌린지 상세 페이지**
  - 챌린지 상세 데이터 조회 및 연동
  - 참가/마감 상태에 따른 UI 분기 처리
  - 작업물 작성 플로우 구현
  - 최다 추천 작업물 슬라이드 UI 개발
  - 랭킹 리스트 페이지네이션 구현 (5개 단위)
  - 1등 작업물 강조 표시 및 아이콘 적용
  - 상태별 조건부 UI 렌더링 (빈 상태, 마감 상태)

</details>

---

<details>
<summary>🧠 심유빈</summary>

- **작업물 상세 페이지**

  - 작업물 수정 및 삭제 버튼 구현
  - 피드백 등록과 수정 및 삭제
  - `useInfiniteQuery`를 사용한 무한 스크롤 피드백 목록 구현
  - `useMutation`을 활용한 피드백 CRUD 및 캐시 자동 갱신

- **알림 모달**
  - 알림 내용 및 알림 일자 출력 구현
  - 읽지 않은 알림 불러오기 기능 구현
  - 알림을 클릭하여 읽음 처리 기능 구현

</details>

---

<details>
<summary>🛠 오하영</summary>

- **어드민 챌린지 신청 페이지**

  - 챌린지 신청 목록 페이지: UI, 조회, 검색, 정렬 기능
  - 챌린지 신청 상세 페이지: UI, 신청 승인, 페이지 이동 기능

- **회원가입 페이지 및 소셜 로그인**

  - UI, 회원가입 API 연동, 회원가입 유효성 검사
  - 구글 로그인 BE, FE

- **나의 챌린지 페이지**

- 참여중/완료한 챌린지: 목록 조회 API 구현 및 연동, 무한스크롤, 키워드 검색 기능
- 신청한 챌린지: UI, 목록/상세 조회 API 구현 및 연동

</details>

---

<details>
<summary>🧩 김홍섭</summary>

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

</details>

---

<details>
<summary>🧾 황수정</summary>

- **나의 챌린지 페이지 제작 및 컴포넌트**

  - 내가 소속되어있는 챌린지를 조회하고 생성한 챌린지에 대한 심사과정을 확인할 수 있는 영역
    - `MyChallenges`: 챌린지를 검색하고 리스트를 조회할 수 있는 화면 관련 컴포넌트
    - `MyApplicationsPage`: 신청 목록을 조회하고 챌린지 신청 상태를 조회할 수 있는 페이지
    - `AppliedChallenges`: 지원한 챌린지 리스트 컴포넌트

- **챌린지 상세 조회, 챌린지 수정 API**

</details>

---

<details>
<summary>📚 김수경</summary>

- **챌린지 목록 조회**

  - 필터를 통해 챌린지의 분야, 문서타입, 진행 상태 별로 데이터를 조회
  - 검색어를 통해 데이터를 조회 (초성, 띄어쓰기 적용 가능)

- **챌린지 생성**
  - 챌린지 데이터 정보를 입력하여 챌린지를 생성할 수 있음
  - UX를 고려한 각 input에 에러 메세지 적용

</details>

---

<details>
<summary>🖊 박민규</summary>

- **작업물 form 페이지**

  - TipTap 기반 문서 에디터 기능: bold, italic, underline, 정렬, 리스트, 텍스트 컬러 등
  - 작업물 CRUD 기능
  - 로컬스토리지 임시 저장 및 단축키(`Ctrl + S`, `Cmd + S`) 기능
  - iframe을 통한 원문 확인 사이드 모달 구현
  - UX 향상을 위한 에러처리 모달 및 애니메이션 적용

- **리프레시 토큰을 이용한 액세스 토큰 재발급 및 자동 로그인**
  - refreshToken이 있으면 자동 로그인 처리
  - 서버: refreshToken 기반 JWT 슬라이딩 세션
  - 프론트: 14분 타이머로 액세스 토큰 재발급

</details>

## 📁 프로젝트 구조

```
src/
├── app/              # Next.js 페이지 및 라우팅
├── assets/           # 이미지, 폰트 등 정적 자산
├── components/       # 재사용 가능한 공용 컴포넌트
├── constant/         # 상수 및 설정 값
├── hooks/           # 커스텀 훅
├── layout/          # 레이아웃 컴포넌트
├── lib/             # 유틸리티 함수 및 api
├── providers/       # 인증 및 React Query Provider
└── middleware.js    # Next.js 미들웨어 (인증/인가 처리)
```

### 📁 디렉토리 설명

<details>
<summary>디렉토리 구조 상세 보기</summary>

- **app/**: Next.js의 App Router를 사용한 페이지 및 라우팅 구성
- **assets/**: 프로젝트에서 사용되는 이미지, 폰트 등의 정적 파일
- **components/**: 재사용 가능한 UI 컴포넌트
- **constant/**: 프로젝트 전역에서 사용되는 상수 값 정의
- **hooks/**: 커스텀 React 훅
- **layout/**: 페이지 레이아웃 컴포넌트 (헤더, 푸터, 사이드바 등)
- **lib/**: 유틸리티 함수, API 클라이언트, 헬퍼 함수 등
- **providers/**: AuthProvider(인증 상태 관리)와 QueryProvider(React Query 설정) 구현
- **middleware.js**: 인증/인가 처리 및 요청/응답 미들웨어

</details>

## 🌟 주요 기능 상세

<details>
<summary>1. 인증 시스템</summary>

- 회원가입/로그인
- Google OAuth 인증
- 사용자 등급 시스템 (일반/전문가)

</details>

---

<details>
<summary>2. 번역 챌린지</summary>

- 챌린지 목록 조회 및 필터링
- 번역 작업 에디터
- 작업물 임시 저장 (LocalStorage)
- 피드백 시스템
- 추천(하트) 시스템

</details>

---

<details>
<summary>3. 알림 시스템</summary>

- 챌린지 상태 변경 알림
- 새로운 작업물 알림
- 피드백 알림
- 마감 알림

</details>

---

<details>
<summary>4. 등급 시스템</summary>

- **일반 등급**: 기본 등급으로 부여
- **전문가 등급**: 다음 조건 중 하나 충족 시 자동 승급
  - 챌린지 참여 5회 이상 + 추천 선정 5회 이상
  - 챌린지 참여 10회 이상
  - 추천 선정 10회 이상
- 등급별 차등 기능 제공

</details>

---

<details>
<summary>5. 관리자 기능</summary>

- 챌린지 관리 (승인/거절/수정/삭제)
- 작업물 관리
- 피드백 관리

</details>

## 🚀 성능 최적화 전략

<details>
<summary>1. 초기 로딩 최적화</summary>

- **코드 스플리팅**

  - 동적 임포트를 통한 컴포넌트 분할
  - 페이지 단위 코드 분할
  - 라이브러리 선택적 로딩

- **리소스 최적화**
  - `next/image`를 통한 이미지 자동 최적화
  - 폰트 최적화 (`next/font`)
  - 정적 자산 캐싱

</details>

---

<details>
<summary>2. 렌더링 성능</summary>

- **서버 사이드 최적화**

  - 정적 페이지 생성 (SSG)
  - 서버 컴포넌트 적극 활용

- **클라이언트 사이드 최적화**
  - `React.memo`를 통한 불필요한 리렌더링 방지
  - 이벤트 핸들러 최적화

</details>

---

<details>
<summary>3. 데이터 관리</summary>

- **캐싱 전략**

  - React Query 캐시 활용
  - 브라우저 캐시 정책

- **데이터 프리페칭**
  - 라우트 프리페칭
  - 데이터 프리로딩

</details>

---

<details>
<summary>4. 사용자 경험</summary>

- **로딩 상태 처리**

  - 스켈레톤 UI
  - 로딩 스피너

- **인터랙션 최적화**
  - 디바운싱 / 쓰로틀링
  - 지연 로딩
  - 무한 스크롤

</details>

---

<details>
<summary>5. 모니터링 및 분석</summary>

- **성능 메트릭스**

  - Core Web Vitals
  - Lighthouse 점수
  - 사용자 정의 메트릭

- **에러 추적**
  - 에러 바운더리
  - 에러 로깅
  - 성능 모니터링

</details>

## 🔧 트러블 슈팅

<details>
<summary>1. 문제 상황 제목</summary>

- **문제 상황**

  - 구체적인 문제 상황 설명

- **문제 원인**

  - 문제가 발생한 원인 분석

- **해결 방법**
  - 문제 해결을 위해 시도한 방법들
  - 최종적으로 선택한 해결 방안과 그 이유
  - 적용 후 개선된 결과
  </details>

<details>
<summary>2. 문제 상황 제목</summary>

- **문제 상황**

  - 구체적인 문제 상황 설명

- **문제 원인**

  - 문제가 발생한 원인 분석

- **해결 방법**
  - 문제 해결을 위해 시도한 방법들
  - 최종적으로 선택한 해결 방안과 그 이유
  - 적용 후 개선된 결과
  </details>

<details>
<summary>3. 문제 상황 제목</summary>

- **문제 상황**

  - 구체적인 문제 상황 설명

- **문제 원인**

  - 문제가 발생한 원인 분석

- **해결 방법**
  - 문제 해결을 위해 시도한 방법들
  - 최종적으로 선택한 해결 방안과 그 이유
  - 적용 후 개선된 결과
  </details>
