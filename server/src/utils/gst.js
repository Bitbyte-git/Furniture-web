export const calculateGST = (taxableAmount, gstRate, customerState, companyState) => {
  const sameState = customerState?.toLowerCase() === companyState?.toLowerCase();
  const gstAmount = (taxableAmount * gstRate) / 100;

  if (sameState) {
    const half = gstRate / 2;
    return {
      gstType: 'CGST+SGST',
      cgstRate: half,
      cgstAmount: gstAmount / 2,
      sgstRate: half,
      sgstAmount: gstAmount / 2,
      igstRate: 0,
      igstAmount: 0,
      totalGST: gstAmount,
    };
  }

  return {
    gstType: 'IGST',
    cgstRate: 0,
    cgstAmount: 0,
    sgstRate: 0,
    sgstAmount: 0,
    igstRate: gstRate,
    igstAmount: gstAmount,
    totalGST: gstAmount,
  };
};

export const calculateDeliveryCharge = (pincode, subTotal, weight = 0) => {
  if (subTotal >= 10000) return 0;
  const pin = parseInt(pincode, 10);
  if (pin >= 400000 && pin <= 499999) return 199;
  if (pin >= 100000 && pin <= 899999) return 499;
  return 799;
};

export const getDeliveryZone = (pincode) => {
  const pin = parseInt(pincode, 10);
  if (pin >= 400000 && pin <= 499999) return 'Local';
  if (pin >= 100000 && pin <= 899999) return 'Regional';
  return 'Pan-India';
};
