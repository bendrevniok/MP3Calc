var errorMessage;
var savedZOnes = [];
var savedZTwos = [];
var savedZThrees = [];

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
        savedZOnes.push(zOne);
        savedZTwos.push(zTwo);
        savedZThrees.push(zThree)

        var rollAngleResult = Math.atan((zTwo - zOne) / width) * (180.0 / Math.PI);
        document.getElementById("lblRollAngleResult").innerHTML = rollAngleResult.toFixed(2);

        var pitchAngleResult = Math.atan((zThree - zOne) / length) * (180.0 / Math.PI);
        document.getElementById("lblPitchAngleResult").innerHTML = pitchAngleResult.toFixed(2);

        var rearRightTurnsResult = rollAngleResult / stepSize;
        if (rearRightTurnsResult > 0) {
            document.getElementById("lblRearRightTurnsResult").innerHTML = rearRightTurnsResult.toFixed(1) + " CCW";
        } else {
            document.getElementById("lblRearRightTurnsResult").innerHTML = rearRightTurnsResult.toFixed(1) + " CW";
        }
        //rear right turns

        var frontLeftTurnsResult = pitchAngleResult / stepSize;
        if (frontLeftTurnsResult > 0) {
            document.getElementById("lblFrontLeftTurnsResult").innerHTML = frontLeftTurnsResult.toFixed(1) + " CCW";
        } else {
            document.getElementById("lblFrontLeftTurnsResult").innerHTML = frontLeftTurnsResult.toFixed(1) + " CW";
        }
        //front left turns
        
        displaySavedZValues();
    } else {
        alert(errorMessage);
    }
}

function displaySavedZValues(){
    document.getElementById("savedZOnes").innerHTML="Previous Z1's: " + savedZOnes;
    document.getElementById("savedZTwos").innerHTML="Previous Z2's: "+savedZTwos;
    document.getElementById("savedZThrees").innerHTML="Previous Z3's: "+savedZThrees;
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

/*
Stuff to add: 
if turns result are  postive specify they are counter clockwise
else if they are negative specify they are clockwise

keep the last five zone, two, and zthree in memory for reference
store them in object

delta zone, ztwo, zthree that would represent the difference between the last inputted zone and the current zone
save values even if browser is closed with a session or cookies or whatever
possibly write saved z values to a text file, csv file

theta is roll angle, theta turns is rear right
phi is pitch angle, phi turns is front left

if zTwo and zOne positive number it should come out as positive result
*/