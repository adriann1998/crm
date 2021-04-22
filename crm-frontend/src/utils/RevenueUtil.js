import moment from "moment";

export function getRevenue(prospects, {frequency}) {
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
    let date = moment(prospect.expectedSODate);
    let formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
    // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
    if (DP.amount !== 0) {
      date = date.add(DP.paymentTime, "months");
      // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += DP.amount)
        : (revenue[formattedDate] = DP.amount);
    }
    if (OD.amount !== 0) {
      date = date.add(OD.paymentTime, "months");
      // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += OD.amount)
        : (revenue[formattedDate] = OD.amount);
    }
    if (UAT.amount !== 0) {
      date = date.add(UAT.paymentTime, "months");
      // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += UAT.amount)
        : (revenue[formattedDate] = UAT.amount);
    }
    if (AUG.amount !== 0) {
      date = date.add(AUG.paymentTime, "months");
      // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += AUG.amount)
        : (revenue[formattedDate] = AUG.amount);
    }
    let copiedDate = date;
    if (MI.amount !== 0) {
      for (let i = 0; i < MI.period; i++) {
        date = date.add(MI.frequency, "months");
        // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
        formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
        formattedDate in revenue
          ? (revenue[formattedDate] += MI.amount)
          : (revenue[formattedDate] = MI.amount);
      }
    }
    if (YI.amount !== 0) {
      for (let i = 0; i < YI.period; i++) {
        date = copiedDate.add(YI.frequency, "months");
        // date = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY");
        formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
        formattedDate in revenue
          ? (revenue[formattedDate] += YI.amount)
          : (revenue[formattedDate] = YI.amount);
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
