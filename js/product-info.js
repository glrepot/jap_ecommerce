var comments_array = []; //array que contendrá los comentarios
var products_array = []; //array que contendrá los productos


function showProduct(array_to){
	document.getElementById("prod_div").innerHTML = 
	`<h2>` +array_to.category + " / " + array_to.name + `</h2> <hr>` + 
	
	`<p>` + array_to.description  + `</p>` + 
	
	`<b>` + "Costo: " + `</b>` + array_to.cost + " " + "USD" +`<br>`+ 
	
	`<b>` + "Cantidad vendidos: " + `</b>` + array_to.soldCount + `<br>`;
};


function showImgs(array_to){
	var imgsToAppend = "";
	for (i = 0; i < array_to.length; i++){
		let img = array_to[i];
		
		imgsToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + img + `" alt="">
            </div>
        </div>
        `
		
		document.getElementById("img_div").innerHTML = imgsToAppend;
	};
};


function showComms(array_to){
    var htmlContentToAppend = "";
	var starsToAppend = "";
    for(let i = 0; i < array_to.length; i++){
        let com = array_to[i];

        htmlContentToAppend += `
		<div class="mySlides card center" style="width: 18rem;">
		<div class="card-body">
		<h5 class="card-title">` + com.user + `</h5>
		<h6 class="card-subtitle mb-2 text-muted">` + com.score + `</h6>
		<p class="card-text">` + com.description + `</p>
		<p class="card-text">` + com.dateTime + `</p>
		</div>
		</div>`;
		

        document.getElementById("com_div").innerHTML = htmlContentToAppend;
    };
};
//`<h6 class="card-subtitle mb-2 text-muted">` + com.score + `</h6>

function pubComm() {
	var texto = document.getElementById("user_description").value;
	var user = sessionStorage.getItem("usuario");
	var time = new Date();
	var day = time.getDate();
	var month = time.getMonth() + 1;
	var year = time.getFullYear();
	
	document.getElementById("recent_com_si").innerHTML = `
		<div class="card center" style="width: 18rem;">
		<div class="card-body">
		<h5 class="card-title">` + user + `</h5>
		<h6 class="card-subtitle mb-2 text-muted">` + "score" + `</h6>
		<p class="card-text">` + texto + `</p>
		<p class="card-text">` + year + "-" + month + "-"+ day + `</p>
		</div>
		</div>`;
	
	sessionStorage.setItem("comentario_reciente", document.getElementById("recent_com_si").innerHTML);
};

var slideIndex = 1;

function showSlides(n) {
  let  slides = document.getElementsByClassName("mySlides"); 
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex - 1].style.display = "block"; 
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
	getJSONData(PRODUCT_INFO_URL).then(function(check){
        console.log("Check status: " + check.status);
        if (check.status === 'ok'){
            products_array = check.data;
            showProduct(products_array);
			showImgs(products_array.images);
        };
    });
	
	
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(check){
        console.log("Check status: " + check.status);
        if (check.status === 'ok'){
            comments_array = check.data;
            showComms(comments_array);
			showSlides(slideIndex);
        };
    });
	
	if(sessionStorage.getItem("comentario_reciente") == null){
		document.getElementById("recent_com_si").innerHTML = `
		<div class="card center" style="width: 18rem;">
			<div class="card-body">
				<h5 id="rec_user" class="card-title">hombre_azul</h5>
				<h6 id="rec_points" class="card-subtitle mb-2 text-muted">puntaje</h6>
				<p id="rec_desc" class="card-text">Este auto es muy rojo</p>
				<p id="rec_time" class="card-text">2021-09-01 10:00:21</p>
			</div>
		</div>`
		} else {
			document.getElementById("recent_com_si").innerHTML = sessionStorage.getItem("comentario_reciente");
		};
});