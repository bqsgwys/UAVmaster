# API

--> `/:组序号/takeoff 1` 起飞
<-- `/:组序号/received 1` 起飞准许
--> `/:组序号/seenfire $firePosition[1-25]` 识别火点
--> `/:组序号/seentarget/:tarID[1-5] 1` 识别物体 MAX=3
--> `/:组序号/done 1` 降落完成
