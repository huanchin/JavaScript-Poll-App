/********* Coding Challenge #1 **********/
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/************* 解答 ****************/

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const input = Number(
      prompt(
        "What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)"
      )
    );
    this.answers[input]++;
    this.displayResults();
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

/************* 我的寫法 ****************/

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer(
    input = Number(
      prompt(
        "What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)"
      )
    )
  ) {
    this.answers[input]++;
    this.displayResults();
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

// 會跳出prompt
poll.registerNewAnswer();

/**************** 以下皆為錯誤寫法 **************/
// click 卻不會跳出 prompt： input 被 click event 取代掉了
// 把 <bind 過的 registerNewAnswer 函數> 給 listener ，等待 click event 發生的時候呼叫，並且自動將 click event object 作為 input 輸入給 <bind 過的 registerNewAnswer 函數>
// click發生的時候： 執行 <bind過的registerNewAnswer>，但 listener 自行將 event object 作為 input
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// 沒反應：return 一個 this 綁定 poll 的 registerNewAnswer function，但這個function沒有被call
// 把 arrow function 給 listener ，等待 click event 發生的時候呼叫 (arrow function)
// click 發生的時候： 1. bind <registerNewAnswer 函數> (綁定 this 為 poll) 2. 回傳 <bind 過的 registerNewAnswer 函數>
document
  .querySelector(".poll")
  .addEventListener("click", (e) => poll.registerNewAnswer.bind(poll));

// 會有error: 語法錯誤
document
  .querySelector(".poll")
  .addEventListener("click", (e) => poll.registerNewAnswer(e).bind(poll));

// 沒反應：return 一個 this 綁定 poll，並且 input 綁定 event object 的 registerNewAnswer function，但這個function沒有被call
// click 發生的時候：1. bind <registerNewAnswer 函數> (綁定 this 為 poll, input 為 event object) 2. 回傳 <bind 過的 registerNewAnswer 函數>
document
  .querySelector(".poll")
  .addEventListener("click", (e) => poll.registerNewAnswer.bind(poll, e));

/**************** 正解 **************/
// click 發生的時候：1. bind <registerNewAnswer 函數> (綁定 this 為 poll) 2. 回傳 <bind 過的 registerNewAnswer 函數> 3. immediately invoke <bind 過的 registerNewAnswer 函數>!!!
document
  .querySelector(".poll")
  .addEventListener("click", (e) => poll.registerNewAnswer.bind(poll)());
