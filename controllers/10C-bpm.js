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
            console.log("Controler Result: " + result);
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
            console.log("Controler Result: " + result);
            response.status(200).json(result);
        }
    });
}

//Business Summary for specified Business
function handleSummary(request, response) {
    var id = request.params.id;
    var calculations = [];

    console.log("Returning Summary for business: " + id);

    var result = bizModel.getSummary(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        }
        else {
            for (i in result) {
                var assets = result[i].total_assets;
                var liabilities = result[i].total_liabilities;

                var negative = "F";
                var ratio = (assets / liabilities);
                var workingCapital = (assets - liabilities);
                var ownersContribution;
                var creditorsContribution;
                console.log("Working cap Initialized: " + workingCapital);

                if ((workingCapital <= 0)) {
                    negative = "T";
                    workingCapital *= -1;
                    console.log("Working cap for negative: " + workingCapital);
                    ownersContribution = ((workingCapital / (assets)) * 100);
                    creditorsContribution = (ownersContribution + 100);
                    console.log("Own for Neg: " + ownersContribution + " credit: " + creditorsContribution);
                } else {
                    var ownersContribution = (workingCapital / assets) * 100;
                    var creditorsContribution;
                    creditorsContribution = (100 - ownersContribution);
                    console.log("Initialized Owner: " + ownersContribution + " credit: " + creditorsContribution);
                }
                var summary = {
                    date: result[i]._date,
                    totalAssets: assets,
                    totalLiabilities: liabilities,
                    workingCapital: workingCapital,
                    ratio: ratio,
                    ownersContribution: ownersContribution,
                    creditorsContribution: creditorsContribution,
                    negative: negative
                }
                calculations.push(summary);
            };
            //calculatedResult = JSON.stringify(calculations);
            console.log(calculations);
            response.status(200).json(calculations);
        }
    });
}

//Data Log for specified Business
function handleDataLog(request, response) {
    var id = request.params.id;

    console.log("Returning Data Log for business: " + id);
    var calculations = [];
    var result = bizModel.getDataLog(id, function (error, result) {
        if (error || result === null) {
            response.status(500).json({ success: false, data: error });
        }
        else {
            //console.log("FROM MODEL: " + result);
            //for (i in result) {
            //    var assets = result[i].total_assets;
            //    var liabilities = result[i].total_assets;
            //    var workingCapital = assets - liabilities;
            //    var ratio = assets / liabilities;
            //    var ownersContribution = workingCapital / (liabilities + workingCapital);
            //    var creditorsContribution = liabilities / (liabilities + workingCapital);
            //    //date,asset Total, Liability Total, Working Capital, Cap% , ratio, cash and E, Acnt Receivable, acnt Pay
            //    var summary = {
            //        date: result[i]._date,
            //        totalLiabilities: liabilities,
            //        workingCapital: workingCapital,
            //        ratio: ratio,
            //        ownersContribution: ownersContribution,
            //        creditorsContribution: creditorsContribution,
            //        accountsReceivable: result[i].accounts_receivable,
            //        accountsPayable: result[i].accounts_payable
            //    }
            //    calculations.push(summary);
            //};
            ////calculatedResult = JSON.stringify(calculations);
            //console.log(calculations);
            response.status(200).json({ success: true });
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