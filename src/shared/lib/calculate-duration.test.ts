import { describe, it, expect } from 'vitest';
import { calculateDuration } from './calculate-duration';

describe('calculateDuration', () => {
  it('1년 미만의 기간을 "N개월"로 표시한다', () => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-08-01');
    // 1(Jan) to 8(Aug) = 7 months difference + 1 = 8 months
    expect(calculateDuration({ startDate, endDate })).toBe('8개월');
  });

  it('정확히 1년인 경우 "1년 0개월"로 표시한다', () => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-01');
    // 1 to 12 = 11 months diff + 1 = 12 months = 1 year 0 months
    expect(calculateDuration({ startDate, endDate })).toBe('1년 0개월');
  });

  it('1년 이상의 기간을 "N년 M개월"로 표시한다', () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-05-01');
    // 2025-2024 = 1 year. 5-1 = 4 months.
    // Total months: 12 + 4 + 1? No.
    // 2024.01 to 2025.05.
    // (2025-2024)*12 + (5-1) + 1 = 12 + 4 + 1 = 17 months.
    // 17 / 12 = 1 year, rem 5.
    // Wait. My calculation logic adds +1.
    // Jan to May is 5 months (Jan, Feb, Mar, Apr, May).
    // 5 - 1 = 4. +1 = 5. Correct.
    expect(calculateDuration({ startDate, endDate })).toBe('1년 5개월');
  });

  it('연도 변경이 포함된 1년 미만 기간을 올바르게 계산한다', () => {
    const startDate = new Date('2023-11-01');
    const endDate = new Date('2024-03-01');
    // 2024-2023 = 1. 3-11 = -8.
    // 12 - 8 = 4. +1 = 5 months.
    // Nov, Dec, Jan, Feb, Mar = 5 months. Correct.
    expect(calculateDuration({ startDate, endDate })).toBe('5개월');
  });
});
