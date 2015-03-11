function calculateResult() {
    //step size in degrees per division
    var stepSize = 0.02;
    
    var length = parseFloat(document.getElementById("txtLength").value);
    var width = parseFloat(document.getElementById("txtWidth").value);
    var zOne = parseFloat(document.getElementById("txtZOne").value);
    var zTwo = parseFloat(document.getElementById("txtZTwo").value);
    var zThree = parseFloat(document.getElementById("txtZThree").value);
    

    var thetaResult = Math.atan((zTwo - zOne) / width) * (180.0 / Math.PI);
    document.getElementById("lblThetaResult").innerHTML = thetaResult.toFixed(2);
    
    var phiResult = Math.atan((zThree - zOne) / length) * (180.0 / Math.PI);  
    document.getElementById("lblPhiResult").innerHTML =  phiResult.toFixed(2);
    
    var turnsThetaResult = thetaResult/stepSize; 
    document.getElementById("lblTurnsThetaResult").innerHTML = turnsThetaResult.toFixed(1);

    var turnsPhiResult = phiResult/stepSize;
    document.getElementById("lblTurnsPhiResult").innerHTML = turnsPhiResult.toFixed(1);

    
}