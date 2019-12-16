#!/bin/sh
curPath=$(readlink -f "$(dirname "$0")")
backPath=`pwd`
cd $curPath/newui
yarn
yarn build
cd $curPath/newback
yarn
rm -r $curPath/newback/dist
mv $curPath/newui/dist $curPath/newback/dist
cd $backPath