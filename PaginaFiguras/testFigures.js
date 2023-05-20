//Definicion De Clases

//Class Punto
class Punto{
  //Variables de la clase
  x;
  y;

  constructor(args){
      this.x = args[0];
      this.y = args[1];
  }

  dist(other){
      var d = ((pow((other.y - self.y), 2)) + (pow((other.x - self.x), 2)))**(1 / 2);
      return d;
  }
}

class Segmento{
  //Variables segmento
  puntoI;
  puntoF;
  //name;
  //m;
  //b;

  constructor(args){
      this.puntoI = args[0];
      this.puntoF = args[1];
      //this.name = args[2];
      //Parametros de la recta
      //this.b = 0;
      //this.m = this.getPendiente();
  }

  getPendiente(){
      //Segmento Vertical
      if(this.puntoI.x == this.puntoF.x){
          return 999999999999;
      }

      //Segmento Horizontal
      if(this.puntoI.y == this.puntoF.y){
          this.b = this.puntoI.y;
          return 0;
      }

      //Segmento
      if(this.puntoI.x < this.puntoF.x){
          return (this.puntoF.y - this.puntoI.y) / (this.puntoF.x - this.puntoI.x);
      }else{
          return (this.puntoI.y - this.puntoF.y) / (this.puntoI.x - this.puntoF.x);
      }
  }

  getValorX(y){
      if(this.puntoI.x < this.puntoF.x){
          var x1 = this.puntoI.x;
          var x2 = this.puntoF.x;
          var y1 = this.puntoI.y;
          var y2 = this.puntoF.y;
      }else{
          var x1 = this.puntoF.x;
          var x2 = this.puntoI.x;
          var y1 = this.puntoF.y;
          var y2 = this.puntoI.y;

      }
      var x = ((y - y1) * (x2 - x1) / (y2 - y1)) + x1;
      if(isNaN(x)){
          if(y == this.puntoI.y && y == this.puntoF.y){
              x = y;
          }
      }
      return x;
  }

}

//Funcion que compara arreglos
const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

//Funcion que te da el segmento de la figura
function getCords(figura, nombre, sigue){
  let vertices = figura.vertices;
  var pI;
  var pF;

  //Obtenemos Punto Inicial
  for(var i = 0; i < vertices.length; i++){
    if(compareArrays(nombre, vertices[i].nombre)){
      pI = new Punto([parseInt(vertices[i].x), parseInt(vertices[i].y)]);
    }
  }

  //Obtenemos punto final
  for(var i = 0; i < figura.aristas.length; i++){
    if(compareArrays(figura.aristas[i].nombre, sigue)){
      nombre = figura.aristas[i].origen;
      for(var j = 0; j < vertices.length; j++){
        if(compareArrays(nombre, vertices[j].nombre)){
          pF = new Punto([parseInt(vertices[j].x), parseInt(vertices[j].y)]);
        }
      }
    }
  }
  return(new Segmento([pI, pF]));
}

//Funcion de Dibujar
function draw(segms) {
  var inters;
  //var inters = getIntersections(segms);
  //var inters = getByFB(segms);
  
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1,0,0,-1,0,canvas.height);

    //Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segms.forEach(segm => {
      ctx.beginPath();
      //var tam = figura.puntos.length;
      ctx.moveTo(segm.segmento.puntoI.x, segm.segmento.puntoI.y);
      ctx.lineTo(segm.segmento.puntoF.x, segm.segmento.puntoF.y);
      
      //ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });
    
    /*inters.forEach(inter => {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(inter.x - 5, inter.y - 5, 10, 10);
    })*/
    
    
  }
}

//Funcion de Dibujar Intersecciones
function drawInters(segms, aristasT, verticesT) {
  //var inters = getIntersections(segms);
  /*Prueba Funcional
  var inters = getByFB(segms);
  */

  //Prueba
  var inters = getByFBAristas(aristasT, verticesT);
  //Endprueba

  
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1,0,0,-1,0,canvas.height);

    //Limpia el canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);



    
    inters.forEach(inter => {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(inter.x - 1, inter.y - 1, 2, 2);
    })
    
    
  }
}

//Codigo Funcional
var figuras = [];
var segms = [];
var segmsTotal = [];
var aristasT = [];
var verticesT = [];
var sDi = []; //Segmentos de Interseccion

//Función que inicia el programa
function start(){
  figuras = setFiguras();

  for(var i = 0; i < figuras.length; i++){
    let aristaInicial = figuras[i].aristas[0];

    for(var j = 0; j < figuras[i].aristas.length; j++){
      var seg = getCords(figuras[i], figuras[i].aristas[j].origen, figuras[i].aristas[j].sigue);
      let ari = {arista: figuras[i].aristas[j], segmento: seg};
      
      
      segms.push(ari);
      segmsTotal.push(ari);
      //Prueba
      aristasT.push(figuras[i].aristas[j]);
      //verticesT.push(figuras[i].vertices[j]);
      //EndPrueba
    }

    draw(segms);
  }
  console.log("verticesT", verticesT)
  drawInters(segmsTotal, aristasT,verticesT);
  
  //var prueba = getNewAristas(sDi);
  let interWithLines = setIntersectionWithLines(sDi);
  let newAristas = getNewAristas(interWithLines);
  let finalAristas = setNewAristas(newAristas);
  
}









  