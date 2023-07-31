const { Scenes } = require("telegraf");

const scene = new Scenes.BaseScene("start");

scene.enter(async (ctx) => {
  await ctx.reply("Assalomu alaykum ro'yxatdan o'tish uchun ism-familyangizni qoldiring")

  ctx.scene.enter("register");
});

module.exports = scene;
