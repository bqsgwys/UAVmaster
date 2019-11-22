const run = fn =>
  fn()
const gjr = {
  init() {
    run(() => {
      this.a = 1;
    });
  }
}
gjr.init()
console.log(gjr);