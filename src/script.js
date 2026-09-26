// Para acceder a los elementos del HTML ya no usamos document.getElementById —
// usamos document.querySelector, que acepta cualquier selector CSS (#id, .clase,
// etiqueta...) y no solo ids. Por ejemplo: document.querySelector("#filtro-nombre").

async function obtenerPersonajes() {
  const respuesta=await fetch("https://rickandmortyapi.com/api/character");
  const datos=await respuesta.json();
  return datos.results;
}

function filtrarPorEstado(personajes, estado) {
  if(!estado){
    return personajes;
  }
  else{
    /* console.log(personajes.filter(Personaje => Personaje.status === estado));
    console.log(estado); */
    

    return personajes.filter(Personaje => Personaje.status === estado);
  }// TODO: si estado viene vacío, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 2 de la práctica).
}

function filtrarPorEspecie(personajes, especie) {
  if(!especie){
    return personajes;
  }
  else{
    return personajes.filter(Personaje => Personaje.species === especie);
  }// TODO: si especie viene vacía, devuelve personajes tal cual. Si no, filtra
  // dejando solo los que coinciden (repasa el ejercicio 3 de la práctica).
}

function obtenerNombres(personajes) {
  return personajes.map(function (personaje) {
    return personaje.name;
  });
}

function buscarPorNombre(personajes, nombre) {
  return personajes.find(function (personaje) {
    return personaje.name === nombre;
  });
}

function hayPersonajesMuertos(personajes) {
  return personajes.some(function (personaje) {
    return personaje.status === "Dead";
  });
}

function todosVivos(personajes) {
  return personajes.every(function (personaje) {
    return personaje.status === "Alive";
  });
}

function ordenarPorNombre(personajes) {
  return [...personajes].sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function primeros(personajes, cantidad) {
  return personajes.slice(0 , cantidad);
}

function posicionDeNombre(nombres, nombre) {
  return nombres.indexOf(nombre);
}

function contarVivos(personajes) {
  return personajes.reduce(function (total, personaje) {
    return personaje.status === "Alive"? total+1:total;
  }, 0);
}

function contarMuertos(personajes) {
  return personajes.reduce(function (total, personaje) {
    return personaje.status === "Dead"? total+1:total;
  }, 0);
}

function contarDesconocidos(personajes) {
  return personajes.reduce(function (total, personaje) {
    return personaje.status === "unknown"? total+1:total;
  }, 0);
}

let personajes = [];

function aplicarFiltros() {
  setTimeout(() => {
  const nombre = document.querySelector("#filtro-nombre").value.trim().toLowerCase();
  const estado = document.querySelector("#filtro-estado").value;
  const especie = document.querySelector("#filtro-especie").value;
  
  let filtrados = filtrarPorEstado(personajes, estado);
  filtrados = filtrarPorEspecie(filtrados, especie);
  filtrados = filtrados.filter(function (personaje) {
    return personaje.name.toLowerCase().includes(nombre);
  });

  pintarResultados(filtrados);
  },0);
}

function pintarResultados(lista) {
  const contenedor = document.querySelector("#resultados");
  document.querySelector("#contador").textContent = lista.length + " personajes encontrados";
  document.querySelector("#contadoresIndividuales").textContent = contarVivos(lista)+ " vivos · "+contarMuertos(lista)+" muertos · "+contarDesconocidos(lista)+" desconocidos";
  document.querySelector("#hayMuertos").textContent = hayPersonajesMuertos(lista)?"Hay muertos en el resultado":null;
  document.querySelector("#todosVivos").textContent = todosVivos(lista)?"Todos Vivos":null;

  contenedor.innerHTML = lista
    .map(function (personaje) {
      return (
        '<article class="personaje-card">' +
        '<img src="' + personaje.image + '" alt="' + personaje.name + '" />' +
        "<h3>" + personaje.name + "</h3>" +
        "<p class='card-meta'><span>" +  personaje.status + "</span>" + personaje.species + "</p>" +
        "</article>"
      );
    })
    .join("");
}

document.querySelector("#filtro-nombre").addEventListener("input", aplicarFiltros);
document.querySelector("#filtro-estado").addEventListener("change", aplicarFiltros);
document.querySelector("#filtro-especie").addEventListener("change", aplicarFiltros);

obtenerPersonajes().then(function (datos) {
  personajes = datos;
  aplicarFiltros();
});