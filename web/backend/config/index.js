module.exports = {
  mission: require("./mission"),
  targets: require("./targets"),
  nameValidator: data => !!data && /^([^,\.\/;'\[\]\\=\-`~!@\#\$%\^&\*\(\)_\+\{\}\|:"<>\?/])+$/.test(data),
  secret: "SecretPassword"
}