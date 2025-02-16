const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  telegramId: {
    type: String,
    required: [true, "Telegram id"],
  },
  name: {
    type: String,
    default: "",
  },
  userName: {
    type: String,
    required: [true, "Введите username пользователя"],
    default: "",
  },
  tariffMonth: {
    type: Number,
    default: "Без тарифа",
  },
  tariffName: {
    type: String,
    default: "Название тарифа",
  },
  phone: {
    type: String,
    default: "",
  },
  dateStartSubscription: {
    type: String,
    default: "",
  },
  dateEndSubscription: {
    type: String,
    default: "",
  },
  countEndSubscription: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
