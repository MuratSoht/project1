// Переменные
let buttons = document.querySelectorAll('.letter-link');
let buttonStart = document.querySelector('.start')
let saves = 8
let guessedLetters = 0
let clickStart = false
let savesHTML
let interval 
let questions = [
    {
        title: 'страна',
        body: 'РОССИЯ'
    },
    {
        title: 'животные',
        body: 'ЛОСЬ'
    },
    {
        title: 'страна',
        body: 'КИТАЙ'
    },
    {
        title: 'личность',
        body: 'ХАСБИК'
}]
let id = Math.floor(Math.random() * questions.length);    
let lengthWord = questions[id]['body'].length;
let word = document.querySelector('.word');

function loseGame() {
    confirm('Вы проиграли, ответ:' + questions[id]['body'] + '.Хотите начать заново?');
    restartGame()
}
function addWord(arr, b) {
    success = []
    for(let i = 0; i < arr.length;i++) {
        if (arr[i] === true) {
            success.push(i)
        }
    }
    let cell = document.querySelectorAll('.cell')
    for(let i = 0; i < success.length; i++) {
        cell[success[i]].textContent = b
        guessedLetters++
    }
    if(guessedLetters === lengthWord) {
        winGame()
    }
}
for(let button of buttons) {
    button.addEventListener('click', function() {
        if(this.classList.contains('active') || clickStart === false) {
            return;
        }
        this.classList.add('active')
        let str = this.textContent;
        console.log(str)
        let result = [];
        for(i = 0; i < lengthWord; i++) {
            if(str === questions[id]['body'][i]) {
                result.push(true);
            }
            else {
                result.push(false)
            }
        }
        let kFalse = 0
        for(let i = 0; i < result.length; i++) {
            if(result[i] === false) {
                kFalse+=1
            }
        }
        if (kFalse === lengthWord) {
            saves = saves - 1
            savesHTML.textContent = saves
        }
        if (saves == 0) {
            loseGame()
        }
        addWord(result, str)
    })
}

function createGame() {
    if(clickStart) {
        return
    }
    clickStart = true
    let janre = document.querySelector('.janre-text');
    janre.textContent = 'Тема:' + ' ' + questions[id]['title'];
    let attemptsHTML = document.querySelector('.attempts')
    let attemptsSpan = document.createElement('span')
    attemptsSpan.classList.add('saves')
    attemptsHTML.textContent = 'У вас попыток:' + ' ';
    attemptsSpan.textContent = saves
    attemptsHTML.append(attemptsSpan)
    savesHTML = document.querySelector('.saves')
    for(let i = 0; i < lengthWord; i++ ){
        let cell = document.createElement('li')
        cell.classList.add('cell');
        word.append(cell);
    }
    let timePlay = 60
    let timeHTML = document.querySelector('.time')
    interval = setInterval(() => {
        timeHTML.textContent = timePlay
        timePlay--;
        if (timeHTML.textContent === '0' )  {
            clearInterval(interval)
            loseGame()
        }
    }, 1000)
}

buttonStart.addEventListener('click', createGame)

function winGame() {
    let win = confirm('Вы победили.Хотите начать заново?')
    if (win) {
        restartGame()  
    }
}
function restartGame() {
    id = Math.floor(Math.random() * questions.length);
    lengthWord = questions[id]['body'].length;
    let janreHTML = document.querySelector('.janre-text')
    janreHTML.textContent = ''
    saves = 8
    savesHTML.textContent = saves
    guessedLetters = 0
    clickStart = false
    clearInterval(interval)
    let lettersHTML = document.querySelectorAll('.cell')
    for(let button of buttons) {
        button.classList.remove('active')
    } 
    for(let letter of lettersHTML) {
        letter.remove()
    }
    createGame()
}
