const { Scenes } = require("telegraf");
const { User } = require("../database/index");
const path = require("path");
const {CHAT_ID} = require("../utils/config");

const scene = new Scenes.WizardScene(
    "register",
    async (ctx) => {
       try {
           await ctx.reply("Assalomu alaykum ro'yxatdan o'tish uchun ism-familyangizni qoldiring");
           ctx.wizard.state.user = {};
           ctx.wizard.next();
       } catch (e) {
           console.log(e + "");
       }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === "/start") {
                ctx.wizard.restart
                ctx.scene.enter("register");
                return;
            }

            ctx.wizard.state.user.full_name = ctx.message.text

            await ctx.reply("Siz bilan bog'lana olishimiz uchun telefon raqamingizni (901234567) ko'rinishida qoldiring");

            ctx.wizard.next();
        } catch (e) {
            console.log(e + "")
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === "/start") {
                ctx.wizard.restart
                ctx.scene.enter("register");
                return;
            }

            if (!(ctx.message.text.length === 9 && !isNaN(Number(ctx.message.text)))) {
                await ctx.reply("Siz bilan bog'lanish uchun telefon raqamingizni (901234567) ko'rinishida qoldiring.");
                return;
            }

            await ctx.reply("Siz Komiljon Xamidjonovning \"Python, Backend — Dasturlash\" onlayn kursiga ro'yxatdan o'tdingiz. Dasturlashni yuqori saviyada onlayn o'rganish va bu bilimlarni amaliyotda ishlatib pul topish uchun siz yana bir qadam tashlab onlayn kursimiz uchun to'lov qilishingiz kerak bo'ladi 🚀");

            await User.create({
                userId: ctx.message.from.id,
                fullName: ctx.wizard.state.user.full_name,
                phone: ctx.message.text,
            });

            ctx.wizard.state.user.phone = ctx.message.text;

            await ctx.replyWithPhoto({source: path.join(__dirname, "../../img.png"), }, { caption: "\"Python, Backend — Dasturlash\" onlayn kursining ta'riflari bilan tanishing" });

            await ctx.reply(`${ctx.wizard.state.user.full_name} endi to'lov qismiga o'tamiz.

Mahalliy karta raqamimiz: 
9860160101227298 — Humo
(Karta Sukhrob Abduakhatov nomida) 

Xalqaro karta raqamimiz: 
5555366022635299 — Mastercard
(Karta Sukhrob Abduakhatov nomida) 

To'lovni amalga oshirish tartibi:
1️⃣ To'lovni Click, Payme, Apelsin, Zumrad kabi ilovalar orqali (kartadan-kartaga) yoki Paynet shaxobchalari orqali to'lovni amalga oshirasiz va joyingiz band bo'ladi✅
2️⃣ To'lov qilgandan so'ng screnshoot qilib mana shu telegram botga yuborasiz✅
3️⃣ (Screnshotda summa, sana va to'lov amalga oshgan vaqti bo'lishi shart) Darsliklarni qabul qilib oluvchi o'quvchining ism, familyasi bog'lanish uchun qo'shimcha raqam yozib jo'natasiz✅
4️⃣ To’lovingizni 24 soat ichida ko’rib chiqib, siz bilan bog’lanamiz.

Agar sizda qo'shimcha savollar bo'lsa bizga albatta bog'laning: 990882745`)
            ctx.wizard.next();
        } catch (e) {
            console.log(e + "");
        }
    },
    async (ctx) => {
        try {
            if (ctx.message?.text === "/start") {
                ctx.wizard.restart
                ctx.scene.enter("register");
                return;
            }

            if (ctx.message?.photo) {
                await ctx.telegram.sendPhoto(CHAT_ID, ctx.message.photo[ctx.message.photo.length - 1].file_id, { caption: `FISH: ${ctx.wizard.state.user.full_name}\nTel: ${ctx.wizard.state.user.phone}\nUser_id: ${ctx.message.from.id}` });

                await ctx.reply("Xabaringiz muvofaqqiyatli yuborildi✅\nTez orada siz bilan bog'lanamiz")
            } else {
                await ctx.reply("Faqat rasm yuboring❌");
                return
            }
        } catch (e) {
            console.log(e + "");
        }
    }
);

module.exports = scene;
