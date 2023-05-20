function lineLineIntersection(A, B, C, D){
    //Line AB represented as a1x + b1y = c1
    var a1 = B.y - A.y;
    var b1 = A.x - B.x;
    var c1 = a1 * (A.x) + b1 * (A.y);

    // Line CD represented as a2x + b2y = c2
    var a2 = D.y - C.y;
    var b2 = C.x - D.x;
    var c2 = a2 * (C.x) + b2 * (C.y);

    var determinant = a1 * b2 - a2 * b1;

    if (determinant == 0){
        //The lines are parallel. This is simplified
        //by returning a pair of FLT_MAX
        //console.log("Det0 X; ", x, " Y: ", y);
        return new Punto([10**9, 10**9]);
    }else{
        var x = (b2 * c1 - b1 * c2) / determinant;
        var y = (a1 * c2 - a2 * c1) / determinant;
        //console.log("Det X; ", x, " Y: ", y);
        //console.log("y; ", y);
        return new Punto([x, y])
    }   
}

function comparePoints(newInter, inters){
    for(var i = 0; i < inters.length; i++){
        if(newInter.x == inters[i].x && newInter.y == inters[i].y){
            return true;
        }
    }
    return false;
}

function getByFB(segms){
    console.log(segms);
    var inters = [];
    var sDi = []; //Segmentos de Interseccion
    var n = segms.length;

    //Primer Segmento
    for(var i = 0; i < n; i++){
        var A = segms[i].puntoI;
        var B = segms[i].puntoF;

        //Segundo Segmento
        for(var j = i; j < n; j++){
            var C = segms[j].puntoI;
            var D = segms[j].puntoF;
            var pInter = lineLineIntersection(A, B, C, D);

            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(C.x, D.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(A.x, B.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(C.y, D.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(A.y, B.y)){
                                    var rango = true;
                                }
            else{
                                    var rango = false;
                            }
            
            if(rango == true){
                    newInter = new Punto([pInter.x, pInter.y]);
                    if(comparePoints(newInter, inters) == false){
                        inters.push(newInter);
                        sDi.push({segm1: segms[i], segm2: segms[j]});
                    }
                    //console.log("I", segms[i])
                    //console.log("j", segms[j])

            }

        }

    }
    console.log("Inters", inters)
    console.log("sDi", sDi)
    return inters;

}

function getSegmento(arista, vertices, aristas){
    var pI;
    var pF;
    //console.log(vertices);
    //console.log("Ahhh",arista);

    for(var i = 0; i < vertices.length; i++){
        if(arista.origen == vertices[i].nombre){
            pI = new Punto([vertices[i].x, vertices[i].y])
        }
        if(arista.sigue == vertices[i].nombre){
            pF = new Punto([vertices[i].x, vertices[i].y])
        }
    }

    return new Segmento([pI, pF]);

}

function getNewAristas(aristas){
    newAristas = [];
    var n = aristas.length;

    //Aqui colocamos el nombre y copias de las aristas
    for(var i = 0; i < n; i++){
        //Agregamos Arista Original
        var temp = [aristas[i].ar1, aristas[i].ar2];

        //Agregamos Arista Prima 1
        var nombre = aristas[i].ar1.arista.nombre + "*";
        var origen = aristas[i].ar1.arista.origen;
        var pareja = aristas[i].ar1.arista.pareja;
        var cara = aristas[i].ar1.arista.cara;
        var sigue = aristas[i].ar1.arista.sigue;
        var antes = aristas[i].ar1.arista.antes

        var newArista = {
            arista: new Arista(nombre, origen, pareja, cara, sigue, antes),
            segmento: aristas[i].ar1.segmento,
        };

        temp.push(newArista);

        //Agregamos Arista Prima 2
        nombre = aristas[i].ar2.arista.nombre + "*";
        origen = aristas[i].ar2.arista.origen;
        pareja = aristas[i].ar2.arista.pareja;
        cara = aristas[i].ar2.arista.cara;
        sigue = aristas[i].ar2.arista.sigue;
        antes = aristas[i].ar2.arista.antes

        newArista = {
            arista: new Arista(nombre, origen, pareja, cara, sigue, antes),
            segmento: aristas[i].ar2.segmento,
        };

        temp.push(newArista);
        temp.push({interseccion: aristas[i].interseccion});
        
        newAristas.push(temp);
        //EndPrueba
    }

    console.log("NewArista",newAristas)
    //Modificamos los valores
    for(var i = 0; i < newAristas.length; i++){
        //Aristas Originales
        newAristas[i][0].arista.pareja = newAristas[i][2].arista.nombre;
        newAristas[i][1].arista.pareja = newAristas[i][3].arista.nombre;

        //
    }

    console.log("DespuesDeModificar",newAristas)


    return newAristas;
}

function getByFBAristas(aristas, vertices){
    console.log("aristasF", aristas);
    console.log("verticesF", vertices);
    var inters = [];
    var n = segms.length;

    //Primer Segmento
    for(var i = 0; i < n; i++){
        console.log(aristas[i])
        var seg1 = getSegmento(aristas[i], vertices);
        //console.log("Seg1", seg1)
        console.log(segms[i])
        var A = segms[i].segmento.puntoI;
        var B = segms[i].segmento.puntoF;

        //Segundo Segmento
        for(var j = i; j < n; j++){
            var C = segms[j].segmento.puntoI;
            var D = segms[j].segmento.puntoF;
            var pInter = lineLineIntersection(A, B, C, D);

            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(C.x, D.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(A.x, B.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(C.y, D.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(A.y, B.y)){
                                    var rango = true;
                                }
            else{
                                    var rango = false;
                            }
            
            if(rango == true){
                    newInter = new Punto([pInter.x, pInter.y]);
                    if(comparePoints(newInter, inters) != 9){
                        inters.push(newInter);
                        sDi.push({ar1: segms[i], ar2: segms[j], interseccion: newInter});
                    }
                    //console.log("I", segms[i])
                    //console.log("j", segms[j])

            }

        }

    }
    //console.log("Inters", inters)
    console.log("sDi", sDi)

    return inters;

}