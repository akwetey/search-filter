import Axios from "axios";
let countries='';
document.addEventListener("DOMContentLoaded", function() {
    fetchCountries();
});

function fetchCountries() {
    Axios.get('https://restcountries.eu/rest/v2/all').then(response => {
     countries = response.data;
        renderCountriesList(countries);
    });
}

function renderCountriesList(countries) {
    document.getElementById('render-list-container').innerHTML='';
    let listsContainer = document.querySelector("#render-list-container");
    countries.forEach(country => {
        let li = document.createElement("li");
        let html = `<div class="mr-2">
                        <img src="${country.flag}" width="30px;" />
                    </div> 
                    <div class="text">${country.name}</div>`;
        li.classList.add('list-group-item', 'd-flex', 'flex-row');
        li.setAttribute('data-continent',`${country.region}`);
        li.innerHTML = html;
        listsContainer.appendChild(li);
    })
}

let filterInput = document.getElementById('search');

filterInput.addEventListener('keyup',(data) => { 
    let filteredCountries = countries.filter((dom)=>{
      return dom.name.toLowerCase().includes(filterInput.value.toLowerCase());
    });
    
   renderCountriesList(filteredCountries);
});


//checkboxes filter
let itemsTofilter = document.getElementsByTagName('li');

let checkBoxes = document.querySelectorAll('.custom-checkbox input');

for(let i = 0; i < checkBoxes.length; i++){
  checkBoxes[i].addEventListener('click', filterItems, false);
  // checkBoxes[i].checked = true;
}

function filterItems (e) {
    let clickedCheckbox = e.target;
    if(clickedCheckbox.checked == true) {
        console.log('hurayyyyyyyy');
    }
    else if(clickedCheckbox.checked == false){
        console.log('maaaaa');
    }

    else{
        console.log('mom')
    }
}
