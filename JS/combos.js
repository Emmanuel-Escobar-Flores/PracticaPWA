$(document).ready(function() {
$.ajax({          
    url:"continentes.php",
    type: "POST",			
    success: function(opcionesContinentes){                        
      $( '#continentes' ).html( opcionesContinentes );
    }      
}); 


// --------------lista de Paises------------------	
$('#continentes').change(function()
{
  var continente = $('#continentes').val();                
  var datos;               
  datos={"continente": continente};
  $.ajax({
          url:"paises.php",
          type: "POST",	
          data: datos,
          success: function(opcionesPais){                         
            $('#paises').html(opcionesPais);
          }
  });
}); 
});