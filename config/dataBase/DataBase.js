const { default: mongoose } = require("mongoose");
const { ENV } = require("../env");

class DataBase {
  constructor() {
    this.count = 0;
  }

  async connect() {
    try {
      await mongoose.connect(ENV.MONGO_URI, {
        serverSelectionTimeoutMS: 3000,
      });

      console.log("Database connected");
    } catch (error) {
      console.log("Database disconnect", error);
      this.count++;
      const count = this.count;

      if (count < 3) {
        setTimeout(() => {
          this.connect();
        }, 3000);

        return;
      }

      console.log("Database is not connect");
    }
  }
}

const dataBase = new DataBase();

module.exports = { dataBase };
