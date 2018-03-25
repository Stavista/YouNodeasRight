var bizModel = require('../models/10M-bpm.js');

//Business List
function handleBusinessName(request, response) {
    var id = request.params.id;

    console.log("Returning the business Name");

    bizModel.getBusinessName(id, function (error, result) {
        if (error || result === null) {
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

    var result = bizModel.getAssets(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        } else {
            console.log(result);
            response.status(200).json(result);
        }
    });
}

//Liabilities for specifies business
function handleLiabilities(request, response) {
    var id = request.params.id;

    console.log("Returning Liabilities for business: " + id);

    var result = bizModel.getLiabilities(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        } else {
            response.status(200).json(result);
        }
    });
}

//Business Summary for specified Business
function handleSummary(request, response) {
    var id = request.params.id;

    console.log("Returning Summary for business: " + id);

    var result = bizModel.getSummary(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        } else {
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
            };
            response.status(200).json(summary);
        }
    });
}

//Data Log for specified Business
function handleDataLog(request, response) {
    var id = request.params.id;

    console.log("Returning Data Log for business: " + id);

    var result = bizModel.getDataLog(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        }
        else {
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
            };
            response.status(200).json(summary);
        }
    });

}

//POST
//Update Assets
function sendAssets(request, response) {

    console.log('sending Assets');
    var assets = {
        id: request.params.id,
        date: request.params.date,
        c_e: request.params.c_e,
        a_r: request.params.a_r,
        inv: request.params.inv,
        other: request.params.other
    };
    var result = bizModel.updateAssets(assets, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        } else {
            response.status(200).json(result);
        }
    });
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
    };
    var result = bizModel.updateLiabilities(liabilities, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        } else {
            response.status(200).json(result);
        }
    });
}

module.exports = {
    handleBusinessName: handleBusinessName,
    handleAssets: handleAssets,
    handleLiabilities: handleLiabilities,
    handleSummary: handleSummary,
    handleDataLog: handleDataLog,
    sendAssets: sendAssets,
    sendLiabilities: sendLiabilities
};