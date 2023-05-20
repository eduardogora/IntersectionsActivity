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

function getByFB(segms){
    console.log(segms);
    var inters = [];
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
                    inters.push(new Punto([pInter.x, pInter.y]));
                    console.log("I", segms[i])
                    console.log("j", segms[j])
            }

        }

    }
    return inters;

}