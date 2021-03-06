var c_nombre, c_edad, c_email, c_telefono
	c_nombre = document.getElementById('campo_nombre')
	c_edad = document.getElementById('campo_edad')
	c_email = document.getElementById('campo_email')
	c_telefono = document.getElementById('campo_numero')


var datos = new Object();
	datos.nombre = null;
	datos.edad = null;
	datos.email = null;
	datos.telefono = null;
	

function campo_status(status){
	c_nombre.disabled = status;
	c_edad.disabled = status;
	c_email.disabled = status;
	c_telefono.disabled = status;
};


function modifyData(){
	campo_status(false);
};


function saveData(){
	if((c_nombre.value.length && c_edad.value.length && c_email.value.length && c_telefono.value.length) > 0){
		datos.nombre = c_nombre.value;
		datos.edad = c_edad.value;
		datos.email = c_email.value;
		datos.telefono = c_telefono.value;
		localStorage.setItem("datos_user", JSON.stringify(datos));
		console.log(localStorage.getItem("datos_user"));
		removeRojo(true);
		campo_status(true);
	} else {
		removeRojo(false);
	};
};


function removeRojo(tf){
	if(tf == true){
		c_nombre.classList.remove("error");
		c_edad.classList.remove("error");
		c_email.classList.remove("error");
		c_telefono.classList.remove("error");
	} else {
		c_nombre.classList.add("error");
		c_edad.classList.add("error");
		c_email.classList.add("error");
		c_telefono.classList.add("error");
	};
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	//deshabilitar edicion campos
	campo_status(true);
	
	//chequear si hay datos o no
	var check_data = localStorage.getItem("datos_user")
	if(check_data != null){
		var datos_json = JSON.parse(check_data);
			c_nombre.value = datos_json.nombre; 
			c_edad.value = datos_json.edad; 
			c_email.value = datos_json.email; 
			c_telefono.value = datos_json.telefono;
			console.log(datos_json)
	};
});