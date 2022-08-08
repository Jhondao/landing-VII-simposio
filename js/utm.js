var urlQuery = location.search;
var campaign = '';
var source   = '';  
var medium   = '';  
var term     = '';  
var content  = '';     
var referrer = '';   
var z = '';

function getParameterByName(name) {
  //stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(urlQuery);
  return results === null ? "-" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function _uGC(l,n,s) {
  if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
  var i,i2,i3,c="-";
  i=l.indexOf(n);
  i3=n.indexOf("=")+1;
  if (i > -1) {
    i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
    c=l.substring((i+i3),i2);
  }
  return c;
}

/*
 *  Lectura de UTM:
 *  1. Se consulta los datos tageados por la url.
 *  2. 
 */

$(function() {
  referrer = document.referrer;
  // obtener datos de url tageada
  campaign = getParameterByName('utm_campaign').substr(0,300);
  source   = getParameterByName('utm_source').substr(0,300);
  medium   = getParameterByName('utm_medium').substr(0,300);
  term     = getParameterByName('utm_term').substr(0,300);
  content  = getParameterByName('utm_content').substr(0,300);
  console.log('1er campaign=' + campaign + ';source=' + source + ';medium=' + medium + ';term=' + term + ';content=' + content);
  // si no obtiene datos por url, consultar el referrer
  if (campaign == '-' || source == '-' || medium == '-') {
    if (referrer != '') {
      if (referrer.indexOf('google.com')) {
        source = 'google.com';
      }
      if (referrer.indexOf('up.edu.pe')) {
        source = 'up.edu.pe';
      } else {
        source = 'other';
      }
      campaign = '-';
      medium   = referrer;
      term     = '-';
      content  = '-';
      console.log('2do campaign=' + campaign + ';source=' + source + ';medium=' + medium + ';term=' + term + ';content=' + content);
    } else {
      // consultar cookies de google
      z = _uGC(document.cookie, '__utmz=', ';');
      campaign = _uGC(z, 'utmccn=', '|');
      source   = _uGC(z, 'utmcsr=', '|');
      medium   = _uGC(z, 'utmcmd=', '|');
      term     = _uGC(z, 'utmctr=', '|');
      content  = _uGC(z, 'utmcct=', '|');
      gclid    = _uGC(z, 'utmgclid=', '|');
      if (gclid !="-") { 
        source = 'google';
        medium = 'cpc';
      }
      console.log('3er campaign=' + campaign + ';source=' + source + ';medium=' + medium + ';term=' + term + ';content=' + content);
    }
  }
  // si no obtiene ningun dato, asignar trafico directo
  if (source == '-' || medium == '-') {
    campaign = '-';
    source   = 'directo';
    medium   = '-';
    term     = '-';
    content  = '-';
    console.log('4to campaign=' + campaign + ';source=' + source + ';medium=' + medium + ';term=' + term + ';content=' + content);
  }
  
  aoPostLoadCallback = function(){

  
  // Boton enviar de ACTON
  $('.ao-form-submit').on("click", function() {   

  	$('input[name="Email"]').val($('input[name="Email"]').val().trim());

    //Mostrar alerta
    $(".ao-form-error-message").fadeIn('slow').val('');
    //Ocultar alerta
    setTimeout(
    function() 
    { 
    $(".ao-form-error-message").fadeOut('slow').val('');
    }, 2000); 
        
  });

  // asignar los datos al campo de formulario
$('input[name="UTM Campaign"]').val(campaign.substr(0,300));
$('input[name="UTM Content"]').val(content.substr(0,300));
$('input[name="UTM Source"]').val(source.substr(0,300));
$('input[name="UTM Term"]').val(term.substr(0,300));  
$('input[name="UTM Medium"]').val(medium.substr(0,300));  

    
  //URL
  $('input[name="url"]').val(location.href.substr(0,300)); 

  
};  




  // asignar el valor de fuente en el formulario
  $('.reference_utm option[value="' + source + '"]').prop('selected', 'selected');
});
