import { useRef } from 'react';
import { Chip } from '@/shared';
import { Link } from 'lucide-react';
import { PdfSaveButton } from '@/features/pdf-export';

export const ResumePage = () => {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <article
        ref={articleRef}
        className="mx-auto max-w-[794px] bg-white p-16 font-sans text-gray-900"
      >
        {/* === 헤더: 이름, 직군, 연락처 === */}
        <section className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-4xl font-bold">이유림</h1>
            <p className="mb-4 text-lg text-gray-500">프론트엔드 개발</p>
            <ul className="flex flex-col gap-1 text-sm text-gray-500">
              <li className="flex gap-2">
                <span className="w-14 font-medium text-gray-400">이메일</span>
                <span>yeol0324@gmail.com</span>
              </li>
              <li className="flex gap-2">
                <span className="w-14 font-medium text-gray-400">github</span>
                <a
                  href="https://github.com/yeol0324"
                  className="text-blue-500 hover:underline"
                >
                  github.com/yeol0324
                </a>
              </li>
              <li className="flex gap-2">
                <span className="w-14 font-medium text-gray-400">blog</span>
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
            사용자의 작은 멈춤, 팀의 반복 작업, 어색한 흐름을 보면 자연스럽게
            "왜?"를 먼저 떠올립니다.
            <br />
            사용자 이탈률이 높다는 한 줄의 데이터에서 출발해 실제 사용 흐름을
            따라가며 문제를 정의했고, 팀 내 반복되는 작업은 자동화하며 실행
            속도를 높여왔습니다. 저는 완벽한 기능만큼 자연스럽게 흐르는 경험을
            만드는 일을 좋아합니다.
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
              <h3 className="text-lg font-bold">크레디트라인(주)</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>
            <p className="mb-3 text-sm text-gray-500">
              프론트엔드 개발 | 프리랜서
            </p>

            <div className="mb-4">
              <div className="mb-1 flex flex-wrap gap-1">
                <Chip>React</Chip>
                <Chip>Next</Chip>
                <Chip>Zustand</Chip>
                <Chip>MobX</Chip>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                보안 포탈 프론트엔드 개발
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
                <li>요구사항 정의 회의 주도</li>
                <li>대규모 데이터 테이블 공통 컴포넌트 설계 및 개발</li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-1 flex items-start justify-between">
              <h3 className="text-lg font-bold">미니게이트(주)</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>
            <p className="mb-3 text-sm text-gray-500">프론트엔드 개발</p>

            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                에듀 테크 도메인에서 학습 플랫폼, 학습 관리 플랫폼, 학습 컨텐츠
                에디터 프론트엔드 개발
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
              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
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
              <h3 className="text-lg font-bold">펍플(주)</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>
            <p className="mb-3 text-sm text-gray-500">프론트엔드 개발</p>

            <div className="mb-4">
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                에듀테크 기반 대학 교재 플랫폼 및 전자책 변환(PDF→EPUB) 기술
                개발
              </p>
              <div className="mb-1 flex flex-wrap gap-1">
                <Chip>Vue2</Chip>
                <Chip>VueX</Chip>
                <Chip>SCSS</Chip>
              </div>

              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
                <li>e commerce 개발</li>
                <li>접근성 고려한 반응형 웹 개발</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="mb-10 border-gray-200" />

        {/* === 프로젝트 === */}
        <section className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">프로젝트</h2>
          {/* === 크레디트라인 === */}

          <div className="mb-8">
            <p className="mb-3 text-sm text-gray-500">
              크레디트라인 | 프론트엔드 개발
            </p>
            <div className="mb-1 flex items-start justify-between">
              <h3 className="text-lg font-bold">정보보안 포털</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-semibold">(2024.11 - 2025.06)</p>
              <p className="mb-1 text-xs text-gray-500">
                Next.js, TypeScript, MUI, MobX
              </p>
              <p className="mb-2 text-sm leading-relaxed text-gray-700">
                보안팀이 사용하는 전사 보안 포털에서 심만 건 규모의 로그 관리
                테이블과 교육 관리, 임직원 소명 등록·관리 프론트엔드 개발을
                했습니다.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
                <li>
                  MobX 기반 권한 상태를 전역으로 관리하고, observer를 통해 권한
                  변경이 즉시 반영되도록 구성했습니다.
                </li>
                <li>
                  TanStack Table 기반 공통 DataTable을 구축하고 커스텀 훅과 셀
                  컴포넌트로 기능을 모듈화했습니다.
                </li>
              </ul>
            </div>
          </div>
          {/* === 미니게이트 === */}
          <div className="mb-8">
            <p className="mb-1 text-sm text-gray-500">
              미니게이트 | 프론트엔드 개발
            </p>
            <div className="mb-1 flex items-start justify-between">
              <h3 className="text-lg font-bold">정보보안 포털</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-semibold">(2024.11 - 2025.06)</p>
              <p className="mb-1 text-xs text-gray-500">
                Next.js, TypeScript, MUI, MobX
              </p>
              <p
                id="improve"
                className="mb-2 text-sm leading-relaxed text-gray-700"
              >
                보안팀이 사용하는 전사 보안 포털에서 심만 건 규모의 로그 관리
                테이블과 교육 관리, 임직원 소명 등록·관리 프론트엔드 개발을
                했습니다.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
                <li>
                  MobX 기반 권한 상태를 전역으로 관리하고, observer를 통해 권한
                  변경이 즉시 반영되도록 구성했습니다.
                </li>
                <li>
                  TanStack Table 기반 공통 DataTable을 구축하고 커스텀 훅과 셀
                  컴포넌트로 기능을 모듈화했습니다.
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <p className="mb-1 text-sm text-gray-500">펍플 | 프론트엔드 개발</p>
            <div className="mb-1 flex items-start justify-between">
              <h3 className="text-lg font-bold">정보보안 포털</h3>
              <span className="text-xs text-gray-400">
                2024. 11. ~ 2025. 06. (8개월)
              </span>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-semibold">(2024.11 - 2025.06)</p>
              <p className="mb-1 text-xs text-gray-500">
                Next.js, TypeScript, MUI, MobX
              </p>
              <p
                id="improve"
                className="mb-2 text-sm leading-relaxed text-gray-700"
              >
                보안팀이 사용하는 전사 보안 포털에서 심만 건 규모의 로그 관리
                테이블과 교육 관리, 임직원 소명 등록·관리 프론트엔드 개발을
                했습니다.
              </p>
              <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-700">
                <li>
                  MobX 기반 권한 상태를 전역으로 관리하고, observer를 통해 권한
                  변경이 즉시 반영되도록 구성했습니다.
                </li>
                <li>
                  TanStack Table 기반 공통 DataTable을 구축하고 커스텀 훅과 셀
                  컴포넌트로 기능을 모듈화했습니다.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>

      {/* === PDF 저장 버튼 === */}
      <div className="mx-auto mt-6 flex max-w-[794px] justify-end">
        <PdfSaveButton contentRef={articleRef} documentTitle="이유림_이력서" />
      </div>
    </div>
  );
};
