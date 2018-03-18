//From database
var pg = require("pg"); //Postgres
const connectionString = "postgres://temp:pass@localhost:5000/businessList";


//PULL (GET)
//Pull business list
function getBusinessList(callback) {

    //var client = new pg.Client(connectionString);
    //client.connect(function (err) {
    //    if (err) {
    //        console.log("Error connecting to DB: ")
    //        console.log(err);
    //        callback(err, null);
    //    }
    //    var sql = "SELECT name, id FROM business";

    //    var query = client.query(sql, function (err, result) {
    //        // we are now done getting the data from the DB, disconnect the client
    //        client.end(function (err) {
    //            if (err) throw err;
    //        });

    //        if (err) {
    //            console.log("Error in query: ")
    //            console.log(err);
    //            callback(err, null);
    //        }

    //        console.log("Found result: " + JSON.stringify(result.rows));

    //        // call whatever function the person that called us wanted, giving it
    //        // the results that we have been compiling
    //        callback(null, result.rows);
    //    });
    //});

    var result = {
        status: "success",
        business: [{ id: 1, name: "Frozen Frame" },
        { id: 2, name: "Meta Booth" },
        { id: 3, name: "PorTable " },
        { id: 4, name: "Business Pulse Manager" }]
    };

    callback(null, result);
}

//Pull assets for specified business
function getAssets(business_id) {
    //future database pull query
    var sql = 'SELECT * FROM assets a JOIN business b ON a.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
    var params = [business_id];

    var result = {
        id: 1,
        _date: "01/01/2018",
        business_id: business_id,
        cash_and_equivalents: 10000,
        accounts_receivable: 10000,
        inventory: 100000,     
        other: 100
    };
    return result;
}

//pull Liabilities for specified business
function getLiabilities(business_id) {

    //future  database pull  query
    var sql = 'SELECT * FROM liabilities l JOIN business b ON l.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
    var params = [business_id];


    var result = {
        id: 1,
        _date: "01/01/2018",
        business_id: business_id,
        accounts_payable: 1000,
        debt_itemization: 1000,
        long_term_obligations: 1200,
        leases: 800,
        other: 100
    };
    return result;
}

//Business Summary: pull info from liablities and assets for specified business
function getSummary(business_id) {
    var result = {
        _date: "01/01/2018",
        business_id: business_id,
        total_liabilities: 15000,
        total_assets: 250000
    };
    return result;
}
//Data Log: Pull needed info from assets and liabilites for specified business
function getDataLog(business_id) {
    var result = {
        _date: "01/01/2018",
        business_id: business_id,
        total_liabilities: 15000,
        total_assets: 250000,
        accounts_receivable: 12000,
        accounts_payable: 10000
    };
    return result;
}

//CREATE (POST) 
//Update Assets
function updateAssets(assets) {

    var sql = "INSERT INTO assets(_date, business_id, cash_and_equivalents, accounts_recievable, inventory, other)"
    + "VALUES(:a_date, :a_business_id, :cash_and_equivalents, :accounts_recievable, :inventory, :a_other)";

    console.log('Updating Assets!');

    var business_id = assets.id;
    var date = assets.date;
    var c_e = assets.c_e;
    var a_r = assets.a_r;
    var inv = assets.inv;
    var other = assets.other;

    var status = { status: "success" };
    return status;
}

//update Liabilities
function updateLiabilites(l) {

    var sql = "INSERT INTO liabilities(_date, business_id, accounts_payable, debt_itemization, long_term_obligations, leases, other)"
       + "VALUES(:l_date, :l_business_id, :accounts_payable, :debt_itemization, :long_term_obligations, :leases, :l_other)"

    console.log('Updating Liabilities!');

    var business_id = l.id;
    var date = l.date;
    var a_p = l.a_p;
    var ocl = l.ocl;
    var debt = l.debt;
    var lto = l.lto;
    var leases = l.leases;
    var other = l.other;

    var status = { status: "success" };
    return status;
}
module.exports = {
    getBusinessList: getBusinessList,
    getAssets: getAssets,
    getLiabilities: getLiabilities,
    getSummary: getSummary,
    getDataLog: getDataLog,
    updateAssets: updateAssets,
    updateLiabilities: updateLiabilites
};