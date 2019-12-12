const position = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(x => `${x}`);
const target = [1, 2, 3, 4, 5].map(x => `${x}`);
const tow = {
  '1': [0, 270].map(x => `${x}`),
  '2': [0, 270].map(x => `${x}`),
  '3': [0, 90, 270].map(x => `${x}`),
  '4': [0, 90, 270].map(x => `${x}`),
  '5': [0, 180].map(x => `${x}`),
}
const targetName = {
  '1': "猫",
  '2': "画作",
  '3': "文件",
  '4': "婴儿",
  '5': "危险品"
};
Array.prototype.random = function () {
  return this[(Math.random() * this.length) >>> 0]
};
Array.prototype.shuffle = function (n = this.length) {
  let random;
  while (0 !== n) {
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [this[n], this[random]] = [this[random], this[n]]; // ES6的结构赋值实现变量互换
  }
  return this;
}
const genmission = () => {
  let k = position.random();
  let [a, b, c, d, e] = target.shuffle();
  let [f, g, h, i, j] = target.shuffle();
  let [pa, pb, pc] = [a, b, c].map(x => tow[x].random())
  return {
    aims: [f, g, h],
    Fire: `${k}号窗口`,
    Tar1: `${a}号柜${pa}方向`,
    Tar2: `${b}号柜${pb}方向`,
    Tar3: `${c}号柜${pc}方向`,
    tar1: `${a}`,
    tar2: `${b}`,
    tar3: `${c}`
  }
}
module.exports = {
  position,
  target,
  targetName,
  genmission
}