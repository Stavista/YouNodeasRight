function getCpuChoice() {
    //add random to make a random selection to return
    return 'rock';
}

function calculate(req, res) {
    console.log("Calculating...");

    var letter = req.query.letter_choice;
    console.log('The letter choice: ' + letter);
    var weight = req.query.weight;
    console.log('The letter weight: ' + weight);
    var price = 0;
    
    switch(letter) {
        case 'stamped':
            switch(weight) {
                case '1':
                    price = 0.50;
                    break;
                case '2':
                    price = 0.71;
                    break;
                case '3':
                    price = 0.92;
                    break;
                case '3.5':
                    price = 1.13;
                    break;
                         }
            break;
        case 'metered':
            switch(weight) {
                case '1':
                    price = 0.47;
                    break;
                case '2':
                    price = 0.68;
                    break;
                case '3':
                    price = 0.89;
                    break;
                case '3.5':
                    price = 1.10;
                    break;
                         }
            break;
        case 'postcard':
            price = 0.35;
            break;
                 }
    
    //var cpu = getCpuChoice();
    var stuff = {letter: letter, weight: weight, price: price};
    res.render('09results', stuff);
}

module.exports = {calculate: calculate};