const images=[
    'https://images.unsplash.com/photo-1651007911009-2dd8f3bc0232?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1675827055668-2dae1b8ac181?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D',
    'wallpaper.jpg'
]

let idx=0;

setInterval(function(){
    if(idx>2){
        idx=0;
    }
    document.body.style.backgroundImage = `url('${images[idx]}')`;
    idx++;
},5000)

const city=document.querySelector('#input')
const temp=document.querySelector('#tempResult')
const humidity=document.querySelector('#humidity')
const realcity=document.querySelector('#city')

const wind=document.querySelector('#windSpeed')
const pressure=document.querySelector('#pressure')
const cloud=document.querySelector('#cloud')
const visibility=document.querySelector('#visibility')
const aqi=document.querySelector('#aqi')
const heatIndex=document.querySelector('#heatIndex')

function csspart(){
    document.querySelector('#main').style.backgroundColor='rgba(30, 31, 31,0.4)';
    document.querySelector('#additional').style.backgroundColor='rgba(30, 31, 31,0.4)';
    document.querySelector('#deg').innerHTML=`<span id="deg">&deg;C</span>`
    document.querySelector('#img1').src='temp.png'
    document.querySelector('#img2').src='humid.png'
    document.querySelector('#img3').src='img3.webp'
    document.querySelector('#img4').src='pressure.png'
    document.querySelector('#img5').src='cloud.png'
    document.querySelector('#img6').src='wid.png'
    document.querySelector('#img7').src='visiility.png'
    document.querySelector('#headPart').className='';
    document.querySelector('#headPart').id='headig';
    realcity.id='headPart';
    realcity.className='update';
    city.style.height='25px';
    city.style.fontSize='16px';
    city.style.width='200px';
    city.className='kuchto';

}

city.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        e.preventDefault();
        const cvalue=city.value;
        
        city.value='';

        const url=`https://api.weatherapi.com/v1/current.json?key=12cde12ce3ba4636b42201926250408&q=${cvalue}&aqi=yes`

        fetch(url)
        .then(function(respose){
            return respose.json();
        })
        .then(function(data){
            if (data.error) {
                throw new Error(data.error.message);
            }
            csspart();
            realcity.innerHTML=data.location.name;
            
            temp.innerHTML=data.current.temp_c;
            
            humidity.innerHTML=`${data.current.humidity}%`;

            wind.innerHTML=`wind: ${data.current.wind_kph} kph`;
            pressure.innerHTML=`Pressure: ${data.current.pressure_mb}`;
            cloud.innerHTML=`Clouds: ${data.current.cloud}`;
            visibility.innerHTML=`Visibility: ${data.current.vis_km}`;
            aqi.innerHTML=`AQI: ${data.current.air_quality["pm2_5"]}`;
    
            

            if(data.current.temp_c>30){
                setTimeout(function(){
                    alert('Temprature is really High , Take care.')
                },1000)
                
            }
            if(data.current.humidity>80){
                setTimeout(function(){
                    alert("⚠️ Heavy rain expected today. Stay safe!")
                },1000)
                
            }
            if(data.current.air_quality["pm2_5"]>100){
                setTimeout(function(){
                    alert('Use Mask , Air is Unhealthy')
                },1000)
                
            }
            
        })
        .catch(function(error){
            alert('City Not found Or Some error');
        })
    }
})