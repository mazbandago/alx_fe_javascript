const qotD = document.getElementById('quoteDisplay');

const newQuotButton = document.getElementById('newQuote');

const newQuoteTextValue = document.getElementById('newQuoteText').value;
const newQuoteCategoryValue = document.getElementById('newQuoteCategory').value;
const addQuote = document.getElementsByTagName('button');
console.log(addQuote[1]);

const myQuotes = [{ text:"my first job is teaching", category:"GES"},
    {text:"the best tribe in Africa is Bissa", category:"ethnicity"},
    {text:"fear delegates in internal political struggle", category:"politics"}
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * myQuotes.length);
    const quote = myQuotes[randomIndex];
    console.log(`"${quote.text}" - Category: ${quote.category}`);
}

showRandomQuote();

addQuote[1].onclick = function(){
alert('yes')
const text = newQuoteTextValue;
const category = newQuoteCategoryValue;
if(text && category){
    pushquote(text, category);
}

};
// Function to add a new quote to the array
function pushquote(text, category) {
    myQuotes.push({ text, category });
    console.log(`New quote added: "${text}" - Category: ${category}`);
}
pushquote();



// // Initial array of quotes
// const quotes = [
//     { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
//     { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
//     { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
// ];

// // Function to show a random quote
// function showRandomQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const quote = quotes[randomIndex];
//     console.log(`"${quote.text}" - Category: ${quote.category}`);
// }

// Function to create a form to add new quotes
// function createAddQuoteForm() {
//     const form = document.createElement('form');
    
//     const quoteTextLabel = document.createElement('label');
//     quoteTextLabel.textContent = "Quote Text:";
//     const quoteTextInput = document.createElement('input');
//     quoteTextInput.type = "text";
//     quoteTextInput.id = "quoteText";
    
//     const quoteCategoryLabel = document.createElement('label');
//     quoteCategoryLabel.textContent = "Category:";
//     const quoteCategoryInput = document.createElement('input');
//     quoteCategoryInput.type = "text";
//     quoteCategoryInput.id = "quoteCategory";
    
//     const submitButton = document.createElement('button');
//     submitButton.textContent = "Add Quote";
//     submitButton.type = "button";
//     submitButton.onclick = function() {
//         const text = document.getElementById('quoteText').value;
//         const category = document.getElementById('quoteCategory').value;
//         if (text && category) {
//             addQuote(text, category);
//         }
//     };

//     form.appendChild(quoteTextLabel);
//     form.appendChild(quoteTextInput);
//     form.appendChild(document.createElement('br'));
//     form.appendChild(quoteCategoryLabel);
//     form.appendChild(quoteCategoryInput);
//     form.appendChild(document.createElement('br'));
//     form.appendChild(submitButton);

//     document.body.appendChild(form);
// }

// // Function to add a new quote to the array
// function addQuote(text, category) {
//     quotes.push({ text, category });
//     console.log(`New quote added: "${text}" - Category: ${category}`);
// }

// // Example usage
// showRandomQuote();
// createAddQuoteForm();






// // button.removeEventListener('click');
// // const bigdiv = document.getElementById('quoteDisplay');
// // //  let insert = ``;
// //  const sons = ['was','muba','rash'];
// // sons.forEach(function(son){
// //     bigdiv.innerHTML +=`<li>${son}</li>`;
// // });
// // // bigdiv.innerHTML = insert;
