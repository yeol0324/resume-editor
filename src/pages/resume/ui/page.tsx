import { useRef, useState } from 'react';
import { Achievement, calculateDuration, Chip } from '@/shared';
import { FileText, Github, Link, Mail, Phone } from 'lucide-react';
import { PdfSaveButton, PageGuide, PrintBreak } from '@/features/pdf-export';

/* ── 섹션 제목 공통 컴포넌트 ── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
    <span className="h-5 w-1 rounded-full bg-slate-700 print:bg-slate-700" />
    {children}
  </h2>
);

/* ── 경력 타임라인 도트 ── */
const TimelineDot = () => (
  <div className="absolute top-2 left-0 h-3 w-3 rounded-full border-2 border-slate-500 bg-white print:border-slate-500" />
);

/* ── 프로젝트 카드 컨테이너 ── */
const ProjectCard = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50/60 p-4 print:border-0 print:bg-transparent print:p-0">
    {children}
  </div>
);

export const ResumePage = () => {
  const articleRef = useRef<HTMLElement>(null);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <article
        ref={articleRef}
        className="relative mx-auto max-w-[794px] bg-white p-16 font-sans break-keep text-gray-900 print:w-[210mm] print:max-w-none print:p-[20mm] print:[&>*:last-child]:mb-0"
      >
        {/* === 페이지 가이드 라인 === */}
        <PageGuide show={showGuide} />

        {/* === 헤더: 이름, 직군, 연락처 === */}
        <section className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-4xl font-bold">이유림</h1>
            <p className="mb-4 text-base font-semibold tracking-wide text-slate-600">
              프론트엔드 개발자
            </p>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li className="flex items-center gap-1">
                <Mail size={16} />
                <span>yeol0324@gmail.com</span>
              </li>
              <li className="flex items-center gap-1">
                <Phone size={16} />
                <span>010-7189-6838</span>
              </li>
              <li className="flex items-center gap-1">
                <Github size={16} />
                <a
                  href="https://github.com/yeol0324"
                  className="text-slate-600 hover:underline"
                >
                  github.com/yeol0324
                </a>
              </li>
              <li className="flex items-center gap-1">
                <FileText size={16} />
                <a href="#" className="text-slate-600 hover:underline">
                  https://yeol0324.github.io/
                </a>
              </li>
            </ul>
          </div>
          {/* 프로필 이미지 자리 */}
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-200">
            <img
              src="/profile.jpeg"
              alt="프로필 사진"
              className="h-full w-full object-cover object-[0px_-8px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </section>

        {/* === 소개 === */}
        <section className="mb-8">
          {/* <blockquote className="text-sm font-medium text-gray-700 border-l-0 mb-3">
            "유림이 불러와!"
          </blockquote> */}
          <p className="border-l-2 border-slate-400 pl-4 text-sm leading-relaxed text-gray-700 italic">
            불편함을 그냥 지나치지 않는 개발자 이유림입니다.
            <br />
            사용자가 멈추는 곳, 어색한 흐름, 팀의 반복 작업을 보면 "왜?"를 먼저
            떠올립니다. 이탈률이 높은 곳에서 실제 사용자의 흐름을 따라가며
            문제를 정의했고, 팀 내 반복되는 작업은 자동화하며 개발 경험을
            개선했습니다.
            <br />
            저는 완벽한 기능만큼 자연스러운 경험을 만드는 데 집중합니다. 변화
            속에서도 빠르게 배우고 바로 실행하며, 팀과 함께 성장하는 프론트엔드
            개발자입니다.
          </p>
          {/* <blockquote className="text-sm font-medium text-gray-700 border-l-0 mb-3">
            "유림이 불러와!"
          </blockquote>
          <p className="text-sm text-gray-700 leading-relaxed">
            불편함을 찾아내는 개발자 이유림입니다. 사용자의 입장에서 불편한
            문제를 찾아내어 기술적으로 해결하는 것을 좋아합니다. 문제와
            아이디어를 적극적으로 공유하며, 사용자에게 자연스러운 경험을 만드는
            데 집중합니다. 팀의 불편한 지점을 찾아내어 개선하는 것을 좋아합니다.
            빠르게 배우고 팀과 소통하며 바로 실행하는 프론트엔드 개발자입니다.
            변화가 많은 환경에서도 유연하게 적응하며 성장해 왔습니다.
          </p> */}
        </section>

        <hr className="mb-8 border-gray-200" />

        {/* === 경력 === */}
        <section className="mb-8">
          <SectionTitle>경력</SectionTitle>

          {/* 크레디트라인 */}
          <div className="relative mb-6 pl-5 before:absolute before:top-5 before:left-[5px] before:h-[calc(100%-20px)] before:w-px before:bg-gray-200">
            <TimelineDot />
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  크레디트라인(주)
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  프론트엔드 개발 · 프리랜서
                </p>
              </div>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (
                {calculateDuration({
                  startDate: new Date('2024-11'),
                  endDate: new Date('2025-06'),
                })}
                )
              </span>
            </div>
            <div className="mb-2 flex flex-wrap gap-1">
              <Chip>React</Chip>
              <Chip>Next.js</Chip>
              <Chip>MobX</Chip>
              <Chip>MUI</Chip>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                전사 직원이 사용하는 관리 통합 플랫폼 개발
              </p>
              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>JSP 기반 레거시 시스템 React로 마이그레이션</li>
                <li>기획 초기 단계부터 참여하여 이해관계자 요구사항 도출</li>
                <li>AS-IS/TO-BE 분석을 기반으로 시스템 설계 및 구현</li>
                <li>동적 폼 시스템과 공통 DataTable 컴포넌트 설계</li>
                <li>
                  엣지 케이스를 고려한 상태 분리 설계로 사용자 작업 흐름의
                  안정성 개선
                </li>
              </ul>
            </div>
          </div>

          {/* 미니게이트 */}
          <div className="relative mb-6 pl-5 before:absolute before:top-5 before:left-[5px] before:h-[calc(100%-20px)] before:w-px before:bg-gray-200">
            <TimelineDot />
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  미니게이트(주)
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  프론트엔드 개발
                </p>
              </div>
              <span className="text-xs text-gray-400">
                2022. 05. ~ 2024. 10. (
                {calculateDuration({
                  startDate: new Date('2022-05'),
                  endDate: new Date('2024-10'),
                })}
                )
              </span>
            </div>
            <div className="mb-2 flex flex-wrap gap-1">
              <Chip>React</Chip>
              <Chip>Next.js</Chip>
              <Chip>Zustand</Chip>
              <Chip>MobX</Chip>
              <Chip>TailwindCss</Chip>
              <Chip>MUI</Chip>
              <Chip>Vue3</Chip>
              <Chip>Pinia</Chip>
              <Chip>SCSS</Chip>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                에듀테크 기반 학습·학습관리 플랫폼 개발
                {/* 및 학습 콘텐츠 에디터 개발 */}
              </p>
              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>
                  Zustand selector 분리 및 Web Vitals 기반 구조 개선으로 학습
                  콘텐츠 플레이어 성능 최적화
                </li>
                <li>사용자 로그 분석을 통한 학습 흐름 개선</li>
                <li>
                  HLS 스트리밍 재생 커스텀 플레이어 및 캔버스형 꾸미기 기능 등
                  학습 핵심 기능 구현
                </li>
                <li>기술 스택, 성능 최적화 결정 주도</li>
                <li>Git 브랜치 전략 도입 및 배포 자동화 구축</li>
              </ul>
            </div>
          </div>

          {/* 펍플 */}
          <div className="relative mb-6 pl-5 before:absolute before:top-5 before:left-[5px] before:h-[calc(100%-20px)] before:w-px before:bg-gray-200">
            <TimelineDot />
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">펍플(주)</h3>
                <p className="text-xs font-medium text-slate-500">
                  프론트엔드 개발
                </p>
              </div>
              <span className="text-xs text-gray-400">
                2020. 12. ~ 2022. 05. (
                {calculateDuration({
                  startDate: new Date('2020-12'),
                  endDate: new Date('2022-05'),
                })}
                )
              </span>
            </div>

            <div className="mb-2 flex flex-wrap gap-1">
              <Chip>Vue2</Chip>
              <Chip>VueX</Chip>
              <Chip>SCSS</Chip>
            </div>
            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                대학 교재 커머스 플랫폼 개발
              </p>

              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>교재 검색·구매 웹 서비스 구현</li>
                <PrintBreak show={showGuide} marginBottom={40} />

                <li>Vuex를 활용한 장바구니 및 주문 상태 관리</li>
                <li>웹 접근성과 반응형 대응을 고려한 UI 구축</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="mb-8 border-gray-200" />

        {/* === 프로젝트 === */}
        <section className="mb-8">
          <SectionTitle>프로젝트</SectionTitle>

          {/* === 크레디트라인 === */}
          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-slate-400">
              크레디트라인
            </p>
            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  정보보안 포탈
                </h3>
                <span className="text-xs text-gray-400">
                  2024. 11. ~ 2025. 06. (
                  {calculateDuration({
                    startDate: new Date('2024-11'),
                    endDate: new Date('2025-06'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>MobX</Chip>
                <Chip>Axios</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  기획 초기 단계부터 참여하여 요구사항 도출 및 AS-IS/TO-BE
                  분석을 수행하고, 설계부터 구현까지 전 과정에 참여했습니다. JSP
                  기반 레거시 시스템을 React로 마이그레이션하였으며, 전사 보안
                  포털 내 대용량 로그 관리 테이블, 보안·교육·회의 관리, 임직원
                  소명 등록 및 관리 등 프론트엔드 개발을 담당했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  {/* <li>
                    MobX 기반 권한 상태를 전역 스토어로 관리하고 observer를 통해
                    권한 변경 시 UI에 즉시 반영되도록 구성했습니다. 권한 의존
                    컴포넌트의 조건 분기 로직을 공통화해 화면 간 권한 처리
                    일관성을 개선했습니다.
                  </li> */}

                  <li>
                    스키마 기반으로 렌더링하는{' '}
                    <Achievement>동적 폼 컴포넌트를 설계</Achievement>
                    했습니다. React Hook Form과 Yup을 활용해 조건부 필드와
                    권한별 입력 제어, debounce 검증을 공통화하고, 조건 변경 시
                    숨겨진 필드가 검증 대상에 포함되지 않도록 처리해 불필요한
                    validation 트리거와 입력 초기화를 방지했습니다.
                  </li>

                  <li>
                    TanStack Table 기반 공통 DataTable을 구축하고 커스텀 훅과 셀
                    컴포넌트로 기능을 모듈화했습니다. 가상화를 적용해 10만 건
                    규모의 대용량 데이터에서도 안정적인 스크롤 성능을 제공하고,
                    Loading·Empty·Error 상태에 맞는 Skeleton 및 fallback UI를
                    적용해 <Achievement>상태에 따른 사용성을 개선</Achievement>
                    했습니다.
                  </li>

                  <li>
                    엑셀 중심 수작업 관리 프로세스를 분석해 대/중/소분류 기반 웹
                    관리 화면으로 설계했습니다. 담당자 변경 시 수동 연락처 입력,
                    메일 발송 업무를 자동화하여 업무 담당자의 업무 처리 시간을
                    약 1시간에서 10분 수준으로 단축했습니다.
                  </li>

                  <li>
                    OpenAPI Swagger 명세 기반 타입 자동 생성 파이프라인을 구축해
                    API 응답 타입을 정적 타입으로 관리했습니다.
                    프론트엔드–백엔드 간 스펙 불일치로 인한 런타임 오류를
                    예방하고 타입 안정성을 강화했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>
          </div>

          {/* === 미니게이트 === */}
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-slate-400">
              미니게이트
            </p>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  위티버스 교육 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2024. 03. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2024-03'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>Zustand</Chip>
                <Chip>Axios</Chip>
                <Chip>TailwindCSS</Chip>
                <Chip>Lottie</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  기획 초기 단계부터 참여하여 요구사항 도출 및 기술 스택 선정에
                  기여했으며, 코드 리뷰·페어 프로그래밍·질문 응대 등 신입 팀원의
                  성장을 지원했습니다. 아동 태블릿 학습 시스템에서 Android
                  런처·Unity 기반 앱과 연동되는 WebView 학습 플레이어를
                  개발하고, 학습 실행·출석 반영·학습 결과 확인까지 학생의 학습
                  흐름과 LMS/LCMS 프론트엔드를 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    앱에서 여러 진입 경로로 웹 기능을 호출하는 구조를 고려해 URL
                    기반 직접 접근이 가능한 방식이 필요하다고 판단하고{' '}
                    <Achievement>
                      Next.js 도입을 제안 및 적용을 주도
                    </Achievement>
                    했습니다. 앱 최초 진입 화면이 정적 콘텐츠 위주로 구성된
                    특성에 맞게 SSG를 적용해 초기 로딩 부담을 줄이고 앱-웹 연동
                    효율을 높였습니다.
                  </li>
                  <li>
                    Tailwind 기반으로 공통 컴포넌트와 레이아웃 규칙을 정의하고,
                    화면별로 흩어져 있던 스타일을 컴포넌트 단위로 모아 반응형
                    대응과 디자인 변경을 쉽게 적용했습니다.{' '}
                    <Achievement>
                      Compound Components Design 패턴을 적용
                    </Achievement>
                    해 내부 상태와 구조의 응집도를 높여 props drilling을
                    제거하고 화면 확장 시 수정 범위를 최소화했습니다.
                  </li>
                  <li>
                    <Achievement>Core Web Vitals 지표</Achievement>를 기준으로
                    플레이어 초기 로딩과 렌더링 구조를 분석한 결과, 자주
                    변경되는 상태가 전체 컴포넌트 리렌더링을 유발하는 문제를
                    확인했습니다. 이를 개선하기 위해 Zustand Store를 학습
                    진행률과 사용자 응답 상태 단위로 분리하고 화면에서는 필요한
                    selector만 구독하도록 구조를 개선하여 불필요한 렌더링을
                    줄였습니다.
                  </li>
                  <li>
                    플레이리스트 자동 재생과 시청 추적·완료 판정 로직을 구현하고
                    HLS 스트리밍 재생 video.js 커스텀 동영상 플레이어를
                    개발했습니다. 네트워크 환경에 따른 quality 자동 전환,
                    buffering 대응을 포함한 재생 안정화 로직을 구현했습니다.
                    또한 비디오 이벤트와 WebView 브릿지 재생 명령을 합친 재생
                    제어 모듈을 구현해 중복 이벤트 호출과 상태 불일치를
                    방지했습니다.
                  </li>
                  <PrintBreak show={showGuide} marginBottom={40} />
                  <li>
                    MVP 기간 중 Web-Android/Unity 연동 시 정해진 규격이 없어
                    신규 기능이 추가될 때마다 다시 협의하는 과정이 반복되며 개발
                    일정이 지연됐습니다. 통신 규격을 공통 브릿지로 정리하고
                    메시지 구조를 통일했고, 이를 문서화하여{' '}
                    <Achievement>웹-앱 연동 작업을 간소화</Achievement>시켜 협업
                    시간을 단축했습니다.
                  </li>
                  <li>
                    브랜치 전략에 맞춰 Jenkins 배포 파이프라인을 구축해 환경별
                    배포를 자동화했습니다. 수동 배포 과정을 단순화하고 환경별
                    배포 일관성을 확보했습니다.
                  </li>
                </ul>
              </div>
              {/* </ProjectCard> */}

              {/* <ProjectCard> */}
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  위티버스 admin
                </h3>
                {/* <span className="text-xs text-gray-400">
                  2024. 03. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2024-03'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span> */}
              </div>

              <div className="mb-4">
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    AWS CDN 수동 업로드 프로세스를 presigned URL 기반 대용량
                    파일 벌크 업로드로 개선하고, 업로드 큐 및 진행률 상태를
                    관리하여 수동 콘텐츠 등록 시간을 제거하고 운영 오류를
                    개선했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  마이올린 학습앱
                </h3>
                <span className="text-xs text-gray-400">
                  2022. 09. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2022-09'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Vue3</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Pinia</Chip>
                <Chip>Axios</Chip>
                <Chip>Lottie</Chip>
                <Chip>Fabric.js</Chip>
              </div>

              <div id="link01" className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  설계 단계부터 참여하여 오픈 후 운영까지 전담하며, 사용자
                  데이터 기반의 개선 방향 도출과 팀 브랜치 전략 수립 등 개발
                  문화 개선을 주도했습니다. 아동 태블릿 학습 서비스로, Android
                  태블릿 WebView 기반 학습 플레이어 화면 및 학습 보상, 출석,
                  진도 확인 등 학생 학습 서비스를 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    3단계로 이루어져있는 학습 프로세스에서 첫번째 단계에서
                    계속해서 끊기는 로그를 분석해 아동의 터치 실패로 인한 학습
                    이탈이라고 판단했습니다. 터치 줄이기 위해 버튼 Hit Area를
                    확장하고 클릭 피드백을 추가해{' '}
                    <Achievement>학습 완료율을 50% 에서 70%로 개선</Achievement>
                    했습니다.
                  </li>

                  <li>
                    Pixi-Spine과 Lottie의 객체 생성 및 렌더링 성능을 측정해
                    Lottie 전환을 제안하여 웹 환경 애니메이션 성능을
                    개선했습니다. 기술 전환 후 메인 페이지의 초기 렌더링 성능이
                    개선되어 <Achievement>LCP를 약 60% 단축</Achievement>
                    했습니다.
                    <a
                      href="https://yeol0324.github.io/javascript/lottie/"
                      className="ml-1 inline-flex items-center text-slate-500 hover:text-slate-700"
                    >
                      <Link size={12} />
                    </a>
                  </li>

                  <li>
                    사용자 참여형 맵 꾸미기 기능에서 화면 체류 시간이 이상한
                    현상을 분석하던 중, 맵 입장 대비 정상 종료 이벤트가 적은
                    패턴을 확인하고 인터랙션 과정에서 비정상 종료가 발생한다고
                    판단했습니다. Canvas 인터랙션 이벤트와 전역 상태 업데이트가
                    반복 실행되며 렌더링 루프가 발생해 브라우저가 종료되는
                    문제가 있었고,{' '}
                    <Achievement>렌더링과 상태 관리 책임을 분리</Achievement>해
                    비정상 종료 문제를 제거했습니다.
                  </li>

                  <li>
                    팀과 상황에 맞는{' '}
                    <Achievement>
                      Git 브랜치 전략을 세우고 도입을 주도
                    </Achievement>
                    했습니다. 깃 플로우 예시와 팀의 문제점을 정리해 공유하고,
                    회의를 통해 팀만의 브랜치 전략을 만들었습니다. 2주간 시범
                    기간을 두며 브랜치 문화를 도입해 Merge Conflict 발생 빈도를
                    절반 수준으로 줄였습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  마이올린 학습 관리 모바일 앱
                </h3>
                <span className="text-xs text-gray-400">
                  2022. 12. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2022-12'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Vue3</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Pinia</Chip>
                <Chip>Axios</Chip>
                <Chip>Chart.js</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  부모·교사용 학습 관리 모바일 앱(Android·iOS)과 연동되는
                  WebView 기반 학습 현황 및 통계, 채팅 기능을 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    polling 기반 동기화 구조로 준 실시간 UI를 구현했습니다. 메인
                    화면에서는 변동 데이터만 선별 polling하여 Pinia 상태로 학습
                    현황을 즉시 반영했고, 채팅 기능에서는 메시지 목록·읽음
                    여부·동기화 시점을 분리해서 관리해 polling 환경에서 발생하던
                    상태 충돌과 읽음 상태가 불일치하는 문제를 개선했습니다.
                  </li>
                  <li>
                    Chart.js의 plugin과 커스텀 툴팁을 활용해 학습 결과 및 주요
                    구간을 표현하고, 누적 데이터에서도 차트 성능이 저하되지
                    않도록 데이터 양을 제어했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  NIA 크라우드 소싱 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2023. 03. ~ 2023. 12. (
                  {calculateDuration({
                    startDate: new Date('2023-03'),
                    endDate: new Date('2023-12'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next.js</Chip>
                <Chip>MobX</Chip>
                <Chip>Axios</Chip>
                <Chip>TailwindCSS</Chip>
                <Chip>Chart.js</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  설계 단계부터 참여하여 기획 리뷰 과정에서 기능 개선 아이디어
                  및 기술적 대안을 제시하고, 견 업체와 상호 코드 리뷰를 진행하며
                  개발 품질 관리에 기여했습니다. AI 학습데이터 수집을 위한
                  크라우드 워커 플랫폼의 프론트엔드 개발을 했습니다.
                  관리자용·작업자용 화면을 분리 설계하고, 작업 분배부터
                  검수·정산까지 전체 작업 흐름을 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    사용자의 누적된 드래그 인터랙션을 UI 반영과 서버 반영을
                    분리해 optimistic UI를 적용했습니다. 실패 시 안정적인 복구를
                    위한 동기화 흐름을 정리해 문장 분류/문단 태깅 작업의 상태가
                    중복되거나 제거되는 문제를 해결했습니다.
                  </li>
                  <PrintBreak show={showGuide} marginBottom={40} />
                  <li>
                    관리자 대시보드 Chart.js 차트에서 상태 변경마다 canvas가
                    재생성되는 문제를 분석하고 chart instance를 재사용하도록
                    구조를 개선했습니다. 대용량 데이터 렌더링 성능을 위해 조회
                    범위에 따라{' '}
                    <Achievement>
                      집계 단위를 조정하는 downsampling 전략
                    </Achievement>
                    을 적용했습니다.
                  </li>
                  <li>
                    약 1만 행·12개 시트 월별 정산 데이터 엑셀 생성 로직을 Web
                    Worker로 분리해 대용량 데이터 처리 시 끊김 없는 UI를
                    제공했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            {/* <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  전자저작물 콘텐츠 에디터
                </h3>
                <span className="text-xs text-gray-400">
                  2023. 11. ~ 2023. 12. (
                  {calculateDuration({
                    startDate: new Date('2023-11'),
                    endDate: new Date('2023-12'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Electron</Chip>
                <Chip>Quasar</Chip>
                <Chip>Vue</Chip>
                <Chip>TypeScript</Chip>
              </div>

              <div className="mb-4">
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  E-Book 콘텐츠 개발 프로젝트에서 제작 속도 문제 해결을 위한
                  콘텐츠 제작 에디터를 개발했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    기획서의 화면 규칙을 분석하여 HTML 자동 생성 JSON 포맷을
                    설계하고, JSON 기반 실시간 렌더링을 구현했습니다. 비개발자도
                    콘텐츠 개발을 할 수 있도록 에디터 UI를 적용해 콘텐츠 제작
                    시간을 80% 단축했습니다.
                  </li>
                  <li>
                    Electron 기반 뷰어와 웹 콘텐츠 간 양방향 통신 구조를
                    연동했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard> */}

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  리틀팍스 학습 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2022. 05. ~ 2022. 11. (
                  {calculateDuration({
                    startDate: new Date('2022-05'),
                    endDate: new Date('2022-11'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>JavaScript</Chip>
                <Chip>HTML</Chip>
                <Chip>CSS</Chip>
                <Chip>PHP</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  프로젝트 오픈 직전 투입되어 오류 수정 및 유지보수 작업을 통해
                  서비스 오픈에 기여했습니다. 수만 명의 학생이 사용하는 영어
                  학습 서비스 리틀팍스의 학습 플랫폼 및 LMS/LCMS 프론트엔드
                  개발을 했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    문항 단위로 공통 컴포넌트를 설계하고 사용자 응답 상태를
                    분리해, 시험 유형별 분기 없이 재사용 가능한 시험 화면을
                    구현했습니다.
                  </li>
                  <li>
                    moment, date.js, 내부 구현 등 분산된 날짜 라이브러리를 번들
                    사이즈가 작은 day.js로 통합하고 공통 유틸리티로 모아 PHP,
                    JavaScript 간 날짜 표현 기준을 통일하고 날짜 관련 버그를
                    개선했습니다.
                  </li>
                </ul>
              </div>
              {/* </ProjectCard>

            <ProjectCard> */}
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  리틀팍스 admin
                </h3>
                {/* <span className="text-xs text-gray-400">
                  2022. 05. ~ 2022. 11. (
                  {calculateDuration({
                    startDate: new Date('2022-05'),
                    endDate: new Date('2022-11'),
                  })}
                  )
                </span> */}
              </div>

              <div className="mb-4">
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    관리자용 LCMS에서 문제 등록·수정·구성 기능과 학습 진도 관리
                    화면을 구축했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>
          </div>

          {/* === 펍플 === */}
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-slate-400">펍플</p>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  이앨리스 대학 교재 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2020. 12. ~ 2022. 05. (
                  {calculateDuration({
                    startDate: new Date('2020-12'),
                    endDate: new Date('2022-05'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Vue2</Chip>
                <Chip>JavaScript</Chip>
                <Chip>Vuex</Chip>
                <Chip>Axios</Chip>
                <Chip>SCSS</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  서비스 오픈 후 운영에 투입되어 기능 고도화 및 리팩토링 작업을
                  담당했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    대학 교재 뷰어/구매 플랫폼의 반응형 웹 개발을 했습니다.
                  </li>
                  <li>
                    화면·타이밍·위치에 따라 상품 가격이 다르게 표시되는 문제를
                    분석한 결과, 가격·쿠폰·배송비 계산 로직이 컴포넌트와 Vuex에
                    분산되어 있음을 확인했습니다.{' '}
                    <Achievement>계산 로직을 공통 util 함수로 분리</Achievement>
                    하고 서버 검증 결과를 기준으로 금액을 반영해 데이터 정합성을
                    개선했습니다. 또한 수량 변경 이벤트에 디바운스를 적용해 중복
                    API 호출을 줄였습니다.
                  </li>
                  <li>
                    <Achievement>Atomic Design 패턴을 적용</Achievement>해 UI를
                    컴포넌트 단위로 분리하여 화면 간 중복 마크업을 줄여 재사용이
                    쉬운 구조로 구현했습니다.
                  </li>
                  <li>
                    메인 페이지에 노출되는 다수의 도서 이미지에 Lazy Loading을
                    적용해 초기 화면 로딩 속도를 개선했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  NIA 한국점자도서관 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2021. 07. ~ 2021. 12. (
                  {calculateDuration({
                    startDate: new Date('2021-07'),
                    endDate: new Date('2021-12'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Vue2</Chip>
                <Chip>JavaScript</Chip>
                <Chip>Vuex</Chip>
                <Chip>Axios</Chip>
                <Chip>SCSS</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  기획·설계 단계부터 참여하여 실제 사용자 피드백 수집 및 사용성
                  개선에 기여했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    시각장애인 온라인 독서지원 플랫폼의 접근성, 반응형 웹 개발을
                    했습니다.
                  </li>
                  <li>
                    실제 사용자 피드백을 수집하고 직접 스크린 리더로 사용자
                    흐름을 따라가며 누락된 HTML 접근성 속성 보강 및 시멘틱 HTML
                    구조로 개편하여 웹 접근성, 사용자 흐름을 개선했습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  캠퍼스북 전자책 플랫폼
                </h3>
                <span className="text-xs text-gray-400">
                  2021. 05. ~ 2022. 05. (
                  {calculateDuration({
                    startDate: new Date('2021-05'),
                    endDate: new Date('2022-05'),
                  })}
                  )
                </span>
              </div>

              {/* 기술 스택 */}
              <div className="mb-3 flex flex-wrap gap-1">
                <Chip>Vue2</Chip>
                <Chip>JavaScript</Chip>
                <Chip>Vuex</Chip>
                <Chip>Axios</Chip>
                <Chip>SCSS</Chip>
              </div>

              <div className="mb-4">
                {/* 역할 / 맥락 */}
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  기획 단계부터 참여하여 요구사항 파악 및 화면 설계 협의 과정에
                  기여했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>대학생 대상 서비스의 반응형 웹 개발을 했습니다.</li>
                  <li>
                    회원가입·로그인·정보 수정 등 사용자 인증 관련 화면을
                    구현하고, 기본적인 입력 검증과 사용자 흐름을 구성했습니다.
                  </li>
                  <li>
                    모바일·데스크톱 환경을 고려한 반응형 UI를 개발하며 서비스
                    전반의 경험을 쌓았습니다.
                  </li>
                </ul>
              </div>
            </ProjectCard>
          </div>
        </section>

        <hr className="mb-8 border-gray-200" />
        <PrintBreak show={showGuide} marginBottom={40} />

        {/* === 교육 === */}
        <section className="mb-8">
          <SectionTitle>교육</SectionTitle>
          <div className="mb-8">
            <h3 className="mb-1 text-lg font-bold">학점은행제</h3>
            <p className="mb-1 text-sm text-gray-400">
              졸업 | 대학교(학사) | 컴퓨터공학
            </p>
            <span className="text-sm text-gray-500">2022. 10. ~ 2025. 12.</span>
          </div>
          <div className="mb-8">
            <h3 className="mb-1 text-lg font-bold">경복비즈니스 고등학교</h3>
            <p className="mb-1 text-sm text-gray-400">
              졸업 | 고등학교 | IT비즈니스과
            </p>
            <span className="text-sm text-gray-500">2016. 03. ~ 2019. 02.</span>
          </div>
        </section>

        <hr className="mb-8 border-gray-200" />

        {/* === 자격증 === */}
        <section className="mb-8">
          <SectionTitle>자격증</SectionTitle>
          <div className="mb-8">
            <h3 className="mb-1 text-lg font-bold">정보처리기사</h3>
            <p className="mb-1 text-sm text-gray-400">
              기사 | 한국산업인력공단
            </p>
            <span className="text-sm text-gray-500">2025. 12.</span>
          </div>
        </section>
      </article>

      {/* === PDF 저장 버튼 & 가이드 토글 === */}
      <div className="mx-auto mt-6 flex max-w-[794px] items-center justify-end gap-4">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={showGuide}
            onChange={(e) => setShowGuide(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
          />
          <span className="text-sm font-medium text-gray-700">
            페이지 가이드 보기
          </span>
        </label>
        <PdfSaveButton contentRef={articleRef} documentTitle="이유림_이력서" />
      </div>
    </div>
  );
};
