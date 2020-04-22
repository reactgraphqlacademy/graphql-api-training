// https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");
require("./models/training");
require("./models/discount");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.gcp.mongodb.net/LMS`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
