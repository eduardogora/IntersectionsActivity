class Arista {
    //Variable 
    nombre;
    origen;
    pareja;
    cara;
    sigue;
    antes;

    constructor(nombre, origen, pareja, cara, sigue, antes) {
      this.nombre = nombre;
      this.origen = origen;
      this.pareja = pareja;
      this.cara = cara;
      this.sigue = sigue;
      this.antes = antes;
    }
}

class Vertice {
    //Variable
    nombre;
    x;
    y;
    incidente;

    constructor(nombre,x,y,incidente) {
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.incidente = incidente;
    }
}

class Cara {
    nombre;
    interno;
    externo;

    constructor(nombre,interno,externo) {
        this.nombre = nombre;
        this.interno = interno;
        this.externo = externo;
    }
}

class Figura {
    //Variables
    aristas;
    vertices;
    caras;

    constructor(aristas, vertices, caras) {
        this.aristas = aristas;
        this.vertices = vertices;
        this.caras = caras;
    }
}

var numFiguras = 5;

function getAristas(i){
    let file = "";
    var aristas = [];

    if(i < 10){
        file = "./Figures/layer0" + i + ".aristas";
    }else{
        file = "./Figures/layer" + i + ".aristas";
    }
    var rawFile = new XMLHttpRequest();
    //Aristas
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;

                //Separamos en lineas
                var myArray = allText.split("\n");
                myArray.splice(0, 4);
                myArray.pop();

                //Agregamos un arista
                myArray.forEach(ar => {
                    var ns = ar.split(" ");
                    var nv = []
                    for(var i = 0; i < ns.length; i++){
                        if(ns[i] != "" && ns[i] != " "){
                            nv.push(ns[i]);
                        }
                    }
                    aristas.push(new Arista(nv[0], nv[1], nv[2], nv[3], nv[4], nv[5], )) 
                })  
                    
            }
        }
    }
    rawFile.send(null);
    

    return aristas;
    
}

function getCaras(i){
    let file = "";
    var caras = [];

    if(i < 10){
        file = "./Figures/layer0" + i + ".caras";
    }else{
        file = "./Figures/layer" + i + ".caras";
    }
    var rawFile = new XMLHttpRequest();
    //caras
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //Separamos en lineas
                var myArray = allText.split("\n");
                myArray.splice(0, 4);
                myArray.pop();

                //Agregamos una cara
                myArray.forEach(ar => {
                    var ns = ar.split(" ");
                    var nv = []
                    for(var i = 0; i < ns.length; i++){
                        if(ns[i] != "" && ns[i] != " "){
                            nv.push(ns[i]);
                        }
                    }
                    caras.push(new Cara(nv[0], nv[1], nv[2],)) 
                })                
            }
        }
    }
    rawFile.send(null);
    return caras;
    
}


function getVertices(i){
    let file = "";
    var vertices = [];

    if(i < 10){
        file = "./Figures/layer0" + i + ".vertices";
    }else{
        file = "./Figures/layer" + i + ".vertices";
    }
    var rawFile = new XMLHttpRequest();
    //vertices
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;

                //Separamos en lineas
                var myArray = allText.split("\n");
                myArray.splice(0, 4);
                myArray.pop();

                //Agregamos un vertice
                myArray.forEach(ar => {
                    var ns = ar.split(" ");
                    var nv = []
                    for(var i = 0; i < ns.length; i++){
                        if(ns[i] != "" && ns[i] != " "){
                            nv.push(ns[i]);
                        }
                    }
                    vertices.push(new Vertice(nv[0], nv[1], nv[2], nv[3], ));
                    verticesT.push(new Vertice(nv[0], nv[1], nv[2], nv[3], ));
                })             
            }
        }
    }
    rawFile.send(null);
    return vertices;
    
}

function setFiguras(){
    
    for(var i = 1; i <= numFiguras; i++){
        var aristas = getAristas(i);
        var vertices = getVertices(i);
        var caras = getCaras(i);

        figuras.push(new Figura(aristas, vertices, caras));
    }
    console.log("figuras", figuras)
    return figuras;
}

var getFilename = function (str) {
    return str.substring(str.lastIndexOf('/')+1);
}
