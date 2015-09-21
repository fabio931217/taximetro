var segundos =0;
var minutos =0;


 $(document).ready(function(e) {

  $("#btnuevo").hide();

   });

function nuevo_calculo ()
{
  if (confirm("¿Desea realizar un nuevo calculo?")) {location.reload();};


}
 function calcular()
    {


  $.ajax({


            url:"calcular.php",
            type: "POST",
            data:$('#formulario').serialize(),
        
         beforeSend: function()
            {
                 //alert("Calculando direccion...");
            },
            //una vez finalizado correctamente
            success: function(data){
//alert(data);
              var r = jQuery.parseJSON(data);
            if (r.error == true)
            {
                for (ind in r.bad_fields)
                {
                    $("#" + r.bad_fields[ind]).addClass("error");
                }
                alert(r.msg);
                
            } else
            {
              // alert(r.msg);
              $("#recibe").html(r.msg);
              $("#cont2").html(r.tabla2);
              $("#btnverde").hide();
              $("#btnuevo").show();
              $("#v2").html("$"+" "+0);
              $("#u2").html(0);
               reiniciar_tiempo();


              
            }
             
              },
  })
   return false;

}

 function tarifa()
    {

$.ajax({
            url:"tarifa.php",
            type: "POST",
            data:$('#formulario').serialize(),
            success: function(data){
        //alert(data);
             var r = jQuery.parseJSON(data);
             $("#v2").html("$"+" "+r.valor);
             $("#val").val(r.valor);
             $("#u2").html(r.unidades);
             
                         
            }
  })
   return false;

}


function tiempo () 
{

time=setInterval(function()
{

 segundos = segundos + 1;


 if (segundos>=60)
 {
  minutos= minutos +1;
  segundos=0;
 
 }

 $("#t2").html(minutos+" : "+segundos);


},1000);


}

function reiniciar_tiempo () {
    tiempo();
    time2=setInterval(tarifa,15000);
}