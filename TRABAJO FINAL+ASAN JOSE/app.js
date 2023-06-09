//carrito visible

var carritoVisible = false;
 if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
 }else{
    ready();
 }
 function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
 }

    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoCliked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarCliked)
}

 function eliminarItemCarrito(event){
    var buttonCliked = event.target;
    buttonCliked.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito();
 }

 function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio)
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
 }
  
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity='0';
        carritoVisible = false
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
  
function sumarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    }
}

function agregarAlCarritoCliked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
        alert("El item ya se encuentra en el Carrito");
        return;
        }
    }

    var itemCarritoContenido = `    
    <div class="carrito-item">
                <img src="${imagenSrc}" alt=""  width="80px">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-cantidad"></i>
                        <input type="text" value="0" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${precio}</span>
                </div>
                <span class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </span>    
            </div>
        `
        item.innerHTML = itemCarritoContenido;
        itemsCarrito.append(item);

        item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

        var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
        botonSumarCantidad.addEventListener('click', sumarCantidad);

        var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
        botonRestarCantidad.addEventListener('click', restarCantidad);
    
}


function pagarCliked(event){
    alert("Gracias por su Compra");

    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//api

window.addEventListener('load' , ()=> {

	let lon 
	let lat
	
	let temperaturaValor = document.getElementById('temperatura-valor')
	let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

	let ubicacion = document.getElementById('ubicacion')
	let iconoAnimado = document.getElementById('icono-animado')

	let vientoVelocidad = document.getElementById('viento-velocidad')

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition( posicion => {

			lon = posicion.coords.longitude
			lat = posicion.coords.latitude

			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ddc069a031eddcfb2c1ca0cdc230536f`
		
		
		fetch(url)
			.then( response => { return response.json() })
			.then( data => {
				let kelvin = Math.round(data.main.temp)
				let temp = Math.round(kelvin - 273.15);
				temperaturaValor.textContent = `${temp} °c`

				

				ubicacion.textContent = data.name

				vientoVelocidad.textContent = `${data.wind.speed} m/s`
			
			switch (data.weather[0].main) {
				case 'Thunderstrom':
					iconoAnimado.src='animated/thunder.svg'
					console.log('TORMENTA');
					break;
				case 'Drizzel':
					iconoAnimado.src='animated/rainy-2.svg'
					console.log('LLOVIZNA');
					break;
				case 'Rain':
					iconoAnimado.src='animated/rainy-7.svg'
					console.log('LLUVIA');
					break;
				case 'Clear':
					iconoAnimado.src='animated/day.svg'
					console.log('LIMPIO');
					break;
				case 'Atmosphere':
					iconoAnimado.src='animated/weather.svg'
					console.log('ATMOSFERA');
					break;
				case 'Clouds':
					iconoAnimado.src='animated/cloudy-day-1.svg'
					console.log('NUBES');
					break;
				default:
						iconoAnimado.src='animated/cloudy-day-1.svg'
						console.log('por defecto');	

					
			}

			})
			.catch( error => {
				console.log(error)
			})	
		  
		})
	}
})

