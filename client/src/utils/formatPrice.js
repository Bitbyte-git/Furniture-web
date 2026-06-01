export const formatPrice = (amount, currency = 'INR') => {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export const formatPriceDisplay = (inr) => {
  const usd = inr / 83;
  return `$${usd.toFixed(2)}`;
};
