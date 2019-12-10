const position = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => `${x}`);
const target = [1, 2, 3, 4, 5].map(x => `${x}`);
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
  let [a, b, c, d, e] = [1, 2, 3, 4, 5].shuffle();
  let [f, g, h, i, j] = [1, 2, 3, 4, 5].shuffle();
  return {
    aims: [f, g, h],
    Fire: k,
    Tar1: a,
    Tar2: b,
    Tar3: c
  }
}
module.exports = {
  position,
  target,
  targetName,
  genmission
}