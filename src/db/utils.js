const { fromGlobalId } = require("graphql-relay");
const ObjectId = require("mongoose").Types.ObjectId;

function resolveId(id) {
  const mongoId = new ObjectId(id);

  return mongoId && mongoId.toString() === id ? id : fromGlobalId(id).id;
}

module.exports = {
  resolveId,
};
