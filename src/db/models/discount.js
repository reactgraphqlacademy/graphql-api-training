const mongoose = require("mongoose");
const { toGlobalId } = require("graphql-relay");

const { resolveId } = require("../utils");
const { TRAINING_TYPENAME } = require("./training");

const DiscountSchema = new mongoose.Schema({
  _trainingId: { type: mongoose.Schema.ObjectId, required: true },
  code: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  description: String,
  expiresOn: Date,
});

const DISCOUNT_TYPENAME = "Discount";

// We use mongoose virtuals (https://mongoosejs.com/docs/guide.html#virtuals)
// to return the __typename on each instance of this model
DiscountSchema.virtual("__typename").get(function() {
  return "Discount";
});

DiscountSchema.virtual("id").get(function() {
  return toGlobalId(DISCOUNT_TYPENAME, this._id);
});

DiscountSchema.virtual("trainingId")
  .get(function() {
    return toGlobalId(TRAINING_TYPENAME, this._trainingId);
  })
  .set(function(trainingId) {
    // HEADS UP! this doesn't work with findOneAndUpdate https://github.com/Automattic/mongoose/issues/5643#issuecomment-600897964
    this.set({ _trainingId: resolveId(trainingId) });
  });

mongoose.model("Discount", DiscountSchema);

module.exports = {
  DISCOUNT_TYPENAME,
};
