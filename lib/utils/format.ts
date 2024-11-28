export const formatCurrency = (value: number, options?: {
  notation?: 'compact' | 'standard';
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: options?.notation || 'standard',
    minimumFractionDigits: options?.minimumFractionDigits || 0,
    maximumFractionDigits: options?.maximumFractionDigits || 2,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};