document.addEventListener('DOMContentLoaded', function() {
  const quotes = [
    {
      text: "The unexamined life is not worth living.",
      author: "Socrates"
    },
    {
      text: "Imagination is more important than knowledge.",
      author: "Albert Einstein"
    },
    {
      text: "Faith is taking the first step even when you don't see the whole staircase.",
      author: "Martin Luther King Jr."
    },
    {
      text: "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",
      author: "Barack Obama"
    },
    // Add more quotes from philosophers, scientists, pastors, politicians
  ];

  const generateBtn = document.getElementById('generateBtn');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');

  generateBtn.addEventListener('click', function() {
    const randomQuote = getRandomQuote();
    displayQuote(randomQuote);
  });

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function displayQuote(quote) {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `- ${quote.author}`;
  }
});
