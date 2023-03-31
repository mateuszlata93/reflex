let timesToClickTile = [];
let roundsPlayed = 0;
let element  = document.querySelector('p');
element.outerHTML = element.outerHTML;

function start() {
    let timeAtGameStart = new Date().getTime();
    let timeWhenClicked;
    let randomGameTileCoordinates = {
        row: Math.ceil(Math.random() * 3),
        column: Math.ceil(Math.random() * 3)
    }
    resetGameTilesStyling();
    let randomGameTile = document.querySelector(`div div:nth-child(${randomGameTileCoordinates.column}) div:nth-child(${randomGameTileCoordinates.row})`);
    colorTileToBeClicked(randomGameTile)
    randomGameTile.addEventListener('click', function calculateTimeBetweenClicks() {
        roundsPlayed++;
        resetGameTilesStyling();
        timeWhenClicked = new Date().getTime();
        let timeUntilCLicked = timeWhenClicked - timeAtGameStart;
        timesToClickTile.push(timeUntilCLicked)
        printResults();
        randomGameTile.removeEventListener('click', calculateTimeBetweenClicks)
        if (roundsPlayed == 5){
            stop();
            return;
        }
        setTimeout(start, Math.random() * 2000);
    })
}

function stop(){
    resetGameTilesStyling();
    let gameFinishedMessage = document.getElementById('gameFinished');
    gameFinishedMessage.style.display = 'block'
    document.querySelectorAll('div div div').forEach(el => {
        el.outerHTML = el.outerHTML;
    })
    timesToClickTile = [];
}

const startButton = document.querySelector('#start')
startButton.addEventListener('click', function () {
    start();
    document.querySelectorAll('p[id*=\'ReactionTime\']')
        .forEach(result => result.innerText = '')
})

const stopButton = document.querySelector('#stop')
stopButton.addEventListener('click', stop);


let countAverage = (num) => {
    let sum = num.reduce((a, b) => a + b, 0);
    return Math.floor(sum / num.length);
}

function resetGameTilesStyling() {
    let allGameTiles = document.querySelectorAll('div div div');
    allGameTiles.forEach(el => {
        el.style.backgroundColor = 'cornflowerblue';
        el.style.cursor = 'auto'
    })
}

function colorTileToBeClicked(randomGameTile){
    randomGameTile.style.backgroundColor = 'green';
    randomGameTile.style.cursor = 'pointer'
}

function printResults() {
    document.getElementById('shortestReactionTime').innerText = 'This is the shortest reaction time: ' + Math.min(...timesToClickTile) + " miliseconds"
    document.getElementById('longestReactionTime').innerText = 'This is the longest reaction time: ' + Math.max(...timesToClickTile) + " miliseconds"
    document.getElementById('averageReactionTime').innerText = 'This is average reaction time: ' + countAverage(timesToClickTile) + " miliseconds"
}