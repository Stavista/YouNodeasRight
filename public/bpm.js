// JavaScript source code


/*****   GET BUSINESS ID   *******************************/
function getBusinessId() {
    var selected = document.getElementById("bizSelect");
    var bizId = selected.options[selected.selectedIndex].value;
    return bizId;
}
/*****   GET BUSINESS NAME   ******************************
*   Business Name Selected from drop down                   */
function bizSelect() {
    var bizId = getBusinessId();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var bizName = JSON.parse(xmlhttp.responseText)[0].name;
                console.log(bizName);
                var showName = document.getElementsByClassName("bizName");
                for (var i = 0; i < showName.length; i++) {
                    showName[i].innerHTML = bizName;
                }
                //Unhide Update Form Buttons
                var item = document.getElementById('updateButtons');
                item.className = 'unhidden';
            }
            else if (xmlhttp.status == 400)
                alert('There was an error 400');
            else
                alert('something else other than 200 was returned');
        }
    };
    xmlhttp.open("GET", "/businessName/" + bizId, true);
    xmlhttp.send();
}

/*****   ASSETS   *******************************/
function assets() {
    var bizId = getBusinessId();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var bizName = JSON.parse(xmlhttp.responseText)[0].name;
                console.log(bizName);
                document.getElementById("").innerHTML = bizName;
                //Unhide Update Form Buttons
                hide()
            }
            else if (xmlhttp.status == 400)
                alert('There was an error 400');
            else
                alert('something else other than 200 was returned');
        }
    };
    xmlhttp.open("GET", "/businessName/" + bizId, true);
    xmlhttp.send();
}

/*****   LIABILITIES   *******************************/
function liabilities() {
    var bizId = getBusinessId();

}

/*****   DATA LOG   *******************************/
function dataLog() {
    var bizId = getBusinessId();


}

/*****   SUMMARY   *******************************/
function summary() {
    var bizId = getBusinessId();


}

/*****   INSERT ASSETS   *******************************/
function insertAssets() {
    var bizId = getBusinessId();
    //'/updateAssets/:id/:date/:c_e/:a_r/:inv/:other'
    var c_e = document.getElementById("inputCash&Equivalents").value;
    var a_r = document.getElementById("inputAccountsRecievable").value;
    var i = document.getElementById("inputInventory").value;
    var o = document.getElementById("inputAssetsOther").value;
    var d = document.getElementById("inputDate").value;
    if (!d) { //If No Date was entered
        var d = new Date();
        var dd = d.getDate();
        var mm = d.getMonth() + 1; //January is 0!
        var yyyy = d.getFullYear();
        if (dd < 10)
            dd = '0' + dd
        if (mm < 10)
            mm = '0' + mm
        d = mm + '-' + dd + '-' + yyyy;
    }
    
    //SERVER URL LOOKING FOR:'/updateAssets/:id/:date/:c_e/:a_r/:inv/:other'
    var insertURL = "/updateAssets/" + bizId + "/" + d + "/" + c_e + "/" + a_r + "/" + i + "/" + o;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        debugger;
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);
                console.log(result);
                alert('Your Asset Log Was Inserted!')
            }
            else if (xmlhttp.status == 400) {
                console.log(result);
                alert('Your Log was not entered due to an empty field or invalid entry.');
            }
            else {
                alert('Your Asset Log Was Inserted!')
            }
        }
    };
    console.log(insertURL);
    xmlhttp.open("POST", insertURL, true);
    xmlhttp.send();
}

/*****   INSERT LIABILITIES   *******************************/
function insertLiabilities() {

    var bizId = getBusinessId();
    var a_p = document.getElementById("inputAccountsPayable").value;
    var debt = document.getElementById("inputDebtItemization").value;
    var lto = document.getElementById("inputLongTermObligations").value;
    var l = document.getElementById("inputLeases").value;
    var o = document.getElementById("inputLiabilitiesOther").value;
    var d = document.getElementById("inputDate").value;
    if (!d) { //If No Date was entered
        var d = new Date();
        var dd = d.getDate();
        var mm = d.getMonth() + 1; //January is 0!
        var yyyy = d.getFullYear();
        if (dd < 10) 
            dd = '0' + dd
        if (mm < 10) 
            mm = '0' + mm
        d = mm + '-' + dd + '-' + yyyy;
    }
    
    //SERVER URL LOOKING FOR:'/updateLiabilities/:id/:date/:a_p/:debt/:lto/:leases/:other'
    var insertURL = "/updateLiabilities/" + bizId + "/" + d + "/" + a_p + "/" + debt + "/" + lto + "/" + l + "/" + o;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);
                console.log(result);
                alert('Your Liability Log Was Inserted!')
            }
            else if (xmlhttp.status == 400) {
                console.log(result);
                alert('Your Log was not entered due to an empty field or invalid entry.');
            }
            else {
                alert('Your Liability Log Was Inserted!')
            }
        }
    };
    console.log(insertURL);
    xmlhttp.open("POST", insertURL, true);
    xmlhttp.send();
}

/*****   HIDE AND UNHIDE   *******************************
*   For future hiding of tables maybe?      */
function hide(buttonId, divID) {
    var item = document.getElementById(divID);
    if (item) {
        if (item.className == 'hidden') {
            item.className = 'unhidden';
            if (buttonId == 'assets')
                buttonId.value = 'Hide Detailed History of Asset';
        } else {
            item.className = 'hidden';
            if (buttonId == 'assets')
                buttonId.value = 'View Detailed History of Asset';
        }
    }
}
