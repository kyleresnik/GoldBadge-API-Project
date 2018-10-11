const baseURL = 'https://api.edamam.com/search';
const appId = '1bb8e8a7'
const key = 'ad71365fb94b57d1c2fd398bae900b12';
let url;

//SEARCH
const foodSearch = document.querySelector('.search');
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', dataFetch);

//RESULTS
const section = document.querySelector('ul');

//FUNCTIONS
function dataFetch(e) {
  e.preventDefault();
  url = `${baseURL}?q=${foodSearch.value}&app_id=${appId}&app_key=${key}`;
  console.log("URL:", url);
  fetch(url).then(function(result) {
    return result.json();
  }).then(function(json) {
    console.log(json);
    resultDisplay(json);
  })
}

function resultDisplay(json){
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  for(let i = 0; i < json.hits.length; i++) {
    let result = json.hits[i].recipe.label;
    let resultElement = document.createElement("li");
    let resultLink = document.createElement("a");
    resultLink.href = json.hits[i].recipe.url;
    resultLink.innerText = result;
    // set href to link
    // set link text to label
    resultLink.textContent = result;
    // append link to li
    resultElement.appendChild(resultLink);
    // append to section
    document.getElementById("resultsList").appendChild(resultElement);
  }
  // while (section.firstChild) {
  //   section.removeChild(section.firstChild);
  // }
}