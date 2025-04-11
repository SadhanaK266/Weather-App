import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Coimbatore';
    const apiKey = '1c550646d9ef4bcfc0303d911ee966ae';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            return res.status(404).json({ message: 'City not found' });
        }

        const weatherData = {
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            latitudeValue: data.coord.lat,
            longitudeValue: data.coord.lon,
            humidityValue: data.main.humidity,
            windValue: data.wind.speed,
            weatherIcon: data.weather[0].icon,
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
