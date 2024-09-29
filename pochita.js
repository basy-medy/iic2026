
// Bastián Medina Gómez

function crearCirculo(svgElement, x, y, r, clase){
    let circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circulo.setAttribute("cx", x);
    circulo.setAttribute("cy", y);
    circulo.setAttribute("r", r);
    circulo.setAttribute("class", clase);
    svgElement.appendChild(circulo);
    return circulo;
}

function crearRectangulo(svgElement, x, y, width, height , clase){
    let rectangulo = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectangulo.setAttribute("x", x);
    rectangulo.setAttribute("y", y);
    rectangulo.setAttribute("width", width);
    rectangulo.setAttribute("height", height);
    rectangulo.setAttribute("class", clase);
    svgElement.appendChild(rectangulo);
    
    return rectangulo; 
}

function crearEllipse(svgElement, cx, cy, rx, ry, clase){
    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("cx", cx);
    ellipse.setAttribute("cy", cy);
    ellipse.setAttribute("rx", rx);
    ellipse.setAttribute("ry", ry);
    ellipse.setAttribute("class", clase);
    svgElement.appendChild(ellipse);
    
    return ellipse;
}

function rotarElemento(element, grado, x, y) {
    // Construimos la cadena de transformación
    let transformValue = "rotate(" + grado + "," + x + "," + y + ")";
    // Establecemos el atributo 'transform' con la nueva transformación
    element.setAttribute("transform", transformValue);
}

function crearPochita(SVG){
    
    // CUERPO
    crearCirculo(SVG, 300, 300, 150, "pelaje-pochita");
    crearRectangulo(SVG, 150, 308, 299, 205, "cuerpo");

    // MANIJA DETRAS SIERRA
    crearRectangulo(SVG, 216, 105, 218, 36, "manija");

    // SIERRA
    const x_t1 = 170;
    const y_t1 = 60;
    const x_t2 = 95;
    const y_t2 = 124;
    const x_t3 = 220;
    const y_t3 = 106;
    const x_t4 = 150;
    const y_t4 = 175;
    const x_t5 = 95;
    const y_t5 = 53;

    crearRectangulo(SVG, x_t1, y_t1, 20, 20, "borde_sierra");
    crearRectangulo(SVG, x_t2, y_t2, 20, 20, "borde_sierra");
    crearRectangulo(SVG, x_t3, y_t3, 20, 20, "borde_sierra");
    crearRectangulo(SVG, x_t4, y_t4, 20, 20, "borde_sierra");
    crearRectangulo(SVG, x_t5, y_t5, 20, 20, "borde_sierra");
    

    const x0 = 180;
    const y0 = 65;

    const siera = crearRectangulo(SVG, x0, y0, 130, 100, "sierra");
    rotarElemento(siera, 45, x0, y0);
    
    crearCirculo(SVG, 142, 100, 53, "borde_sierra")
    crearCirculo(SVG, 142, 100, 48, "fill_sierra")
    crearCirculo(SVG, 150, 108, 48, "fill_sierra")



    //ELIPSE SOBRE SIERRA
    crearEllipse(SVG, 320, 227, 120, 80, "cuerpo")



    // OJOS
    crearCirculo(SVG, 325, 255, 45, "ojos-pochita");
    crearCirculo(SVG, 320, 250, 40, "pupila-pochita");

    // MANIJA
    crearCirculo(SVG, 400, 200, 35, "manija");
    crearRectangulo(SVG, 367, 128, 67, 77, "manija");
    

    // BOCA
    crearEllipse(SVG, 200, 330, 30, 60, "boca");

    // DIENTES
    const x1 = 230;
    const y1 = 326;
    const x2 = 170;
    const y2 = 326;

    const dienteIzquierdo = crearRectangulo(SVG, x1, y1, 20, 20, "dientes");
    const dienteDerecho = crearRectangulo(SVG, x2, y2, 20, 20, "dientes");
  
    rotarElemento(dienteIzquierdo, 45, x1, y1); 
    rotarElemento(dienteDerecho, 45, x2, y2);  
    
    // MEJILLAS
    crearCirculo(SVG, 170, 295, 50, "mejilla_borde");
    crearCirculo(SVG, 170, 290, 50, "mejilla");
    crearCirculo(SVG, 230, 295, 50, "mejilla_borde");
    crearCirculo(SVG, 230, 290, 50, "mejilla");
    
    
}

function eventoDarkMode(){    
    document.getElementById('dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});}

function eventoAnimacionOJO(SVG) {
    // Seleccionar el elementos
    let pupila = SVG.querySelector('.pupila-pochita');
    let ojo = SVG.querySelector('.ojos-pochita');

    // Guardar la posición original de la pupila
    const centroPupilaX = parseFloat(pupila.getAttribute('cx'));
    const centroPupilaY = parseFloat(pupila.getAttribute('cy'));
    const radioPupila = parseFloat(pupila.getAttribute('r'));

    // Guardar atributos del Ojo 
    const centroOjoX = parseFloat(ojo.getAttribute('cx'));
    const centroOjoY = parseFloat(ojo.getAttribute('cy'));
    const radioOjo = parseFloat(ojo.getAttribute('r')); 

    SVG.addEventListener('mousemove', function(event) {
        // coordenadas donde esta el cursor
        let rect = SVG.getBoundingClientRect();
        // considerar que el svg tiene una posicion
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top ;

        // calculo nueva posicion pupila
        let dx = x - centroOjoX;
        let dy = y - centroOjoY;
        let distancia = Math.sqrt(dx * dx + dy * dy);
        
        // Calcular factor de movimiento asegurando que la pupila no salga del ojo
        let distanciaMaxPupila = radioOjo - radioPupila;
        let factorOjo = Math.min(distanciaMaxPupila, distancia) / distancia;

        // Actualizar posición de la pupila con el factor ajustado
        pupila.setAttribute("cx", centroOjoX + dx * factorOjo);
        pupila.setAttribute("cy", centroOjoY + dy * factorOjo);   
    });

    SVG.addEventListener('mouseout', function() {
        // resetear posicion inicial del ojo
        pupila.setAttribute("cx", centroPupilaX);
        pupila.setAttribute("cy", centroPupilaY);
    });
}

function eventoResizePochita(SVG){
    let scale = 1; 
    
    document.getElementById('+').addEventListener('click', function() {
        if (scale < 0.97) scale += 0.03;;
        SVG.style.transform = `scale(${scale})`;
    });

    document.getElementById('-').addEventListener('click', function() {
        if (scale > 0.47) scale -= 0.03;
        SVG.style.transform = `scale(${scale})`;
    });

}

function crearEventos(SVG){
    eventoDarkMode();

    eventoResizePochita(SVG);

    eventoAnimacionOJO(SVG);
}

function bye(){    
    window.document.title = 'Adios';
}

function pochita(){
    let SVG = document.getElementById("pochita");
    SVG.setAttribute("width", "500");
    SVG.setAttribute("height", "500");

    crearPochita(SVG);

    crearEventos(SVG);
}

function eventoAdicional(){
    window.addEventListener('blur', function() {
        document.title = 'No te vayas😪';
      });
    
    window.addEventListener('focus', function() {
        document.title = 'Pochita';
      });
}

pochita()
eventoAdicional()
