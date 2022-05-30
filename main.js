let habitaciones = [];

fetch('habitaciones.json')
    .then(res => res.json())
    .then(data => {
        habitaciones.push(data);
    })


console.log(habitaciones)

class Habitacion{
    constructor(id,nombre,camas,tipoCama,huespedes,tv,minibar,price,disponible) {
        this.id  = id
        this.nombre = nombre 
        this.camas = camas
        this.tipoCama = tipoCama
        this.huespedes = huespedes
        this.tv = tv
        this.minibar = minibar
        this.price = price
        this.disponbile = disponible
    }
}

// Agregar mas habitaciones al hotel
const agregarHabitaciones = () => {
    let id = parseInt(prompt("Ingresá el ID de la nueva habitación"));
    let nombre = prompt("Ingresá el nombre de la nueva habitación");
    let camas = parseInt(prompt("Ingresá cuantas camas tiene la habitación"));
    let tipoCama = prompt("Ingresá con que tipo de cama cuenta la habitación");
    let huespedes = parseInt(prompt("Ingresá cuantos huespedes se pueden quedar en la habitación"));
    let tv = confirm("Confirmá si la habitación tiene o no TV");
    let minibar = confirm("Ingresá si cuenta con minibar");
    let price = parseInt(prompt("Ingresá el valor por noche de la habitación"));
    let disponible = confirm("Está disponible?");

    let hh = new Habitacion(id,nombre,camas,tipoCama,huespedes,tv,minibar,price, disponible);
    habitaciones.push(hh);
}

//Date
let checkIn = document.getElementById("check-in");
let checkOut = document.getElementById("check-out");

function obtenerFecha(){   
    localStorage.setItem("checkIn.id",checkIn.value);
    localStorage.setItem("checkOut.id", checkOut.value);
   
    let checkInDate = new Date(checkIn.value);
    let checkOutDate = new Date(checkOut.value);
    let dateTotal = checkOutDate - checkInDate;
    localStorage.setItem("dateTotal", Math.floor(dateTotal / (1000 * 60 * 60 * 24)));
}



// Ingreso de huespedes

let huesp = $("#huesp").value;
localStorage.setItem("guests", huesp);

let btn = $("#botonBuscar");

btn.click( function() {
    obtenerFecha();
    guest();
});


function guest() {
    let huesp = document.querySelector("#huesp").value;
    const hFinal = habitaciones[0].filter(huesped => huesped.huespedes >= huesp);
    elemento = document.getElementById("ctnHab");
    while(elemento.firstChild) {
	elemento.removeChild(elemento.firstChild);
}
    hFinal.forEach(h => {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = "";
        contenedor.innerHTML = `<div class="row no-gutters">
                                    <div id="carouselExampleControls${h.id}" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                          <div class="carousel-item active">
                                            <img src=${h.img1} class="d-block w-100 imgCarousel" alt="...">
                                          </div>
                                          <div class="carousel-item">
                                            <img src=${h.img2} class="d-block w-100 imgCarousel" alt="...">
                                          </div>
                                          <div class="carousel-item">
                                            <img src=${h.img3} class="d-block w-100 imgCarousel" alt="...">
                                          </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${h.id}" data-bs-slide="prev">
                                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${h.id}" data-bs-slide="next">
                                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                          <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title"> ${h.nombre} </h5>
                                            <p class="card-text"> El valor por noche es de $${h.price}. </p>
                                            <p class="card-text"> Seleccionó ${localStorage.getItem("dateTotal")} dias </p>
                                            <a href="#" class="btn btn-primary" id="reservar" onclick="reservar(${h.id})">Reservar</a>
                                        </div>
                                    </div>
                                </div>`;
                                    
        contenedor.className = ("card mb-3");
        $("#ctnHab").append(contenedor);
        let reserva = $("#reservar");
        return reserva;
        return contenedor;
    })
}


let reserva = document.querySelector("#reservar")

function reservar(i){
    const room = habitaciones[0].find(rooms => rooms.id === i);
    let bcheck = document.createElement("div");
    bcheck.innerHTML="";
    $("#preReserva").empty();
    bcheck.innerHTML= ` <div class="card preReserva">
                            <div class="card-body">
                                <h5 class="card-title"><strong id="idHab">${room.nombre}</strong></h5>
                                <p class="card-text">Amenities:</p>
                                <ul class="ament">
                                    <li>Camas: ${room.camas}
                                    <li>Minibar: ${room.minibar}</li>
                                    <li>Televisor: ${room.tv}</li>
                                    <li>Tipo de Cama: ${room.tipoCama}</li>
                                    <li>Precio por noche: <span id="pHab">${room.price}</span></li>
                                </ul>
                                <ul class="ament">
                                    <li>Check In: ${moment(localStorage.getItem("checkIn.id")).format("Do MMM YY")} </li>
                                    <li>Check Out: ${moment(localStorage.getItem("checkOut.id")).format("Do MMM YY")} </li>
                                    <li>El valor total es de $${localStorage.getItem("dateTotal")*room.price}</li>
                                </ul>
                                <a href="./pago.html" class="btn btn-primary" onclick="checkout()">Confirmar selección</a>
                            </div>
                        </div>

                        
                        
                        <div class="divFechas">
            


                        </div>
                        
                        
                            
                        
                    </div>`;
    document.getElementById("preReserva").appendChild(bcheck);
}

function checkout(){
    sessionStorage.setItem("nombreHab", document.getElementById("idHab").innerHTML);
    sessionStorage.setItem("priceHab", document.getElementById("pHab").innerHTML);

    console.log(sessionStorage.getItem("priceHab"));
    console.log(sessionStorage.getItem("nombreHab"));

}