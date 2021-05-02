module.exports = (model, id) => {
  return new Promise((resolve, reject) => {
    model.findOne({ _id: id }, (err, result) => {
      if (result) {
        return resolve(result);
      } else
        return reject(
          new Error(`FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`)
        );
    });
  });
};
