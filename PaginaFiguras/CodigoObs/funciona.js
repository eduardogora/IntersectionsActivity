//Creamos clase Nodo
class Node{
    constructor(label, parent, segmento){
        self.label = label;
        self.segmento = segmento;
        self.right = None;
        self.left = None;
        self.parent = parent;
    }

    //Metodos para asignar nodos
    getLabel(){
        return self.label;
    }

    setLabel(label){
        self.label = label;
    }

    getLeft(){
        return self.left;
    }

    setLeft(left){
        self.left = left;
    }

    getRight(){
        return self.right;
    }

    setRight(right){
        self.right = right;
    }

    getParent(){
        return self.parent;
    }

    setParent(parent){
        self.parent = parent;
    }
}

//Class BinarySearchTree
class BinarySearchTree{
    constructor(){
        self.root = None;
    }

    insert(label, name){
        //Creamos un nodo
        var new_node = new Node(label, none, name);
        //Si el arbol esta vacio
        if(self.empty()){
            self.root = new_node
        }else{
            //Si el arbol no esta vacio
            var curr_node = self.root;
            while(curr_node != None){
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
        if(self.root == None){
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
    constructor(args){
        //le.log("Gora: ", args);
        self.puntoI = args[0];
        //le.log("Test: ",self.puntoI);
        self.puntoF = args[1];
        self.name = args[2];
        self.isActive = false;
        self.colorActive = 'r';
        self.colorRest = 'b';
        //Parametros de la recta
        self.m = this.getPendiente();
        self.b = 0;
    }

    getPendiente(){
        //Segmento Vertical
        //le.log("GetPendienteT: ",this);
        //le.log("PruebaGora: ", JSON.stringify(this));
        //le.log("GetPendienteS: ",self.puntoI);
        if(self.puntoI.x == self.puntoF.x){
            return 999999999999;
        }

        //Segmento Horizontal
        if(self.puntoI.y == self.puntoF.y){
            return 0;
        }

        //Segmento
        if(self.puntoI.x < self.puntoF.x){
            return (self.puntoF.y - self.puntoI.y) / (self.puntoF.x - self.puntoI.x);
        }else{
            return (self.puntoI.y - self.puntoF.y) / (self.puntoI.x - self.puntoF.x);
        }
    }

    getValorX(y){
        if(self.puntoI.x < self.puntoF.x){
            var x1 = self.puntoI.x;
            var x2 = self.puntoF.x;
            var y1 = self.puntoI.y;
            var y2 = self.puntoF.y;
        }else{
            var x1 = self.puntoF.x;
            var x2 = self.puntoI.x;
            var y1 = self.puntoF.y;
            var y2 = self.puntoI.y;

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
        nodeList.append(curr_node);

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
        return Punto(10**9, 10**9)
    }else{
        var x = (b2 * c1 - b1 * c2) / determinant
        var y = (a1 * c2 - a2 * c1) / determinant
        return Punto(x, y)
    }   
}

//Variables internas
var segms = [];

var np = new Punto([1, 1]);
le.log(np);
le.log("NuevoPunto: ", np.x);

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
    le.log("El segmento ", i, " tiene pI ", segms[i]);
    le.log("El segmento ", i, " tiene pF ", segms[i].puntoF);
}

function printSegmentos(){
    
    le.log(segms);
}

        
