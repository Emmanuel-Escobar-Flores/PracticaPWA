function leerRuta(input) {
  if (input.files[0]) {
    var archivo = input.files[0];  
    console.log(archivo);
    var reader = new FileReader();  
      
    reader.onload = function(e) {
      $('#foto').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

// Llenar datatable
function llenaTabla() {
  $('#tblUsuarios').dataTable({
    responsive: true,    
    ajax:{
        url: 'listaCli.php',
        type: 'POST',
    },
    columns:[
        {"data":"id"},
        {"data":"nombre"},
        {"data":"email"},
        {"data":"tel"},
        {"data":"rutafoto",
        "render":function(data,type,row){               
                     return '<img src="'+ data +'" width="40" height="40" />'
                 }
       },
       {"defaultContent": "<div class='text-center'><button title='Editar' class='btn btn-warning btnEditar'><i class='fas fa-user-edit fa-lg'></i></button>&nbsp; <button title='Eliminar' class='btn btn-danger btnBorrar'><i class='fas fa-user-minus fa-lg'></i></button></div>" } 
    ],

  //Para cambiar el lenguaje a español
  "language": {
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sSearch": "Buscar:",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast":"Último",
        "sNext":"Siguiente",
        "sPrevious": "Anterior"
     },
     "sProcessing":"Procesando...",
}


    }    
  )
}




$(document).ready(function() {  
  llenaTabla(); 
  
  //botón EDITAR    
$(document).on("click", ".btnEditar", function(){
  fila = $(this).closest("tr");
  id = parseInt(fila.find('td:eq(0)').text());
  $.ajax({
    url: "buscaUsuario.php",           
    type: "POST",          
    data: {id:id},
    dataType: "json",
    success: function(usuario){        
     // console.log(usuario); 

     $("#idUsu").val(usuario[0].id);
     $("#nomUsu").val(usuario[0].nombre);
     $("#emailUsu").val(usuario[0].email);
     $("#telUsu").val(usuario[0].tel);   
     //$('#fotoUsu').val(usuario[0].rutafoto);  
     $("#foto").attr("src",usuario[0].rutafoto);
     
        
      $(".modal-header").css("background-color", "#007bff");
      $(".modal-header").css("color", "white");
      $(".modal-title").text("Editar Usuario");            
      $("#modalUsuario").modal("show");  

    }
});   
  
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){  
  id = parseInt($(this).closest("tr").find('td:eq(0)').text());
  var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
  if(respuesta){
      $.ajax({
          url: "eliminaUsuario.php",           
          type: "POST",          
          data: {id:id},
          success: function(msg){             
            $('#tblUsuarios').DataTable().ajax.reload(); 
            alert(msg);            
          }
      });
  }   
});

$('#fotoUsu').on('change', function () {
        
  var archivo = this.files[0];  
  //console.log(archivo);
  if (archivo.size > 5242880) {
    alert('El tamaño maximo es de 5Mb');
    $('#fotoUsu').val("");
    return;
  }
  else if (archivo.type!="image/png" && archivo.type!="image/jpeg"){
      alert('Se aceptan imagenes png o jpg');
      $('#fotoUsu').val("");
      return;
  } 
  leerRuta(this);       

});


//Actualizar Usuario

$('#btnGuardar').click(function( event ) {
  event.preventDefault();  // cancela el submit() para que no recargue la página
 var datos = new FormData($("#frmeditaUsu")[0]);  
 $.ajax({            
      url: "modificaUsuario.php",
      data: datos,
      type: "POST",
      contentType:false,
      processData:false,
      success: function(msg){
          $('#tblUsuarios').DataTable().ajax.reload();   
          alert(msg);
          $('#fotoUsu').val("");
          $("#modalUsuario").modal("hide");
      }
  });
  }); 

/*
//opciones menu principal
$('li a').click(function(e) {
  //e.preventDefault();
  var $this = $(this);
  $this.closest('ul').find('li.active,a.active').removeClass('active');
  $this.addClass('active');
  $this.parent().addClass('active');
});
*/
});