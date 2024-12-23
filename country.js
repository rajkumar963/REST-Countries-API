const countryName = new URLSearchParams(window.location.search).get('name');
const flageImg=document.querySelector('.country-detail img')
const countryName1=document.querySelector('.basic-Info h2')
const countryborder=document.querySelector('.country-border')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json()
.then (([country])=>{

    console.log(country);
    flageImg.src=country.flags.svg; 
    countryName1.innerText=country.name.common;

    document.querySelector('.population').innerText=country.population.toLocaleString('en-IN');
    document.querySelector('.region').innerText=country.region;
    document.querySelector('.subregion').innerText=country.subregion;
    document.querySelector('.domain').innerText=country.tld.join(', ');
    document.querySelector('.lang').innerText=Object.values(country.languages);
    

    if(country.name.nativeName){
        document.querySelector('.nativeName').innerText=Object.values(country.name.nativeName)[0].common;
    }else{
        document.querySelector('.nativeName').innerText=country.name.common;
    }

    if(country.currencies){
        document.querySelector('.currencies').innerText=Object.values(country.currencies).map((curr)=>(curr.name)).join(', ');    
    }else{
             document.querySelector('.currencies').innerText=country.name.common;
        }
    if(country.capital){
        document.querySelector('.capital').innerText=country.capital?.[0];
    }

    if(country.borders){
        country.borders.forEach((border)=>{
            console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=>res.json())
            .then(([bordercountry])=>{
                console.log(bordercountry);
                const borderTag=document.createElement('a');
                borderTag.innerText=bordercountry.name.common;
                borderTag.href=`http://127.0.0.1:5500/Youtube/project5_countries/country.html?name=${bordercountry.name.common}`
                countryborder.append(borderTag);
            })
        })
    }
}))

// const backBtn=document.querySelector('.back-btn')
// backBtn.addEventListener('click',()=>{
//     window.location.href="http://127.0.0.1:5500/Youtube/project5_countries/index.html"
// })

