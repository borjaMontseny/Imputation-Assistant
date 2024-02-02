window.onload = function () {
    // Caputramos los elementos del HTML
    var inputHoras = document.getElementById('horasJornada');
    var inputCalendario = document.getElementById('diaFinImputacion');
    var botonCalcular = document.getElementById('botonCalcular');

    // Añadimos el listener
    botonCalcular.addEventListener("click", mostrarFecha);

    // Definimos la función del Listener
    function mostrarFecha() {
        var diaSeleccionado = inputCalendario.value;
        console.log(diaSeleccionado);
    }

    function calcularFecha() {

        // Obtener la fecha seleccionada del input
        var fechaSeleccionada = new Date(inputFecha.value);

        var diasRestantes = 0;
        var ultimoDiaMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 0).getDate();

        // Iterar sobre los días restantes del mes y contar solo los días laborables
        for (var i = fechaSeleccionada.getDate(); i <= ultimoDiaMes; i++) {
            var dia = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), i);
            var diaSemana = dia.getDay(); // 0 para domingo, 6 para sábado
            if (diaSemana !== 0 && diaSemana !== 6) { // Excluir domingo (0) y sábado (6)
                diasRestantes++;
            }
        }

        console.log("Días laborables restantes en el mes: " + diasRestantes);

    }

}