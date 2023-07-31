const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([require("./start"), require("./register")]);

module.exports = stage;
