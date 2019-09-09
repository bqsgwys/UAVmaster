const UAV = require("../models/uav");

const {
  nameValidator,
  mission: {
    missionValidator,
    missionDetails,
    missionDefault
  },
  targets: {
    targetGenerator
  }
} = require("../config");

module.exports.getList = async () => (await UAV.find({}, "-_id -__v")).map(x => x.groupName).sort();

module.exports.resetMission = async (groupName) => (await UAV.updateOne({
  groupName
}, {
  $set: {
    matchInfo: targetGenerator(),
    doneMission: missionDefault,
    lastAction: {},
  }
}));

module.exports.init = async (groupName) => {
  if (nameValidator(groupName)) {
    let x = new UAV({
      groupName
    });
    await x.save();
    return true;
  }
  return false;
}

module.exports.lastAction = async (groupName, mission, success, extra) =>
  await UAV.findOneAndUpdate({
    groupName
  }, {
    $set: {
      lastAction: {
        mission,
        success,
        extra
      }
    }
  });

module.exports.finishMissionByName = async (groupName, mission) => {
  let x = await UAV.findOne({
    groupName
  });
  if (!x.doneMission[mission])
    x.doneMission[mission] = [new Date()];
  else
    x.doneMission[mission].push(new Date());
  if (missionValidator(x.doneMission)) {
    x.markModified(`doneMission.${mission}`);
    await x.save();
    return true;
  } else
    return false;
}
module.exports.getByName = async (name) => {
  let x = await UAV.findOne({
    groupName: name
  });
  if (x) {
    let score = dataToScore(x.doneMission);
    return {
      ...x._doc,
      score
    };
  }
  return false;
}

const dataToScore = (data) => {
  let score = 0;
  for (let x in data) {
    score += missionDetails[x].score * data[x].length;
  }
  return score;
}

module.exports.getRanklist = async () => (await UAV.find({}, "-_id -__v")).map(x => new Object({
  ...x._doc,
  score: dataToScore(x._doc.doneMission)
})).sort((a, b) => b.score - a.score);