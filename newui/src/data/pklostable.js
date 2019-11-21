const rawhead = [
  {
    text: "时间",
    align: "left",
    sortable: false,
    value: "time"
  },
  {
    text: "低报户数",
    align: "left",
    sortable: false,
    value: "num"
  },
  {
    text: "人均补贴",
    align: "left",
    sortable: false,
    value: "avg"
  },
  {
    text: "家庭人数",
    align: "left",
    sortable: false,
    value: "fam"
  },
  {
    text: "扶贫金损失",
    align: "left",
    sortable: false,
    value: "loss"
  }
];
const numbhead = [
  {
    text: "时间",
    align: "left",
    sortable: false,
    value: "time"
  },
  {
    text: "断点（贫困标准线）",
    align: "left",
    sortable: false,
    value: "breakPoint"
  },
  {
    text: "低报户数",
    align: "left",
    sortable: false,
    value: "num"
  },
  {
    text: "精准识别指数",
    align: "left",
    sortable: false,
    value: "e"
  },
  {
    text: "聚束指数",
    align: "left",
    sortable: false,
    value: "es"
  },
  {
    text: "低报区域长度",
    align: "left",
    sortable: false,
    value: "rgap"
  }
];

const lines = {
  "2014": {
    time: "2014",
    num: "800",
    avg: "230",
    fam: "3.84",
    loss: "70万"
  },
  "2015": {
    time: "2015",
    num: "403",
    avg: "540",
    fam: "3.88",
    loss: "84万"
  },
  "2016": {
    time: "2016",
    num: "538",
    avg: "880",
    fam: "3.82",
    loss: "180万"
  },
  "2017": {
    time: "2017",
    num: "521",
    avg: "902",
    fam: "3.79",
    loss: "178万"
  }
};

const numblines = {
  "2014": {
    time: "2014",
    es: "0.3136",
    rgap: "400",
    num: "800",
    e: "5.35",
    breakPoint: "2750元"
  },
  "2015": {
    time: "2015",
    es: "0.3696",
    rgap: "160",
    num: "403",
    e: "4.11",
    breakPoint: "2830元"
  },
  "2016": {
    time: "2016",
    es: "0.4003",
    rgap: "160",
    num: "538",
    e: "2.93",
    breakPoint: "2950元"
  },
  "2017": {
    time: "2017",
    es: "0.4596",
    rgap: "500",
    num: "521",
    e: "2.45",
    breakPoint: "3200元"
  }
};

export default { rawhead, lines, numbhead, numblines };
