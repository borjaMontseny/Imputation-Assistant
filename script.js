window.onload = function () {
    // Capturamos los elementos del HTML
    var inputHoras = document.getElementById('horasJornada');
    var inputHorasVacaciones = document.getElementById('horasVacaciones');
    var inputCalendario = document.getElementById('diaFinImputacion');
    var botonCalcular = document.getElementById('botonCalcular');
    var outputHorasImputadas = document.getElementById("pHorasImputadas");
    var outputHorasPrevistas = document.getElementById("pHorasPrevistas");
    var outputHorasTotales = document.getElementById("pHorasTotales");

    // Días festivos que no cuentan
    var disableDates = ['01-01-2024', '29-03-2024', '01-04-2024', '01-05-2024', '24-06-2024', '15-08-2024', '11-09-2024', '25-09-2024', '01-11-2024', '06-12-2024', '25-12-2024', '26-12-2024'];

    // Añadimos el listener
    botonCalcular.addEventListener("click", calcularHoras);

    // Función para verificar si una fecha es un día festivo
    function isHoliday(dateString) {
        return disableDates.includes(dateString);
    }

    // La función del Listener
    function calcularHoras() {

        // Obtener la fecha seleccionada del input
        var fechaSeleccionada = new Date(inputCalendario.value);
        var dateString = fechaSeleccionada.getDate() + '-' + (fechaSeleccionada.getMonth() + 1) + '-' + fechaSeleccionada.getFullYear();

        var diasRestantes = 0;
        var ultimoDiaMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 0).getDate();

        // Iterar sobre los días restantes del mes y contar solo los días laborables
        for (var i = fechaSeleccionada.getDate(); i <= ultimoDiaMes; i++) {
            var dia = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), i);
            var diaSemana = dia.getDay(); // 0 para domingo, 6 para sábado
            var dateString = dia.getDate() + '-' + (dia.getMonth() + 1) + '-' + dia.getFullYear();

            if (diaSemana !== 0 && diaSemana !== 6 && !isHoliday(dateString)) { // Excluir domingo (0), sábado (6) y días festivos
                diasRestantes++;
            }
        }

        var diasHastaFecha = 0;
        var primerDiaMes = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), 1);

        var diffDias = Math.floor((fechaSeleccionada - primerDiaMes) / (1000 * 60 * 60 * 24));

        for (var i = 0; i <= diffDias; i++) {
            var dia = new Date(primerDiaMes);
            dia.setDate(primerDiaMes.getDate() + i);
            var diaSemana = dia.getDay();
            var dateString = dia.getDate() + '-' + (dia.getMonth() + 1) + '-' + dia.getFullYear();

            if (diaSemana !== 0 && diaSemana !== 6 && !isHoliday(dateString)) {
                diasHastaFecha++;
            }
        }

        var horasYaImputadas = (diasHastaFecha * inputHoras.value);
        var horasZZIMPEST = (diasRestantes - 1) * inputHoras.value - inputHorasVacaciones.value;
        var horasTotales = horasYaImputadas + (diasRestantes - 1) * inputHoras.value;

        if (inputHoras.value < 0 || inputHorasVacaciones.value < 0 || !inputCalendario.value) {
            outputHorasImputadas.innerHTML = "Error";
            outputHorasPrevistas.innerHTML = "Error";
            outputHorasTotales.innerHTML = "Error";
        } else {
            outputHorasImputadas.innerHTML = (horasYaImputadas + parseFloat(inputHorasVacaciones.value));
            outputHorasPrevistas.innerHTML = horasZZIMPEST;
            outputHorasTotales.innerHTML = horasTotales;
        }
    }
}