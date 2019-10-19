#!/usr/bin/env python
#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import requests
import json
import os
import copy
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
      x = requests.post(
          configs["server"] + quote(u"/uav/{0}/{1}".format(
              self.groupName, missionName).encode("utf-8")),
          data=configs[u"pass"])
      print x

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

a = communicator("🐱")
a.finish("launched")