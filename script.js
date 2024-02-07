window.onload = function () {
    // Caputramos los elementos del HTML
    var inputHoras = document.getElementById('horasJornada');
    var inputCalendario = document.getElementById('diaFinImputacion');
    var botonCalcular = document.getElementById('botonCalcular');
    var outputHorasImputadas = document.getElementById("pHorasImputadas");
    var outputHorasPrevistas = document.getElementById("pHorasPrevistas");
    var outputHorasTotales = document.getElementById("pHorasTotales");

    // Añadimos el listener
    botonCalcular.addEventListener("click", calcularHoras);

    // La función del Listener
    function calcularHoras() {

        // Obtener la fecha seleccionada del input
        var fechaSeleccionada = new Date(inputCalendario.value);

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

        var horasZZIMPEST = ((diasRestantes - 1) * inputHoras.value);

        var diasHastaFecha = 0;
        var primerDiaMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), 1);

        var diffDias = Math.floor((fechaSeleccionada - primerDiaMes) / (1000 * 60 * 60 * 24));

        for (var i = 0; i <= diffDias; i++) {
            var dia = new Date(primerDiaMes);
            dia.setDate(primerDiaMes.getDate() + i);
            var diaSemana = dia.getDay();
            if (diaSemana !== 0 && diaSemana !== 6) {
                diasHastaFecha++;
            }
        }

        var horasYaImputadas = ((diasHastaFecha - 1) * inputHoras.value);

        var horasTotales = horasYaImputadas + horasZZIMPEST;

        if (inputHoras < 0 || !inputCalendario.value) {
            outputHorasImputadas.innerHTML = "Error";
            outputHorasPrevistas.innerHTML = "Error";
            outputHorasTotales.innerHTML = "Error";
        } else {
            outputHorasImputadas.innerHTML = horasYaImputadas;
            outputHorasPrevistas.innerHTML = horasZZIMPEST;
            outputHorasTotales.innerHTML = horasTotales;
        }

    }

}