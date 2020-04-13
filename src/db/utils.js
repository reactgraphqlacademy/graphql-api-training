const { fromGlobalId } = require("graphql-relay");

function resolveId(id) {
  const { id: localId } = fromGlobalId(id) || {};

  return id && !localId ? id : localId;
}

module.exports = {
  resolveId
};
