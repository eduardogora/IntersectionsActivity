class InterConLineas {
  //Variables de la clase
  interseccion;
  lineas;

  constructor(args) {
    this.interseccion = args;
    this.lineas = [];
  }
}

function lineLineIntersection(A, B, C, D) {
  //Line AB represented as a1x + b1y = c1
  var a1 = B.y - A.y;
  var b1 = A.x - B.x;
  var c1 = a1 * A.x + b1 * A.y;

  // Line CD represented as a2x + b2y = c2
  var a2 = D.y - C.y;
  var b2 = C.x - D.x;
  var c2 = a2 * C.x + b2 * C.y;

  var determinant = a1 * b2 - a2 * b1;

  if (determinant == 0) {
    //The lines are parallel. This is simplified
    //by returning a pair of FLT_MAX
    return new Punto([10 ** 9, 10 ** 9]);
  } else {
    var x = (b2 * c1 - b1 * c2) / determinant;
    var y = (a1 * c2 - a2 * c1) / determinant;
    return new Punto([x, y]);
  }
}

function comparePoints(newInter, inters) {
  for (var i = 0; i < inters.length; i++) {
    if (newInter.x == inters[i].x && newInter.y == inters[i].y) {
      return true;
    }
  }
  return false;
}

function compareLines(line, lines) {
  for (var i = 0; i < lines.length; i++) {
    if (line == lines[i].nombre) {
      return false;
    }
  }
  return true;
}

function samePoint(p1, p2) {
  if (p1.x == p2.x && p1.y == p2.y) {
    return true;
  }

  return false;
}

function getByFB(segms) {
  var inters = [];
  var sDi = []; //Segmentos de Interseccion
  var n = segms.length;

  //Primer Segmento
  for (var i = 0; i < n; i++) {
    var A = segms[i].segmento.puntoI;
    var B = segms[i].segmento.puntoF;

    //Segundo Segmento
    for (var j = i; j < n; j++) {
      var C = segms[j].segmento.puntoI;
      var D = segms[j].segmento.puntoF;
      var pInter = lineLineIntersection(A, B, C, D);

      if (
        pInter.x >= Math.min(A.x, B.x) &&
        pInter.x >= Math.min(C.x, D.x) &&
        pInter.x <= Math.max(C.x, D.x) &&
        pInter.x <= Math.max(A.x, B.x) &&
        pInter.y >= Math.min(A.y, B.y) &&
        pInter.y >= Math.min(C.y, D.y) &&
        pInter.y <= Math.max(C.y, D.y) &&
        pInter.y <= Math.max(A.y, B.y)
      ) {
        var rango = true;
      } else {
        var rango = false;
      }

      if (rango == true) {
        newInter = new Punto([pInter.x, pInter.y]);
        if (comparePoints(newInter, inters) == false) {
          inters.push(newInter);
          sDi.push({ segm1: segms[i], segm2: segms[j] });
        }
      }
    }
  }
  console.log(sDi);
  return inters;
}

function getSegmento(arista, vertices, aristas) {
  var pI;
  var pF;

  for (var i = 0; i < vertices.length; i++) {
    if (arista.origen == vertices[i].nombre) {
      pI = new Punto([vertices[i].x, vertices[i].y]);
    }
    if (arista.sigue == vertices[i].nombre) {
      pF = new Punto([vertices[i].x, vertices[i].y]);
    }
  }

  return new Segmento([pI, pF]);
}

var numInt = 1;

function getByFBAristas(aristas, vertices) {
  var inters = [];
  var n = segms.length;

  //Primer Segmento
  for (var i = 0; i < n; i++) {
    var seg1 = getSegmento(aristas[i], vertices);
    //console.log("Seg1", seg1);
    var A = segms[i].segmento.puntoI;
    var B = segms[i].segmento.puntoF;

    //Segundo Segmento
    for (var j = i; j < n; j++) {
      var C = segms[j].segmento.puntoI;
      var D = segms[j].segmento.puntoF;
      var pInter = lineLineIntersection(A, B, C, D);

      if (
        pInter.x >= Math.min(A.x, B.x) &&
        pInter.x >= Math.min(C.x, D.x) &&
        pInter.x <= Math.max(C.x, D.x) &&
        pInter.x <= Math.max(A.x, B.x) &&
        pInter.y >= Math.min(A.y, B.y) &&
        pInter.y >= Math.min(C.y, D.y) &&
        pInter.y <= Math.max(C.y, D.y) &&
        pInter.y <= Math.max(A.y, B.y)
      ) {
        var rango = true;
      } else {
        var rango = false;
      }

      if (rango == true) {
        newInter = new Punto([pInter.x, pInter.y]);
        if (comparePoints(newInter, inters) != 10) {
          inters.push(newInter);
          //Prueba
          //verticesT.push(new Vertice("inter" + numInt, pInter.x, pInter.y, null));
          //sDi.push({ar1: segms[i], ar2: segms[j], interseccion: newInter});
          sDi.push({ ar: segms[i], interseccion: newInter });
          sDi.push({ ar: segms[j], interseccion: newInter });
          //numInt++;
          //EndPrueba

          //sDi.push({ar1: segms[i], ar2: segms[j], interseccion: newInter}); // Este se debe de descomentar
        }
        //console.log("I", segms[i])
        //console.log("j", segms[j])
      }
    }
  }
  console.log("Inters", inters);
  //console.log("sDi", sDi);

  return inters;
}

function getIntersWithLines(obj) {
  var n = obj.length;

  for (var i = 0; i < n; i++) {}
}

function setIntersectionWithLines(object) {
  var interWithLines = [];
  var intersTemp = [];
  var n = object.length;

  //Contabilizamos las distintas intersecciones
  for (var i = 0; i < n; i++) {
    if (!comparePoints(object[i].interseccion, intersTemp)) {
      intersTemp.push(object[i].interseccion);
    }
  }

  //Agregamos las intersecciones como vertices
  var numInt = 0;
  for (var i = 0; i < intersTemp.length; i++) {
    let vertice = new Vertice(
      "inter" + numInt,
      intersTemp[i].x,
      intersTemp[i].y,
      null
    );
    verticesT.push(vertice);
    interWithLines.push(new InterConLineas(vertice));
    numInt++;
  }
  console.log("IntersTemp", intersTemp);

  console.log(verticesT);

  //Creamos objetos
  /*
    for(var i = 0; i < intersTemp.length; i++){
        interWithLines.push(new InterConLineas(intersTemp[i]));
    }*/

  //Agregamos las lineas
  for (var i = 0; i < n; i++) {
    //
    for (var j = 0; j < interWithLines.length; j++) {
      if (samePoint(object[i].interseccion, interWithLines[j].interseccion)) {
        if (
          compareLines(object[i].ar.arista.nombre, interWithLines[j].lineas)
        ) {
          interWithLines[j].lineas.push(object[i].ar.arista);
        }
      }
    }
  }

  //console.log("MEro Final",interWithLines);
  return interWithLines;
}

function getNewAristas(iWl) {
  /*iWl = inter with lines*/
  let n = iWl.length;
  let ars = [];
  for (var i = 0; i < n; i++) {
    let linTemp = iWl[i].lineas.slice();
    let linTemp2 = linTemp.slice();
    for (var j = 0; j < linTemp.length; j++) {
      linTemp2.push(iWl[i].lineas[j]);
    }
    iWl[i].lineas = linTemp2;
  }
  return iWl;
}

function findAristaByOrigenAndSigue(aristas, origen, sigue) {
  return aristas.find((arista) => {
    if (sigue) {
      return arista.origen === origen && arista.sigue === sigue;
    } else {
      return arista.origen === origen;
    }
  });
}

function getIndexByName(aristOrd, name) {
  //console.log(aristOrd, name)
  return aristOrd.findIndex((arista) => arista.nombre === name);
}

function setNewAristas(ars, vertices) {
  let n = ars.length;
  for (var i = 0; i < n; i++) {
    let aristTemp = JSON.parse(JSON.stringify(ars[i].lineas));
    let m = aristTemp.length;
    let half = Math.floor(m / 2);
    // Order vertices
    let pivot = ars[i].interseccion;
    let vertTemp = JSON.parse(JSON.stringify(vertices));
    //console.log()
    // Remove puntos with the same .x and .y values as intersection
    vertTemp = vertTemp.filter(
      (vertex) => vertex.x !== pivot.x || vertex.y !== pivot.y
    );

    let pivotX = Number(pivot.x);
    let pivotY = Number(pivot.y);

    vertTemp.sort((a, b) => {
      // Retrieve the x and y values from the current vertex objects
      let vertexAX = Number(a.x);
      let vertexAY = Number(a.y);
      let vertexBX = Number(b.x);
      let vertexBY = Number(b.y);

      // Calculate the angles using the vertex coordinates and pivot coordinates
      let angleA = Math.atan2(vertexAX - pivotX, vertexAY - pivotY);
      let angleB = Math.atan2(vertexBX - pivotX, vertexBY - pivotY);

      // Adjust the angles to ensure clockwise sorting
      if (angleA < 0) angleA += 2 * Math.PI;
      if (angleB < 0) angleB += 2 * Math.PI;

      return angleA - angleB;
    });

    console.log("Updated", vertTemp);

    for (var j = 0; j < m; j++) {
      if (j < half) {
        aristTemp[j].pareja = aristTemp[j].pareja + "*";
      } else {
        aristTemp[j].nombre = aristTemp[j].nombre + "*";
        aristTemp[j].origen = pivot.nombre;
      }
    }

    var aristOrd = [];
    for (let v of vertTemp) {
      //console.log("Before", aristTemp, v.nombre)
      let tempOrig = findAristaByOrigenAndSigue(aristTemp, v.nombre);
      //console.log("Gora", tempOrig)

      let temp1;

      if (tempOrig != undefined) {
        temp1 = findAristaByOrigenAndSigue(
          aristTemp,
          pivot.nombre,
          tempOrig.nombre
        );

        //console.log("ahhhhhhhhhhhh",temp1)
        if (temp1 != undefined) {
          aristOrd.push(temp1);
          aristOrd.push(tempOrig);
        }
      }
    }

    for (var j = 0; j < m; j++) {
      let indexSig = 0;
      let indexPrev = 0;
      let m = aristOrd.length;

      const index = getIndexByName(aristOrd, aristTemp[j].nombre);
      //console.log("Index", index)
      if (index == m - 1) {
        indexSig = 0;
      } else {
        indexSig = index + 1;
      }
      if (index == 0) {
        indexPrev = m - 1;
      } else {
        indexPrev = index - 1;
      }

      if (index != -1) {
        /*console.log("aristOrd", aristOrd)
        console.log("indexSig", indexSig)
        console.log("indexPrev", indexPrev)
        console.log("m", m)*/
        aristTemp[j].sigue = aristOrd[indexSig].nombre;
        aristTemp[j].antes = aristOrd[indexPrev].nombre;
      }
    }
    console.log("Hii", aristTemp);
    //intersTemp = getByFBAristas(aristTemp, vertices);
    //console.log("Bye", intersTemp);
    ars[i].lineas = aristTemp;
    for (var k = i + 1; k < n; k++) {
      for (var k = 0; k < n; k++) {
        if (k != i) {
          for (var k2 = 0; k2 < ars[k].lineas.length; k2++) {
            var linea = ars[k].lineas[k2];
            var matchingLine = aristTemp.find(
              (arist) => arist.nombre === linea.nombre
            );
            if (matchingLine) {
              //console.log("Intersection:", ars[k].interseccion);
              //console.log("Matching Line:", matchingLine);
              ars[k].lineas[k2] = matchingLine;
            }
          }
        }
      }
    }
  }
  return ars;
}

function checkLineInList(list, name) {
  var n = list.length;
  for (var i = 0; i < n; i++) {
    if (list[i].nombre == name) {
      return true;
    }
  }
  return false;
}

function getCycles(lines) {
  console.log("test", lines);
  var lineasF = [];

  var n = lines.length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < lines[i].lineas.length; j++) {
      //Aqui puede ser necesario que realicemos un cambio con la ultima aparicion de la arista
      if (!checkLineInList(lineasF, lines[i].lineas[j].nombre)) {
        lineasF.push(lines[i].lineas[j]);
      }
    }
  }
  console.log("lineasF", lineasF);
}
