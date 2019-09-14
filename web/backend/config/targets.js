const [minX, minY, maxX, maxY] = [0, 0, 5, 5];
const validTarget = [
  "猫",
  "文件",
  "画作",
  "婴儿",
  "危险品",
];

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
const validPosition = (() => {
  let rest = [];
  for (let x = minX; x <= maxX; x++)
    for (let y = minY; y <= maxY; y++)
      rest.push({
        x,
        y
      });
  return rest;
})();
const getTable = (n) => (n >= 1) ? [n].concat(getTable(n - 1)) : [];



//module.exports.validTarget = validTarget;
//module.exports.validPosition = validPosition;
module.exports.targetGenerator = () => new Object({
  firePosition: validPosition.random(),
  targets: (
    validTarget.shuffle() &&
    getTable(validTarget.length).shuffle().slice(0, 3).map(x => new Object({
      position: x,
      targetName: validTarget[x - 1],
    })).sort((a, b) => a.position - b.position)
  )
})