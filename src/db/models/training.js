const mongoose = require("mongoose");
const { toGlobalId } = require("graphql-relay");

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  objectives: { type: String, required: true },
  curriculum: { type: String, required: true },
  overview: String,
  startDate: Date,
  language: String
});

const TRAINING_TYPENAME = "Training";

// We use mongoose virtuals (https://mongoosejs.com/docs/guide.html#virtuals)
// to return the __typename on each instance of this model
// TrainingSchema.virtual("__typename").get(function() {
//   return TRAINING_TYPENAME;
// });

// TrainingSchema.virtual("id").get(function() {
//   return toGlobalId(TRAINING_TYPENAME, this._id);
// });

mongoose.model("Training", TrainingSchema);

module.exports = {
  TRAINING_TYPENAME
};
