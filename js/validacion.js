jQuery(
    function($) {

    /*Patrones de validación*/
    var intRegex = /^[0-9]{5,}$/; 
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; 
    var reqRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 -._\/]+$/; // cambiar y aumentar //    
    var dirRegex = /([^\s])/;
    var dniRegex = /^[0-9]{4,}$/;  // cambiar y aumentar //	


    /*Validaciones*/

    /*mensajes de error*/
    var msgValidaciones = [
            "Ingrese sus nombres.", 
            "Ingrese sus apellidos.", 
            "Ingrese su DNI.", // cambiar y aumentar //  
            "Ingrese su correo (debe ser válido).", 
            "Ingrese su teléfono.", // cambiar y aumentar //  
            "Ingrese su centro de trabajo", 
            "Ingrese su cargo.", 
            "Elija una opción.",
            "Acepte los Términos y Condiciones."
                      ];


    /*nombre*/
    $(".txtNombres").bind("focusout", 
        function() {
                ValidarCampo(".txtNombres", reqRegex, 0);
        }
    );

    /*apellido*/
    $(".txtApellidos").bind("focusout",
        function() {
                ValidarCampo(".txtApellidos", reqRegex, 1);
        }
    );

    /*dni*/
    $(".txtDNI").bind("focusout",
        function() {
                ValidarCampo(".txtDNI", dniRegex, 2);
        }
    );

    /*email*/
    $(".txtCorreo").bind("focusout",
        function() {
                ValidarCampo(".txtCorreo", emailRegex, 3);
        }
    );                    

    /*teléfono*/
    $(".txtTelefono").bind("focusout",
        function() {
                ValidarCampo(".txtTelefono", reqRegex, 4); // cambiar y aumentar // 
        }
    );

    /*centro trabajo*/
    $(".txtCentroTrabajo").bind("focusout",
        function() {
                ValidarCampo(".txtCentroTrabajo", reqRegex, 5);
        }
    );

    /*cargo*/
    $(".txtCargo").bind("focusout",
        function() {
                ValidarCampo(".txtCargo", reqRegex, 6);
        }
    );

    /*cómo se enteró*/
    $(".cmbEntero").on("change",
        function() {
                ValidarSeleccionLista(".cmbEntero", -1, 7);
        }
    );

    /*Validación de campos input usando patrones de validación*/
    function ValidarCampo(campo, regex, ind) {
        var errorCampo=true;
        if(!regex.test($(campo).val())) { 
                //$(campo).addClass("errorCampoNoValido");
                $(campo).parent().parent().find("span").eq(ind).html(msgValidaciones[ind]);
                errorCampo=false;
        } else {
                //$(campo).removeClass("errorCampoNoValido");
                $(campo).parent().parent().find("span").eq(ind).html("");
        }
        return errorCampo;
    }  

    /*Validación de selección en campo select*/
    function ValidarSeleccionLista(campo, valorInvalido, ind) {
        var errorCampo=true;
        if($(campo).val()==valorInvalido) {
            //$(campo).addClass("errorCampoNoValido");
            $(campo).parent().parent().find("span").eq(ind).html(msgValidaciones[ind]);
            errorCampo=false;
        } else {
            //$(campo).removeClass("errorCampoNoValido");
            $(campo).parent().parent().find("span").eq(ind).html("");
        }
        return errorCampo;
    }

    /*Validación de campo check*/
    function ValidarSeleccionCheck(campo, ind) {
        var aceptar = false;
        if($(campo).is(':checked')) {
            //$(campo).removeClass("errorCampoNoValido");
            $(campo).parent().find("span").eq(1).html("");
            aceptar = true;
        } else {
            //$(campo).addClass("errorCampoNoValido");
            $(campo).parent().find("span").eq(1).html(msgValidaciones[ind]);
        }
        return aceptar
    }

    /*Evento Submit del formulario*/
    $("#clickdimensionsForm").submit(
        function(e) {
                    var ok1 = ValidarCampo(".txtNombres", reqRegex, 0); //nombre
                    var ok2 = ValidarCampo(".txtApellidos", reqRegex, 1); //apellido
                    var ok3 = ValidarCampo(".txtDNI", dniRegex, 2); //dni 
                    var ok4 = ValidarCampo(".txtCorreo", emailRegex, 3); //correo
                    var ok5 = ValidarCampo(".txtTelefono", reqRegex, 4); //teléfono   // cambiar y aumentar //       		
                    var ok6 = ValidarCampo(".txtCentroTrabajo", reqRegex, 5); //centro de trabajo       		
                    var ok7 = ValidarCampo(".txtCargo", reqRegex, 6); //cargo  
                    var ok8 = ValidarSeleccionLista(".cmbEntero", -1, 7); //medio de información
            //        var ok9 = ValidarSeleccionCheck(".checkTerminos", 8); 	//términos y condiciones  

                    var ok10 = $(".autorizacion01:checked").length;
                    var ok11 = $(".autorizacion02:checked").length;

                    if(!ok10) {
                        $(".msgAutorizacion01").html("Campo obligatorio");
                    } else {
                        $(".msgAutorizacion01").html("");
                    }

                    if(!ok11) {
                        $(".msgAutorizacion02").html("Campo obligatorio");
                    } else {
                        $(".msgAutorizacion02").html("");
                    }
                    
                    if(ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 && ok8  && ok10 && ok11) {
                    	return true;
                    } else {
                    	return false;
                    }
        }
    );

    $(".botonEnviar a").on("click",
        function(e) {
        	e.preventDefault();
        	$("#clickdimensionsForm").trigger("submit");
        }
    );
}
);