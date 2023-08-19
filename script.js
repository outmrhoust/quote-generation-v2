const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


// Show loading
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true
        quoteContainer.hidden = false
    }

}



// Get quote from api

async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/'
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        console.log(response)
        const data = await response.json();
            // check if author field is blank replace with unknown
    if (!data.quoteAuthor) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = data.quoteAuthor;
    }

    // check quote lenght to determine styling
    if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote and hide loader

    quoteText.textContent = data.quoteText;
    removeLoadingSpinner();
    } catch (err) {
        getQuote()
        // Catch error here
        console.log(err);
    }


}
// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)




// on load
getQuote()