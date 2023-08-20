const request = require("request");

const TelegramBot = require("node-telegram-bot-api");

const token = "5692299094:AAEt8RCvNXlD1HtN7mvk6aIqvejFo32JSj8";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", function (mg) {
  const msg = mg.text;
  const n = msg.split(" ");
  if (n.length == 1) {
    n[2] = n[0];
    n[0] = 1;
  }
  if (n.length == 2) {
    n[2] = n[1];
    n[1] = n[0];
    n[0] = 1;
  }
  if (msg.toLowerCase() == "hello") {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) greet = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
    else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
    bot.sendMessage(mg.chat.id, "Hello " + greet);
    bot.sendMessage(
      mg.chat.id,
      "Input the food item whose nutritional profile needs to be determined." +
        "\n" +
        "You must adhere to the input format" +
        "\n" +
        "Quantity in numbers, a unit of measurement, and then a food item are listed." +
        "\n" +
        "If you omit the quantity, it is assumed to be 1, and the unit of measurement is assumed to be the WHOLE."
    );
  } else {
    request(
      "https://api.edamam.com/api/nutrition-data?app_id=835f4003&app_key=6de378ad1ba1a6faf485d49432100361&nutrition-type=cooking&ingr=" +
        Number(n[0]) +
        "%20" +
        n[1] +
        "%20" +
        n[2],
      function (error, response, body) {
        if (JSON.parse(body).calories != 0) {
          var c = "";
          c =
            c +
            "NUTRITION PROFILE\n-----------------------------------------------------------------------------------------------------\n";

          if (typeof JSON.parse(body).calories != "undefined")
            c =
              c +
              "Calories                 = " +
              JSON.parse(body).calories.toString() +
              "\n";

          if (typeof JSON.parse(body).totalNutrients.FAT != "undefined")
            c =
              c +
              "FAT                         = " +
              JSON.parse(body).totalNutrients.FAT.quantity.toString() +
              JSON.parse(body).totalNutrients.FAT.unit.toString() +
              "\n";
          if (typeof JSON.parse(body).totalNutrients.CHOLE != "undefined")
            c =
              c +
              "CHOLESTROL       = " +
              JSON.parse(body).totalNutrients.CHOLE.quantity.toString() +
              JSON.parse(body).totalNutrients.CHOLE.unit +
              "\n";
          if (typeof JSON.parse(body).totalNutrients.PROCNT != "undefined")
            c =
              c +
              "PROTEIN COUNT  = " +
              JSON.parse(body).totalNutrients.PROCNT.quantity.toString() +
              JSON.parse(body).totalNutrients.PROCNT.unit +
              "\n";
          if (typeof JSON.parse(body).totalNutrients.SUGAR != "undefined")
            c =
              c +
              "SUGAR                   = " +
              JSON.parse(body).totalNutrients.SUGAR.quantity.toString() +
              JSON.parse(body).totalNutrients.SUGAR.unit +
              "\n";
          if (typeof JSON.parse(body).totalNutrients.WATER != "undefined")
            c =
              c +
              "WATER                  = " +
              JSON.parse(body).totalNutrients.WATER.quantity.toString() +
              JSON.parse(body).totalNutrients.WATER.unit +
              "\n";
          if (typeof JSON.parse(body).dietLabels != "undefined")
            c =
              c +
              "Diet Labels            = " +
              JSON.parse(body).dietLabels.toString() +
              "\n";
          if (typeof JSON.parse(body).totalNutrients.FIBTG != "undefined") {
            c =
              c +
              "FIBRE                   = " +
              JSON.parse(body).totalNutrients.FIBTG.quantity.toString() +
              JSON.parse(body).totalNutrients.FIBTG.unit +
              "\n";
          }
          c =
            c +
            "--------------------------------------------------------------------------------------------------\n";

          //bot.sendMessage("\n")

          c = c + "MINERALS\n----------------\n";
          if (JSON.parse(body).totalNutrients.NA.quantity != 0) {
            c =
              c +
              "Sodium          = " +
              JSON.parse(body).totalNutrients.NA.quantity.toString() +
              JSON.parse(body).totalNutrients.NA.unit +
              "\n";
          }
          if (JSON.parse(body).totalNutrients.MG.quantity != 0) {
            c =
              c +
              "Magnesium   = " +
              JSON.parse(body).totalNutrients.MG.quantity.toString() +
              JSON.parse(body).totalNutrients.MG.unit +
              "\n";
          }
          if (JSON.parse(body).totalNutrients.K.quantity != 0) {
            c =
              c +
              "Potassium    = " +
              JSON.parse(body).totalNutrients.K.quantity.toString() +
              JSON.parse(body).totalNutrients.K.unit +
              "\n";
          }
          if (JSON.parse(body).totalNutrients.FE.quantity != 0) {
            c =
              c +
              "Iron               = " +
              JSON.parse(body).totalNutrients.FE.quantity.toString() +
              JSON.parse(body).totalNutrients.FE.unit +
              "\n";
          }
          if (JSON.parse(body).totalNutrients.ZN.quantity != 0) {
            c =
              c +
              "Zinc              = " +
              JSON.parse(body).totalNutrients.ZN.quantity.toString() +
              JSON.parse(body).totalNutrients.ZN.unit +
              "\n";
          }
          if (JSON.parse(body).totalNutrients.P.quantity != 0) {
            c =
              c +
              "Phosphorus  = " +
              JSON.parse(body).totalNutrients.P.quantity.toString() +
              JSON.parse(body).totalNutrients.P.unit +
              "\n";
          }

          //bot.sendMessage("")
          c =
            c +
            "--------------------------------------------------------------------------------------------------\n";

          c = c + "VITAMINS\n------------------------\n";
          if (
            typeof JSON.parse(body).totalNutrients.VITC != "undefined" &&
            JSON.parse(body).totalNutrients.VITC.quantity != 0
          ) {
            c =
              c +
              "C           = " +
              JSON.parse(body).totalNutrients.VITC.quantity.toString() +
              JSON.parse(body).totalNutrients.VITC.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.VITB6A != "undefined" &&
            JSON.parse(body).totalNutrients.VITB6A.quantity != 0
          ) {
            c =
              c +
              "B6          = " +
              JSON.parse(body).totalNutrients.VITB6A.quantity.toString() +
              JSON.parse(body).totalNutrients.VITB6A.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.VITB12 != "undefined" &&
            JSON.parse(body).totalNutrients.VITB12.quantity != 0
          ) {
            c =
              c +
              "B12        = " +
              JSON.parse(body).totalNutrients.VITB12.quantity.toString() +
              JSON.parse(body).totalNutrients.VITB12.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.VITD != "undefined" &&
            JSON.parse(body).totalNutrients.VITD.quantity != 0
          ) {
            c =
              c +
              "D           = " +
              JSON.parse(body).totalNutrients.VITD.quantity.toString() +
              JSON.parse(body).totalNutrients.VITD.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.FOLAC != "undefined" &&
            JSON.parse(body).totalNutrients.FOLAC.quantity != 0
          ) {
            c =
              c +
              "FOLIC ACID  = " +
              JSON.parse(body).totalNutrients.FOLAC.quantity.toString() +
              JSON.parse(body).totalNutrients.FOLAC.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.VITA_RAE != "undefined" &&
            JSON.parse(body).totalNutrients.VITA_RAE.quantity != 0
          ) {
            c =
              c +
              "A           = " +
              JSON.parse(body).totalNutrients.VITA_RAE.quantity.toString() +
              JSON.parse(body).totalNutrients.VITA_RAE.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.TOCPHA != "undefined" &&
            JSON.parse(body).totalNutrients.TOCPHA.quantity != 0
          ) {
            c =
              c +
              "E           = " +
              JSON.parse(body).totalNutrients.TOCPHA.quantity.toString() +
              JSON.parse(body).totalNutrients.TOCPHA.unit +
              "\n";
          }
          if (
            typeof JSON.parse(body).totalNutrients.VITK1 != "undefined" &&
            JSON.parse(body).totalNutrients.VITK1.quantity != 0
          ) {
            c =
              c +
              "K1         = " +
              JSON.parse(body).totalNutrients.VITK1.quantity.toString() +
              JSON.parse(body).totalNutrients.VITK1.unit +
              "\n";
          }
          //bot.sendMessage(mg.chat.id,"Vitamins\n----------------------------------------------------------------\n"+str1)

          c =
            c +
            "-----------------------------------------------------------------------------------------------------\n";
          if (JSON.parse(body).healthLabels.includes("VEGETARIAN"))
            c = c + "This food is vegetarian\n";
          else c = c + "This is a non vegetarian food\n";

          if (JSON.parse(body).healthLabels.includes("VEGAN"))
            c = c + "This is a VEGAN food product\n";
          else c = c + "This is not a VEGAN food product\n";
          if (JSON.parse(body).healthLabels.includes("DAIRY_FREE"))
            c = c + "This is a Dairy free product\n";
          else c = c + "This product has Dairy in it\n";
          //bot.sendMessage(mg.chat.id,v)

          bot.sendMessage(mg.chat.id, c);
        } else {
          bot.sendMessage(
            mg.chat.id,
            "Whoa, you didn't type in the right food item" +
              "\n" +
              "kindly enter the appropriate food item "
          );
        }
      }
    );
  }
});
