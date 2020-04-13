const { parsed: config } = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const trainings = [
  {
    _id: ObjectId("5e934e68e06e3d37d8f21b5b"),
    title: "React Fundamentals",
    objectives: "learning basics of react",
    startDate: "2030-04-15 16:30:00.000Z",
    curriculum:
      "-Thinking in React, Modern JavaScript, Routing & Data Fetching\n-Forms, Authentication, and Hooks\n-Redux Fundamentals, deployment to production",
  },
  {
    _id: ObjectId("5e93550ee06e3d37d8f35e31"),
    title: "Advanced React",
    startDate: "2030-05-15 16:30:00.000Z",
    objectives:
      "Solve real-world problems when building production-ready React apps",
    curriculum:
      "-Advanced React patterns and performance.\n-GraphQL 101 & Real-World Testing in React.\n-Building a UI component library",
  },
  {
    _id: ObjectId("5e93558ae06e3d37d8f3705f"),
    title: "React Bootcamp",
    startDate: "2010-06-15 16:30:00.000Z",
    objectives:
      "Build a solid foundation in React to master advanced real-world React",
    curriculum:
      "-Thinking in React, Modern JavaScript, Routing & Data Fetching\n-Forms, Authentication, and Hooks\n-Redux Fundamentals, deployment to production\n-Advanced React patterns and performance.\n-GraphQL 101 & Real-World Testing in React.\n-Building a UI component library",
  },
];

const codes = [
  "banana",
  "garlic",
  "sweetpotato",
  "onion",
  "avocado",
  "spinach",
  "celery",
  "blueberry",
];
const percentages = [5, 10, 20, 35];

let discounts = [];
for (let index = 1; index <= 10; index++) {
  const code = randomItem(codes);
  const discountPercentage = randomItem(percentages);
  const randomTraining = randomItem(trainings);
  discounts.push({
    code: `${code}${discountPercentage}`,
    discountPercentage,
    expiresOn: new Date(), //"2017-12-31T07:00:00.000Z",
    _trainingId: randomTraining._id,
  });
}

MongoClient.connect(config.DB_CONNECTION, function(err, client) {
  if (err) throw err;

  const db = client.db("LMS");

  db.collection("discounts").drop(() => {
    db.collection("discounts").insertMany(discounts);
  });

  db.collection("trainings").drop(() => {
    db.collection("trainings").insertMany(trainings);
  });
});
