console.log("Hello world");

document.querySelector('#search').addEventListener('submit', async(event)=>{
    event.preventDefault();

    const CityName= document.querySelector('#city-name').value
    if(!CityName){
        return  showAlert("Digite o nome de uma cidade!");
    }
        console.log(CityName);

        const ApiKey = `cbcd2e4cf39a4a75c45615e2fdc6bf9f`
        const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(CityName)}&appid=${ApiKey}&units=metric&lang=pt_br`

        const results = await fetch (ApiUrl);

        const json= await results.json();

        console.log(json)

        if(json.cod === 200){
            showInfo({
               city: json.name ,
               country: json.sys.country,
               temp: json.main.temp,
               tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                 tempIcon: json.weather[0].icon,
                 windSpeed: json.wind.speed,
                 humidity: json.main.humidity,
            })
        }else{
            showAlert(`Não foi possível localizar...               
                `)
        }
});


function showInfo(json){
    showAlert('')
    
    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML= `${json.city}, ${json.country}`;
    document.querySelector('#temp_value').innerHTML= `${json.temp.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#temp-description').innerHTML= `${json.description}`;
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('#temp-max').innerHTML= `${json.tempMax.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#temp-min').innerHTML= `${json.tempMin.toFixed(1).toString().replace('.',',')}<sup> C°</sup>`;
    document.querySelector('#wind').innerHTML= `${json.windSpeed.toFixed(1)+" m/s"}`
    document.querySelector('#humidity').innerHTML=`${json.humidity+"%"}`

}
function showAlert(msg){
    document.querySelector("#alert").innerHTML= msg;
}
