var errorMessage;
var savedZOnes = [];
var savedZTwos = [];
var savedZThrees = [];
var STEP_SIZE = 0.02;

function checkData() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("zOnes") != null
            && localStorage.getItem("zTwos") != null
            && localStorage.getItem("zThrees") != null) {
            savedZOnes= JSON.parse(localStorage["zOnes"]);
            savedZTwos= JSON.parse(localStorage["zTwos"]);
            savedZThrees= JSON.parse(localStorage["zThrees"]);
            displaySavedZValues();
        }
    } else {
        console.log("ERROR - Browser does not support local web storage.")
    }
}

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
        savedZThrees.push(zThree);
        var rollAngleResult = calculateRollAngle(zOne, zTwo, width);
        var pitchAngleResult = calculatePitchAngle(zOne, zThree, length);
        displayTurnsResults(rollAngleResult, pitchAngleResult);
        displaySavedZValues();
        storeData(savedZOnes, savedZTwos, savedZThrees);
        if (savedZOnes.length >= 2) {
            displayDeltaZValues();
        }
    } else {
        alert(errorMessage);
    }
}

function storeData(zOnes, zTwos, zThrees) {
    localStorage["zOnes"] =  JSON.stringify(zOnes);
    localStorage["zTwos"] = JSON.stringify(zTwos);
    localStorage["zThrees"] = JSON.stringify(zThrees);

}

function calculateRollAngle(zOne, zTwo, width) {
    return Math.atan((zTwo - zOne) / width) * (180.0 / Math.PI);
}

function calculatePitchAngle(zOne, zThree, length) {
    return Math.atan((zThree - zOne) / length) * (180.0 / Math.PI);
}

function displaySavedZValues() {
    $("#savedZOnes").text(savedZOnes);
    $("#savedZTwos").text(savedZTwos);
    $("#savedZThrees").text(savedZThrees);
}

function displayDeltaZValues() {
    $("#deltaZOne").text((savedZOnes[savedZOnes.length - 1] - savedZOnes[savedZOnes.length - 2]));
    $("#deltaZTwo").text((savedZTwos[savedZTwos.length - 1] - savedZTwos[savedZOnes.length - 2]));
    $("#deltaZThree").text((savedZThrees[savedZThrees.length - 1] - savedZThrees[savedZOnes.length - 2]));
}


function displayTurnsResults(rollAngleResult, pitchAngleResult) {
    $("#body-output").show();
    var rearRightTurnsResult = rollAngleResult / STEP_SIZE;
    if (rearRightTurnsResult > 0)
        $("#lblRearRightTurnsResult").text(rearRightTurnsResult.toFixed(1) + " CCW");
    else
        $("#lblRearRightTurnsResult").text(rearRightTurnsResult.toFixed(1) + " CW");

    var frontLeftTurnsResult = pitchAngleResult / STEP_SIZE;
    if (frontLeftTurnsResult > 0)
        $("#lblFrontLeftTurnsResult").text(frontLeftTurnsResult.toFixed(1) + " CCW");
    else
        $("#lblFrontLeftTurnsResult").text(frontLeftTurnsResult.toFixed(1) + " CW");
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

function clearSavedValues(){
  savedZOnes=[];
  savedZTwos=[];
  savedZThrees=[];
  localStorage.setItem("zOnes", savedZOnes);
  localStorage.setItem("zTwos", savedZTwos);
  localStorage.setItem("zThrees", savedZThrees);
  displaySavedZValues();
}