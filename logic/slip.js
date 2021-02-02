  /**
{
    "id": 1,
    "progressIndex": 0,
    "totalAmount": 2000,
    "retryIndex": 0,
    "bonusAmount": 0,
    "usedOdd": 0,
    "createdAt": "2021-02-02T22:21:37.796Z",
    "updatedAt": "2021-02-02T22:21:37.796Z",
    "quotationId": 1,
    "Quotation": {
        "id": 1,
        "retryOdd": 1.25,
        "initOdd": 0.05039850625521011,
        "growOdd": 1.2015940250208403,
        "target": 42,
        "trial": 8,
        "odd": 5,
    }
}
   */
  const GrowSlip = (slip) => 
  {

    if(slip.usedOdd >= slip.Quotation.odd)
    {
        let currentAmount = slip.totalAmount * slip.Quotation.initOdd * Math.pow(slip.Quotation.retryOdd, slip.retryIndex);
        slip.bonusAmount += currentAmount * (slip.usedOdd - slip.Quotation.odd);
        slip.usedOdd = 0;
        slip.retryIndex = 0;
        slip.progressIndex += 1;
        slip.totalAmount *= slip.Quotation.growOdd;
    }

    return slip;
  };
  
  
  const FormatSlipView = (slip) =>
  {
      let currentAmount = slip.totalAmount * slip.Quotation.initOdd * Math.pow(slip.Quotation.retryOdd, slip.retryIndex);
      if(slip.usedOdd > 0)
      {
        let receivedAmount = (currentAmount * slip.usedOdd) - currentAmount;
        currentAmount += receivedAmount;
      }
    return ({
        adviceAmount: Math.round(currentAmount), 
        totalAmount: Math.round(slip.totalAmount), 
        bonusAmount: Math.round(slip.bonusAmount), 
        progress: `${slip.progressIndex} / ${slip.Quotation.target}`,
        retries: `${slip.retryIndex + 1} / ${slip.Quotation.trial}`,
        adviceOdd: (slip.Quotation.odd - slip.usedOdd).toFixed(2) * 1
    })
  }

  module.exports = { GrowSlip, FormatSlipView };