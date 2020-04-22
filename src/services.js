const db = require("mongoose");
const { mrResolve } = require("mongo-relay-connection");
const { TRAINING_TYPENAME } = require("./db/models/training");
const { DISCOUNT_TYPENAME } = require("./db/models/discount");
const { resolveId } = require("./db/utils");

function findTrainings(args = {}) {
  return mrResolve(args, db.models.Training);
}

function findTrainingById(id) {
  return db.models.Training.findOne({ _id: resolveId(id) });
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
  return db.models.Discount.findOne({ _id: resolveId(id) });
}

function findDiscountsByTrainingId(trainingId) {
  return db.models.Discount.find({ _trainingId: resolveId(trainingId) });
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
  findDiscountById,
  findDiscountById,
  findDiscountsByTrainingId,
  getObjectById,
};
