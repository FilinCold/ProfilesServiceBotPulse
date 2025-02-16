const express = require("express");
const profilesRoute = require("./routes/profiles.route.js");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const { dataBase } = require("./config/dataBase/DataBase.js");
const {
  updateProfilesCountSubscription,
} = require("./controllers/profiles.controller.js");

const PORT = process.env.PORT || 3005;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/profiles", profilesRoute);

app.get("/", (req, res) => {
  res.send("Server is working...");
});

app.listen(PORT, async (req, res) => {
  console.log(`Server is running on port ${PORT}`);
  await dataBase.connect();

  cron.schedule("00 00 * * *", async () => {
    console.log("running a task every day in 03:00 +3 hour by Moscow");
    console.log("Update counter subscription by all users");

    updateProfilesCountSubscription();
  });
});
