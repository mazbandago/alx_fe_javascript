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

const arrayQuote = [];
const newpPost = {};

newQuoteText.addEventListener('keypress', (e) =>{
    const value = e.target.value;
    newpPost['textBody'] = value;
    console.log(value);
})

newQuoteCategory.addEventListener('keypress', (e) =>{
    const value = e.target.value;
    newpPost['textCategory'] = value;
    console.log(value);

})

addQuote[1].onclick = function(){
arrayQuote.push(newpPost);

// const text = document.getElementById('newQuoteText').value;
// const category = document.getElementById('newQuoteCategory').value;
// if(text && category){
//     pushquote(text, category);
// }
};
// Function to add a new quote to the array
function createAddQuoteForm(value) {
    const para = document.createElement('p')
    para.innerText = newpPost;
    console.log(`New quote added: "${para.innerText}" - Category: ${para.innerText}`);
}
createAddQuoteForm();

newQuotButton.addEventListener('click', ()=>{
   qotD.innerText = showRandomQuote();
})