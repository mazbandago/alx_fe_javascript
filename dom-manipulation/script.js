const qotD = document.getElementById('quoteDisplay');

const newQuotButton = document.getElementById('newQuote');

const newQuoteTextValue = document.getElementById('newQuoteText').value;
const newQuoteCategoryValue = document.getElementById('newQuoteCategory').value;
const addQuote = document.getElementsByTagName('button');


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
// alert('yes')
const text = document.getElementById('newQuoteText').value;
const category = document.getElementById('newQuoteCategory').value;
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

newQuotButton.addEventListener('click', ()=>{
   qotD.innerText = showRandomQuote();
})