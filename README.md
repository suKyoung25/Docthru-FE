# 📚Docthru (독스루) - 개발 문서 번역 챌린지 플랫폼

## 📝 프로젝트 소개

Docthru는 개발 관련 영어 문서를 함께 번역하는 챌린지 플랫폼입니다. 영어로 작성된 개발 문서를 한국어로 번역하고, 피드백을 주고받으며 함께 성장하는 공간을 제공합니다.

### 주요 기능

- 번역 챌린지 참여 및 관리
- 사용자 등급 시스템 (일반/전문가)
- 번역 작업 에디터
- 피드백 시스템
- 알림 시스템
- 관리자 시스템 (챌린지 승인/거절, 콘텐츠 관리)

## 👥 팀 소개

| 이름   | 역할    | GitHub                                   | 개인 개발 보고서                                                 | 회고록       |
| ------ | ------- | ---------------------------------------- | ---------------------------------------------------------------- | ------------ |
| 조성빈 | 🍉 팀장 | [github](https://github.com/JJOBO/)      | [보고서](https://www.notion.so/1ec2facab63c81eca07af4d8f2bd39c0) | [회고](링크) |
| 심유빈 | 🍒 팀원 | [github](https://github.com/shimyubin/)  | [보고서](https://www.notion.so/1f32facab63c8063af31e35ceaf5e7a8) | [회고](링크) |
| 오하영 | 🍑 팀원 | [github](https://github.com/fiivxyxxng/) | [보고서](https://www.notion.so/1f32facab63c8096b969da4f5399bd3a) | [회고](링크) |
| 김홍섭 | 🍇 팀원 | [github](https://github.com/rakaso598/)  | [보고서](https://www.notion.so/1f32facab63c80088ad2eba91feb3155) | [회고](링크) |
| 황수정 | 🍎 팀원 | [github](https://github.com/suejeong/)   | [보고서](https://www.notion.so/1f32facab63c80b08333f61e56fa361e) | [회고](링크) |
| 김수경 | 🍊 팀원 | [github](https://github.com/suKyoung25/) | [보고서](https://www.notion.so/1f32facab63c806bb835c90523b6869b) | [회고](링크) |
| 박민규 | 🍈 팀원 | [github](https://github.com/gksktl111/)  | [보고서](https://www.notion.so/1f32facab63c80b4b1c0f468d3656e78) | [회고](링크) |

## 작업 내역

#### 조성빈 (팀장)

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 심유빈

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 오하영

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 김홍섭

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 황수정

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 김수경

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

#### 박민규

- **담당 기능**
  - 기능 1
    - 세부 구현 내용
    - 세부 구현 내용
  - 기능 2
    - 세부 구현 내용
    - 세부 구현 내용

### 🔒 팀 규칙

- 매일 오전 9시 5분 스크럼 진행
- 코드 리뷰 필수
- 컨벤션 준수
- 이슈 기반 작업 관리

## ⚙ 기술 스택

### 핵심 스택

- **Framework**: Next.js 15.3.2
- **Language**: JavaScript
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS 4

### 주요 라이브러리

- **상태 관리**:
  - @tanstack/react-query v5.76.1
  - @tanstack/react-query-devtools v5.76.1
- **에디터**:
  - @tiptap/react v2.12.0
  - @tiptap/starter-kit v2.12.0
  - 다양한 Tiptap 확장기능 (bullet-list, color, text-align 등)
- **UI/UX 컴포넌트**:
  - react-icons v5.5.0 (아이콘)
  - react-datepicker v8.4.0 (날짜 선택)
  - react-textarea-autosize v8.5.9 (자동 크기 조절 텍스트 영역)
  - react-intersection-observer v9.16.0 (무한 스크롤)
  - react-spinners v0.17.0 (로딩 스피너)
  - react-hot-toast v2.5.2 (토스트 알림)
- **폼 관리**: react-hook-form v7.57.0
- **HTTP 클라이언트**: Next.js fetch API
- **유틸리티**:
  - dayjs v1.11.13 (날짜 처리)
  - dompurify v3.2.6 (XSS 방지)
  - hangul-js v0.2.6 (한글 처리)
  - jose v6.0.11 (JWT 처리)

### 개발 도구

- ESLint v9
- Prettier v3.5.3 (with prettier-plugin-tailwindcss)
- TailwindCSS v4 (with @tailwindcss/typography)
- PostCSS

## 📁 프로젝트 구조

```
src/
├── app/              # Next.js 페이지 및 라우팅
├── assets/           # 이미지, 폰트 등 정적 자산
├── components/       # 재사용 가능한 컴포넌트
├── constant/         # 상수 및 설정 값
├── hooks/           # 커스텀 훅
├── layout/          # 레이아웃 컴포넌트
├── lib/             # 유틸리티 함수 및 설정
├── providers/       # 인증 및 React Query Provider
└── middleware.js    # Next.js 미들웨어 (인증/인가 처리)
```

### 디렉토리 설명

- **app/**: Next.js의 App Router를 사용한 페이지 및 라우팅 구성
- **assets/**: 프로젝트에서 사용되는 이미지, 폰트 등의 정적 파일
- **components/**: 재사용 가능한 UI 컴포넌트
- **constant/**: 프로젝트 전역에서 사용되는 상수 값 정의
- **hooks/**: 커스텀 React 훅
- **layout/**: 페이지 레이아웃 컴포넌트 (헤더, 푸터, 사이드바 등)
- **lib/**: 유틸리티 함수, API 클라이언트, 헬퍼 함수 등
- **providers/**: AuthProvider(인증 상태 관리)와 QueryProvider(React Query 설정) 구현
- **middleware.js**: 인증/인가 처리 및 요청/응답 미들웨어

## 🌟 주요 기능 상세

### 1. 인증 시스템

- 회원가입/로그인
- Google OAuth 인증
- 사용자 등급 시스템 (일반/전문가)

### 2. 번역 챌린지

- 챌린지 목록 조회 및 필터링
- 번역 작업 에디터
- 작업물 임시 저장 (LocalStorage)
- 피드백 시스템
- 추천(하트) 시스템

### 3. 알림 시스템

- 챌린지 상태 변경 알림
- 새로운 작업물 알림
- 피드백 알림
- 마감 알림

### 4. 등급 시스템

- **일반 등급**: 기본 등급으로 부여
- **전문가 등급**: 다음 조건 중 하나 충족 시 자동 승급
  - 챌린지 참여 5회 이상 + 추천 선정 5회 이상
  - 챌린지 참여 10회 이상
  - 추천 선정 10회 이상
- 등급별 차등 기능 제공

### 5. 관리자 기능

- 챌린지 관리 (승인/거절/수정/삭제)
- 작업물 관리
- 피드백 관리

## 🚀 성능 최적화 전략

### 1. 초기 로딩 최적화

- **코드 스플리팅**
  - 동적 임포트를 통한 컴포넌트 분할
  - 페이지 단위 코드 분할
  - 라이브러리 선택적 로딩
- **리소스 최적화**
  - Next/Image를 통한 이미지 자동 최적화
  - 폰트 최적화 (next/font)
  - 정적 자산 캐싱

### 2. 렌더링 성능

- **서버 사이드 최적화**
  - 정적 페이지 생성 (SSG)
  - 서버 컴포넌트 적극 활용
- **클라이언트 사이드 최적화**
  - React.memo를 통한 불필요한 리렌더링 방지
  - 이벤트 핸들러 최적화

### 3. 데이터 관리

- **캐싱 전략**
  - React Query 캐시 활용
  - 브라우저 캐시 정책
- **데이터 프리페칭**
  - 라우트 프리페칭
  - 데이터 프리로딩

### 4. 사용자 경험

- **로딩 상태 처리**
  - 스켈레톤 UI
  - 로딩 스피너
- **인터랙션 최적화**
  - 디바운싱/쓰로틀링
  - 지연 로딩
  - 무한 스크롤

### 5. 모니터링 및 분석

- **성능 메트릭스**
  - Core Web Vitals
  - Lighthouse 점수
  - 사용자 정의 메트릭
- **에러 추적**
  - 에러 바운더리
  - 에러 로깅
  - 성능 모니터링

## 📚 아키텍처

### Frontend Architecture

프로젝트는 Next.js 기반의 계층형 아키텍처를 적용하여 관심사를 분리하고 유지보수성을 높였습니다.

```
┌─────────────────┐
│    Pages (app)  │ # Next.js App Router 기반 페이지
├─────────────────┤
│   Components    │ # 재사용 가능한 UI 컴포넌트
├─────────────────┤
│     Hooks       │ # 비즈니스 로직 및 상태 관리
├─────────────────┤
│  API & Utils    │ # API 통신 및 유틸리티
└─────────────────┘
```

### 계층별 역할

#### 1. Pages Layer (app/)

- Next.js App Router를 사용한 페이지 구성
- 레이아웃 및 라우팅 처리
- 서버 컴포넌트/클라이언트 컴포넌트 구분
- 페이지별 메타데이터 관리

#### 2. Components Layer (components/)

- 재사용 가능한 UI 컴포넌트
- Atomic Design 패턴 적용
- 프레젠테이션 로직 처리
- 컴포넌트별 스타일링 (TailwindCSS)

#### 3. Hooks Layer (hooks/)

- 커스텀 훅을 통한 비즈니스 로직 분리
- 상태 관리 로직
- API 통신 로직 캡슐화
- 공통 기능 추상화

#### 4. API & Utils Layer (lib/, providers/)

- API 클라이언트 및 통신 로직
- 유틸리티 함수
- 전역 상태 관리 (Context Providers)
- 공통 설정 및 상수 관리

#### 3. 미들웨어 (middleware.js)

- 인증/인가 처리
- 라우팅 보호
- 요청/응답 가로채기

## 성능 최적화 전략

- **코드 분할**
  - 동적 임포트
  - 컴포넌트 지연 로딩
- **렌더링 최적화**
  - 서버 컴포넌트 활용
  - 클라이언트 컴포넌트 최소화
- **캐싱 전략**
  - React Query 캐싱
  - Next.js 정적 생성

### 상태 관리 구조

#### 1. Providers

- **AuthProvider**: 사용자 인증 상태 관리
  - 로그인/로그아웃 상태
  - 사용자 정보
  - 권한 관리
- **QueryProvider**: React Query 설정 및 관리
  - 전역 React Query 설정
  - 캐시 전략 설정
  - 에러 핸들링
