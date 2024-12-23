const countryContainer=document.querySelector('.card-container')
const filter=document.querySelector('.filter') 
const searchCountry=document.querySelector('.input-search input')
const themeChanger=document.querySelector('.theme-changer ')

let allCountrydata=[];

fetch('https://restcountries.com/v3.1/all')
 .then((res)=> res.json())
 .then((data) => {renderCountry(data)
    allCountrydata=data
 })

filter.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
    .then((res)=> res.json())
    .then(renderCountry)
})

function renderCountry(data){
    countryContainer.innerHTML='';
    data.forEach((country) => {
      //  console.log(country.flags.svg)
        const countryCard=document.createElement('a')
    countryCard.classList.add('card-container')

    //Render one page to another page
    countryCard.href=`http://127.0.0.1:5500/Youtube/project5_countries/country.html?name=${country.name.common}`

    // const countryFlag=document.createElement('img')
    // countryFlag.src="https://flagcdn.com/gs.svg";
    // countryCard.append(countryFlag)

    const cardHTML=`
                <div class="card">
                    <img src="${country.flags.svg}" alt="country flag">
                    <div class="text">
                        <h3>${country.name.common}</h3>
                        <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region: </b> ${country.region}</p>
                        <p><b>Capital: </b> ${country.capital} </p>
                    </div>
                </div> `
    countryCard.innerHTML=cardHTML
    countryContainer.append(countryCard)

    });
}

searchCountry.addEventListener('input', (e) => {
   // console.log(e.target.value)
    console.log(allCountrydata)
   const filteredCountry = allCountrydata.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountry(filteredCountry);
    console.log(filteredCountry)
})

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})
