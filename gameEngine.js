function getCpuChoice() {
    //add random to make a random selection to return
    return 'rock';
}

function playGame(req, res) {
    console.log("Game Time from different file...");

    var player = req.query.player_choice;
    console.log('The player choice: ' + player);

    var cpu = getCpuChoice();
    var stuff = {player: player, cpu: cpu};
    res.render('results', stuff);
}

module.exports = {playGame: playGame};