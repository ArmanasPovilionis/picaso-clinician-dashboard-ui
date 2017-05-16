$(function () {
    'use strict';
    getRiskData("5f8bcf7b-efb0-4a4d-9999-672b49ceb840"); 
});

function getRiskData(patientToken) {
  // var PData = getPatientDataPer(patientToken);
  // var SystolicBP = getPatientMesurmentsSBP(patientToken);
  // var Cholesterol =  getPatientMesurmentsChol(patientToken);

  //var endpoint = "http://192.168.176.10/?Gender="+PData.PGender+"&Age="+PData.PAge+"&Diabetes="+PData.PDiabetes+"&Smoker="+PData.PSmoker+"&SBP="+SystolicBP+"&Chol="+Cholesterol;

 // var endpoint = "http://10.192.0.1/?Gender="+PData.PGender+"&Age="+PData.PAge+"&Diabetes="+PData.PDiabetes+"&Smoker="+PData.PSmoker+"&SBP="+SystolicBP+"&Chol="+Cholesterol;
  alert("hi");
  var endpoint = "http://192.168.162.21:8100/?Gender=m";//+PData.PGender+"&Age="+PData.PAge+"&Diabetes="+PData.PDiabetes+"&Smoker="+PData.PSmoker+"&SBP="+SystolicBP+"&Chol="+Cholesterol;

  var request = new XMLHttpRequest();

  request.open("GET", endpoint, false);

  request.send();
  alert(request.status);
  alert(request.responseText);
  if (request.status === 200 || request.status === 304) {
    var jsonData = JSON.parse(request.responseText);
    alert(jsonData);
    console.log(request.responseText);
    var i = 0;
    var oTbl0 = document.getElementById("oTBL_data0");

    for (i = 0; i < 4; ++i) {
      oTbl0.rows[jsonData[i].x].cells[jsonData[i].y].innerHTML = "<strong>X</strong>";
      oTbl0.rows[jsonData[i].x].cells[jsonData[i].y].style.textAlign = "center";
      oTbl0.rows[jsonData[i].x].cells[jsonData[i].y].style.fontSize = "16pt";
    }
  }
}

function getPatientDataPer(patientToken) {
  var endpoint = "https://linkwatchrestservicetest.azurewebsites.net/api/v1/patient/";
  var request = new XMLHttpRequest();

  request.open("GET", endpoint, false);
  request.setRequestHeader("Token", patientToken);

  request.send();
  if (request.status === 200 || request.status === 304) {
    var patientInfoData = JSON.parse(request.responseText);
    console.log(request.responseText);
    return {
      PSmoker: patientInfoData.Smoker,
      PDiabetes: patientInfoData.Diabetes,
      PAge: patientInfoData.Patient.Age,
      PGender: patientInfoData.Patient.Gender
    }
  } else {
    return {
      PSmoker:"0",
      PDiabetes:"0",
      PAge:"0",
      PGender:"0"
    }
  }
}

function getPatientMesurmentsSBP(patientToken) {
  var endpoint = "https://linkwatchrestservicetest.azurewebsites.net/api/v1/measurement/avg/150021/between?StartTime=2015-01-01&EndTime=2016-02-11";
  var request = new XMLHttpRequest();

  request.open("GET", endpoint, false);
  request.setRequestHeader("Token", patientToken);

  request.send();
  if (request.status === 200 || request.status === 304) {
    var patientInfoData = JSON.parse(request.responseText);
    console.log(request.responseText);
    return patientInfoData[0].Value;
  } else {
    return "0";
  }
}

function getPatientMesurmentsChol(patientToken) {
  var endpoint = "https://linkwatchrestservicetest.azurewebsites.net/api/v1/measurement/avg/188737/between?StartTime=2015-01-01&EndTime=2016-02-11"
  var request = new XMLHttpRequest();

  request.open("GET", endpoint, false);
  request.setRequestHeader("Token", patientToken);

  request.send();
  if (request.status === 200 || request.status === 304) {
    var patientInfoData = JSON.parse(request.responseText);
    console.log(request.responseText);
    return patientInfoData[0].Value;
  } else {
    return "0";
  }
}
