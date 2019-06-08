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
  checkBoxes[i].checked = true;
}

//event handler
function filterItems (e) {
    let clickedCheckbox = e.target;
    if(clickedCheckbox.checked == true) {
       hideOrShow(clickedCheckbox.value, "hideItem", "showItem")
    }
    else if(clickedCheckbox.checked == false){
      hideOrShow(clickedCheckbox.value, "showItem", "hideItem")
    }
    else{
        console.log('')
    }
}

//hide or show content
function hideOrShow(itemType, classToRemove, classToAdd) {
        for (let i = 0; i < itemsTofilter.length; i++) {
        let currentItem = itemsTofilter[i];
        if (currentItem.getAttribute('data-continent') == itemType) {
            removeClass(currentItem, classToRemove);
            addClass(currentItem, classToAdd);
        }
    }
}

function addClass(element, classToAdd) {
    let currentClassValue = element.className;  
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
            element.className += " " + classToAdd;
        }
    }
}

function removeClass(element, classToRemove) {
    let currentClassValue = element.className;
    console.log(currentClassValue)
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
    let classValues = currentClassValue.split(" ");
    let filteredList = [];
  
    for (let i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
    element.className = filteredList.join(" ");
}