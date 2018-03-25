//From database
var pg = require("pg"); //Postgres
const { Client } = require('pg');

//const client = new Client({
//    connectionString: process.env.DATABASE_URL,
//    ssl: true,
//} || "postgres://temp:pass@localhost:5432/postgres");
const connectionString = process.env.DATABASE_URL || "postgres://temp:pass@localhost:5432/postgres";
//ADD ALL POOL STUFF
//var { Pool } = require('pg');

//PULL (GET)
//Pull business list
function getBusinessName(business_id, callback) {
    
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = "SELECT name FROM business WHERE id = $1::int";
        var params = [business_id];

        var query = client.query(sql, params, function (err, result) {
            // we are now done getting the data from the DB, disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

            console.log("Found result: " + JSON.stringify(result.rows));

            // call whatever function the person that called us wanted, giving it
            // the results that we have been compiling
            callback(null, result.rows);
        });
    });

}

//Pull assets for specified business
function getAssets(business_id, callback) {

    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = 'SELECT * FROM assets a JOIN business b ON a.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
        var params = [business_id];

        var query = client.query(sql, params, function (err, result) {
            client.end(function (err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

            console.log("Found result: " + JSON.stringify(result.rows));

            callback(null, result.rows);
        });
    });

}

//pull Liabilities for specified business
function getLiabilities(business_id, callback) {

    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = 'SELECT * FROM liabilities l JOIN business b ON l.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
        var params = [business_id];

        var query = client.query(sql, params, function (err, result) {
            client.end(function (err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }

            console.log("Found result: " + JSON.stringify(result.rows));

            callback(null, result.rows);
        });
    });
}

//Business Summary: pull info from liablities and assets for specified business
function getSummary(business_id, callback) {

    //var client = new pg.Client(connectionString);
    //client.connect(function (err) {
    //    if (err) {
    //        console.log("Error connecting to DB: ")
    //        console.log(err);
    //        callback(err, null);
    //    }
    //    var sql = 'SELECT * FROM liabilities l JOIN business b ON l.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
    //    var params = [business_id];

    //    var query = client.query(sql, params, function (err, result) {
    //        client.end(function (err) {
    //            if (err) throw err;
    //        });

    //        if (err) {
    //            console.log("Error in query: ")
    //            console.log(err);
    //            callback(err, null);
    //        }

    //        console.log("Found result: " + JSON.stringify(result.rows));

    //        callback(null, result.rows);
    //    });
    //});

    var result = {
        _date: "01/01/2018",
        business_id: business_id,
        total_liabilities: 15000,
        total_assets: 250000
    };
    callback(null, result);

    //return result;
}
//Data Log: Pull needed info from assets and liabilites for specified business
function getDataLog(business_id, callback) {
    //var client = new pg.Client(connectionString);
    //client.connect(function (err) {
    //    if (err) {
    //        console.log("Error connecting to DB: ")
    //        console.log(err);
    //        callback(err, null);
    //    }
    //    var sql = 'SELECT * FROM liabilities l JOIN business b ON l.business_id = b.id WHERE b.id = $1::int ORDER BY _date DESC'
    //    var params = [business_id];

    //    var query = client.query(sql, params, function (err, result) {
    //        client.end(function (err) {
    //            if (err) throw err;
    //        });

    //        if (err) {
    //            console.log("Error in query: ")
    //            console.log(err);
    //            callback(err, null);
    //        }

    //        console.log("Found result: " + JSON.stringify(result.rows));

    //        callback(null, result.rows);
    //    });
    //});

    var result = {
        _date: "01/01/2018",
        business_id: business_id,
        total_liabilities: 15000,
        total_assets: 250000,
        accounts_receivable: 12000,
        accounts_payable: 10000
    };
    callback(null, result);

    //return result;
}

//CREATE (POST) 
//Update Assets
function updateAssets(assets, callback) {
    console.log('Updating Assets!');
    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = "INSERT INTO assets(_date, business_id, cash_and_equivalents, accounts_recievable, inventory, other)"
            + "VALUES($1::Date, $2::int, $3::int, $4::int, $5::int, $6::int)";
        var params = [assets.date, assets.id, assets.c_e, assets.a_r, assets.inv, assets.other];

        var query = client.query(sql, params, function (err, result) {
            client.end(function (err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }
            var status = { status: "success" };
            callback(null, status);
        });
    });
}

//update Liabilities
function updateLiabilites(l, callback) {
    console.log('Updating Liabilities!');

    var client = new pg.Client(connectionString);
    client.connect(function (err) {
        if (err) {
            console.log("Error connecting to DB: ")
            console.log(err);
            callback(err, null);
        }
        var sql = "INSERT INTO liabilities(_date, business_id, accounts_payable, debt_itemization, long_term_obligations, leases, other)"
            + "VALUES($1::Date, $2::int, $3::int, $4::int, $5::int, $6::int, $7::int)";
        //:l_date, :l_business_id, :accounts_payable, :debt_itemization, :long_term_obligations, :leases, :l_other)"
        var params = [l.date, l.id, l.a_p, l.debt, l.lto, l.leases, l.other];

        var query = client.query(sql, params, function (err, result) {
            client.end(function (err) {
                if (err) throw err;
            });

            if (err) {
                console.log("Error in query: ")
                console.log(err);
                callback(err, null);
            }
            var status = { status: "success" };
            callback(null, status);
        });
    });
}

module.exports = {
    getBusinessName: getBusinessName,
    getAssets: getAssets,
    getLiabilities: getLiabilities,
    getSummary: getSummary,
    getDataLog: getDataLog,
    updateAssets: updateAssets,
    updateLiabilities: updateLiabilites
};