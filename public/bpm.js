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
    hideAll();
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
                text += "<th>Accounts Receivable</th>";
                text += "<th>Inventory</th>";
                text += "<th>Other</th></tr><tbody>";
                       
                var row;
                for (row in assetList) {
                    var formatedDate = formatDate(assetList[row]._date);

                    text += "<tr>";
                    text += "<td>" + formatedDate + "</td>";
                    //text += "<td>" + assetList[row]._date + "</td>";
                    text += "<td>$" + Number(assetList[row].cash_and_equivalents).toFixed(2) + "</td>";
                    text += "<td>$" + Number(assetList[row].accounts_receivable).toFixed(2) + "</td>";
                    text += "<td>$" + Number(assetList[row].inventory).toFixed(2) + "</td>";
                    text += "<td>$" + Number(assetList[row].other).toFixed(2) + "</td>";
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
                    text += "<td>$" + Number(liabilityList[row].accounts_payable).toFixed(2) + "</td>";
                    text += "<td>$" + Number(liabilityList[row].debt_itemization).toFixed(2) + "</td>";
                    text += "<td>$" + Number(liabilityList[row].long_term_obligations).toFixed(2) + "</td>";
                    text += "<td>$" + Number(liabilityList[row].leases).toFixed(2) + "</td>";
                    text += "<td>$" + Number(liabilityList[row].other).toFixed(2) + "</td>";
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
                    var formatedDate = formatDate(summaryList[row].date);
                    var assets = Number(summaryList[row].totalAssets).toFixed(2);
                    var liabilities = Number(summaryList[row].totalLiabilities).toFixed(2);
                    var workingCapital = Number(summaryList[row].workingCapital).toFixed(2);
                    var ratio = Number(summaryList[row].ratio).toFixed(2);
                    var owner = Number(summaryList[row].ownersContribution).toFixed(2);
                    var credit = Number(summaryList[row].creditorsContribution).toFixed(2);
                    var negative = summaryList[row].negative;


                    if (negative == "F") {
                        text += "<tr>";
                        text += "<td>" + formatedDate + "</td>";
                        text += "<td>$" + assets + "</td>";
                        text += "<td>$" + liabilities + "</td>";
                        text += "<td>$" + workingCapital + "</td>";
                        text += "<td>" + ratio + "</td>";
                        text += "<td>" + owner + "%</td>";
                        text += "<td>" + credit + "%</td>";
                        text += "</tr>";
                    }
                    else if (negative == "T"){
                        text += "<tr>";
                        text += "<td>" + formatedDate + "</td>";
                        text += "<td>$" + assets + "</td>";
                        text += "<td>$" + liabilities + "</td>";
                        text += "<td>-$" + workingCapital + "</td>";
                        text += "<td>" + ratio + "</td>";
                        text += "<td>-"+ owner + "%</td>";
                        text += "<td>" + credit + "%</td>";
                        text += "</tr>";
                    }
                    
                }
                text += "</tbody ></table >";
                //console.log(text);
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
//                    text += "<td>$" + dataLogList[row].accountsReceivable + "</td>";
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
    //Make sure all formats go hidden so the outdated business info doesn't show
    hideAll();
    //'/updateAssets/:id/:date/:c_e/:a_r/:inv/:other'
    var c_e = document.getElementById("inputCash&Equivalents").value;
    var a_r = document.getElementById("inputAccountsReceivable").value;
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
                alert('Your ASSET Log was not entered due to an empty field or invalid entry.');
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
    document.getElementById("inputAccountsReceivable").value = "";
    document.getElementById("inputInventory").value = "";
    document.getElementById("inputAssetsOther").value = "";
}

/*****   INSERT LIABILITIES   *******************************/
function insertLiabilities() {
    //Make sure all formats go hidden so the outdated business info doesn't show
    hideAll();
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
                alert('Your LIABILITY Log was not entered due to an empty field or invalid entry.');
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
*   Hide, Unhide, and Change text in button in ALL to reflect that      */
function hideAll() {
    document.getElementById('hideAssetHistory').className = 'hidden';
    document.getElementById('assets').innerText = 'View Asset History';

    document.getElementById('hideLiabilityHistory').className = 'hidden';
    document.getElementById('liabilities').innerText = 'View Liability History';

    document.getElementById('hideSummary').className = 'hidden';
    document.getElementById('summary').innerText = 'View Summary';
    
    document.getElementById('updateForms').className = 'hidden';
    document.getElementById('updateButton').innerText = 'Update Assets or Liabilities';

}
/*****   HIDE AND UNHIDE   *******************************
*   Hide, Unhide, and Change text in button to reflect that      */
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
                document.getElementById(buttonId).innerText = 'View Summary';
            if (buttonId == 'updateButton')
                document.getElementById(buttonId).innerText = 'Update Assets or Liabilities';
        }
    }
}

/*****  Format The Date   *******************************/
function formatDate(datesSuck) {
    console.log(datesSuck);
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
