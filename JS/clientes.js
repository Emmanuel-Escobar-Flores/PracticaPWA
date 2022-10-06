$(document).ready(function() {   
   
    llenaTablaClientes();

    $('#frmRegCli').submit(function( event ) {
        event.preventDefault();  // cancela el submit() para que no recargue la página
       var datos = new FormData($("#frmRegCli")[0]);
       $.ajax({            
            url: "regCli.php",
            data: datos,
            type: "POST",    
            contentType:false,
            processData:false,        
            success: function(m){               
                alert(m);
                $('#tblCli').DataTable().ajax.reload(); 
                $("#frmRegCli").trigger('reset');
                $("#txtNom").focus();
                $(".alert-message").alert();
                window.setTimeout(function() { $(".alert-message").alert('close'); }, 2000);
            }
        });
        });  
        //---------------------
 //botón EDITAR    
 $(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text());
    $.ajax({
      url: "buscaCli.php",           
      type: "POST",          
      data: {id:id},
      dataType: "json",
      success: function(cliente){  
       $("#idClimod").val(cliente.idCli);
       $("#txtNommod").val(cliente.nomCli);
       $("#txtDirmod").val(cliente.dirCli);
       $("#txtTelmod").val(cliente.telCli);       
       
          
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");            
        $("#modalCliente").modal("show");  
  
      }
  });   
    
  });
  
  //botón BORRAR
  $(document).on("click", ".btnBorrar", function(){  
    id = parseInt($(this).closest("tr").find('td:eq(0)').text());
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+id+"?");
    if(respuesta){
        $.ajax({
            url: "eliCli.php",           
            type: "POST",          
            data: {id:id},
            success: function(msg){             
              $('#tblCli').DataTable().ajax.reload(); 
              alert(msg);            
            }
        });
    }   
  });

        
    });
    $('#btnModificar').click(function( event ) {
        event.preventDefault();  // cancela el submit() para que no recargue la página
       var datos = new FormData($("#frmeditaCli")[0]);  
       $.ajax({            
            url: "modCli.php",
            data: datos,
            type: "POST",
            contentType:false,
            processData:false,
            success: function(msg){
                $('#tblCli').DataTable().ajax.reload();   
                alert(msg);                
                $("#modalCliente").modal("hide");
            }
        });
        }); 
    // Llenar datatable
function llenaTablaClientes() {
    
    $('#tblCli').dataTable({
      responsive: true,    
      ajax:{
          url: 'listaCli.php',
          type: 'POST',
      },
      columns:[
          {"data":"idCli"},
          {"data":"nomCli"},
          {"data":"dirCli"},
          {"data":"telCli"},
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
  