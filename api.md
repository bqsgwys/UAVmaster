# tello_judge

这是比赛选手本地可以运行的裁判模拟器，主要有以下功能：

- 读取`/groupid/takeoff` 话题的消息 
  - 话题的内容是0或者1，1表示无人机准备完毕，请求起飞
- 读到请求信号后，，向`/groupid/received`话题发送起飞准许
  - 如果当前是当前正在比赛的组别，话题内容是1，score+=10，开始计时
  - 假如不是，发送0
- 向`/groupid/target1`发送第一个要找的目标,为1-5中的一个，
  - 在`/groupid/takeoff`收到之后开始发送
  - 同上，还有`/groupid/target2`和`/groupid/target3`的任务目标发布，
- 读取`/groupid/seenfire` 话题
  - 内容是0或者1 ，1表示无人机已经成功穿过着火点
  - score+=20
- 读取`/groupid/seentarget1` 话题，
  - 内容是柜子的id，也就是数字1-5，
  - 判断与系统存储的数字是否一致，
    - 如果一致，score+=20，
      - 向`/groupid/receivedtarget1` 话题发送1，表示已经收到，可以向下进行
    - 如果接收到的结果和系统存储的数字不一致，
      - 向 `/groupid/failure` 发送1，表示任务失败。
      - 结束计时，可以自行降落
- 同上，还有`/groupid/seentarget2`和`/groupid/seentarget3`，注意必须先匹配1然后再匹配2和3，识别是有顺序的。
- 读取`/groupid/done`话题,收到1表示无人机成功完成任务，已经降落，score+=10，结束计时。

终端快速测试，向起飞话题发布消息

```shell
rostopic pub /group1/takeoff std_msgs/Int16 1
```
