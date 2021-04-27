import moment from "moment";

const FREQ = ['monthly', 'yearly']

export function getRevenue(prospects, {frequency, accumulate}) {

  if (!FREQ.includes(frequency)) {alert("Invalid freq")}

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
    let formattedDate = "";
    if (DP.amount !== 0) {
      date = date.add(DP.paymentTime, "months");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += DP.amount)
        : (revenue[formattedDate] = DP.amount);
    }
    if (OD.amount !== 0) {
      date = date.add(OD.paymentTime, "months");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += OD.amount)
        : (revenue[formattedDate] = OD.amount);
    }
    if (UAT.amount !== 0) {
      date = date.add(UAT.paymentTime, "months");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += UAT.amount)
        : (revenue[formattedDate] = UAT.amount);
    }
    if (AUG.amount !== 0) {
      date = date.add(AUG.paymentTime, "months");
      formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
      formattedDate in revenue
        ? (revenue[formattedDate] += AUG.amount)
        : (revenue[formattedDate] = AUG.amount);
    }
    let copiedDate = date;
    if (MI.amount !== 0) {
      for (let i = 0; i < MI.period; i++) {
        date = date.add(MI.frequency, "months");
        formattedDate = frequency === 'monthly' ? date.format("MMM-YYYY") : date.format("YYYY")
        formattedDate in revenue
          ? (revenue[formattedDate] += MI.amount)
          : (revenue[formattedDate] = MI.amount);
      }
    }
    if (YI.amount !== 0) {
      for (let i = 0; i < YI.period; i++) {
        date = copiedDate.add(YI.frequency, "months");
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
  let accumulatedRevenue = []
  let total = 0;
  for (let i = 1; i < revenue.length; i++) {
    const rev = {
      date: revenue[i].date, 
      revenue: revenue[i].revenue + total
    }
    total += revenue[i].revenue;
    accumulatedRevenue.push(rev)
  };
  return [revenue, accumulatedRevenue];
};

export function getUserChoices(prospects) {
  const sortByNIK = (a, b) => {
    return parseInt(a.NIK) - parseInt(b.NIK)
  }
  const uniqueNIK = (data) => {
    let i = 1;
    while (i < data.length) {
      if (data[i].NIK === data[i-1].NIK){
        data.splice(i, 1);
      }
      i ++;
    };
    return data;
  }
  let usersChoices = prospects.map(prospect => {
    const prospectHolder = prospect.prospectHolder;
    return {
      value: prospectHolder._id,
      label: `${prospectHolder.NIK} - ${prospectHolder.name.firstName}.${prospectHolder.name.lastName[0]}`,
      NIK: prospectHolder.NIK
    }
  }).sort(sortByNIK)
  usersChoices = uniqueNIK(usersChoices)
  usersChoices.splice(0, 0, {value: true, label: "All"});
  return usersChoices;
}