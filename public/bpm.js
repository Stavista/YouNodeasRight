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
    //Make sure all formats go hidden so the past business info doesn't show
    var item = document.getElementById('hideAssetHistory');
    item.className = 'hidden';
    var item = document.getElementById('hideLiabilityHistory');
    item.className = 'hidden';
    var item = document.getElementById('hideSummary');
    item.className = 'hidden';

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
                var item = document.getElementById('show');
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
    hide("assets", "hideAssetHistory");
    var bizId = getBusinessId();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var assetList = JSON.parse(xmlhttp.responseText);
                var text = "<table><tr>";
                text += "<th>Date</th>";
                text += "<th>Cash and Equivalents</th>";
                text += "<th>Accounts Recievable</th>";
                text += "<th>Inventory</th>";
                text += "<th>Other</th></tr><tbody>";
                       
                var row;
                for (row in assetList) {
                    var formatedDate = formatDate(assetList[row]._date);

                    text += "<tr>";
                    text += "<td>" + formatedDate + "</td>";
                    //text += "<td>" + assetList[row]._date + "</td>";
                    text += "<td>$" + assetList[row].cash_and_equivalents + "</td>";
                    text += "<td>$" + assetList[row].accounts_recievable + "</td>";
                    text += "<td>$" + assetList[row].inventory + "</td>";
                    text += "<td>$" + assetList[row].other + "</td>";
                text += "</tr>";
                }
                text += "</tbody ></table >";
                console.log(text);
                document.getElementById("assetTable").innerHTML = text;
            }
            else if (xmlhttp.status == 400)
                alert('There was an error 400');
            else
                alert('something else other than 200 was returned');
        }
    };
    xmlhttp.open("GET", "/assets/" + bizId, true);
    xmlhttp.send();
}

/*****   LIABILITIES   *******************************/
function liabilities() {
    hide( "liabilities","hideLiabilityHistory");
    var bizId = getBusinessId();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var liabilityList = JSON.parse(xmlhttp.responseText);
                var text = "<table><tr>";
                text += "<th>Date</th>";
                text += "<th>Accounts Payable</th>";
                text += "<th>Debt Itemization</th>";
                text += "<th>Long Term Obligations</th>";
                text += "<th>Leases</th>";
                text += "<th>Other</th></tr><tbody>";

                var row;
                for (row in liabilityList) {
                    var formatedDate = formatDate(liabilityList[row]._date);

                    text += "<tr>";
                    text += "<td>" + formatedDate + "</td>";
                    //text += "<td>" + liabilityList[row]._date + "</td>";
                    text += "<td>$" + liabilityList[row].accounts_payable + "</td>";
                    text += "<td>$" + liabilityList[row].debt_itemization + "</td>";
                    text += "<td>$" + liabilityList[row].long_term_obligations + "</td>";
                    text += "<td>$" + liabilityList[row].leases + "</td>";
                    text += "<td>$" + liabilityList[row].other + "</td>";
                    text += "</tr>";
                }
                text += "</tbody ></table >";
                console.log(text);
                document.getElementById("liabilityTable").innerHTML = text;
            }
            else if (xmlhttp.status == 400)
                alert('There was an error 400');
            else
                alert('something else other than 200 was returned');
        }
    };
    xmlhttp.open("GET", "/liabilities/" + bizId, true);
    xmlhttp.send();

}


/*****   SUMMARY   *******************************/
function summary() {
    var bizId = getBusinessId();
    hide("summary", "hideSummary");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var summaryList = JSON.parse(xmlhttp.responseText);
                console.log(summaryList);
                var text = "<table><tr>";
                text += "<th>Date</th>";
                text += "<th>Total Assets</th>";
                text += "<th>Total Liabilities</th>";
                text += "<th>Working Capital</th>";
                text += "<th>Current Ratio</th>";
                text += "<th>Owners Contribution</th>";
                text += "<th>Creditors Contribution</th></tr></tbody>";

                var row;
                for (row in summaryList) {
                    var formatedDate = formatDate(summaryList[row]._date);

                    text += "<tr>";
                    text += "<td>" + formatedDate + "</td>";
                    text += "<td>$" + summaryList[row].totalAssets + "</td>";
                    text += "<td>$" + summaryList[row].totalLiabilities + "</td>";
                    text += "<td>$" + summaryList[row].workingCapital + "</td>";
                    text += "<td>" + summaryList[row].ratio + "</td>";
                    text += "<td>" + summaryList[row].ownersContribution + "%</td>";
                    text += "<td>" + summaryList[row].creditorsContribution + "%</td>";
                    text += "</tr>";
                }
                text += "</tbody ></table >";
                console.log(text);
                document.getElementById("summaryTable").innerHTML = text;
            }
            else if (xmlhttp.status == 400)
                alert('There was an error 400');
            else
                alert('something else other than 200 was returned');
        }
    };
    xmlhttp.open("GET", "/summary/" + bizId, true);
    xmlhttp.send();

}

/*****   DATA LOG   *******************************/
//function dataLog() {
//    var bizId = getBusinessId();
//    hide("dataLog", "hideDataLog");
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = function () {
//        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
//            if (xmlhttp.status == 200) {
//                var dataLogList = JSON.parse(xmlhttp.responseText);
//                console.log(dataLogList);
//                var text = "<table><tr>";
//                text += "<th>Date</th>";
//                text += "<th>Total Liabilities</th>";
//                text += "<th>Working Capital</th>";
//                text += "<th>Current Ratio</th>";
//                text += "<th>Owners Contribution</th>";
//                text += "<th>Creditors Contribution</th>";
//                text += "<th>Accounts Receivable</th></tr><tbody>";
//                text += "<th>Accounts Payable</th></tr><tbody>";

//                var row;
//                for (row in dataLogList) {
//                    //var formatedDate = formatDate(dataLogList[row]._date);

//                    text += "<tr>";
//                    //text += "<td>" + formatedDate + "</td>";
//                    text += "<td>" + dataLogList[row].date + "</td>";
//                    text += "<td>$" + dataLogList[row].totalLiabilities + "</td>";
//                    text += "<td>$" + dataLogList[row].workingCapital + "</td>";
//                    text += "<td>" + dataLogList[row].ratio + "%</td>";
//                    text += "<td>" + dataLogList[row].ownersContribution + "</td>";
//                    text += "<td>" + dataLogList[row].creditorsContribution + "</td>";
//                    text += "<td>$" + dataLogList[row].accountsRecievable + "</td>";
//                    text += "<td>$" + dataLogList[row].accountsPayable + "</td>";
//                    text += "</tr>";
//                }
//                text += "</tbody ></table >";
//                console.log(text);
//                document.getElementById("dataLogTable").innerHTML = text;
//            }
//            else if (xmlhttp.status == 400)
//                alert('There was an error 400');
//            else
//                alert('something else other than 200 was returned');
//        }
//    };
//    xmlhttp.open("GET", "/dataLog/" + bizId, true);
//    xmlhttp.send();
//
//}

/*****   INSERT ASSETS   *******************************/
function insertAssets() {
    var bizId = getBusinessId();
    //'/updateAssets/:id/:date/:c_e/:a_r/:inv/:other'
    var c_e = document.getElementById("inputCash&Equivalents").value;
    var a_r = document.getElementById("inputAccountsRecievable").value;
    var i = document.getElementById("inputInventory").value;
    var o = document.getElementById("inputAssetsOther").value;
    var d = document.getElementById("inputDate").value;
    if (!d) { d = formatDate(d); }
    
    //SERVER URL LOOKING FOR:'/updateAssets/:id/:date/:c_e/:a_r/:inv/:other'
    var insertURL = "/updateAssets/" + bizId + "/" + d + "/" + c_e + "/" + a_r + "/" + i + "/" + o;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);
                console.log(result);
                alert('Your Asset Log Was Inserted!')
            }
            else if (xmlhttp.status == 404) {
                console.log(result);
                alert('Your Log was not entered due to an empty field or invalid entry.');
            }
            else {
                alert('Always Double Check to Make Sure Your Asset Log Was Inserted!')
            }
        }
    };
    console.log(insertURL);
    xmlhttp.open("POST", insertURL, true);
    xmlhttp.send();

    document.getElementById("inputCash&Equivalents").value = "";
    document.getElementById("inputAccountsRecievable").value = "";
    document.getElementById("inputInventory").value = "";
    document.getElementById("inputAssetsOther").value = "";
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
    if (!d) { d = formatDate(d); }

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
            else if (xmlhttp.status == 404) {
                console.log(result);
                alert('Your Log was not entered due to an empty field or invalid entry.');
            }
            else {
                alert('Always Double Check to Make Sure Your Liability Log Was Inserted!')
            }
        }
    };
    console.log(insertURL);
    xmlhttp.open("POST", insertURL, true);
    xmlhttp.send();

    document.getElementById("inputAccountsPayable").value = "";
    document.getElementById("inputDebtItemization").value = "";
    document.getElementById("inputLongTermObligations").value = "";
    document.getElementById("inputLeases").value = "";
    document.getElementById("inputLiabilitiesOther").value = "";
}

/*****   HIDE AND UNHIDE   *******************************
*   For future hiding of tables maybe?      */
function hide(buttonId, divID) {
    var item = document.getElementById(divID);
    if (item) {
        if (item.className == 'hidden') {
            item.className = 'unhidden';
            if (buttonId == 'assets')
                document.getElementById(buttonId).innerText = 'Hide Asset History';
            if (buttonId == 'liabilities')
                document.getElementById(buttonId).innerText = 'Hide Liability History';
            //if (buttonId == 'dataLog')
            //    document.getElementById(buttonId).innerText = 'Hide Data Log'
            if (buttonId == 'summary')
                document.getElementById(buttonId).innerText = 'Hide Summary';
            if (buttonId == 'updateButton')
                document.getElementById(buttonId).innerText = 'Hide Update Forms';

        }
        else if (item.className = 'unhidden') {
            item.className = 'hidden';
            if (buttonId == 'assets')
                document.getElementById(buttonId).innerText = 'View Asset History';
            if (buttonId == 'liabilities')
                document.getElementById(buttonId).innerText = 'View Liability History';
            //if (buttonId == 'dataLog')
            //    document.getElementById(buttonId).innerText = 'Data Log';
            if (buttonId == 'summary')
                document.getElementById(buttonId).innerText = 'Summary';
            if (buttonId == 'updateButton')
                document.getElementById(buttonId).innerText = 'Update Assets or Liabilities';
        }
    }
}

/*****  Format The Date   *******************************
*   For future date formating hopefully?      */
function formatDate(datesSuck) {
    if (datesSuck) {
        var msec = Date.parse(datesSuck);
        var d = new Date(msec);
    }
    else {
        var d = new Date();
    }
    var dd = d.getDate();
    var mm = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    d = mm + '-' + dd + '-' + yyyy;
    console.log(d);
    return d;
}
