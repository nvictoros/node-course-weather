const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('#address');
const results1 = document.querySelector("#weather-results-1")
const results2 = document.querySelector("#weather-results-2")

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  results1.textContent = "...loading";
  results2.textContent = "";


  fetch(`http://localhost:3000/weather?address=${weatherInput.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        return document.querySelector("#weather-results-1").textContent = data.error;
      }

      results1.textContent = data.location;
      results2.textContent = data.forecast;
    })
})
