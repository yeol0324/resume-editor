/**
 * 시작 날짜와 종료 날짜를 입력받아 기간을 계산하는 함수입니다.
 *
 * @param params - 기간 계산에 필요한 날짜 정보
 * @param params.startDate - 시작 날짜
 * @param params.endDate - 종료 날짜
 * @returns 'Y년 M개월' 또는 'M개월' 형식의 문자열 (0년일 경우 연도 생략)
 */
export const calculateDuration = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}): string => {
  const startYear = startDate.getUTCFullYear();
  const startMonth = startDate.getUTCMonth();

  const endYear = endDate.getUTCFullYear();
  const endMonth = endDate.getUTCMonth();

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years > 0 ? `${years}년 ` : ''}${months}개월`;
};
