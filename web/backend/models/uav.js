const mongoose = require("mongoose");
const autoIncrement = require("mongoose-plugin-autoinc");
const Schema = mongoose.Schema;
const {
  nameValidator
} = require("../config");

const rand = (a, b)=>
  Math.round(Math.random * (b - a)) + a;
  
const UAV = new Schema({
  groupName: {
    type: String,
    unique: true,
    validate: nameValidator,
  },
  firepos: {
    type: Number,
    default:rand(1,25)
  },
  tar:{
    type: [Number, Number, Number],
    default: [1,1,1].map(x=>rand(1,5))
  },
  mission: {
    _id: false,
    type: {
      ready:Date,
      takeoff: Date,
      seenFire: Date,
      seenTarget: [{
        tar: Number,
        time: 0
      }],
      crush: [Date],
    },
    default: {
      ready: 0,
      takeoff: 0,
      seenFire: 0,
      seenTarget: [],
      crush: [],
      done:[],
    }
  },
  lastMission: String,
})

UAV.plugin(autoIncrement.plugin, {
  model: "UAV",
  startAt: 1
});

module.exports = mongoose.model("UAV", UAV);