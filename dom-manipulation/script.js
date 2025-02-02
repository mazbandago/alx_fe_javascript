const qotD= document.getElementById('quoteDisplay');

const button = document.getElementById('newQuote');

button.addEventListener('click', (showQuote)=>{
    const showQuote = fucntion(){
        let quote = 'my first java';
        if(quote.includes('java')){
            const para = document.createElement('p')
            para.innerText = quote;
            qotD.appendChild(para);

        }else{
            alert('Do not repeat this');
        }
    }
})

button.removeEventListener('click');