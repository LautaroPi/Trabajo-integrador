//funcion aplica el estilo a la opcion seleccionada en el menu y quita la previamente seleccionada
function seleccionar(link){
    var opciones = document.querySelectorAll('#links a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //hacemos desaparecer el menu una vez que se selecciona una opcion en el modo resposive
    var x = document.getElementById("nav");
    x.className = "";
}
//funcion mostrar menu
function resposiveMenu(){
    var x = document.getElementById("nav");
    if(x.className === ""){
        x.className = "resposive";

    }else{
        x.className = "";
    }
}

$(document).ready(function() {
    // Ocultamos todos los pasos excepto el primero
    $(".paso").not("#paso1").hide();
  
    // Botones de navegación
    $(".btn-siguiente").click(function() {
      var $thisPaso = $(this).closest(".paso");
      var $siguientePaso = $thisPaso.next(".paso");
      $thisPaso.hide();
      $siguientePaso.show();
    });
    $(".btn-anterior").click(function() {
      var $thisPaso = $(this).closest(".paso");
      var $anteriorPaso = $thisPaso.prev(".paso");
      $thisPaso.hide();
      $anteriorPaso.show();
    })
    // Definimos las variables que almacenarán los valores del formulario
    var nombreVal = "";
    var correoVal = "";
    var temaVal = "";
    var mensajeVal = "";
  
    // Agregamos la validación de campos utilizando jQuery Validate
    $("#contact-form").validate({
      rules: {
        nombre: {
          required: true,
          minlength: 2
        },
        correo: {
          required: true,
          email: true
        },
        tema: {
          required: true,
          minlength: 5
        },
        mensaje: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        nombre: "Por favor, ingrese su nombre",
        correo: {
          required: "Por favor, ingrese su correo electrónico",
          email: "Por favor, ingrese un correo electrónico válido"
        },
        tema: "Por favor, ingrese un tema",
        mensaje: '<i class="fa fa-comment"></i> Por favor ingresa tu mensaje'
  
      },
      submitHandler: function(form) {
        // Si el formulario es válido, almacenamos los valores de los campos en las variables correspondientes
        nombreVal = $("#nombre").val();
        correoVal = $("#correo").val();
        temaVal = $("#tema").val();
        mensajeVal = $("#mensaje").val();
  
        // Generamos el resumen utilizando los valores almacenados en las variables
        var resumen = "Resumen:\n\nNombre: " + nombreVal + "\nCorreo: " + correoVal + "\nTema: " + temaVal + "\nMensaje: " + mensajeVal;
  
        // Mostramos el resumen en un alert
        alert(resumen);
  
        // Creamos un nuevo objeto jsPDF
        var doc = new jsPDF();
  
        // Agregamos el contenido del resumen al archivo PDF
        doc.text(resumen, 10, 10);
  
        // Guardamos el archivo PDF con el nombre "resumen.pdf"
        doc.save("resumen.pdf");
  
        // Enviamos el formulario
        form.submit();
      }
    });
  });

$(document).ready(function() {
    $("#newsletter form").validate({
      rules: {
        "nombre-n": {
          required: true,
          minlength: 2
        },
        "correo-n": {
          required: true,
          email: true
        }
      },
      messages: {
        "nombre-n": {
          required: "Por favor, ingrese su nombre completo",
          minlength: "El nombre debe tener al menos 2 caracteres"
        },
        "correo-n": {
          required: "Por favor, ingrese su correo electrónico",
          email: "Por favor, ingrese un correo electrónico válido"
        }
      },
      submitHandler: function(form) {
        alert("Hola " + $("#nombre-n").val() + ", gracias por suscribirte a nuestro newsletter!");
        form.reset();
      }
    });
  });
  $(document).ready(function() {
    $("#btn-obtener-clima").click(function() {
        var ciudad = $("#ciudad").val();
        var apiKey = "2545efd0bff7dc722eed68e00de68d05";
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=" + apiKey + "&units=metric";

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function(data) {
                var clima = data.main.temp;
                var descripcion = data.weather[0].description;
                var icono = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                var html = "<img src='" + icono + "' alt='Icono de clima'><br>";
                html += "<b>" + ciudad + "</b><br>";
                html += clima + "°C<br>";
                html += descripcion;
                $("#resultado").html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#resultado").html("Ha ocurrido un error: " + errorThrown);
            }
        });
    });
});