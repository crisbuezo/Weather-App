const container = document.querySelector('.container'); /* selects the first HTML element with the class name "container" and assigns it to the constant variable container */
const search = document.querySelector('.search-box button'); /* selects the first HTML element with the class name ".search-box button" and assigns it to the constant variable search */
const weatherBox = document.querySelector('.weather-box'); /* selects the first HTML element with the class name ".weather-box" and assigns it to the constant variable weatherBox */
const weatherDetails = document.querySelector('.weather-details'); /* selects the first HTML element with the class name ".weather-details" and assigns it to the constant variable weatherDetails */
const error404 = document.querySelector('.not-found'); /* selects the first HTML element with the class name ".not-found" and assigns it to the constant variable error404 */
const searchInput = document.querySelector('.search-box input'); /* making a constant named "search input" but pulling it from the search-box input class*/

search.addEventListener('click', performSearch); /* event listener click and performs the "performSearch" command */
searchInput.addEventListener('keydown', function (event) { /* event listener keydown and performs the event if i press enter instead of click*/
    if (event.key === 'Enter') { /*this  'Enter' can be changed to any key. 'Shift' for example. If i press enter then performSearch, the main weather function*/
        performSearch();
    }
});

function performSearch() {
    const APIKey = '13d372688c0e57bef6b74ffaa39a50cb'; /*constant of the API key, used again below under fetch*/
    const city = searchInput.value; /* This grabs the city that is input under the .search-box input*/

    if (city === '') 
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


};
        });


});
