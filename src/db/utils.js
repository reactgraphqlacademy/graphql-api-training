const { fromGlobalId } = require("graphql-relay");
const ObjectId = require("mongoose").Types.ObjectId;

function resolveId(id) {
  return ObjectId.isValid(id) ? id : fromGlobalId(id).id;
}

module.exports = {
  resolveId,
};
