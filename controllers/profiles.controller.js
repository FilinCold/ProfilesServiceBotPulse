const {
  TARIFF_DAY_CONFIG,
  TARIFF_NAME_CONFIG,
} = require("../config/constants");
const Profile = require("../models/profile.model");
const { addDaysAndFormat, convertDateString } = require("../utils");

const getProducts = async (req, res) => {
  try {
    const products = await Profile.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.find({
      telegramId: { $in: [id] },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const tariffMonth = Number(req?.body?.tariffMonth ?? 0);
    const dateStartSubscription = req?.body?.dateStartSubscription ?? null;

    if (!tariffMonth || !dateStartSubscription) {
      res.status(400).json({ message: "Отправлены не все данные" });

      return;
    }

    const tariffDay = TARIFF_DAY_CONFIG[tariffMonth];
    const tariffName = TARIFF_NAME_CONFIG[tariffMonth];
    const dateEndSubscription = addDaysAndFormat(
      dateStartSubscription,
      tariffDay
    );

    const convertDateStartSubscriptionInString = convertDateString(
      dateStartSubscription
    );

    await Profile.find({
      telegramId: { $in: [id] },
    }).then((res) => {
      if (res === undefined || res.length == 0) {
        return;
      } else {
        res.map(async (document) => {
          const id = document._id;

          await Profile.findOneAndUpdate(
            { _id: id },
            {
              dateStartSubscription: convertDateStartSubscriptionInString,
              dateEndSubscription,
              countEndSubscription: tariffDay,
              tariffMonth,
              tariffName,
            }
          );
        });
      }
    });

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfilesCountSubscription = async (req, res) => {
  try {
    // countEndSubscription находит все профили с countEndSubscription, 1 || 0 = true || false
    await Profile.find({}, { countEndSubscription: 1 }).then((res) => {
      if (res === undefined || res.length == 0) {
        return;
      } else {
        res.map(async (document) => {
          const id = document._id;
          let countEndSubscription = document?.countEndSubscription;
          console.log(countEndSubscription, 43434);

          if (countEndSubscription) {
            await Profile.findOneAndUpdate(
              { _id: id },
              { countEndSubscription: --countEndSubscription }
            );
          }
        });
      }
    });

    console.log("Profiles counter subscription update");
    res.status(200).json("Profiles counter subscription update");
  } catch (error) {
    console.log("Error", error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Profile.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProduct = await Profile.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Profile.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProfile,
  createProfile,
  updateProduct,
  deleteProduct,
  updateProfilesCountSubscription,
  updateProfileSubscription,
};
