const baseURL = 'https://api.edamam.com/search';
const appId = '1bb8e8a7'
const key = 'ad71365fb94b57d1c2fd398bae900b12';
let url;

//SEARCH
const foodSearch = document.querySelector('.search');
const searchForm = document.querySelector('form');

//RESULTS
const section = document.querySelector('section');

searchForm.addEventListener('submit', dataFetch);

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

function resultDisplay(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  let articles = json.response.docs;
  if(articles.length === 10) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
  if(articles.length === 0) {
    console.log("No results");
  } else {
    for(let i = 0; i < articles.length; i++) {
      let article = document.createElement('article');
      let heading = document.createElement('h2');
      let link = document.createElement('a');
      let img = document.createElement('img');
      let para = document.createElement('p');
      let clearfix = document.createElement('div');
      let current = articles[i];
      console.log("Current:", current);
      link.href = current.web_url;
      link.textContent = current.headline.main;
      para.textContent = 'Keywords: ';
      for(let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement('span');
        span.textContent += current.keywords[j].value + ' ';
        para.appendChild(span);
      }
      if(current.multimedia.length > 0) {
        img.src = '' + current.multimedia[0].url;
        img.alt = current.headline.main;
      }
      clearfix.setAttribute('class', 'clearfix');
      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }
};

function nextPage(e) {
  pageNumber++;
  dataFetch(e);
  console.log("Page number:", pageNumber);
};

function previousPage(e) {
  if(pageNumber > 0) {
    pageNumber--;
  } else {
    return;
  }
  dataFetch(e);
  console.log("Page:", pageNumber);
};


// //SEARCH FORM
// const searchTerm = document.querySelector('.search');
// const startDate = document.querySelector('.start-date');
// const endDate = document.querySelector('.end-date');
// const searchForm = document.querySelector('form');
// const submitBtn = document.querySelector('.submit');

// //RESULTS NAVIGATION
// const nextBtn = document.querySelector('.next');
// const previousBtn = document.querySelector('.prev');
// const nav = document.querySelector('nav');

// //RESULTS SECTION
// const section = document.querySelector('section');

// nav.style.display = 'none';
// let pageNumber = 0;
// // let displayNav = false;
   
// searchForm.addEventListener('submit', fetchResults); 
// nextBtn.addEventListener('click', nextPage);
// previousBtn.addEventListener('click', previousPage);

// function fetchResults(e){
//   e.preventDefault();
//   url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;
//   console.log("URL:", url);
//   if(startDate.value !== '') {
//     console.log(startDate.value)
//   url += '&begin_date' + startDate.value;
//   };
//   if(endDate.value !== '') {
//     url += '&end_date=' + endDate.value;
//   };
//   fetch(url).then(function(result) {
//     return result.json();
//   }).then(function(json) {
//     displayResults(json);
//   });
// }

// function displayResults(json) {
//   while (section.firstChild) {
//     section.removeChild(section.firstChild);
//   }
//   let articles = json.response.docs;
//   if(articles.length === 10) {
//     nav.style.display = 'block';
//   } else {
//     nav.style.display = 'none';
//   }
//   if(articles.length === 0) {
//     console.log("No results");
//   } else {
//     for(let i = 0; i < articles.length; i++) {
//       let article = document.createElement('article');
//       let heading = document.createElement('h2');
//       let link = document.createElement('a');
//       let img = document.createElement('img');
//       let para = document.createElement('p');
//       let clearfix = document.createElement('div');
//       let current = articles[i];
//       console.log("Current:", current);
//       link.href = current.web_url;
//       link.textContent = current.headline.main;
//       para.textContent = 'Keywords: ';
//       for(let j = 0; j < current.keywords.length; j++) {
//         let span = document.createElement('span');
//         span.textContent += current.keywords[j].value + ' ';
//         para.appendChild(span);
//       }
//       if(current.multimedia.length > 0) {
//         img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
//         img.alt = current.headline.main;
//       }
//       clearfix.setAttribute('class', 'clearfix');
//       article.appendChild(heading);
//       heading.appendChild(link);
//       article.appendChild(img);
//       article.appendChild(para);
//       article.appendChild(clearfix);
//       section.appendChild(article);
//     }
//   }
// };

// function nextPage(e) {
//   pageNumber++;
//   fetchResults(e);
//   console.log("Page number:", pageNumber);
// };

// function previousPage(e) {
//   if(pageNumber > 0) {
//     pageNumber--;
//   } else {
//     return;
//   }
//   fetchResults(e);
//   console.log("Page:", pageNumber);
// };