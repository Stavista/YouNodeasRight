CREATE TABLE _user (
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(60),
    LastName VARCHAR(100),
    username VARCHAR(20),
    password VARCHAR(20)
);

CREATE TABLE business (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES _user(id),
    name VARCHAR(200)
);

CREATE TABLE assets
(
    id SERIAL NOT NULL PRIMARY KEY,
    _date DATE NOT NULL,
    business_id 	  INTEGER NOT NULL REFERENCES business(id),
    cash_and_equivalents DECIMAL, 
    accounts_receivable DECIMAL, 
    inventory DECIMAL, 
    other DECIMAl
);

CREATE TABLE liabilities
(
    id SERIAL NOT NULL PRIMARY KEY,
    _date DATE NOT NULL,
    business_id INTEGER NOT NULL REFERENCES business(id),
    accounts_payable  DECIMAL,
    debt_itemization DECIMAL,
    long_term_obligations DECIMAL, 
    leases DECIMAL, 
    other DECIMAL
);

CREATE TABLE date_log
(
    id SERIAL NOT NULL PRIMARY KEY,
    _date DATE NOT NULL,
    assets_id INTEGER NOT NULL REFERENCES assets(id),
    liabilities_id INTEGER NOT NULL REFERENCES liabilities(id),
    business_id INTEGER NOT NULL REFERENCES business(id)
);




/*INSERT INTO DATABASE*/

INSERT INTO _user(firstName, lastName, username, password) VALUES
('Samantha', 'Stavast', 'samanth03', 'password'),
('John', 'Stavast', 'andrew83', 'GreatPassword'),
('Alex', 'Mitchell', 'airMormon', 'baller');

INSERT INTO business(user_id, name) VALUES
(1, 'Frozen Frame'),
(3, 'Dealions'),
(2, 'Meta Booth'),
(2, 'PorTable');

INSERT INTO assets(_date, business_id, cash_and_equivalents, accounts_receivable, inventory, other) VALUES
('2018-02-01', 3, 71700.00, 875000.00, 66630.00, 4000.00),
('2018-02-01', 4, 15000.00, 12000.00, 35000.00, 10000.00),
('2018-01-01', 3, 72000, 15000, 12000, 10000),
('2018-01-01', 1, 1000, 1000, 1000, 1000),
('2018-02-10', 2, 15000, 1600.05, 1489.23, 1478.00);

INSERT INTO liabilities(_date, business_id, accounts_payable, debt_itemization, long_term_obligations, leases, other) VALUES
('2018-02-01', 3, 79700.00, 6700.00, 5500.00, 4000.00, 0),
('2018-02-01', 4, 15000.00, 12000.00, 35000.00, 10000.00, 1000),
('2018-01-01', 3, 72000, 15000, 147, 10000, 0),
('2018-01-01', 1, 1000, 4569, 1000, 1000, 5.00),
('2018-02-10', 2, 15000, 159.05, 1489.23, 1478.00, 15000.00);

INSERT INTO date_log(_date, assets_id, liabilities_id, business_id) VALUES
('2018-02-01',1,1,3),
('2018-02-01',2,2,4),
('2018-01-01',3,3,3),
('2018-01-01',4,4, 1),
('2018-02-10',5,5, 2);

/*CREATE USER*/
CREATE USER temp WITH PASSWORD 'pass';
GRANT SELECT, INSERT, UPDATE ON _user, assets, business, date_log, liabilities TO temp;
GRANT USAGE, SELECT ON SEQUENCE _user_id_seq, assets_id_seq, business_id_seq, date_log_id_seq, liabilities_id_seq TO temp;