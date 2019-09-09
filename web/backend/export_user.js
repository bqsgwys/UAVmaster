var mongoose = require('mongoose')
var autoIncrement = require("mongoose-plugin-autoinc")
var dbURL = 'mongodb://127.0.0.1/thu-camp'; // make it work if db and tuoj-web in different docker
if (process.env.DBURL) {
    dbURL = process.env.DBURL;
}
mongoose.connect(dbURL, {useNewUrlParser: true});
//autoIncrement.initialize(mongoose.connection);
setTimeout(function() {
    mongoose.disconnect();
}, 3000);
(function() {
    
    var User=require('./models/user');
    
    var noip_choice= {"未参加":0, "省级三等奖":1, "省级二等奖":2, "省级一等奖":5};
    var noiwc_choice={"未参加":0, "参赛":0, "全国三等奖":10, "全国二等奖":20, "全国一等奖":35};
    var ctsc_choice= {"未参加":0, "参赛":10, "全国三等奖":20, "全国二等奖":40, "全国一等奖":70};
    var apio_choice= {"未参加":0, "参赛":5, "全国三等奖":15, "全国二等奖":30, "全国一等奖":52.5};
    var noi_choice=  {"未参加":0, "参赛":25, "全国三等奖":30, "全国二等奖":75, "全国一等奖":110};
    var ccpc_choice= {"未参加":0, "参加区域赛":10, "区域赛铜牌":15, "区域赛银牌":45, "区域赛金牌":70};
    var icpc_choice= {"未参加":0, "参加区域赛":15, "区域赛铜牌":25, "区域赛银牌":70, "区域赛金牌":100, "World Finals":200};

    User.find({"team_info.offline_checkbox":true,"status_code":"pass"}, function (err, u) {
	if (err) return console.error(err);
	for(let i=0;i<u.length;i++){
	    str_tmp = "";
	    var total_score = 0;
	    var name_list = '';
	    str_tmp += u[i].team_info.teamname_zh+",";
	    
	    for(let j = 0;j<u[i].team_info.users_count;j++){
		name_list += u[i].users[j].realname + ",";

		str_tmp += u[i].users[j].realname + ",";
		str_tmp += u[i].users[j].school + ",";
		str_tmp += u[i].users[j].gender + ",";
		str_tmp += u[i].users[j].isoier + ",";
		str_tmp += u[i].users[j].isacmer + ",";
		
		str_tmp += u[i].users[j].noip_best + ",";
		str_tmp += u[i].users[j].noiwc_best + ",";
		str_tmp += u[i].users[j].apio_best + ",";
		str_tmp += u[i].users[j].ctsc_best + ",";
		str_tmp += u[i].users[j].noi_best + ",";
		str_tmp += u[i].users[j].icpc_best + ",";
		str_tmp += u[i].users[j].ccpc_best + ",";

		function max(x, y){
		    if(x>y)return x;
		    else return y;
		}

		var tmp = -1;
		if(u[i].users[j].noip_best)tmp = max(tmp,noip_choice[u[i].users[j].noip_best]);
		if(u[i].users[j].noiwc_best)tmp = max(tmp, noiwc_choice[u[i].users[j].noiwc_best]);
		if(u[i].users[j].ctsc_best)tmp = max(tmp, ctsc_choice[u[i].users[j].ctsc_best]);
		if(u[i].users[j].apio_best)tmp = max(tmp, apio_choice[u[i].users[j].apio_best]);
		if(u[i].users[j].noi_best)tmp = max(tmp, noi_choice[u[i].users[j].noi_best]);
		if(u[i].users[j].icpc_best)tmp = max(tmp, icpc_choice[u[i].users[j].icpc_best]);
		if(u[i].users[j].ccpc_best)tmp = max(tmp, ccpc_choice[u[i].users[j].ccpc_best]);
		//		str_tmp += "'"+u[i].users[j].extra_info+"'" + ",";
		total_score += tmp;
	    }
	    //console.log(str_tmp);
	    console.log(u[i]._id + "," + u[i].team_info.teamname_zh + "," + name_list + total_score/u[i].team_info.users_count)
	}

    });
})();
