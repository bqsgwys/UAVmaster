# 交互库 API

## 新建组通信接口

```python
  communicator(GROUPNAME)

  EXAMPLE:
    miao = communicator(u"喵")
```

## 完成普通任务

如下任务列表
采用普通的完成通信函数参数

- received：接收指令
- launched：起飞
- cruising：巡航
- through：穿越大楼
- landing：降落
- done：强制结束比赛
- crush：碰撞

```python
  finish(mission)

  EXAMPLE:
    miao.finish("received") # 完成接受指令任务
```

## 完成着火点搜寻任务

```python
  finish("seenFire",x=$x,y=$y)

  EXAMPLE:
    miao.finish("seenFire",x=1,y=1) # 在（1，1）找到着火点
```

## 完成目标搜寻任务

```python
  finish("seenTarget",x,y)

  EXAMPLE:
    miao.finish("seenTarget",target=u"哥布林",pos=1) # 在位置1找到哥布林
```
