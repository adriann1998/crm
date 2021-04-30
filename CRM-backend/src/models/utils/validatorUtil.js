const Account = require("../account");
// const User = require("../user");

const FKValidator = (model, id) => {
  console.log("HEYYY")
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (err) return reject(new Error(`Internal server error`));
      if (result) return resolve(result);
      return reject(
        new Error(`FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`)
      );
    });
  });
};

/**
 * 
 * Regular fields validators
 * 
 */

function validateName(name) {
  if (name === undefined || name === null || name === "") {
    return true;
  }
  const regex = new RegExp("^[a-zA-Z]+$");
  return regex.test(name);
}

function validatePhoneNumber(ph) {
  const regex = new RegExp("^\\+[0-9]+$");
  return ph === "" ? true : regex.test(ph);
};

function validateEmail(email) {
  const regex = new RegExp(
    "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$"
  );
  return regex.test(String(email).toLowerCase());
};

function validateNIK(nik) {
  const regex = new RegExp("^[0-9]{11}");
  return regex.test(nik);
};

function validatePostcode(postcode) {
  const regex = new RegExp("^[1-9][0-9]+$");
  return regex.test(postcode);
};


/**
 * 
 * FK fields validators
 * 
 */

function validateAccountFK(id) {
  return FKValidator(Account, id);
};

function validateProspectFK(id) {
  return FKValidator(Prospect, id);
};

function validateUserFK(id) {
  return FKValidator(User, id);
};

// function validateDirectorFK(id) {
//   if (id === null || id === undefined) return resolve(true);
//   return new Promise((resolve, reject) => {
//     User.findOne({ _id: id }, (err, user) => {
//       if (err) return reject(new Error(`Internal server error`));
//       if (user && user.userPosition === 'director') return resolve(user);
//       return reject(
//         new Error(`FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`)
//       );
//     });
//   });
// };

export {
  validateName,
  validatePhoneNumber,
  validateEmail,
  validateNIK,
  validatePostcode,
  validateAccountFK,
  validateProspectFK,
  validateUserFK,
  // validateDirectorFK
}