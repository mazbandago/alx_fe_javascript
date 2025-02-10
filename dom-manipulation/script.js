const qotD = document.getElementById('quoteDisplay');

const newQuotButton = document.getElementById('newQuote');

const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuote = document.getElementsByTagName('button');


const myQuotes = [{ text:"my first job is teaching", category:"GES"},
    {text:"the best tribe in Africa is Bissa", category:"ethnicity"},
    {text:"fear delegates in internal political struggle", category:"politics"}
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * myQuotes.length);
    const quote = myQuotes[randomIndex];
    newQuotButton.addEventListener('click', ()=>{
        for(i=0; i<myQuotes.length; i++){
            qotD.innerHTML = `<li>"${quote.text}" - Category: ${quote.category}</li>`;
        }
    })
}
showRandomQuote();



// Function to add a new quote to the array
function createAddQuoteForm(value) {
    const para = document.createElement('p')
    para.innerText = 'say: This is a new post!!';
    qotD.appendChild(para);
    // console.log(`New quote added: "${para.innerText}" - Category: ${para.innerText}`);
}
createAddQuoteForm();

newQuotButton.addEventListener('click', ()=>{
   qotD.innerText = showRandomQuote();
})
const catchPost = JSON.parse(localStorage.getItem('arrayQuote'));
const arrayQuote = [];
let newPost = {};

newQuoteText.addEventListener('keypress', (e) =>{
    e.target;
    const value = document.getElementById('newQuoteText').value;
    newPost['textBody'] = value;
    
})

newQuoteCategory.addEventListener('keypress', (e) =>{
    e.target;
    const value = document.getElementById('newQuoteCategory').value;
    newPost['textCategory'] = value;
    
})

addQuote[1].onclick = function(){
newPost['dateId'] = Math.floor(Date.now()/1000);  
arrayQuote.push(newPost);
localStorage.setItem('arrayQuote,', JSON.stringify(arrayQuote));
newPost = {}
};

// Function to export quotes to a JSON file
function exportQuotesToJson() {
    const dataStr = JSON.stringify(arrayQuote, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Add event listener for the export button
document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);