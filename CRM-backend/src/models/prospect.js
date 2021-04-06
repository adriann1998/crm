const mongoose = require("mongoose");
const Account = require("../models/account");
const FKHelper = require("./utils/foreignKeyUtil");

const validateAccountFK = (id) => {
  return FKHelper(Account, id);
};

const paymentFieldOption = {
  type: Number,
  required: true,
  default: 0,
  min: 0,
};

const paymentSchema = {
  downPayment: {
    amount: paymentFieldOption,
    time: paymentFieldOption
  },
  onDelivery: {
    amount: paymentFieldOption,
    time: paymentFieldOption,
    default: {
      amount: 0,
      time: 0
    }
  },
  userAcceptanceTest: {
    amount: paymentFieldOption,
    time: paymentFieldOption,
    default: {
      amount: 0,
      time: 0
    }
  },
  afterUATGuarantee: {
    amount: paymentFieldOption,
    time: paymentFieldOption,
    default: {
      amount: 0,
      time: 0
    }
  },
  monthlyInstallment: {
    amount: paymentFieldOption,
    period: paymentFieldOption,
    frequency: paymentFieldOption,
  },
  yearlyInstallment: {
    amount: paymentFieldOption,
    period: paymentFieldOption,
    frequency: paymentFieldOption,
  },
};

const prospectSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    prospectName: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
      validate: validateAccountFK,
    },
    prospectAmount: {
      type: Number,
      min: 0,
      default: 0
    },
    endUser: {
      type: String,
    },
    GPM: {
      type: Number,
      min: 0,
      max: 100,
    },
    expectedDuration: {
      type: Number,
      min: 0,
    },
    payment: {
      type: paymentSchema 
    },
    desc: {
      type: String,
    },
    isClosed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

prospectSchema.pre('save', function(next){
  if (!this.payment) {
    this.prospectAmount = 0;
    next();
  }
  const DP = this.payment.downPayment;
  const COD = this.payment.onDelivery;
  const UAT = this.payment.userAcceptanceTest;
  const AUG = this.payment.afterUATGuarantee;
  const MI = this.payment.monthlyInstallment;
  const YI = this.payment.yearlyInstallment;
  let total = 0;
  // one off payments
  total += DP ? DP.amount : 0;
  total += COD ? COD.amount : 0;
  total += UAT ? UAT.amount : 0;
  total += AUG ? AUG.amount : 0;
  // installment payments
  total += MI ? MI.amount*MI.period : 0;
  total += YI ? YI.amount*YI.period : 0;
  this.prospectAmount = total;
  next();
});

prospectSchema.pre('validate', function(next) {
  let total = 0;
  if (this.payment) {
    const DP = this.payment.downPayment;
    const COD = this.payment.onDelivery;
    const UAT = this.payment.userAcceptanceTest;
    const AUG = this.payment.afterUATGuarantee;
    const MI = this.payment.monthlyInstallment;
    const YI = this.payment.yearlyInstallment;
    // one off payments
    total += DP ? DP.amount : 0;
    total += COD ? COD.amount : 0;
    total += UAT ? UAT.amount : 0;
    total += AUG ? AUG.amount : 0;
    // installment payments
    total += MI ? MI.amount*MI.period : 0;
    total += YI ? YI.amount*YI.period : 0;
  }
  if (this.prospectAmount === total) {
    this.prospectAmount = total;
    next(new Error('Total Payment does not equal to prospect amount'));
  } else {
    next();
  }
});

module.exports = mongoose.model("Prospect", prospectSchema);
