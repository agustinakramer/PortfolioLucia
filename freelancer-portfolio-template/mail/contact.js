// Elimina mensajes previos al enfocar el nombre
$('#name').focus(function () {
  $('#success').html('');
});

// Preseleccionar el servicio desde los botones
$(".cta-servicio").on("click", function () {
    const servicio = $(this).data("servicio");
    const $select = $("#subject");
    $select.val(servicio);
    $select.trigger("change"); // Forzar actualización visual
    
});
