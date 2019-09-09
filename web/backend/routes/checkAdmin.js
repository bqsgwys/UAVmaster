const {
  secret
} = require("../config");

module.exports.checkAdmin = (ctx, next) => {
  if (ctx.request.body.secret && ctx.request.body.secret === secret)
    return next();
  ctx.status = 403;
  ctx.body = 'forbidden';
  return;
}