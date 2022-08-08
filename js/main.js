jQuery(
	function($) {
		$('.flexslider').flexslider({
		    //animation: "slide"
		});

		/*PLACEHOLDER*/
		$(".txtNombres").placeholder();
        $(".txtApellidos").placeholder();
        $(".txtDNI").placeholder();
        $(".txtCorreo").placeholder();
        $(".txtTelefono").placeholder();
        $(".txtCentroTrabajo").placeholder();
        $(".txtCargo").placeholder();

        /*FANCYBOX*/
        $("a.fancy").fancybox({
				type:'iframe',	
            'speedIn'       :   600,
            'speedOut'      :   200,
            'overlayShow'   :   false,
            'width'         : 600,
            'height'        : 380,
            "autoSize"      : false
        });

        var d   =   new Date();
        $('#anio').text(d.getFullYear());
	}
);
