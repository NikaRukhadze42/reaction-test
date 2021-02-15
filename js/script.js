// Global Arrays
const boxCollection = document.querySelectorAll('.game-item');
const colors = ['red','orange','yellow','green','cyan','blue','purple'];

// DOM info Variables
const userName = document.querySelector('#user-name');
const testTime = document.querySelector('#test-time');
const corChoices = document.querySelector('#correct-choices');
const incChoices = document.querySelector('#incorrect-choices');

// Dom Test form
const testForm = document.querySelector('#game-content-wrapper');

// Global Variables
let randAllColor;
let randDifColor;
let randBoxIndex;
let correctChoices = 0;
let incorrectChoices = 0;
let tmp = 0;
let counter = 0;

// Calling the main function
startTest();

// Start function
function startTest(){
    setInfo();
    setColors();
    if(localStorage.getItem('type') == "Standard Mode"){
        counter = 16;
        timer();
        addStandardEvents();
    }
    else{
        counter = 11;
        timer();
        addTimeAttackEvents();
    }
}

// Function to add 'click' events for Time Attack mode
function addTimeAttackEvents(){
    boxCollection.forEach(element =>{
        element.addEventListener('click', function(event){
            checkClickTimeAttack(event.path[0]);
            updateInfo();
            if(counter >= 0) setColors();
        })
    });
}

// Function to add 'click' events for Standard test
function addStandardEvents(){
    boxCollection.forEach(element =>{
        element.addEventListener('click', function(event){
            checkClickStandard(event.path[0]);
            updateInfo();
            setColors();
        })
    });
}

// Function to set background colors on divs
function setColors(){
    setRandomNumbers();
    boxCollection.forEach((element,index) =>{
        if(index != randBoxIndex)   element.style.backgroundColor = colors[randAllColor];
        else    {
            element.style.backgroundColor = colors[randDifColor];
            element.setAttribute('different','true');
        }
    })
}

// Function which generates random numbers for div and colors
function setRandomNumbers(){
    randBoxIndex = Math.floor(Math.random() * 25);
    randAllColor = Math.floor(Math.random() * 7);
    randDifColor = Math.floor(Math.random() * 7);
    while(randDifColor == randAllColor){
        randDifColor = Math.floor(Math.random() * 7);
    }
}

// Checks user's choice and returns true/false. Works for Time Attack Mode
function checkClickTimeAttack(obj){
    if(obj.getAttribute('different') == 'true'){
        correctChoices++;
        tmp++;
        if(tmp % 2 == 0){
            counter++;

            tmp = 0;
        }
        obj.setAttribute('different','');
        return true;
    }   else{
        incorrectChoices++;
        counter--;
        if(counter <= 0) testTime.innerHTML = 'Time Left: ' + 0 + 's';
        else testTime.innerHTML = 'Time Left: ' + counter + 's';
        return false;
    }
}

// Checks user's choice and returns true/falfse. Works for Standard Mode.
function checkClickStandard(obj){
    if(obj.getAttribute('different') == 'true'){
        correctChoices++;
        obj.setAttribute('different','');
        return true;
    }   else{
        incorrectChoices++;
        counter--;
        return false;
    }
}

// Function which is used after user misses target
function missedClick(){
    counter--;
}

// Function for run time
function timer(){
    counter--;
    setTimeout(function(){
        if(counter < 0) {
            testForm.style.display = 'none';
            return
        }
        testTime.innerHTML = 'Time Left: ' + counter + 's';
        timer();
    }, 1000);
}

function setInfo(){
    userName.innerHTML = 'User: ' + localStorage.getItem('userName');
    testTime.innerHTML = 'Time Left:';
    corChoices.innerHTML = 'Correct Choices: ' + correctChoices;
    incChoices.innerHTML = 'Incorrect Choices: ' + incorrectChoices;
}

function updateInfo(){
    corChoices.innerHTML = 'Correct Choices: ' + correctChoices;
    incChoices.innerHTML = 'Incorrect Choices: ' + incorrectChoices;
}