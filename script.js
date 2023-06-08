// var container = document.getElementById("lotto-container");
// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
// var clickesSquares = [];
// var randomNumberInterval;

// function checkWinCondition(randomNumber) {
//   for (var i = 0; i < container.children.length; i++) {
//     var boxNumber = parseInt(container.children[i].innerHTML);
//     if (boxNumber === randomNumber && container.children[i].style.backgroundColor !== "red") {
//       container.children[i].style.backgroundColor = "red";
//     }
//   }
// }

// function startGame() {
//   clearInterval(randomNumberInterval);

//   var randomNumber = getRandomNumber(1, 99);
//   document.getElementById('randomNumber').innerText = randomNumber;

//   randomNumberInterval = setInterval(function () {
//     randomNumber = getRandomNumber(1, 99);
//     document.getElementById('randomNumber').innerText = randomNumber;
//     checkWinCondition(randomNumber);
//   }, 2000);

//   for (var i = 0; i < container.children.length; i++) {
//     container.children[i].innerHTML = numbers[i];

//     var numberElement = container.children[i];

//     numberElement.style.backgroundColor = "";

//     numberElement.addEventListener("click", function () {
//       if (this.innerHTML !== "") {
//         if (this.style.backgroundColor === "red") {
//           this.style.backgroundColor = "";
//           var index = clickesSquares.indexOf(this);
//           if (index > -1) {
//             clickesSquares.splice(index, 1);
//           }
//         } else {
//           this.style.backgroundColor = "red";
//           clickesSquares.push(this);
//         }
//       }
//     });

//     if ((i + 1) % 9 === 0) {
//       var startIndex = i - 8;
//       var randomIndexes = getRandomNumArr(startIndex, i, 4);

//       for (var j = 0; j < randomIndexes.length; j++) {
//         container.children[randomIndexes[j]].innerHTML = "";
//         container.children[randomIndexes[j]].style.cursor = "auto";
//       }
//     }
//   }

//   checkWinCondition(randomNumber); 
// }

// function resetGame() {
//   clearInterval(randomNumberInterval);
//   for (var i = 0; i < container.children.length; i++) {
//     container.children[i].innerHTML = "";
//     container.children[i].style.backgroundColor = "";
//     container.children[i].style.cursor = "pointer";
//   }

//   clickesSquares = [];
// }

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomNumArr(min, max, count) {
//   var arr = [];
//   while (arr.length < count) {
//     var randomNum = getRandomNumber(min, max);
//     if (arr.indexOf(randomNum) === -1) {
//       arr.push(randomNum);
//     }
//   }
//   return arr;
// }



const container = document.getElementById("lotto-container");
const clickesSquares = [];
var randomNumberInterval;

function checkWinCondition(randomNumber) {
  for (var i = 0; i < container.children.length; i++) {
    var boxNumber = parseInt(container.children[i].innerHTML);
    if (boxNumber === randomNumber && container.children[i].style.backgroundColor !== "red") {
      container.children[i].style.backgroundColor = "red";
    }
  }
}

function startGame() {
  clearInterval(randomNumberInterval);

  var randomNumber = getRandomNumber(1, 99);
  document.getElementById('randomNumber').innerText = randomNumber;

  randomNumberInterval = setInterval(function () {
    randomNumber = getRandomNumber(1, 99);
    document.getElementById('randomNumber').innerText = randomNumber;
    checkWinCondition(randomNumber);
  }, 2000);

  var numberSet = generateNumberSet();
  var emptyBoxIndexes = getRandomNumArr(0, 8, 4); // Generate random indexes for empty boxes

  for (var i = 0; i < container.children.length; i++) {
    var rowIndex = Math.floor(i / 9); // Get the current row index

    if (rowIndex % 2 === 0 && emptyBoxIndexes.includes(i % 9)) {
      container.children[i].innerHTML = "";
      container.children[i].style.cursor = "auto";
    } else if (rowIndex % 2 === 1 && !emptyBoxIndexes.includes(i % 9)) {
      container.children[i].innerHTML = "";
      container.children[i].style.cursor = "auto";
    } else {
      container.children[i].innerHTML = numberSet.shift();
      container.children[i].style.cursor = "pointer";
    }

    var numberElement = container.children[i];

    numberElement.style.backgroundColor = "";

    numberElement.addEventListener("click", function () {
      if (this.innerHTML !== "") {
        if (this.style.backgroundColor === "red") {
          this.style.backgroundColor = "";
          var index = clickesSquares.indexOf(this);
          if (index > -1) {
            clickesSquares.splice(index, 1);
          }
        } else {
          this.style.backgroundColor = "red";
          clickesSquares.push(this);
        }
      }
    });
  }

  checkWinCondition(randomNumber); 
}

function resetGame() {
  clearInterval(randomNumberInterval);
  for (var i = 0; i < container.children.length; i++) {
    container.children[i].innerHTML = "";
    container.children[i].style.backgroundColor = "";
    container.children[i].style.cursor = "pointer";
  }

  clickesSquares = [];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumberSet() {
  var numbers = [];
  for (var i = 1; i <= 99; i++) {
    numbers.push(i);
  }
  shuffleArray(numbers);
  return numbers;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getRandomNumArr(min, max, count) {
  var arr = [];
  while (arr.length < count) {
    var randomNum = getRandomNumber(min, max);
    if (arr.indexOf(randomNum) === -1) {
      arr.push(randomNum);
    }
  }
  return arr;
}

