#!/usr/bin/env python
#coding=utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import rospy
from std_msgs.msg import String


def name():
  pubStart = rospy.Publisher('/selectName', String, queue_size=10)
  pubFire = rospy.Publisher('/fire_point', String, queue_size=10)
  pubO1 = rospy.Publisher('/object1', String, queue_size=10)
  pubO2 = rospy.Publisher('/object2', String, queue_size=10)
  pubO3 = rospy.Publisher('/object3', String, queue_size=10)
  pubD = rospy.Publisher('/end', String, queue_size=10)
  devName = u"😺"
  firestr = "1,2"
  o1 = "猫,1"
  o2 = "画作,4"
  o3 = "婴儿,4"
  rospy.loginfo(devName)
  pubStart.publish(devName)
  rospy.Rate(10).sleep()
  pubStart.publish(devName)
  rospy.Rate(10).sleep()
  pubStart.publish(devName)
  rospy.Rate(10).sleep()
  pubStart.publish(devName)

  rospy.Rate(0.2).sleep()
  rospy.loginfo(firestr)
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)
  rospy.Rate(10).sleep()
  pubFire.publish(firestr)

  rospy.Rate(0.2).sleep()
  rospy.loginfo(o1)
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)
  rospy.Rate(10).sleep()
  pubO1.publish(o1)

  rospy.Rate(0.2).sleep()
  rospy.loginfo(o2)
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)
  rospy.Rate(10).sleep()
  pubO2.publish(o2)

  rospy.Rate(0.2).sleep()
  rospy.loginfo(o3)
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)
  rospy.Rate(10).sleep()
  pubO3.publish(o3)

  rospy.Rate(0.2).sleep()
  rospy.loginfo("d")
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")
  rospy.Rate(10).sleep()
  pubD.publish("d")


if __name__ == '__main__':
  try:
    rospy.init_node('Devs', anonymous=True)
    rate = rospy.Rate(10)  # 10hz
    name()
  except rospy.ROSInterruptException:
    pass
