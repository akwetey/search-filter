import Axios from "axios";

document.addEventListener("DOMContentLoaded", function() {
    fetchCountries();
});

function fetchCountries() {
    Axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        const countries = response.data;
        renderCountriesList(countries);
    });
}

function renderCountriesList(countries) {
    let listsContainer = document.querySelector("#render-list-container");
    countries.forEach(country => {
        let li = document.createElement("li");
        let html = `<div class="mr-2">
                        <img src="${country.flag}" width="30px;" />
                    </div> 
                    <div class="text">${country.name}</div>`;
        li.classList.add('list-group-item', 'd-flex', 'flex-row');
        li.innerHTML = html;
        listsContainer.appendChild(li);
    })
}

let filterInput = document.getElementById('search');

let search = () => {
    let enteredValue = document.getElementById('search').value
    let ul = document.getElementById('render-list-container');
    let li = ul.querySelectorAll('li.list-group-item'); 
  
    //loop through the list
    for(let i = 0; i < li.length; i++){
        let getTagName = li[i].getElementsByTagName('li')[0];
        console.log(getTagName);
          if (getTagName) {

            let text = getTagName.innerText;
             // console.log(text)
          /*  let value = (text.includes(enteredValue)) ? li[i].style.display = "none" : li[i].style.display = "block";
            console.log(value) */
    
            /* if (text.includes(enteredValue)) {
                li[i].style.display = "";
            }
            else {
                li[i].style.display = "none";
            } */
        } 
    
    }

}
filterInput.addEv