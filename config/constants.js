// Конфиг преобразующий количество месяцев в днях
const TARIFF_DAY_CONFIG = {
  1: 30,
  3: 90,
  12: 379, // добавили еще 2 недели бесплатно,
};

const TARIFF_NAME_CONFIG = {
  1: "1 месяц — 299₽",
  3: "3 месяца — 799₽",
  12: "12 месяцев — 2999₽",
};

module.exports = {
  TARIFF_DAY_CONFIG,
  TARIFF_NAME_CONFIG,
};
