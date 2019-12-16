if [ -z "$PORT" ]; then
  read -p "输入端口号(1024以上):" PORT
fi
KILL=$(lsof -i:3000 | awk '$10=="(LISTEN)" {printf $2 " "}')
if [ -n "$KILL" ]; then
  kill -9 $KILL
fi
cd $(readlink -f "$(dirname "$0")")/newback

echo "run on 0.0.0.0:$PORT"
yarn dev
