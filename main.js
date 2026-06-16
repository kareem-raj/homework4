// Copyright (c) by Kareem Rajeh

const LIMIT = 50;

$(function() {
    $('#tableForm').on('submit', function(event) {
        event.preventDefault();
 
        var colStart = parseInt($('#minColumn').val());
        var colEnd   = parseInt($('#maxColumn').val());
        var rowStart = parseInt($('#minRow').val());
        var rowEnd   = parseInt($('#maxRow').val());
 
        var $errorDiv  = $('#errorMessage');
        var $container = $('#tableContainer');
        $errorDiv.text('');
        $container.empty();
 
        // Validates that all fields must be filled
        if ([colStart, colEnd, rowStart, rowEnd].some(isNaN)) {
            $errorDiv.text('Please fill in all four fields with valid numbers.');
            return;
        }
 
        // Validates that stays within -50 to 50
        if ([colStart, colEnd, rowStart, rowEnd].some(v => Math.abs(v) > LIMIT)) {
            $errorDiv.text('All values must be between -50 and 50.');
            return;
        }
 
        // Validates that start must be less than end
        if (colStart >= colEnd || rowStart >= rowEnd) {
            $errorDiv.text('Start values must be less than their End values.');
            return;
        }
 
        $container.append(buildTable(colStart, colEnd, rowStart, rowEnd));
    });
});
 
function buildTable(colStart, colEnd, rowStart, rowEnd) {
    var table     = document.createElement('table');
    var headerRow = table.createTHead().insertRow();
 
    // Blank top-left corner
    headerRow.appendChild(document.createElement('th'));
 
    for (var col = colStart; col <= colEnd; col++) {
        var th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    }
 
    var tbody = table.createTBody();
    for (var row = rowStart; row <= rowEnd; row++) {
        var tr    = tbody.insertRow();
        var rowTh = document.createElement('th');
        rowTh.textContent = row;
        tr.appendChild(rowTh);
 
        for (var col = colStart; col <= colEnd; col++) {
            tr.insertCell().textContent = row * col;
        }
    }
 
    return table;
}