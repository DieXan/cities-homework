// Загружаем базу данных городов
let cities = [];

// Загружаем города из файла cities.json
fetch('./cities.json')
    .then(response => response.json())
    .then(data => {
        // Извлекаем только имена городов
        cities = data.city.map(cityObj => cityObj.name.toLowerCase());
    })
    .catch(error => console.error('Ошибка загрузки городов:', error));

let usedCities = [];

function handlePlayerMove() {
    const cityInput = document.getElementById('city-input').value.trim().toLowerCase();
    
    if (cityInput === '') {
        alert('Введите название города!');
        return;
    }

    if (usedCities.includes(cityInput)) {
        alert('Этот город уже использован!');
        return;
    }

    if (!cities.includes(cityInput)) {
        alert('Такого города нет в базе данных!');
        return;
    }

    usedCities.push(cityInput);
    updateHistory('Игрок', cityInput);

    handleComputerMove(cityInput);
    
    document.getElementById('city-input').value = '';
}

function handleComputerMove(lastCity) {
    const lastLetter = lastCity.slice(-1);

    const possibleCities = cities.filter(city => city[0] === lastLetter && !usedCities.includes(city));

    if (possibleCities.length === 0) {
        alert('Компьютер не смог найти город! Вы победили!');
        return;
    }

    const computerCity = possibleCities[Math.floor(Math.random() * possibleCities.length)];

    usedCities.push(computerCity);
    updateHistory('Компьютер', computerCity);
}

function updateHistory(player, city) {
    const historyList = document.getElementById('history');
    const newEntry = document.createElement('li');
    newEntry.textContent = `${player}: ${city}`;
    historyList.appendChild(newEntry);
}

document.getElementById('submit-city').addEventListener('click', handlePlayerMove);
