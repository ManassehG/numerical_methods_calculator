document.getElementById('numInputs').addEventListener('change', createTableInputs);

function createTableInputs() {
    const numInputs = document.getElementById('numInputs').value;
    const tableInputs = document.getElementById('tableInputs');
    tableInputs.innerHTML = '';

    let tableHtml = '<table>';
    tableHtml += '<tr><th>x</th><th>y</th></tr>';
    
    for (let i = 0; i < numInputs; i++) {
        tableHtml += `
            <tr>
                <td><input type="number" id="x${i}"></td>
                <td><input type="number" id="y${i}"></td>
            </tr>
        `;
    }

    tableHtml += '</table>';
    tableInputs.innerHTML = tableHtml;
}

function calculate() {
    const method = document.getElementById('method').value;
    const numInputs = document.getElementById('numInputs').value;
    const value = parseFloat(document.getElementById('value').value);
    const x = [];
    const y = [];
    
    for (let i = 0; i < numInputs; i++) {
        x.push(parseFloat(document.getElementById(`x${i}`).value));
        y.push(parseFloat(document.getElementById(`y${i}`).value));
    }

    let resultText = '';

    if (method === 'lagrange') {
        resultText = lagrangeInterpolation(x, y, value);
    } else {
        resultText = inverseLagrangeInterpolation(x, y, value);
    }

    document.getElementById('result').innerHTML = resultText;
}

function lagrangeInterpolation(x, y, value) {
    const n = x.length;
    let result = 0;
    let steps = '<h3>Lagrange Interpolation Steps:</h3>';

    steps += '<p>Given data points:</p>';
    steps += '<p>x: [' + x.join(', ') + ']</p>';
    steps += '<p>y: [' + y.join(', ') + ']</p>';
    steps += `<p>Interpolating for x = ${value}</p>`;

    let formula = 'f(x) = ';
    for (let i = 0; i < n; i++) {
        formula += `<span class="fraction"><span class="numerator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                formula += `(x - x${j})`;
            }
        }
        formula += `</span><span class="denominator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                formula += `(x${i} - x${j})`;
            }
        }
        formula += `</span></span> * y${i} + `;
    }
    formula = formula.slice(0, -3); // Remove the last '+ '

    steps += `<pre>${formula}</pre>`;

    let finalFormula = 'f(x) = ';
    for (let i = 0; i < n; i++) {
        let term = y[i];
        let termFormula = `${y[i]}`;
        finalFormula += `<span class="fraction"><span class="numerator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (value - x[j]) / (x[i] - x[j]);
                termFormula += ` * ((${value} - ${x[j]}) / (${x[i]} - ${x[j]}))`;
                finalFormula += `(${value} - ${x[j]})`;
            }
        }
        finalFormula += `</span><span class="denominator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                finalFormula += `(${x[i]} - ${x[j]})`;
            }
        }
        finalFormula += `</span></span> * ${y[i]} + `;
        steps += `<p>Term ${i + 1}: ${termFormula} = ${term.toFixed(5)}</p>`;
        result += term;
    }

    finalFormula = finalFormula.slice(0, -3); // Remove the last '+ '
    steps += `<pre>${finalFormula}</pre>`;
    steps += `<h3>Final Result: y(${value}) = ${result.toFixed(5)}</h3>`;
    return steps;
}

function inverseLagrangeInterpolation(x, y, value) {
    const n = y.length;
    let result = 0;
    let steps = '<h3>Inverse Lagrange Interpolation Steps:</h3>';

    steps += '<p>Given data points:</p>';
    steps += '<p>x: [' + x.join(', ') + ']</p>';
    steps += '<p>y: [' + y.join(', ') + ']</p>';
    steps += `<p>Interpolating for y = ${value}</p>`;

    let formula = 'f(y) = ';
    for (let i = 0; i < n; i++) {
        formula += `<span class="fraction"><span class="numerator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                formula += `(y - y${j})`;
            }
        }
        formula += `</span><span class="denominator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                formula += `(y${i} - y${j})`;
            }
        }
        formula += `</span></span> * x${i} + `;
    }
    formula = formula.slice(0, -3); // Remove the last '+ '

    steps += `<pre>${formula}</pre>`;

    let finalFormula = 'f(y) = ';
    for (let i = 0; i < n; i++) {
        let term = x[i];
        let termFormula = `${x[i]}`;
        finalFormula += `<span class="fraction"><span class="numerator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (value - y[j]) / (y[i] - y[j]);
                termFormula += ` * ((${value} - ${y[j]}) / (${y[i]} - ${y[j]}))`;
                finalFormula += `(${value} - ${y[j]})`;
            }
        }
        finalFormula += `</span><span class="denominator">`;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                finalFormula += `(${y[i]} - ${y[j]})`;
            }
        }
        finalFormula += `</span></span> * ${x[i]} + `;
        steps += `<p>Term ${i + 1}: ${termFormula} = ${term.toFixed(5)}</p>`;
        result += term;
    }

    finalFormula = finalFormula.slice(0, -3); // Remove the last '+ '
    steps += `<pre>${finalFormula}</pre>`;
    steps += `<h3>Final Result: x(${value}) = ${result.toFixed(5)}</h3>`;
    return steps;
}

// Initialize the table inputs
createTableInputs();
