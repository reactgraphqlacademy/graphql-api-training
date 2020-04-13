const { fromGlobalId } = require("graphql-relay");

function resolveId(id) {
  const { id: localId } = fromGlobalId(id) || {};

  return localId;
}

module.exports = {
  resolveId,
};
