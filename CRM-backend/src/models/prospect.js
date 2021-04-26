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
    prospectHolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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
    expectedSODate: {
      type: Date,
      required: true,
    },
    payment: {
      downPayment: {
        amount: paymentFieldOption,
        paymentTime: paymentFieldOption
      },
      onDelivery: {
        amount: paymentFieldOption,
        paymentTime: paymentFieldOption,
      },
      userAcceptanceTest: {
        amount: paymentFieldOption,
        paymentTime: paymentFieldOption,
      },
      afterUATGuarantee: {
        amount: paymentFieldOption,
        paymentTime: paymentFieldOption,
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

module.exports = mongoose.model("Prospect", prospectSchema);
