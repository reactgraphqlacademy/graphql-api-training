function fetchTrainings() {
  // More info about the fetch function? https://github.com/bitinn/node-fetch#json
  return fetch("https://api.reactgraphql.academy/rest/trainings/")
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchTrainingById(id) {
  return fetch(`https://api.reactgraphql.academy/rest/trainings/${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchDiscounts() {
  return fetch("https://api.reactgraphql.academy/rest/discounts/")
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchTrainingByUrl(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchDiscountById(id) {
  return fetch(`https://api.reactgraphql.academy/rest/discounts/${id}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function fetchDiscountByUrl(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
