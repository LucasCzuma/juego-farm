/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var canvas_fondo = document.getElementById('canvas_fondo');
var canvas_context = canvas_fondo.getContext('2d');

//EVENTO QUE MOVERÁ AL LOBO AL USAR LAS TECLAS
document.addEventListener('keydown', moverLobo);

//REGISTRO DE LAS TECLAS
var teclas = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

//REGISTRO DE LOS ELEMENTOS QUE SE DIBUJARÁN EN EL CANVAS
var fondo = {
    url: 'tile.png',
    cargaOK: false
};
fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener('load', function(){
   fondo.cargaOK = true;
   dibujar();
});

var vaca = {
    url: 'vaco.png',
    cargaOK: false,
    cantidad: aleatorio(0, 10) //CANTIDAD DE VACAS QUE TENDRÁ EL CANVAS
};
vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener('load', function(){
    vaca.cargaOK = true;
    dibujar();
});

var cerdo = {
    url: 'cerdo.png',
    cargaOK: false,
    cantidad: aleatorio(0, 10) //CANTIDAD DE CERDOS QUE TENDRÁ EL CANVAS
};
cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener('load', function(){
   cerdo.cargaOK = true;
   dibujar();
});

var pollo = {
    url: 'polla.png',
    cargaOK: false,
    cantidad: aleatorio(0, 10) //CANTIDAD DE POLLOS QUE TENDRÁ EL CANVAS
};
pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener('load', function(){
   pollo.cargaOK = true;
   dibujar();
});

var lobo = {
    url: 'lobito.png',
    cargaOK: false,
    x: '',
    y: '',
    comidos: 0//CONTADOR DE ANIMALES COMIDOS POR EL LOBO
};
lobo.imagen = new Image();
lobo.imagen.src = lobo.url;
lobo.imagen.addEventListener('load', function(){
   lobo.cargaOK = true;
   dibujar();
});

var ogros = [];
ogros.push({
    url: 'ogro.png',
    cargaOK: false,
    x: '',
    y: ''
});
ogros.push({
    url: 'ogro.png',
    cargaOK: false,
    x: '',
    y: ''
});
for (var o = 0; o < ogros.length; o++) {
    ogros[o].imagen = new Image();
    ogros[o].imagen.src = ogros[o].url;
}
ogros[0].imagen.addEventListener('load', function(){
    ogros[0].cargaOK = true;
    dibujar();
});
ogros[1].imagen.addEventListener('load', function(){
    ogros[1].cargaOK = true;
    dibujar();
});
//--------------------FIN----------------------

//CREAMOS UNA VARIABLE QUE ALMACENARÁ LAS COORDENADAS DE CADA ANIMAL, ESTO ES PARA QUE NO CAMBIEN SU POSICIÓN CADA VEZ QUE EL CANVAS SE VUELVA A DIBUJAR
var coordenadasAnimales = [];

//FUNCIÓN PARA DIBUJAR LOS ELEMENTOS DEL CANVAS
function dibujar(){
    //SI NO TENEMOS LAS COORDENADAS DE LOS ANIMALES, EJECUTAMOS LA FUNCIÓN PARA OBTENER LAS POSICIONES
    if (coordenadasAnimales.length === 0) {
        crearCoordenadasAnimales();
    }
    
    //DIBUJO DEL FONDO
    if (fondo.cargaOK) {
        canvas_context.drawImage(fondo.imagen, 0, 0);
    }
    
    //DIBUJO DE LAS VACAS
    if (vaca.cargaOK) {
        for (var i = 0; i < coordenadasAnimales.length; i++) {
            //VALIDAMOS QUE EL ANIMAL ITERADO SEA UNA VACA Y QUE ESTÉ VISIBLE
            if (coordenadasAnimales[i].tipo === 'vaca' && coordenadasAnimales[i].visible) {
                canvas_context.drawImage(vaca.imagen, coordenadasAnimales[i].x, coordenadasAnimales[i].y);
            }
        }
    }
    
    //DIBUJO DE LOS CERDOS
    if (cerdo.cargaOK) {
        for (var i = 0; i < coordenadasAnimales.length; i++) {
            //VALIDAMOS QUE EL ANIMAL ITERADO SEA UN CERDO Y QUE ESTÉ VISIBLE
            if (coordenadasAnimales[i].tipo === 'cerdo' && coordenadasAnimales[i].visible) {
                canvas_context.drawImage(cerdo.imagen, coordenadasAnimales[i].x, coordenadasAnimales[i].y);
            }
        }
    }
    
    //DIBUJO DE LOS POLLOS
    if (pollo.cargaOK) {
        for (var i = 0; i < coordenadasAnimales.length; i++) {
            //VALIDAMOS QUE EL ANIMAL ITERADO SEA UN POLLO Y QUE ESTÉ VISIBLE
            if (coordenadasAnimales[i].tipo === 'pollo' && coordenadasAnimales[i].visible) {
                canvas_context.drawImage(pollo.imagen, coordenadasAnimales[i].x, coordenadasAnimales[i].y);
            }
        }
    }
    
    //DIBUJO DEL LOBO
    if (lobo.cargaOK){
        canvas_context.drawImage(lobo.imagen, lobo.x, lobo.y);
    }
    
    //DIBUJO DE LOS OGROS
    for (var o = 0; o < ogros.length; o++) {
        if (ogros[o].cargaOK) {
            canvas_context.drawImage(ogros[o].imagen, ogros[o].x, ogros[o].y);
        }
    }
    
    //DIBUJO DEL MENSAJE CONTADOR DEL PUNTAJE
    if (fondo.cargaOK && vaca.cargaOK && cerdo.cargaOK && pollo.cargaOK && lobo.cargaOK) {
        canvas_context.fillStyle = 'white';
        canvas_context.font = 'bold 16px Arial';
        canvas_context.fillText('Puntos: ' + lobo.comidos, 5, 20);
    }
}

//FUNCION PARA OBTENER UN VALOR ALEATORIO
function aleatorio(min, max){
    var resultado;
    resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

//FUNCIÓN PARA OBTENER LAS COORDENADAS DE TODOS LOS ANIMALES A DIBUJAR
function crearCoordenadasAnimales(){
    //VACAS
    for(var v = 0; v < vaca.cantidad; v++){
        var disponible = false;
        var coordenada = {
            x: '', //COORDENADA X
            y: '', //COORDENADA Y
            tipo: 'vaca', //TIPO DE ANIMAL
            visible: true //ESTATUS PARA SABER SI SE DIBUJARÁ O NO. SIRVE PARA SABER SI EL ANIMAL HA SIDO COMIDO.
        };
        //OBTENEMOS LAS COORDENADAS DEL ANIMAL
        while(disponible === false){
            var x = aleatorio(0, 5) * 80;
            var y = aleatorio(0, 5) * 80;
            coordenada.x = x;
            coordenada.y = y;
            disponible = estaDisponible(coordenada); 
        }
        //--------------------FIN----------------------
        coordenadasAnimales.push(coordenada);
    }
    
    //CERDOS
    for(var c = 0; c < cerdo.cantidad; c++){
        var disponible = false;
        var coordenada = {
            x: '', //COORDENADA X
            y: '', //COORDENADA Y
            tipo: 'cerdo', //TIPO DE ANIMAL
            visible: true //ESTATUS PARA SABER SI SE DIBUJARÁ O NO. SIRVE PARA SABER SI EL ANIMAL HA SIDO COMIDO.
        };
        //OBTENEMOS LAS COORDENADAS DEL ANIMAL
        while(disponible === false){
            var x = aleatorio(0, 5) * 80;
            var y = aleatorio(0, 5) * 80;
            coordenada.x = x;
            coordenada.y = y;
            disponible = estaDisponible(coordenada); 
        }
        //--------------------FIN----------------------
        coordenadasAnimales.push(coordenada);
    }
    
    //POLLOS
    for(var p = 0; p < pollo.cantidad; p++){
        var disponible = false;
        var coordenada = {
            x: '', //COORDENADA X
            y: '', //COORDENADA Y
            tipo: 'pollo', //TIPO DE ANIMAL
            visible: true //ESTATUS PARA SABER SI SE DIBUJARÁ O NO. SIRVE PARA SABER SI EL ANIMAL HA SIDO COMIDO.
        };
        //OBTENEMOS LAS COORDENADAS DEL ANIMAL
        while(disponible === false){
            var x = aleatorio(0, 5) * 80;
            var y = aleatorio(0, 5) * 80;
            coordenada.x = x;
            coordenada.y = y;
            disponible = estaDisponible(coordenada); 
        }
        //--------------------FIN----------------------
        coordenadasAnimales.push(coordenada);
    }
    
    //LOBO
    var disponible = false;
    var coordenada = {
        x: '', //COORDENADA X
        y: '', //COORDENADA Y
        tipo: 'lobo'//TIPO DE ANIMAL
    };
    //OBTENEMOS LAS COORDENADAS DEL ANIMAL
    while(disponible === false){
        var x = aleatorio(0, 5) * 80;
        var y = aleatorio(0, 5) * 80;
        coordenada.x = x;
        coordenada.y = y;
        disponible = estaDisponible(coordenada); 
    }
    //--------------------FIN----------------------
    lobo.x = coordenada.x;
    lobo.y = coordenada.y;
    
    //OGROS
    for (var o = 0; o < ogros.length; o++) {
        disponible = false;
        coordenada = {
            x: '', //COORDENADA X
            y: '', //COORDENADA Y
            tipo: 'ogro'//TIPO DE ANIMAL
        };
        //OBTENEMOS LAS COORDENADAS DEL ANIMAL
        while(disponible === false){
            var x = aleatorio(0, 5) * 80;
            var y = aleatorio(0, 5) * 80;
            coordenada.x = x;
            coordenada.y = y;
            disponible = estaDisponible(coordenada); 
        }
        //--------------------FIN----------------------
        ogros[o].x = coordenada.x;
        ogros[o].y = coordenada.y;
    }
}

//FUNCIÓN PARA SABER SI LA COORDENADA ACTUAL SE ENCUENTRA DISPONIBLE, ES DECIR QUE OTRO ANIMAL NO SE ENCUENTRE EN LA MISMA COORDENADA
//ESTO ES PARA NO TENER ANIMALES ENCIMA DE OTROS.
function estaDisponible(coordenada){
    for (var i = 0; i < coordenadasAnimales.length; i++) {
        if (coordenada.x === coordenadasAnimales[i].x && coordenada.y === coordenadasAnimales[i].y && coordenadasAnimales[i].visible === true) {
            return false;
        }
    }
    return true;
}

//EVENTO PARA MOVER AL LOBO
function moverLobo(event){
    var x = 0;
    var y = 0;
    //VALIDAMOS QUE LA TECLA PRESIONADA SEA ALGUNA DE LAS FLECHAS
    if (event.keyCode === teclas.LEFT || event.keyCode === teclas.UP || event.keyCode === teclas.RIGHT || event.keyCode === teclas.DOWN) {
        //ASIGNACIÓN DE VALORES NUEVOS PARA LAS COORDENADAS DEL LOBO
        switch(event.keyCode){
           case teclas.LEFT:
               x = -80;
               break;
           case teclas.UP:
               y = -80;
               break;
           case teclas.RIGHT:
               x = 80;
               break;
           case teclas.DOWN:
               y = 80;
               break;
        }
        //--------------------FIN----------------------
       
        //ASGINAMOS LAS NUEVAS COORDENADAS PARA EL LOBO
        lobo.x += x;
        lobo.y += y;
        //--------------------FIN----------------------

        //VALIDACIONES QUE SIRVEN PARA QUE EL LOBO NO SE SALGA DEL CANVAS
        if (lobo.x < 0) {
            lobo.x = 0;
        }
        if (lobo.x > (canvas_fondo.width - 100)) {
            lobo.x = canvas_fondo.width - 100;
        }
        if (lobo.y < 0) {
            lobo.y = 0;
        }
        if (lobo.y > (canvas_fondo.height - 100)) {
            lobo.y = canvas_fondo.height - 100;
        }
        //--------------------FIN----------------------
        
        //MOVIMIENTO DE OGROS
        for (var o = 0; o < ogros.length; o++) {
            moverOgro(ogros[o]);
        }
        
        dibujar(); //DIBUJAMOS NUEVAMENTE EL CANVAS

        //CUANDO EL LOBO SEA ALCANZADO POR EL OGRO, ENVIAMOS UN MENSAJE
        for (var o = 0; o < ogros.length; o++) {
            if (lobo.x === ogros[o].x && lobo.y === ogros[o].y){
                canvas_context.fillStyle = 'white';
                canvas_context.font = 'bold 16px Arial';
                canvas_context.fillText('Has sido alcanzado por el ogro... :D',  canvas_fondo.width / 5, canvas_fondo.height / 2);
                canvas_context.fillText('Fin del juego!!',  canvas_fondo.width / 5, canvas_fondo.height / 2.5);
                document.removeEventListener('keydown', moverLobo);
            }
        }

        //CUANDO TODOS LOS ANIMALES HAYAN SIDO COMIDOS, ENVIAMOS UN MENSAJE EN EL CANVAS
        if (coordenadasAnimales.length === lobo.comidos) {
            canvas_context.fillStyle = 'white';
            canvas_context.font = 'bold 16px Arial';
            canvas_context.fillText('Has acabado con todos los animales... :(',  canvas_fondo.width / 5, canvas_fondo.height / 2);
            document.removeEventListener('keydown', moverLobo);
        }
        //--------------------FIN----------------------
    }
}

//FUNCIÓN PARA MOVER A LOS OGROS
function moverOgro(ogro){
    //CODIGO Y ALGORITMO PARA EL MOVIMIENTO AUTOMÁTICO DEL OGRO
    //BÚSQUEDA DE POSICIONES DISPONIBLES
    var posicionesDisponibles = [];
    for (var i = 0; i < 5; i++) {
        var posicionPosible = {
            x: ogro.x,
            y: ogro.y,
            distancia: 0
        };
        switch(i){
            case 0:
                posicionPosible.x += 80;
            break;
            case 1:
                posicionPosible.x -= 80;
            break;
            case 2:
                posicionPosible.y += 80;
            break;
            case 3:
                posicionPosible.y -= 80;
            break;
            case 4:
                //AQUÍ DEJAMOS QUE LA POSICION POSIBLE CUENTE CON LAS MISMAS COORDENADAS QUE LAS DEL OGRO
                //YA QUE TAL VEZ EL PUNTO MÁS CERCANO ES NO MOVERSE.
            break;
        }
        if (posicionPosible.x > 480
            || posicionPosible.x < 0
            || posicionPosible.y > 480
            || posicionPosible.y < 0) {
                //POSICIÓN FUERA DE LOS LIMITES
            }
            else {
                if (estaDisponible(posicionPosible)) {
                    //Determinamos la distancia de esta posible posición con respecto a la posición del lobo.
                    posicionPosible.distancia = Math.sqrt(Math.pow(lobo.x - posicionPosible.x, 2) + Math.pow(lobo.y - posicionPosible.y, 2));
                    posicionesDisponibles.push(posicionPosible);
                }        
            }
        }

    //BÚSQUEDA DE LAS POSICIONES POSIBLES A PARTIR DE LAS POSICIONES DISPONIBLES
    if (posicionesDisponibles.length > 0) {
        var posicionesPosibles = [];
        for (var p = 0; p < posicionesDisponibles.length; p++) {
            if (posicionesPosibles.length > 0) {
                if (posicionesDisponibles[p].distancia === posicionesPosibles[0].distancia) {
                    posicionesPosibles.push(posicionesDisponibles[p]);
                }
                else if (posicionesDisponibles[p].distancia < posicionesPosibles[0].distancia) {
                    posicionesPosibles = [];
                    posicionesPosibles.push(posicionesDisponibles[p]);
                }
            }
            else {
                posicionesPosibles.push(posicionesDisponibles[p]);
            }
        }
        if (posicionesPosibles.length > 0) {
            var item = aleatorio(0, posicionesPosibles.length - 1);
            ogro.x = posicionesPosibles[item].x;
            ogro.y = posicionesPosibles[item].y;
        }
    }
    //--------------------FIN----------------------

    //CODIGO QUE SE EJECUTA CUANDO EL LOBO ALCANZA A UN ANIMAL
    for (var a = 0; a < coordenadasAnimales.length; a++) {
        //VALIDAMOS QUE EL LOBO ESTÉ EN LAS MISMAS COORDENADAS QUE EL ANIMAL Y QUE EL MISMO ANIMAL ESTÉ VISIBLE 
        if (coordenadasAnimales[a].x === lobo.x && coordenadasAnimales[a].y === lobo.y && coordenadasAnimales[a].visible) {
            lobo.comidos++; //AUMENTAMOS EL CONTADOR DE ANIMALES COMIDOS POR EL LOBO
            coordenadasAnimales[a].visible = false; //CAMBIAMOS EL ESTATUS DEL ANIMAL COMIDO PARA NO VOLVERLO A DIBUJAR
            break;
            
        }
        //else (coordenadasAnimales)
        console.log(lobo.comidos)
    }
    //--------------------FIN----------------------
}