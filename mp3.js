var errorMessage;

function calculateResult() {
    //step size in degrees per division
    var stepSize = 0.02;
    errorMessage = "";
    var length = validateInput("Length");
    var width = validateInput("Width");
    var zOne = validateInput("Z1");
    var zTwo = validateInput("Z2");
    var zThree = validateInput("Z3");

    if (errorMessage == "") {
        var thetaResult = Math.atan((zTwo - zOne) / width) * (180.0 / Math.PI);
        document.getElementById("lblThetaResult").innerHTML = thetaResult.toFixed(2);

        var phiResult = Math.atan((zThree - zOne) / length) * (180.0 / Math.PI);
        document.getElementById("lblPhiResult").innerHTML = phiResult.toFixed(2);

        var turnsThetaResult = thetaResult / stepSize;
        document.getElementById("lblTurnsThetaResult").innerHTML = turnsThetaResult.toFixed(1);

        var turnsPhiResult = phiResult / stepSize;
        document.getElementById("lblTurnsPhiResult").innerHTML = turnsPhiResult.toFixed(1);
    } else {
        alert(errorMessage);
    }
}

function validateInput(inputName) {
    var input = document.forms["mp3Form"][inputName].value;
    if (input == null || input == "" || isNaN(input)) {
        errorMessage += inputName + " is required and must be a number.\n";
    } else {
        input = parseFloat(input);
    }
    return input;
}