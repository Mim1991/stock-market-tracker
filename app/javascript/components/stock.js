import { linkClickSelector } from "@rails/ujs";

const API_KEY = "2BYR7Y8PLE1RJ5RT";
const stockCard = document.querySelector(".card-body");
const form = document.querySelector("form");
const stockInput = document.querySelector("#stock-input");
const suggestedTitle = document.querySelector(".suggested-title");
const suggestedSymbol = document.querySelector(".suggested-symbol");

const initStockSearch = () => {
  const insertStock = (data) => {
    return stockCard.insertAdjacentHTML("beforeend", `<p>${data.data}</p>`);
  };

  const insertSearch = (data) => {
    console.log(data);
    suggestedTitle.innerHTML = "";
    data.bestMatches.forEach((stock) => {
      suggestedTitle.insertAdjacentHTML(
        "beforeend",
        `<ul>
          <li>${stock["2. name"]} ${stock["1. symbol"]}</li>
        </ul>`
      );
    });
  };

  const fetchStock = (ticker) => {
    fetch(
      `http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${ticker}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const fetchSym = (e) => {
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then(insertSearch);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(stockInput.value);
    fetchStock(stockInput.value);
  });

  stockInput.addEventListener("keyup", fetchSym);
};

export { initStockSearch };
