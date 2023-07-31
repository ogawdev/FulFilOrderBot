require("dotenv").config();
const { session } = require("telegraf");

const bot = require("./core/bot");
const stage = require("./scenes");
const startBot = require("./utils/startBot");
const { connectDB } = require("./database/index");
const config = require("./utils/config");
const { User } = require("./database");
const { join } = require("path");

(async () => {
  await connectDB();
})();

bot.use(session());

bot.use(stage.middleware());

bot.start((ctx) => ctx.chat.type === "private" && ctx.scene.enter("register"));

bot.command("excel", async (ctx) => {
  try {
    let xl = require("excel4node");
    let wb = new xl.Workbook();
    const ws = wb.addWorksheet("Sheet 1");
    ws.cell(1, 1).string("№");
    ws.cell(1, 2).string("FISH");
    ws.cell(1, 3).string("Telefon");

    let users = await User.find();

    users.forEach((user, index) => {
      ws.cell(index + 2, 1).number(index + 1);
      ws.cell(index + 2, 2).string(user.fullName + "");
      ws.cell(index + 2, 3).string(user.phone + "");
    });

    ws.column(1).setWidth(5);
    ws.column(2).setWidth(20);
    ws.column(3).setWidth(15);

    await wb.write("Excel.xlsx", async function (err, stats) {
      if (err) {
        ctx.reply(config.CHAT_ID, "Xatolik yuz berdi");
      } else {
        let file_path = join(__dirname, "..", "Excel.xlsx");
        await ctx.replyWithDocument({ source: file_path });
      }
    });
  } catch (e) {
    console.log(e + "");
    await ctx.telegram.sendMessage(config.DEV_ID, e.toString());
  }
});

startBot(bot);
