var bizModel = require('../models/10M-bpm.js');

//Business List
function handleBusinessList(request, response) {
    console.log("Returning the business list");

    bizModel.getBusinessList(function (error, result) {
        if (error || result == null) {
            response.status(500).json({ success: false, data: error });
        } else {
            response.status(200).json(result);
        }
    });
}

//Assets for specifies business
function handleAssets(request, response) {
    var id = request.params.id;

    console.log("Returning assets for business: " + id);

    var result = bizModel.getAssets(id);
    response.json(result);
}

//Liabilities for specifies business
function handleLiabilities(request, response) {
    var id = request.params.id;

    console.log("Returning Liabilities for business: " + id);

    var result = bizModel.getLiabilities(id);
    response.json(result);
}

//Business Summary for specified Business
function handleSummary(request, response) {
    var id = request.params.id;

    console.log("Returning Summary for business: " + id);

    var result = bizModel.getSummary(id);
    var assets = result.total_assets;
    var liabilities = result.total_liabilities;
    var workingCapital = assets - liabilities;
    var ratio = assets / liabilities;
    var ownersContribution = workingCapital / (liabilities + workingCapital);
    var creditorsContribution = liabilities / (liabilities + workingCapital);

    var summary = {
        business_id: result.business_id,
        date: result._date,
        totalLiabilities: liabilities,
        workingCapital: workingCapital,
        ratio: ratio,
        ownersContribution: ownersContribution,
        creditorsContribution: creditorsContribution
    }
    response.json(summary);
}

//Data Log for specified Business
function handleDataLog(request, response) {
    var id = request.params.id;

    console.log("Returning Data Log for business: " + id);

    var result = bizModel.getDataLog(id);
    var assets = result.total_assets;
    var liabilities = result.total_assets;
    var workingCapital = assets - liabilities;
    var ratio = assets / liabilities;
    var ownersContribution = workingCapital / (liabilities + workingCapital);
    var creditorsContribution = liabilities / (liabilities + workingCapital);

    var summary = {
        business_id: result.business_id,
        date: result._date,
        totalLiabilities: liabilities,
        workingCapital: workingCapital,
        ratio: ratio,
        ownersContribution: ownersContribution,
        creditorsContribution: creditorsContribution,
        accountsReceivable: result.accounts_receivable,
        accountsPayable: result.accounts_payable
    }
    response.json(summary);
}

//POST
//Update Assets
function sendAssets(request, response) {

    console.log('sending Assets');
    var assets = {
        id : request.params.id,
        date : request.params.date,
        c_e : request.params.c_e,
        a_r : request.params.a_r,
        inv : request.params.inv,
        other : request.params.other
    }
    var result = bizModel.updateAssets(assets);
    response.json(result);
}

//Update Liabilities
function sendLiabilities(request, response) {

    console.log('sending Liabilities');
    var liabilities = {
        id: request.params.id,
        date: request.params.date,
        a_p: request.params.a_p,
        ocl: request.params.ocl,
        debt: request.params.debt,
        lto: request.params.lto,
        leases: request.params.leases,
        other: request.params.other
    }
    var result = bizModel.updateLiabilities(liabilities);
    response.json(result);
}

module.exports = {
    handleBusinessList: handleBusinessList,
    handleAssets: handleAssets,
    handleLiabilities: handleLiabilities,
    handleSummary: handleSummary,
    handleDataLog: handleDataLog,
    sendAssets: sendAssets,
    sendLiabilities: sendLiabilities
};