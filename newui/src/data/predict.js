import data14 from "./2014.json";
import data15 from "./2015.json";
import data16 from "./2016.json";
import data17 from "./2017.json";

const header = year => [
  {
    text: `${year}年上报人均收入`,
    align: "left",
    sortable: true,
    value: "income"
  },
  {
    text: "预测值",
    align: "left",
    sortable: true,
    value: "predict"
  },
  {
    text: "差值",
    align: "left",
    sortable: true,
    value: "delta"
  },
  {
    text: "低报?",
    align: "left",
    sortable: true,
    value: "islow"
  }
];

export default {
  header: {
    "2014": header(2014),
    "2015": header(2015),
    "2016": header(2016),
    "2017": header(2017)
  },
  data: {
    "2014": data14,
    "2015": data15,
    "2016": data16,
    "2017": data17
  }
};
