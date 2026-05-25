
function generarFibonacci(n) {
  var a = 1;
  var b = 1;
  var c;
  var serie = [a, b];

  for (var i = 2; i < n; i++) {
    c = a + b;
    serie.push(c);
    a = b;
    b = c;
  }

  // Si solo piden 1 mes
  if (n === 1) return [1];

  return serie;
}

function esPrimo(num) {
  if (num < 2) return false;
  var contador = 0;

  for (var i = 1; i <= num; i++) {
    if (num % i === 0) {
      contador++;
    }
  }

  if (contador === 2) {
    return true;
  } else {
    return false;
  }
}

function calcular() {

  // Obtener los valores del formulario con getElementById (requerido)
  var mesesInput = document.getElementById("meses");
  var baseInput  = document.getElementById("base");

  var meses = parseInt(mesesInput.value);
  var base  = parseFloat(baseInput.value);

  // Validar que los datos sean correctos
  if (isNaN(meses) || meses < 1 || meses > 30) {
    document.getElementById("resultado").className = "resultado-area";
    document.getElementById("resultado").innerHTML =
      '<div style="background:rgba(240,96,96,0.1);border:1px solid rgba(240,96,96,0.3);border-radius:12px;padding:1.2rem 1.5rem;color:#f06060;font-family:var(--font-mono);font-size:0.9rem;">' +
      '⚠ Por favor ingresa un número de meses válido (entre 1 y 30).</div>';
    return;
  }

  if (isNaN(base) || base < 1) {
    document.getElementById("resultado").className = "resultado-area";
    document.getElementById("resultado").innerHTML =
      '<div style="background:rgba(240,96,96,0.1);border:1px solid rgba(240,96,96,0.3);border-radius:12px;padding:1.2rem 1.5rem;color:#f06060;font-family:var(--font-mono);font-size:0.9rem;">' +
      '⚠ Por favor ingresa un valor base válido (mayor a 0).</div>';
    return;
  }

  var serie = generarFibonacci(meses);

  var totalAhorro    = 0;
  var cantidadPrimos = 0;

  for (var i = 0; i < serie.length; i++) {
    var montoMes = serie[i] * base;
    totalAhorro += montoMes;
    if (esPrimo(serie[i])) {
      cantidadPrimos++;
    }
  }

  var html = "";

  html += '<div class="resumen-grid">';
  html += '<div class="resumen-card"><span class="r-label">Meses</span><span class="r-value">' + meses + '</span></div>';
  html += '<div class="resumen-card"><span class="r-label">Total Ahorrado</span><span class="r-value">Bs. ' + totalAhorro.toFixed(2) + '</span></div>';
  html += '<div class="resumen-card"><span class="r-label">Meses Primos</span><span class="r-value">' + cantidadPrimos + '</span></div>';
  html += '</div>';

  html += '<p class="tabla-titulo">Detalle mes a mes</p>';
  html += '<div class="tabla-scroll">';
  html += '<table>';
  html += '<thead><tr>';
  html += '<th>Mes</th>';
  html += '<th>Fib(n)</th>';
  html += '<th>Ahorro (Bs.)</th>';
  html += '<th>Acumulado (Bs.)</th>';
  html += '<th>¿Es primo?</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  var acumulado = 0;

  for (var j = 0; j < serie.length; j++) {
    var fiboNum    = serie[j];
    var montoActual = fiboNum * base;
    acumulado += montoActual;
    var primo = esPrimo(fiboNum);

    html += '<tr>';
    html += '<td>' + (j + 1) + '</td>';
    html += '<td>' + fiboNum + '</td>';
    html += '<td>Bs. ' + montoActual.toFixed(2) + '</td>';
    html += '<td>Bs. ' + acumulado.toFixed(2) + '</td>';
    html += '<td>' + (primo ? '<span class="primo-badge">✓ Primo</span>' : '<span class="no-primo">No primo</span>') + '</td>';
    html += '</tr>';
  }

  html += '</tbody></table></div>';

  document.getElementById("resultado").innerHTML = html;
  document.getElementById("resultado").className = "resultado-area";

  document.getElementById("resultado").scrollIntoView({ behavior: "smooth", block: "start" });
}
