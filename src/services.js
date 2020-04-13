const db = require("mongoose");
const { mrResolve } = require("mongo-relay-connection");
const { TRAINING_TYPENAME } = require("./db/models/training");
const { DISCOUNT_TYPENAME } = require("./db/models/discount");
const { resolveId } = require("./db/utils");
// const fetch = require("node-fetch");

function findTrainings(args = {}) {
  return mrResolve(args, db.models.Training);
}

function findTrainingById(id) {
  return db.models.Training.findOne({ _id: id });
}

function findDiscounts({ filter = {}, ...args } = {}) {
  // return db.models.Discount.find();
  const { field, direction } = args.orderBy || {};
  const orderBy =
    field && direction ? { cursorField: field, direction } : undefined;
  let query = {};
  if (filter.trainingId) {
    query._trainingId = resolveId(filter.trainingId);
  }

  return mrResolve(args, db.models.Discount, query, orderBy);
}

function findDiscountById(id) {
  return db.models.Discount.findOne({ _id: id });
}

function findDiscountsByTrainingId(trainingId) {
  return db.models.Discount.find({ _trainingId: trainingId });
}

function getObjectById({ type, id }) {
  const types = {
    [TRAINING_TYPENAME]: findTrainingById,
    [DISCOUNT_TYPENAME]: findDiscountById,
  };

  return types[type](id);
}

module.exports = {
  findTrainings,
  findTrainingById,
  findDiscounts,
  // findTrainingByUrl,
  findDiscountById,
  findDiscountById,
  // findDiscountByUrl,
  findDiscountsByTrainingId,
  getObjectById,
};

// function findTrainings() {
//   // More info about the fetch function? https://github.com/bitinn/node-fetch#json
//   return fetch("https://api.reactgraphql.academy/rest/trainings/")
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }

// function findTrainingById(id) {
//   return fetch(`https://api.reactgraphql.academy/rest/trainings/${id}`)
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }

// function findDiscounts() {
//   return fetch("https://api.reactgraphql.academy/rest/discounts/")
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }

// function findTrainingByUrl(url) {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }

// function findDiscountById(id) {
//   return fetch(`https://api.reactgraphql.academy/rest/discounts/${id}`)
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }

// function findDiscountByUrl(url) {
//   return fetch(url)
//     .then((res) => res.json())
//     .catch((error) => console.log(error));
// }
