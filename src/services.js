const db = require("mongoose");
const { mrResolve } = require("mongo-relay-connection");
const { TRAINING_TYPENAME } = require("./db/models/training");
const { DISCOUNT_TYPENAME } = require("./db/models/discount");
const { resolveId } = require("./db/utils");

function getObjectById({ type, id }) {
  const types = {
    Training: findTrainingById
    // 🚧 You will need to add here a key for the Discount type and the function that resolves the object given its id
  };

  return types[type](id);
}

function findTrainings({ filter = {}, ...args } = {}) {
  const { field, direction } = args.orderBy || {};
  const orderBy =
    field && direction ? { cursorField: field, direction } : undefined;
  let query = {};
  if (filter.startDate === "future") {
    query.startDate = { $gte: new Date() };
  } else if (filter.startDate === "past") {
    query.startDate = { $lt: new Date() };
  }

  return mrResolve(args, db.models.Training, query, orderBy);
}

function findTrainingById(id) {
  return db.models.Training.findOne({ _id: id });
}

function findDiscounts({ filter = {}, ...args } = {}) {
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

module.exports = {
  findTrainings,
  findTrainingById,
  findDiscounts,
  findDiscountById,
  findDiscountById,
  findDiscountsByTrainingId,
  getObjectById
};
