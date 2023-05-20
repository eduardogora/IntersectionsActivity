//Creamos clase Nodo
class Node{
    //Variables
    label;
    segmento;
    right;
    left;
    parent;

    constructor(label, parent, segmento){
        this.label = label;
        this.segmento = segmento;
        this.right = null;
        this.left = null;
        this.parent = parent;
    }

    //Metodos para asignar nodos
    getLabel(){
        return this.label;
    }

    setLabel(label){
        this.label = label;
    }

    getLeft(){
        return this.left;
    }

    setLeft(left){
        this.left = left;
    }

    getRight(){
        return this.right;
    }

    setRight(right){
        this.right = right;
    }

    getParent(){
        return this.parent;
    }

    setParent(parent){
        this.parent = parent;
    }
}

//Si la linea es horizontal. bajar ya no la cuenta. Revisar si pendiente es 0, hacer algo mas

//Class BinarySearchTree
class BinarySearchTree{
    //Variables
    root;

    constructor(){
        this.root = null;
    }

    insert(label, name){
        //Creamos un nodo
        var new_node = new Node(label, null, name);
        //Si el arbol esta vacio
        if(this.empty()){
            this.root = new_node
        }else{
            //Si el arbol no esta vacio
            var curr_node = this.root;
            while(curr_node != null){
                var parent_node = curr_node;
                if(new_node.getLabel() < curr_node.getLabel()){
                    curr_node = curr_node.getLeft();
                }else{
                    curr_node = curr_node.getRight();
                }
            }
            if(new_node.getLabel() < parent_node.getLabel()){
                parent_node.setLeft(new_node);
            }else{
                parent_node.setRight(new_node);
            }
            new_node.setParent(parent_node);
        }
    }

    empty(){
        if(this.root == null){
            return true;
        }else{
            return false;
        }
    }
}

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
    name;
    isActive;
    colorActive;
    colorRest;
    m;
    b;

    constructor(args){
        ////console.log("Gora: ", args);
        this.puntoI = args[0];
        ////console.log("Test: ",this.puntoI);
        this.puntoF = args[1];
        this.name = args[2];
        this.isActive = false;
        this.colorActive = 'r';
        this.colorRest = 'b';
        //Parametros de la recta
        this.m = this.getPendiente();
        this.b = 0;
    }

    getPendiente(){
        //Segmento Vertical
        ////console.log("GetPendienteT: ",this);
        ////console.log("PruebaGora: ", JSON.stringify(this));
        ////console.log("GetPendienteS: ",self.puntoI);
        if(this.puntoI.x == this.puntoF.x){
            return 999999999999;
        }

        //Segmento Horizontal
        if(this.puntoI.y == this.puntoF.y){
            this.b;
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
        return x;
    }

}

//Recorrido In Order
function InOrder2(curr_node, nodeList){
    if(curr_node){
        // First recur on left child
        InOrder2(curr_node.left, nodeList);

        //then print the data of node
        nodeList.push(curr_node);

        //now recur on right child
        InOrder2(curr_node.right, nodeList);
    }
    return nodeList;
}

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

//Variables internas
var segms = [];

var np = new Punto([1, 1]);
//console.log(np);
//console.log("NuevoPunto: ", np.x);

segms = [
    new Segmento([new Punto([6, 10]), new Punto([16, 0]), "l1"]),
    new Segmento([new Punto([8, 10]), new Punto([18, 0]), "l2"]),
    new Segmento([new Punto([10, 10]), new Punto([10, 0]), "l3"]),
    new Segmento([new Punto([12, 10]), new Punto([2, 0]), "l4"]),
    new Segmento([new Punto([16, 10]), new Punto([12, 0]), "l5"])
  ];
  
  segms = [
    new Segmento([new Punto([1, 0]), new Punto([3, 2]), "l1"]),
    new Segmento([new Punto([1, 3]), new Punto([3, 1]), "l2"]),
  ];
  
  segms = [
    new Segmento([new Punto([1, 4]), new Punto([5, 2]), "l1"]),
    new Segmento([new Punto([3, 1]), new Punto([6, 4]), "l2"]),
    new Segmento([new Punto([5, 4]), new Punto([7, 1]), "l3"]),
  ];

  

//var n = segms.length;
//Fin Variables Internas
for(var i = 0; i < segms.length; i++){
    //console.log("El segmento ", i, " tiene pI ", segms[i]);
    //console.log("El segmento ", i, " tiene pF ", segms[i].puntoF);
}

//Algoritmo de intersecciones
function getIntersections(segms){
    //Variables
    var inters = [];
    var res = [];

    var n = segms.length;

    var x = [];
    var y = [];

    
    var eventos = [];

    var contador = 0;
    var fin;

    //Algoritmo
    for(var i = 0; i < n; i++){
        //Se agregan coordenadas
        x.push(segms[i].puntoI.x);
        x.push(segms[i].puntoF.x);
        y.push(segms[i].puntoI.y);
        y.push(segms[i].puntoF.y);

    }

    //Las y s ordenan de forma descendente
    y.sort((a,b)=>b-a);

    //Quitamos los duplicados
    eventos = [...new Set(y)];
    //eventos = y;

    //console.log(eventos);

    fin = eventos.length - 1;
    console.log("Eventos: ", eventos);
    console.log("Fin: ", fin);

    while(contador < fin){
        if(contador > 20){
            contador = 1000;
            console.log("Sale por aquiiiiiiii")
        }
        console.log("Contador: ",contador);
        console.log("fin: ",fin);
        console.log("Eventos: ", eventos);

        console.log("Evento 1: ", eventos[contador]);
        console.log("Evento 2: ", eventos[contador + 1]);
        if(contador == 3){
            console.log('soy el tres')
        }

        //console.log("Estoy en la vuelta ", contador);
        //console.log("El fin vale ", fin);
        var evalY1 = eventos[contador];
        var evalY2 = eventos[contador + 1];

        var arbol1 = new BinarySearchTree();
        var arbol2 = new BinarySearchTree();

        //Creamos los arboles binarios
        segms.forEach(s => {

            if(evalY1 >= Math.min(s.puntoI.y, s.puntoF.y) && evalY1 <= Math.max(s.puntoI.y, s.puntoF.y)){
                var valor1 = s.getValorX(evalY1);
                console.log("Segmento Arbol 1: ", s)
                console.log("Valor 1: ", valor1)
                //Prueba
                if(s.m == 0){
                    arbol1.insert(evalY1, s);
                }
                //EndPrueba
                if(valor1 < 9999999){
                    arbol1.insert(s.getValorX(evalY1), s);
                }
            }

            if(evalY2 >= Math.min(s.puntoI.y, s.puntoF.y) && evalY2 <= Math.max(s.puntoI.y, s.puntoF.y)){
                var valor2 = s.getValorX(evalY2);
                //Prueba
                if(s.m == 0 && valor2 == isNaN(valor2)){
                    arbol2.insert(evalY2, s);
                }
                //EndPrueba
                console.log("Segmento 2: ", s)
                console.log("EvalY2 ", evalY2)
                console.log("Valor 2: ", valor2)
                if(valor2 < 9999999){
                    arbol2.insert(s.getValorX(evalY2), s);
                    console.log("Segmento Arbol 2: ", s)
                }
            }   
            
            
        });

        //Valores del Inorden de los arboles
        var list1 = [];
        var list2 = [];

        //Los nombres de las rectass
        var lin1 = [];
        var lin2 = [];

        //Obtenemos los recorridos
        list1 = InOrder2(arbol1.root, list1);
        list2 = InOrder2(arbol2.root, list2);

        for(var i = 0; i < list1.length; i++){
            lin1.push(list1[i].segmento.name);
        }
        
        for(var i = 0; i < list2.length; i++){
            lin2.push(list2[i].segmento.name);
        }
        ////console.log("Lin1: ", lin1);

        //Revisamos si hay intersecciones
        var pos = [];

        console.log("list1: ", list1);
        console.log("list2: ", list2);

        console.log("lin1: ", lin1);
        console.log("lin2: ", lin2);

        if(!compareArrays(lin1, lin2)){
            //Hay Intersecciones

            //Revisamos que no se repita un punto para el nodo 1
            pos = [];
            var nodo1 = InOrder2(arbol1.root, list1);
            nodo1.forEach(nodo => {
                if(!pos.includes(nodo.label) ){
                    
                    pos.push(nodo.label);
                }{
                    if(nodo1.length != pos.length){
                        //Prueba
                        //EndPrueba
                        evalY1 = evalY1 -.01;
                        arbol1 = new BinarySearchTree();
                        segms.forEach(s =>{
                            arbol1.insert(s.getValorX(evalY1), s);
                        });
                    }
                }
            });

            //Revisamos que no se repita un punto para el nodo 2
            pos = [];
            var nodo2 = InOrder2(arbol2.root, list2);
            nodo2.forEach(nodo => {
                if(!pos.includes(nodo.label)){
                    pos.push(nodo.label);
                }{
                    if(nodo2.length != pos.length){
                        evalY2 = evalY2 -.01;
                        arbol2 = new BinarySearchTree();
                        segms.forEach(s =>{
                            
                            arbol2.insert(s.getValorX(evalY2), s);
                        });
                    }
                }
            });

            //Revisamos y comparamos
            list1 = InOrder2(arbol1.root, list1);
            list2 = InOrder2(arbol2.root, list2);

            //console.log("Vuelta ", contador, " list1: ", list1);
            //console.log("Vuelta ", contador, " list2: ", list2);

            var txt1 = [];
            var txt2 = [];
            var num = 0;

            for(var i = 0; i < n; i++){
                txt1.push(list1[i].segmento.name);
                txt2.push(list2[i].segmento.name);
            }

            
            console.log("txt1: ", txt1);
            console.log("txt2: ", txt2);

            if(list1.length < list2.length){
                for(var i = 0; i < list1.length; i++){
                
                    //console.log("list1: ", list1);
                    //console.log("list2: ", list2);
    
                    if(list1[i].segmento.name != list2[i].segmento.name){
                        //console.log("list1: ", list1[i].segmento);
                        //console.log("list2: ", list2[i].segmento);
                        //console.log("Si hay interseccion");
                        //Interseccion en pos 0
                        //console.log("Eventos    ",eventos);
                        if(i == 0){
                            //console.log("Interseccion en pos 0");
                            //Revisamos derecha
                            var A = list1[i].segmento.puntoI;
                            var B = list1[i].segmento.puntoF;
                            var C = list1[i + 1].segmento.puntoI;
                            var D = list1[i + 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list1[i].segmento.name, l2: list1[i + 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //console.log("Intersect: ", intersect);
                            //console.log("pInter: ", pInter);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                
                                //console.log(contador);
                            }else{
                                contador++;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree();
    
                        }
                        //Interseccion en el ultimo punto
                        else if(i == list1.length - 1){
                            //console.log("Interseccion en pos last");
                            //Revisamos Izquierda
                            var A = list1[i].segmento.puntoI;
                            var B = list1[i].segmento.puntoF;
                            var C = list1[i - 1].segmento.puntoI;
                            var D = list1[i - 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list1[i].segmento.name, l2: list1[i - 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                            if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                
                                //console.log(contador);
                            }else{
                                contador++;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree(); 
                        }
                        //Interseccion general
                        else{
                            var band1 = false;
                            var band2 = false;
                            //console.log("Interseccion en pos inter");
                            //Revisamos derecha
                            var A = list1[i].segmento.puntoI;
                            var B = list1[i].segmento.puntoF;
                            var C = list1[i + 1].segmento.puntoI;
                            var D = list1[i + 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list1[i].segmento.name, l2: list1[i + 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                band1 = true;
                                //console.log("Estoy entrando");
                                //console.log(contador);
                            }else{
                                //contador++;
                                band1 = false;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree();

    
                            //Revisamos Izquierda
                            var A = list1[i].segmento.puntoI;
                            var B = list1[i].segmento.puntoF;
                            var C = list1[i - 1].segmento.puntoI;
                            var D = list1[i - 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list1[i].segmento.name, l2: list1[i - 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                band2 = true;
                                //console.log("Estoy entrando");
                                //console.log(contador);
                            }else{
                                //contador++;
                                band2 = false;
                            }
                            if(band1 == false && band2 == false){
                                console.log('entro aqui prros')
                                //contador++;
                            }else{
                                console.log('Hay alguna interseccion')
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree(); 
                        }
                    }
                    //console.log("Test: ",eventos);
                }
            }else{
                for(var i = 0; i < list2.length; i++){
                
                    //console.log("list1: ", list1);
                    //console.log("list2: ", list2);
    
                    if(list1[i].segmento.name != list2[i].segmento.name){
                        //console.log("list1: ", list1[i].segmento);
                        //console.log("list2: ", list2[i].segmento);
                        //console.log("Si hay interseccion");
                        //Interseccion en pos 0
                        //console.log("Eventos    ",eventos);
                        if(i == 0){
                            //console.log("Interseccion en pos 0");
                            //Revisamos derecha
                            var A = list2[i].segmento.puntoI;
                            var B = list2[i].segmento.puntoF;
                            var C = list2[i + 1].segmento.puntoI;
                            var D = list2[i + 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
                            
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list2[i].segmento.name, l2: list2[i + 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //console.log("Intersect: ", intersect);
                            //console.log("pInter: ", pInter);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                
                                //console.log(contador);
                            }else{
                                contador++;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree();
    
                        }
                        //Interseccion en el ultimo punto
                        else if(i == list2.length - 1){
                            //console.log("Interseccion en pos last");
                            //Revisamos Izquierda
                            var A = list2[i].segmento.puntoI;
                            var B = list2[i].segmento.puntoF;
                            var C = list2[i - 1].segmento.puntoI;
                            var D = list2[i - 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list2[i].segmento.name, l2: list2[i - 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                            if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                
                                //console.log(contador);
                            }else{
                                contador++;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree(); 
                        }
                        //Interseccion general
                        else{
                            var band1 = false;
                            var band2 = false;
                            //console.log("Interseccion en pos inter");
                            //Revisamos derecha
                            var A = list2[i].segmento.puntoI;
                            var B = list2[i].segmento.puntoF;
                            var C = list2[i + 1].segmento.puntoI;
                            var D = list2[i + 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list2[i].segmento.name, l2: list2[i + 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                band = true;
                                //console.log("Estoy entrando");
                                //console.log(contador);
                            }else{
                                //contador++;
                                band1 = false;
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree();
    
                            //Revisamos Izquierda
                            var A = list2[i].segmento.puntoI;
                            var B = list2[i].segmento.puntoF;
                            var C = list2[i - 1].segmento.puntoI;
                            var D = list2[i - 1].segmento.puntoF;
                            var pInter = lineLineIntersection(A, B, C, D);
    
                            if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    var rango = true;
                                }
                            else{
                                    var rango = false;
                            }
    
                            var intersect = {I: pInter, l1: list2[i].segmento.name, l2: list2[i - 1].segmento.name,};
                            console.log("Aqui se intersecta: ", intersect);
                            //if(!inters.includes(pInter) && rango == true){
                                if(!comparePoints(pInter, inters) && rango == true){
                                res.push(intersect);
                                //Agregamos el evento en la posicion y
                                eventos.splice(contador + 1, 0, pInter.y);
                                inters.push(pInter);
                                fin ++;
                                band = true;
                                //console.log("Estoy entrando");
                                //console.log(contador);
                            }else{
                                //contador++;
                                band2 = false;
                            }
                            if(band1 == false && band2 == false){
                                console.log('entro aqui prros')
                                //contador++;
                            }else{
                                console.log('Hay alguna interseccion')
                            }
                            arbol1 = new BinarySearchTree();
                            arbol2 = new BinarySearchTree(); 
                        }
                    }
                    //console.log("Test: ",eventos);
                }
            }
            

                        
        }else{
            //No hay intersecciones
            contador++;
        }

        //console.log(contador);
        
    }
    //console.log("Res: ", res);
    //console.log("Intersecciones: ", inters);
    console.log("contador termino en: ", contador);
    console.log("Fin termino en: ", fin);
    return inters;

}

//Funcion que compara arreglos
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

function comparePoints(p1, points){
    var band = false;
    points.forEach(punto => {
        if(p1.x == punto.x && p1.y == punto.y){
            band = true;
        }
    });
    return band;
}

function printSegmentos(){
    var A = new Punto([1, 3]);
    var B = new Punto([3, 5]);
    var C = new Punto([5, 1]);
    var D = new Punto([2, 3]);
    var pInter = lineLineIntersection(A, B, C, D);

    if (pInter.x >= Math.min(A.x, B.x) && pInter.x >= Math.min(A.x, B.x)
                                && pInter.x <= Math.max(C.x, D.x) && pInter.x <= Math.max(C.x, D.x)
                                && pInter.y >= Math.min(A.y, B.y) && pInter.y >= Math.min(A.y, B.y)
                                && pInter.y <= Math.max(C.y, D.y) && pInter.y <= Math.max(C.y, D.y)){
                                    console.log(pInter);
                                }
    console.log("No existe");
}

        
