var credits = 1000;
var imagesArray = ["lambo.jpg", "ferarri.png", "Porsche.png"];
var betAmount = 0;
var spinInterval;
var spinDuration = 1000; 
var spinSpeed = 10;

function displayImage() {
    
    document.getElementById('startbtn').disabled = true;
    
    if (!placeBet()) {
      
        document.getElementById('startbtn').disabled = false;
        return;
    }
   
    spinInterval = setInterval(function() {
        spinImages();
    }, spinSpeed);

    setTimeout(function() {
        clearInterval(spinInterval);
        showFinalResult();
        
        
        setTimeout(function() {
            document.getElementById('startbtn').disabled = false;
        }, 500);
        
    }, spinDuration);
}



function spinImages() {
    document.img1.src = imagesArray[generateRandom()];
    document.img2.src = imagesArray[generateRandom()];
    document.img3.src = imagesArray[generateRandom()];
}
function showFinalResult() {
    var num1, num2, num3;
    
  
    if (Math.random() < 0.3) { // 30% chance of a forced win
        num1 = num2 = num3 = generateRandom();
    } else {
        num1 = generateRandom();
        num2 = generateRandom();
        num3 = generateRandom();
    }

    document.img1.src = imagesArray[num1];
    document.img2.src = imagesArray[num2];
    document.img3.src = imagesArray[num3];

    if (num1 === num2 && num1 === num3 && num2 === num3) {
        credits += (betAmount * 5); //x5 para mayaman agad
        document.getElementById('message').textContent = 'You Win!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = 'You Lose!';
        document.getElementById('message').style.color = 'red';
    }

    document.getElementById('textCredits').textContent = credits;
}


function placeBet() {
    var betInput = document.getElementById('betAmount').value;

    if (betInput === '' || isNaN(betInput) || parseInt(betInput) <= 0) {
        alert("Please enter a valid bet amount.");
        return false;
    }

    betAmount = parseInt(betInput);

    if (betAmount > credits) {
        alert("You don't have enough credits to place this bet.");
        return false;
    }

    credits -= betAmount;

    return true;
}

function generateRandom() {
    return Math.floor(Math.random() * imagesArray.length);
}
