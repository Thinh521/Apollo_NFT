/**
 * Format số kiểu social: 1K, 1.2K, 3.4M
 * @param {number | string} value
 * @param {number} decimals - số chữ số thập phân (mặc định 1)
 */
export const formatNumber = (value, decimals = 1) => {
  const num = Number(value);

  if (!Number.isFinite(num) || num <= 0) return '0';

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(decimals)}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(decimals)}K`;
  }

  return num.toString();
};
