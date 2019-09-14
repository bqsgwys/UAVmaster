#!/usr/bin/env python
#coding=utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import requests
import json
import os
import copy
import rospy
from std_msgs.msg import String
from urllib import quote

global configs
with open(os.path.join(os.path.dirname(__file__), "server.config.json"),
          'r') as load_f:
  configs = json.load(load_f)
  print(configs)


class communicator:

  def __init__(self, groupName):
    assert (groupName)
    self.groupName = groupName

  def __del__(self):
    del self.groupName

  def finish(self, missionName, x=-1, y=-1, target="", pos=-1):
    if missionName in configs[u"simpleMissions"]:
      requests.post(
          configs["server"] + quote(u"/uav/{0}/{1}".format(
              self.groupName, missionName).encode("utf-8")),
          data=configs[u"pass"])
    elif missionName == u"seenFire":
      payload = dict(configs[u"pass"])
      payload["x"] = x
      payload["y"] = y
      requests.post(
          u"{0}/uav/{1}/seenFire".format(configs["server"], self.groupName),
          data=payload)
    elif missionName == u"seenTarget":
      payload = dict(configs[u"pass"])
      payload[u"position"] = pos
      payload[u"target"] = target
      requests.post(
          u"{0}/uav/{1}/seen/{2}".format(configs["server"], self.groupName,
                                         target),
          data=payload)


endStart = True
endInfo = True
receivedInfo = ""
done = [True] * 8
listen = [False] * 8


def init(groupname):
  global groupName
  global comm
  global endStart
  global endInfo
  global receivedInfo
  global done
  global listen
  groupName = groupname
  comm = communicator(groupname)
  endStart = False
  endInfo = False
  receivedInfo = ""
  done = [False] * 8
  listen = [True] * 8


def end():
  rospy.loginfo("end:" + groupName)
  endStart = False
  endInfo = False
  receivedInfo = ""
  done = [False] * 8
  listen = [True] * 8


def start():
  rate = rospy.Rate(5)
  while not rospy.is_shutdown():
    if (not endStart):
      rospy.loginfo("send GroupName" + groupName)
      pubstart.publish(groupName)
    rate.sleep()
  rospy.loginfo("Exit sending start")


def received():
  rate = rospy.Rate(5)
  while not (rospy.is_shutdown()):
    if not (endInfo or receivedInfo == ""):
      rospy.loginfo("received" + receivedInfo)
      pubreceive.publish(receivedInfo)
    rate.sleep()
  rospy.loginfo("Exit sending received")


def handleFire(data):
  if (listen[4]):
    rospy.loginfo("handle:" + data.data)
    try:
      arr = data.data.split(",")
      if not done[4]:
        comm.finish(missionName=u"seenFire", x=arr[0], y=arr[1])
        done[4] = True
      sreceivedInfo = "fire_point"
      endStart = True
    except Exception as e:
      print(e)


def handleTarget1(data):
  if (listen[1]):
    rospy.loginfo("handle:" + data.data)
    try:
      arr = data.data.split(",")
      if not done[1]:
        comm.finish(missionName=u"seenTarget", target=arr[0], pos=arr[1])
        done[1] = True
      receivedInfo = "object1"
      endStart = True
    except Exception as e:
      print(e)


def handleTarget2(data):
  if (listen[2]):
    rospy.loginfo("handle:" + data.data)
    try:
      arr = data.data.split(",")
      if not done[2]:
        comm.finish(missionName=u"seenTarget", target=arr[0], pos=arr[1])
        done[2] = True
      receivedInfo = "object2"
      endStart = True
    except Exception as e:
      print(e)


def handleTarget3(data):
  if (listen[3]):
    rospy.loginfo("handle:" + data.data)
    try:
      arr = data.data.split(",")
      if not done[3]:
        comm.finish(missionName=u"seenTarget", target=arr[0], pos=arr[1])
        done[3] = True
      receivedInfo = "object3"
    except Exception as e:
      print(e)


def doneHandler(data):
  if (listen[5]):
    rospy.loginfo("handle:" + data.data)
    comm.finish(missionName="landing")
    end()


def nameHandler(data):
  rospy.loginfo('Name: %s', data.data)
  if (not ('thisGroup' in locals() or 'thisGroup' in globals())):
    init(data.data)
  elif (data.data != groupName):
    end()
    init(data.data)


if __name__ == '__main__':
  rospy.init_node('masterrDev')
  rospy.Subscriber('/selectName', String, nameHandler, queue_size=10)
  rospy.Subscriber('/object1', String, handleTarget1, queue_size=10)
  rospy.Subscriber('/object2', String, handleTarget2, queue_size=10)
  rospy.Subscriber('/object3', String, handleTarget3, queue_size=10)
  rospy.Subscriber('/fire_point', String, handleFire, queue_size=10)
  rospy.Subscriber('/end', String, doneHandler, queue_size=10)
  rospy.Publisher('/start', String, queue_size=10)
  rospy.Publisher('/received', String, queue_size=10)
  received()
  start()
  rospy.spin()
