const details = {
  received: {
    description: "接收指令",
    score: 5,
    max: 1,
  },
  launched: {
    description: "起飞",
    score: 5,
    max: 1,
  },
  cruising: {
    description: "巡航",
    score: 5,
    max: 1,
  },
  recogniseBurn: {
    description: "识别火点",
    score: 10,
    max: 1,
  },
  feedbackBurn: {
    description: "传回火点",
    score: 5,
    max: 1,
  },
  through: {
    description: "穿越大楼",
    score: 5,
    max: 1,
  },
  recogniseItem: {
    description: "识别物体",
    score: 15,
    max: 3,
  },

  feedbackItem: {
    description: "传回物体",
    score: 5,
    max: 3,
  },
  landing: {
    description: "降落",
    score: 5,
    max: 1,
  },
  done: {
    description: "结束",
    score: 0,
    max: 1,
  },
  crush: {
    description: "碰撞",
    score: -2,
    max: Infinity,
  }
}
module.exports.missionDetails = details;
module.exports.missionDefault = {
  received: [],
  launched: [],
  cruising: [],
  recogniseBurn: [],
  feedbackBurn: [],
  through: [],
  recogniseItem: [],
  feedbackItem: [],
  landing: [],
  done: [],
  crush: [],
};
module.exports.missionValidator = (data) => {
  if (!Array.isArray(data)) {
    for (let x in data) {
      if (!data[x]) return false;
      if (!details[x]) return false;
      if (data[x].length > details[x].max) return false;
    }
  }
  return true;
}