const leer = (interacciones) => {
  let respuestas = {};
  let tiempo = 0;
  let corrects = 0;
  let tiempoIncorrecto = 0;
  let incorrects = 0;
  let postTimes = [];
  let postTimesProm = 0;
  for (let i = 0; i < interacciones.length; i++) {
    console.log(interacciones[i]["time"]);
    if (interacciones[i]["correct"] == true) {
      console.log(interacciones[i]["time"]);
      tiempo += parseInt(interacciones[i]["time"]);
      corrects += 1;
    } else {
      tiempoIncorrecto += interacciones[i]["time"];
      incorrects += 1;
      if (i + 1 < interacciones.length) {
        if (interacciones[i + 1]["correct"] != true) {
          let val =
            parseInt(interacciones[i + 1]["time"]) -
            parseInt(interacciones[i]["time"]);
          postTimes.push(val);
          postTimesProm += val;
        }
      }
    }
  }
  console.log("MI TIEMPO ", tiempo);
  let mediaResponse = tiempo / corrects;
  let mediaIncorrect = tiempoIncorrecto / incorrects;
  let postTimesProm2 = postTimesProm / (incorrects - 1);

  let valStandard = 0;
  let postTimesStandard = 0;

  for (let i = 0; i < interacciones.length; i++) {
    if (interacciones[i]["correct"] == true) {
      valStandard +=
        Math.abs(parseInt(interacciones[i]["time"]) - mediaResponse) ** 2;
    }
  }

  for (let i = 0; i < postTimes.length; i++) {
    postTimesStandard += Math.abs(i - postTimesProm2) ** 2;
  }

  let valStandard1 = valStandard / corrects;
  let valStandard2 = Math.sqrt(valStandard1);
  postTimesStandard = postTimesStandard / (incorrects - 1);
  postTimesStandard = Math.sqrt(postTimesStandard);

  respuestas = [];
  respuestas.push(mediaResponse);
  respuestas.push(incorrects);
  respuestas.push(mediaIncorrect);
  respuestas.push(postTimesStandard);
  console.log("El primerito ", respuestas[0]);

  return respuestas;
};

export default leer;
