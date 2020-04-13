// https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");
require("./models/training");
require("./models/discount");

mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
