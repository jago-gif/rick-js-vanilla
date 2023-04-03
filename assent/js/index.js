let nombrePersonaje;
let sigPag;
let antPag;
let personajes;
let personajesActivos=[];
let api = 'https://rickandmortyapi.com/api/character';
const buscarPersonajes = async () => {
  try {
    const respuesta = await fetch(api);
     personajes = await respuesta.json();
    console.log(personajes);

    if (respuesta.status === 200) {
      sigPag = personajes.info.next;
      antPag = personajes.info.prev;
      personajesActivos = personajes.results
      if(sigPag==null){
        document.querySelector('#Siguiente').disabled = true;
      }else{
        document.querySelector('#Siguiente').disabled = false;
      }
      if(antPag==null){
        document.querySelector('#anterior').disabled = true;
      }else{
        document.querySelector('#anterior').disabled = false;
      }

      cargarPersonajes();
    }

  } catch (error) {
    console.log(error);
  }
}

buscarPersonajes();

document.getElementById("todos").addEventListener('click', function () {
  personajesActivos = personajes.results

  cargarPersonajes(); 
});

document.getElementById("vivos").addEventListener('click', function () {
  let x =document.getElementById('vivos').value;
  personajesActivos=null;
  personajesActivos=[];
  personajes.results.forEach(personaje => {
    if(personaje.status){
      personajesActivos.push(personaje);
    }
  });
  cargarPersonajes(); 
});

document.getElementById("muertos").addEventListener('click', function () {
  let x =document.getElementById('muertos').value;
  personajesActivos=null;
  personajesActivos=[];
  personajes.results.forEach(personaje => {
    if(personaje.status==(x)){
      personajesActivos.push(personaje);
    }
  });
  cargarPersonajes(); 
});

document.getElementById("desconocido").addEventListener('click', function () {
  let x =document.getElementById('desconocido').value;
  personajesActivos=null;
  personajesActivos=[];
  personajes.results.forEach(personaje => {
    if(personaje.status==(x)){
      personajesActivos.push(personaje);
    }
  });
  cargarPersonajes(); 
});

document.getElementById("Siguiente").addEventListener('click', function () {
  api = sigPag;
  buscarPersonajes();
});

document.getElementById("anterior").addEventListener('click', function () {
  api = antPag;
  buscarPersonajes();
});

document.getElementById("buscar").addEventListener('keyup', function () {
  let x =document.getElementById('buscar').value.toLowerCase();

  personajesActivos=null;
  personajesActivos=[];
  personajes.results.forEach(personaje => {
    if(personaje.name.toLowerCase().includes(x)){
      personajesActivos.push(personaje);
    }
  });
  cargarPersonajes(); 
})

let cargarPersonajes = function(){
  nombrePersonaje = '';
  personajesActivos.forEach(personaje => {
    nombrePersonaje += '<div class="card-container">' +
      '<a href="javascript:abrirModal('+personaje.id+')" class="hero-image-container" >' +
      '<img class="hero-image" src="' + personaje.image + '" alt="' + personaje.name + '"/>' +
      '</a>' +
      '<main class="main-content">' +
      '  <h2>' + personaje.name + '</h2>' +
      '  <p> Estado : ' + personaje.status + '</p>' +
      '  <p> Origen : ' + personaje.origin.name + '</p>' +
      '  <p> Especie : ' + personaje.species + '</p>' +
      '  <p> Genero : ' + personaje.gender + '</p>' +
      ' </main>' +
      '</div>'
  });
  document.getElementById('personaje').innerHTML = nombrePersonaje;
}

function abrirModal(id){
  let personajeSelect;
  datosPersonaje = '';
  personajesActivos.forEach(personaje => {
    if(personaje.id==id){
      personajeSelect=personaje
    }
  });
  if(personajeSelect!=null){
    datosPersonaje= 
    '<div id="myModal" class="modal">'+
      '<div class="modal-content">'+
                  // '  <button id="closeModal" class="close">&times;</button>'+
        '<h2 class="subTitulo">' + personajeSelect.name + '</h2>'+
        '<div class="contenedor">'+
          '<div class="contenido">'+
             '<img class="hero-image" src="' + personajeSelect.image + '" alt="' + personajeSelect.name + '"/>' +
             '<p>akjsdhkajshdkjashdkjasdhasd</p>'+

          '</div">'+

        '</div">'+
      '</div>'+
    '</div>'

    document.getElementById('personajeDatos').innerHTML = datosPersonaje;
  }
  console.log(personajeSelect.name)
  document.getElementById("personaje").style.visibility="hidden";


}

window.onclick = function() {
  datosPersonaje = '';
  document.getElementById('personajeDatos').innerHTML = datosPersonaje;
  document.getElementById("personaje").style.visibility="visible";
}
/*
document.getElementById("closeModal").addEventListener('click', function () {
  datosPersonaje = '';
  document.getElementById('personajeDatos').innerHTML = datosPersonaje;
});
*/