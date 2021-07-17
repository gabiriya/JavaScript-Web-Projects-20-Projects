const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

const showLoadingSpinner=()=>{
  loader.hidden = false;
  quoteContainer.hidden;
}

const removeLoadingSpinner = ()=>{
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from api
async const getQuote=()=>{
  showLoadingSpinner();
  const proxy = 'https"//cors-anywhere.herokuapp.com/'
  const apiUrl = `http://api.forismatic.com/api/1.0/
  ?method=getQuote
  &lang=en
  &format=json`;
  try {
    const response = await fetch(proxy + apiUrl);
    const data = await response.json();
    //If author is blank add 'Unkown';
    if(data.quoteAuthor === ''){
    authorText.innerText = 'Unknown';
    }else
      authorText.innerText = data.quoteAuthor;
    
    // Reduce font size for long quotes
    if(data.quoteText.length > 100){
      quoteText.classList.add('long-quote')
    }else{
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
    console.log(data);
  } catch (error) {
    console.log("no quotes : " +error);
  }
}

// Tweet Quote
const tweetQuote=()=>{
  const quote = quoteText.innerText;
  const author = authorText.innerText; 
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; 
   window.open(twitterUrl,'_blank');
}
// EventListeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// onLoad
getQuote();