nombreHabitacion = document.getElementById("pName");
nombreHabitacion.innerHTML = sessionStorage.getItem("nombreHab");

precioHabitacion = document.getElementById("pPrice");
precioHabitacion.innerHTML = `$${sessionStorage.getItem("priceHab")}`;

precioFinal = document.getElementById("finalPrice");
precioFinal.innerHTML = `$${sessionStorage.getItem("priceHab")*localStorage.getItem("dateTotal")}`;