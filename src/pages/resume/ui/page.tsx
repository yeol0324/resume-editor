import { useRef, useState } from 'react';
import { calculateDuration, Chip } from '@/shared';
import { FileText, Github, Link, Mail, Phone } from 'lucide-react';
import { PdfSaveButton, PageGuide, PrintBreak } from '@/features/pdf-export';

export const ResumePage = () => {
  const articleRef = useRef<HTMLElement>(null);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <article
        ref={articleRef}
        className="relative mx-auto max-w-[794px] bg-white p-16 font-sans text-gray-900 print:w-[210mm] print:max-w-none print:p-[20mm] print:[&>*:last-child]:mb-0"
      >
        {/* === 페이지 가이드 라인 === */}
        <PageGuide show={showGuide} />

        {/* === 헤더: 이름, 직군, 연락처 === */}
        <section className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-4xl font-bold">이유림</h1>
            <p className="mb-4 text-lg text-gray-500">프론트엔드 개발자</p>
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
                  className="text-blue-500 hover:underline"
                >
                  github.com/yeol0324
                </a>
              </li>
              <li className="flex items-center gap-1">
                <FileText size={16} />
                <a href="#" className="text-blue-500 hover:underline">
                  https://yeol0324.github.io/
                </a>
              </li>
            </ul>
          </div>
          {/* 프로필 이미지 자리 */}
          {/* <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden shrink-0">
            <img
              src="/profile.jpg"
              alt="프로필 사진"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div> */}
        </section>

        {/* === 소개 === */}
        <section className="mb-10">
          {/* <blockquote className="text-sm font-medium text-gray-700 border-l-0 mb-3">
            "유림이 불러와!"
          </blockquote> */}
          <p className="text-sm leading-relaxed text-gray-700">
            불편함을 그냥 지나치지 않는 개발자 이유림입니다.
            <br />
            사용자가 멈추는 지점, 어색한 흐름, 팀의 반복 작업을 보면 "왜?"를
            먼저 떠올립니다.
            <br />
            사용자 이탈률이 높은 곳에서 실제 사용 흐름을 따라가며 문제를
            정의했고, 팀 내 반복되는 작업은 자동화하며 실행 속도를 높여왔습니다.
            저는 완벽한 기능만큼 자연스럽게 흐르는 경험을 만드는 일에
            자신있습니다.
            <br />
            빠르게 배우고 바로 실행하며, 변화 속에서도 팀과 함께 성장하는
            프론트엔드 개발자입니다.
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

        <hr className="mb-10 border-gray-200" />

        {/* === 경력 === */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">경력</h2>

          <div className="mb-8">
            <div className="mb-1 flex items-start justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-bold">크레디트라인(주)</h3>
                <p className="text-sm text-gray-500">
                  프론트엔드 개발 | 프리랜서
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

            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                전사 직원 사용 보안/교육/회의 관리 통합 포털 프론트엔드 개발
              </p>
              <div className="mb-1 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next</Chip>
                <Chip>MobX</Chip>
              </div>
              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>요구사항 정의 회의 주도</li>
                <li>대규모 데이터 테이블 공통 컴포넌트 설계 및 개발</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-1 flex items-start justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-bold">미니게이트(주)</h3>
                <p className="text-sm text-gray-500">프론트엔드 개발</p>
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

            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                에듀테크 도메인 기반 학습, 학습 관리 플랫폼, 학습 컨텐츠 에디터
                개발
              </p>
              <div className="mb-1 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next</Chip>
                <Chip>Zustand</Chip>
                <Chip>MobX</Chip>
                <Chip>TailwindCss</Chip>
                <Chip>Vue3</Chip>
                <Chip>Pinia</Chip>
                <Chip>SCSS</Chip>
              </div>
              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>
                  사용자 이탈률 개선
                  <a
                    href="#improve"
                    className="ml-1 inline-flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <Link size={12} />
                  </a>
                </li>
                <li>Git 브랜치 전략 도입 주도</li>
                <li>수동 배포 프로세스 CI/CD 구축</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-1 flex items-start justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-bold">펍플(주)</h3>
                <p className="text-sm text-gray-500">프론트엔드 개발</p>
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

            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                대학 교재 커머스 시스템 및 EPUB 뷰어, PDF→EPUB 변환 에디터 개발
              </p>
              <div className="mb-1 flex flex-wrap gap-1">
                <Chip>Vue2</Chip>
                <Chip>VueX</Chip>
                <Chip>SCSS</Chip>
              </div>

              <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                <li>장바구니 기능 구현 </li>
                <li>접근성 고려한 반응형 웹 개발</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="mb-10 border-gray-200" />

        {/* === 프로젝트 === */}
        <PrintBreak marginBottom={20} />
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">프로젝트</h2>

          {/* === 크레디트라인 === */}
          <div className="mb-8">
            <p className="mb-3 text-sm text-gray-500">크레디트라인</p>
            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">정보보안 포탈</h3>
                <span className="text-xs text-gray-400">
                  2024. 11. ~ 2025. 06. (
                  {calculateDuration({
                    startDate: new Date('2024-11'),
                    endDate: new Date('2025-06'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Next.js, TypeScript, MUI, MobX
                </p>
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  보안팀이 사용하는 전사 보안 포탈에서 십만 건 규모의 로그 관리
                  테이블과 교육 관리, 임직원 소명 등록·관리 프론트엔드 개발을
                  했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    MobX 기반 권한 상태를 전역으로 관리하고, observer를 통해
                    권한 변경이 즉시 반영되도록 구성했습니다.
                  </li>
                  <li>
                    TanStack Table 기반 공통 DataTable을 구축하고 커스텀 훅과 셀
                    컴포넌트로 기능을 모듈화했습니다. 10개 이상 페이지에
                    재사용되며 신규 테이블 개발 시간을 단축했습니다.
                  </li>
                  <li>
                    10만 건 이상 보안 로그 테이블에 가상화를 적용하고 Optimistic
                    Update를 적용해 스크롤 성능과 테이블 성능을 최적화했습니다.
                  </li>
                  <li>
                    OpenAPI Swagger 명세 기반 타입 자동 생성 파이프라인을 구축해
                    API 스펙 불일치 문제를 개선했습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* === 미니게이트 === */}
          <div className="mb-8">
            <p className="mb-1 text-sm text-gray-500">미니게이트</p>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">위티버스 교육 플랫폼</h3>
                <span className="text-xs text-gray-400">
                  2024. 03. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2024-03'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Next.js, Zustand, Tailwind css, Lottie
                </p>
                <p
                  id="improve"
                  className="mb-2 text-sm leading-relaxed text-gray-700"
                >
                  아동 태블릿 학습 시스템에서 Android 런처·Unity 기반 앱과
                  연동되는 WebView 학습 플레이어를 개발하고, 학습 실행·출석
                  반영·학습 결과 확인까지 학생의 학습 flow 와 LMS/LCMS를
                  구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    Tailwind CSS 기반으로 공통 컴포넌트와 레이아웃 규칙을
                    정의하고, 화면별로 흩어져 있던 스타일을 컴포넌트 단위로 모아
                    반응형 대응과 디자인 변경을 쉽게 만들었습니다.
                  </li>
                  <li>
                    학습 진행률 같이 자주 업데이트되는 상태로 인한 플레이어 전체
                    재렌더링 방지를 위해 Zustand Store를 도메인 단위로 분리하고
                    화면에서는 필요한 selector만 구독하도록 설계했습니다.
                  </li>
                  <li>
                    플레이어 진입 시 필요한 데이터를 개별 API로 조회하던 구조를
                    서버 컴포넌트에서 단일 조회로 변경해 초기 waterfall을
                    개선했습니다.
                  </li>
                  <li>
                    Web–Android/Unity 통신을 공통 브릿지로 정리하고 메시지
                    구조를 통일·문서화하여 웹-앱 연동 작업 시간을 약 50%
                    단축했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">위티버스 admin</h3>
                <span className="text-xs text-gray-400">
                  2024. 03. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2024-03'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Next.js, Zustand, Tailwind css
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    AWS CDN 수동 업로드 프로세스를 presigned URL 기반 대용량
                    파일 벌크 업로드로 개선하고, 업로드 큐 및 진행률 상태를
                    관리하여 콘텐츠 등록 시간 단축 및 운영 오류를 개선했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">마이올린 학습앱</h3>
                <span className="text-xs text-gray-400">
                  2022. 09. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2022-09'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Vue.js, TypeScript, Pinia, Axios, Lottie, Fabric.js
                </p>
                <p
                  id="improve"
                  className="mb-2 text-sm leading-relaxed text-gray-700"
                >
                  아동 태블릿 학습 시스템 및 학습 관리 서비스로, 모바일
                  앱(Android·iOS)과 연동되는 WebView 기반 학습 플레이어 화면 및
                  학습 보상, 출석, 진도 확인 등 학생 학습 서비스를 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    아동의 터치 실패로 인한 학습 이탈을 줄이기 위해 버튼 Hit
                    Area를 확장하고 클릭 피드백을 추가해 학습 흐름 이탈을
                    개선했습니다.
                  </li>
                  <li>
                    Pixi-Spine과 Lottie의 객체 생성 및 렌더링 성능을 측정해
                    Lottie 전환을 제안하여 웹 환경 애니메이션 성능을
                    개선했습니다.
                  </li>
                  <li>
                    사용자 참여형 맵 꾸미기 기능에서 Canvas 객체 생성/배치/제거
                    및 애니메이션은 Fabric.js가 관리하고, Pinia는 아이템
                    재고/보유 포인트/미션 등 데이터 상태와 명령 트리거만
                    관리하도록 분리했습니다. 인터랙션 중 렉과 비정상 종료를 줄여
                    화면 체류 시간이 약 30% 증가했습니다.
                  </li>
                  <li>
                    Git 전략을 팀과 상황에 맞게 개선 반영하여 Merge Conflict 및
                    배포 이슈 발생 시 롤백 시간을 단축했습니다.
                  </li>
                  <li>
                    외부 학습 모듈을 보안·배포 측면에서 분리하기 위해 iframe으로
                    로딩하고 postMessage로 학습 상태와 이벤트를 동기화하는
                    플레이어를 구현했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">마이올린 학습 관리 앱</h3>
                <span className="text-xs text-gray-400">
                  2022. 09. ~ 2024. 10. (
                  {calculateDuration({
                    startDate: new Date('2022-09'),
                    endDate: new Date('2024-10'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Vue.js, TypeScript, Pinia, Axios, Chart.js
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    메시지 목록, 읽음 여부, 동기화 시점을 분리 관리하며 Polling
                    기반 채팅 기능을 구현했습니다.
                  </li>
                  <li>
                    학습 진행 상황과 메시지 수 등 실시간 데이터만 선별해
                    polling하고, Pinia 기반으로 상태를 관리해 학생 학습 현황을
                    즉시 반영하는 메인 화면을 구현했습니다.
                  </li>
                  <li>
                    Chart.js의 plugin과 커스텀 툴팁을 활용해 학습 결과 및 주요
                    구간을 표현하고, 누적 데이터에서도 차트 성능이 저하되지
                    않도록 데이터 양을 제어했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">ADMS 크라우드 소싱 플랫폼</h3>
                <span className="text-xs text-gray-400">
                  2023. 03. ~ 2023. 12. (
                  {calculateDuration({
                    startDate: new Date('2023-03'),
                    endDate: new Date('2023-12'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Next.js, Mobx, tailwind css, Lottie
                </p>
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  AI 학습데이터 수집을 위한 크라우드 워커 플랫폼의 프론트엔드
                  개발을 했습니다. 관리자용·작업자용 화면을 분리 설계하고, 작업
                  분배부터 검수·정산까지 전체 작업 흐름을 구현했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    드래그 결과 누적에서 UI 반영과 서버 반영을 분리해 optimistic
                    UI를 적용하고, 실패 시 복구 가능한 방식으로 동기화 흐름을
                    정리해 드래그 기반 문장 분류/문단 태깅 작업의 상태 꼬임 및
                    중복/제거 문제를 해결했습니다.
                  </li>
                  <li>
                    관리자 대시보드와 검수/정산 화면 간 집계 수치 불일치 문제를
                    해결했습니다. 집계 조건을 공통 기준으로 정리하고
                    selector/computed 기반 공통 계산 로직을 도입해 화면 간
                    데이터 일관성을 확보했습니다.
                  </li>
                  <li>
                    약 1만 행·12개 시트 월별 정산 데이터 엑셀 생성 로직을 Web
                    Worker로 분리해 대용량 데이터 처리 시 끊김 없는 UI를
                    제공했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">전자저작물 컨텐츠 에디터</h3>
                <span className="text-xs text-gray-400">
                  2023. 11. ~ 2023. 12. (
                  {calculateDuration({
                    startDate: new Date('2023-11'),
                    endDate: new Date('2023-12'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Electron, Quasar, Vue, Typescript
                </p>
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
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">리틀팍스 학습 플랫폼</h3>
                <span className="text-xs text-gray-400">
                  2022. 05. ~ 2022. 11. (
                  {calculateDuration({
                    startDate: new Date('2022-05'),
                    endDate: new Date('2022-11'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  JavaScript, HTML, CSS, PHP
                </p>
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  수만 명의 학생이 사용하는 영어 학습 서비스 리틀팍스의 학습
                  플랫폼 및 LMS/LCMS 프론트엔드 개발을 했습니다.
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
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">리틀팍스 admin</h3>
                <span className="text-xs text-gray-400">
                  2022. 05. ~ 2022. 11. (
                  {calculateDuration({
                    startDate: new Date('2022-05'),
                    endDate: new Date('2022-11'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  JavaScript, HTML, CSS, PHP
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    관리자용 LCMS에서 문제 등록·수정·구성 기능과 학습 진도 관리
                    화면을 구축했습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-1 text-sm text-gray-500">펍플 </p>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">이앨리스 대학 교재 플랫폼</h3>
                <span className="text-xs text-gray-400">
                  2020. 12. ~ 2022. 05. (
                  {calculateDuration({
                    startDate: new Date('2020-12'),
                    endDate: new Date('2022-05'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Vue2, JavaScript, SCSS
                </p>
                <p
                  id="improve"
                  className="mb-2 text-sm leading-relaxed text-gray-700"
                >
                  대학 교재 뷰어/구매 플랫폼의 반응형 웹 개발을 했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    메인 페이지에 노출되는 다수의 도서 이미지에 Lazy Loading을
                    적용해 초기 화면 로딩 속도를 개선했습니다.
                  </li>
                  <li>
                    결제 통화 단위별 결제 플로우를 분리하고 모바일·데스크톱
                    환경을 고려한 반응형 결제 UI를 구현했습니다.
                  </li>
                  <li>
                    동적 import를 활용한 코드 스플리팅과 webpack Prefetch로 초기
                    로딩 시 필요한 리소스만 로드하도록 최적화했습니다.
                  </li>
                  <li>
                    학교별 설정 값을 빌드 명령어 기준 환경 변수로 분리 관리하여,
                    학교별 데이터·배포 환경을 안정적으로 운영할 수 있는 구조로
                    개선했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">
                  한국점자도서관 시각장애인 독서지원 플랫폼
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

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Vue2, JavaScript, SCSS
                </p>
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  시각장애인 온라인 독서지원 플랫폼의 접근성, 반응형 웹 개발을
                  했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
                  <li>
                    실제 사용자 피드백을 수집해 접근성, 사용자 흐름을
                    개선했습니다.
                  </li>
                  <li>
                    누락된 마크다운 속성 보강 및 시멘틱 HTML 구조로 개편하여 웹
                    접근성을 개선했습니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-bold">캠퍼스북 전자책 플랫폼</h3>
                <span className="text-xs text-gray-400">
                  2021. 05. ~ 2021. 11. (
                  {calculateDuration({
                    startDate: new Date('2021-05'),
                    endDate: new Date('2021-11'),
                  })}
                  )
                </span>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-xs text-gray-500">
                  Vue2, JavaScript, SCSS
                </p>
                <p className="mb-2 text-sm leading-relaxed text-gray-700">
                  대학생 대상 서비스의 반응형 웹 개발을 했습니다.
                </p>
                <ul className="list-disc space-y-1 px-4 text-sm text-gray-700">
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
            </div>
          </div>
        </section>

        <hr className="mb-10 border-gray-200" />

        {/* === 교육 === */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">교육</h2>
          <div className="mb-8">
            <h3 className="mb-1 text-lg font-bold">국가평생교육진흥원</h3>
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

        <hr className="mb-10 border-gray-200" />

        {/* === 자격증 === */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">자격증</h2>
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
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
