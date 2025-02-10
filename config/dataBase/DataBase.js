const { default: mongoose } = require("mongoose");

class DataBase {
  constructor() {
    this.count = 0;
  }

  async connect() {
    try {
      await mongoose.connect(
        "mongodb+srv://strikesswery:strikesswery@cluster0.sprgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
          serverSelectionTimeoutMS: 3000,
        }
      );

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
    }
  }
}

const dataBase = new DataBase();

module.exports = { dataBase };
