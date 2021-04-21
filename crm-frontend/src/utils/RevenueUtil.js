import moment from "moment";

export function getRevenue(prospects, frequency) {
  let revenue = {};
  for (const index in prospects) {
    const prospect = prospects[index];
    const payment = prospect.payment;
    const DP = payment.downPayment;
    const OD = payment.onDelivery;
    const UAT = payment.userAcceptanceTest;
    const AUG = payment.afterUATGuarantee;
    const MI = payment.monthlyInstallment;
    const YI = payment.yearlyInstallment;
    let date = moment(prospect.expectedStartDate);
    date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
    if (DP.amount !== 0) {
      date = moment(date).add(DP.paymentTime, "months");
      date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      date in revenue
        ? (revenue[date] += DP.amount)
        : (revenue[date] = DP.amount);
    }
    if (OD.amount !== 0) {
      date = date = moment(date).add(OD.paymentTime, "months");
      date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      date in revenue
        ? (revenue[date] += OD.amount)
        : (revenue[date] = OD.amount);
    }
    if (UAT.amount !== 0) {
      date = moment(date).add(UAT.paymentTime, "months");
      date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      date in revenue
        ? (revenue[date] += UAT.amount)
        : (revenue[date] = UAT.amount);
    }
    if (AUG.amount !== 0) {
      date = moment(date).add(AUG.paymentTime, "months");
      date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      date in revenue
        ? (revenue[date] += AUG.amount)
        : (revenue[date] = AUG.amount);
    }
    let copiedDate = moment(date).format("MMM-YYYY");
    if (MI.amount !== 0) {
      for (let i = 0; i < MI.period; i++) {
        date = moment(date).add(MI.frequency, "months");
        date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
        date in revenue
          ? (revenue[date] += MI.amount)
          : (revenue[date] = MI.amount);
      }
    }
    if (YI.amount !== 0) {
      for (let i = 0; i < YI.period; i++) {
        date = moment(copiedDate).add(YI.frequency, "months");
        date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
        date in revenue
          ? (revenue[date] += YI.amount)
          : (revenue[date] = YI.amount);
      }
    }
  }
  const MONTHS = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  revenue = Object.keys(revenue).map((key) => [key, revenue[key]]);
  revenue.sort(function (a, b) {
    let aa = a[0].split("-");
    let bb = b[0].split("-");
    return aa[1] - bb[1] || MONTHS[aa[0]] - MONTHS[bb[0]];
  });
  revenue = revenue.map((rev) => ({ date: rev[0], revenue: rev[1] }));
  return revenue;
};
