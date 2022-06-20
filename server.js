const { default: axios } = require("axios");

const express = require("express");
const svm = require("./svm");
const app = express();
const port = 3000;

const getWeather = async () => {
  const array = [];
  const result = await axios.get("https://api.openweathermap.org/data/2.5/forecast?id=1215355&appid=8a2d725f8f921ecfb5d7695e3f64d126&units=metric");
  const response = await result.data;

  response.list.forEach((e) => {
    let point;
    switch (e.weather[0].id) {
      case 200:
        point = -1;
        break;
      case 201:
        point = -2;
        break;
      case 202:
        point = -3;
        break;
      case 210:
        point = -1;
        break;
      case 212:
        point = -1;
        break;
      case 221:
        point = -1;
        break;
      case 230:
        point = -1;
        break;
      case 231:
        point = -1;
        break;
      case 232:
        point = -2;
        break;
      //thundrrstrom

      case 300:
        point = -1;
        break;
      case 301:
        point = -1;
        break;
      case 302:
        point = -2;
        break;
      case 310:
        point = -1;
        break;
      case 312:
        point = -1;
        break;
      case 313:
        point = -2;
        break;
      case 314:
        point = -2;
        break;
      case 321:
        point = -1;
        break;
      //drizzle

      case 500:
        point = -1;
        break;
      case 501:
        point = -1;
        break;
      case 502:
        point = -2;
        break;
      case 503:
        point = -3;
        break;
      case 504:
        point = -3;
        break;
      case 511:
        point = -1;
        break;
      case 520:
        point = -1;
        break;
      case 521:
        point = -1;
        break;
      case 522:
        point = -2;
        break;
      case 531:
        point = -3;
        break;
      //rain

      default:
        point = 0;
      // code blocky
    }
    array.push(point);
  });
  return array;
};

let svmResult;
getWeather().then((weather) => {
  const avgWeather = weather.slice(weather.length - 4).reduce((a, b) => a + b) / 3;
  svm(avgWeather).then((svm) => {
    svmResult = svm.predict([
      [avgWeather, -1],
      [avgWeather, 0],
      [avgWeather, 1],
    ]);
  });
});

app.get("/", async (req, res) => {
  res.json({
    data: {
      rendah: svmResult[0],
      sedang: svmResult[1],
      tinggi: svmResult[2],
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
