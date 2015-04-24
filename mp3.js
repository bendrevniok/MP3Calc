var errorMessage;
var savedZOnes = [];
var savedZTwos = [];
var savedZThrees = [];
var STEP_SIZE = 0.02;

function submitData() {
    errorMessage = "";
    var length = validateInput("Length");
    var width = validateInput("Width");
    var zOne = validateInput("Z1");
    var zTwo = validateInput("Z2");
    var zThree = validateInput("Z3");

    if (errorMessage == "") {
        savedZOnes.push(zOne);
        savedZTwos.push(zTwo);
        savedZThrees.push(zThree)
        var rollAngleResult = calculateRollAngle(zOne, zTwo, width);
        var pitchAngleResult = calculatePitchAngle(zOne, zThree, length);
        displayTurnsResults(rollAngleResult, pitchAngleResult);
        displaySavedZValues();
        
        //document.getElementById("lblRollAngleResult").innerHTML = rollAngleResult.toFixed(2);
        //document.getElementById("lblPitchAngleResult").innerHTML = pitchAngleResult.toFixed(2);
        if (savedZOnes.length >= 2) {
            displayDeltaZValues();
        }
    } else
        alert(errorMessage);
}

function calculateRollAngle(zOne, zTwo, width) {
    return Math.atan((zTwo - zOne) / width) * (180.0 / Math.PI);
}

function calculatePitchAngle(zOne, zThree, length) {
    return Math.atan((zThree - zOne) / length) * (180.0 / Math.PI);
}

function displaySavedZValues() {
    document.getElementById("savedZOnes").innerHTML = "Previous Z1's: " + savedZOnes;
    document.getElementById("savedZTwos").innerHTML = "Previous Z2's: " + savedZTwos;
    document.getElementById("savedZThrees").innerHTML = "Previous Z3's: " + savedZThrees;
}

function displayDeltaZValues() {
    document.getElementById("deltaZOne").innerHTML = "Delta Z1: " + (savedZOnes[savedZOnes.length-1] - savedZOnes[savedZOnes.length - 2]);
    document.getElementById("deltaZTwo").innerHTML = "Delta Z2: " + (savedZTwos[savedZTwos.length-1] - savedZTwos[savedZOnes.length - 2]);
    document.getElementById("deltaZThree").innerHTML = "Delta Z3: " + (savedZThrees[savedZThrees.length-1] - savedZThrees[savedZOnes.length - 2]);
}


function displayTurnsResults(rollAngleResult, pitchAngleResult) {
    document.getElementById("body-output").style.visibility = "visible";
    var rearRightTurnsResult = rollAngleResult / STEP_SIZE;
    if (rearRightTurnsResult > 0)
        document.getElementById("lblRearRightTurnsResult").innerHTML = rearRightTurnsResult.toFixed(1) + " CCW";
    else
        document.getElementById("lblRearRightTurnsResult").innerHTML = rearRightTurnsResult.toFixed(1) + " CW";

    var frontLeftTurnsResult = pitchAngleResult / STEP_SIZE;
    if (frontLeftTurnsResult > 0)
        document.getElementById("lblFrontLeftTurnsResult").innerHTML = frontLeftTurnsResult.toFixed(1) + " CCW";
    else
        document.getElementById("lblFrontLeftTurnsResult").innerHTML = frontLeftTurnsResult.toFixed(1) + " CW";
}


function validateInput(inputName) {
    var input = document.forms["mp3Form"][inputName].value;
    if (input === null || input === "" || isNaN(input)) {
        errorMessage += inputName + " is required and must be a number.\n";
    } else {
        input = parseFloat(input);
    }
    return input;
}