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

newQuotButton.addEventListener('click', showRandomQuote)
//    qotD.innerText = showRandomQuote();
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * myQuotes.length);
    const quote = myQuotes[randomIndex];
    qotD.innerHTML = `<li>"${quote.text}" - Category: ${quote.category}</li>`;
}



const catchPost = JSON.parse(localStorage.getItem('arrayQuote'));
const arrayQuote = catchPost || [];
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
localStorage.setItem('arrayQuote', JSON.stringify(arrayQuote));
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

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      arrayQuote.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
// DYNAMIC FILTERING SYSTEM
function populateCategories() {
  const filter = document.getElementById('categoryFilter');
  const categories = [...new Set(arrayQuote.map(q => q.category))];
  filter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });
}
// POPULATE CATEGORIES
function populateCategories() {
  const filter = document.getElementById('categoryFilter');
  const categories = [...new Set(arrayQuote.map(q => q.category))];
  filter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });
}

// FILTER QUOTES

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastFilter', selectedCategory);

  let filteredQuotes;
  if (selectedCategory === 'all') {
    filteredQuotes = arrayQuote;
  } else {
    filteredQuotes = arrayQuote.filter(q => q.category === selectedCategory);
  }

  displayQuotes(filteredQuotes);
}


function displayQuotes(quotes = arrayQuote) {
  const container = document.getElementById('quoteDisplay');
  container.innerHTML = '';
  quotes.forEach(q => {
    const div = document.createElement('div');
    div.textContent = `"${q.text}" - ${q.category}`;
    container.appendChild(div);
  });
}

// RESTORE LAST FILTER

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  const savedCategory = localStorage.getItem('lastFilter') || 'all';
  document.getElementById('categoryFilter').value = savedCategory;
  filterQuotes(); // This will use selectedCategory internally
});

// update categories when adding new quote

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (!text || !category) return;

  const newQuote = { text, category };
  arrayQuote.push(newQuote);
  saveQuotes();
  populateCategories();

  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === category || selectedCategory === 'all') {
    filterQuotes(); // Refresh display with current filter
  }
}

// FETCHING QUOTES FROM SERVER

async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const serverQuotes = await response.json();

  // Simulate quote format
  return serverQuotes.map(post => ({
    text: post.title,
    category: 'server',
    dateId: Math.floor(Date.now() / 1000)
  }));
}

// IMPLEMENT DATA SYNCING
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: server data takes precedence
  const mergedQuotes = resolveConflicts(arrayQuote, serverQuotes);

  arrayQuote = mergedQuotes;
  saveQuotes();
  displayQuotes();
  populateCategories();
  notifyUser('Quotes synced with server.');
}

// CONFLICT RESOLUTION STRATEGY
function resolveConflicts(localQuotes, serverQuotes) {
  const combined = [...localQuotes];

  serverQuotes.forEach(serverQuote => {
    const conflictIndex = combined.findIndex(q => q.text === serverQuote.text);

    if (conflictIndex !== -1) {
      const localQuote = combined[conflictIndex];
      if (serverQuote.dateId > localQuote.dateId) {
        combined[conflictIndex] = serverQuote; // Server wins
      }
    } else {
      combined.push(serverQuote); // New quote from server
    }
  });

  return combined;
}

// NOTIFY USER OF SYNC STATUS
function notifyUser(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.background = '#dff0d8';
  notification.style.padding = '10px';
  notification.style.margin = '10px 0';
  document.body.prepend(notification);

  setTimeout(() => notification.remove(), 3000);
}

// PERIODIC SYNC
setInterval(syncWithServer, 60000); // Sync every 60 seconds




