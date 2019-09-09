const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");
const Schema = mongoose.Schema;
const {
  nameValidator,
  mission: {
    missionValidator,
    missionDefault
  },
  targets: {
    targetGenerator
  }
} = require("../config");

const UAV = new Schema({
  matchInfo: {
    type: {
      _id: false,
      firePosition: {
        x: Number,
        y: Number,
        _id: false,
      },
      targets: [{
        targetName: String,
        position: Number,
        _id: false,
      }],
    },
    default: targetGenerator,
  },
  groupName: {
    type: String,
    unique: true,
    validate: nameValidator,
  },
  startAt: Date,
  doneMission: {
    type: Object,
    default: missionDefault,
    validate: missionValidator,
  },
  lastAction: {
    type: Object,
    default: new Object(),
  },
})

UAV.plugin(autoIncrement.plugin, {
  model: "UAV",
  startAt: 1
});

module.exports = mongoose.model("UAV", UAV);