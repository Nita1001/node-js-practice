import express from 'express';
import axios from 'axios';
const app = express();

app.get('/weather/:location', async (req, res) => {
    const location = req.params.location;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=9ee0f7b5de614141b7485133231903%20&q=${location}&aqi=no`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving weather data');
    }
});

app.listen(3001, () => console.log('Server running on port 3000'));


// const app = express();
// const port = process.env.PORT || 3000;
// // Serve the static files from the public directory
// const publicDirectoryPath = 'public';
// app.use(express.static(publicDirectoryPath));
// // Serve the index.html file when the root URL is requested
// app.get('/', (req, res) => {
//     res.send(path.join(__dirname, '/public/index.html'));
// });

// app.listen(port, () => {
//     console.log(`Server is up on port: ${port}`);
// });