const express = require('express');
const app = express();
const port = 3000;

//konversi waktu ke detik
function convertToSeconds(hours, minutes, seconds) {
    return (hours * 3600) + (minutes * 60) + seconds
}

//konverisi detik ke waktu
function convertToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
}

//endpoint get untuk memperoleh waktu tiba
app.get('/arrival', (req, res) => {
    const { startTime, duration} = req.query;

    if (!startTime || !duration) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // memisahkan jam, menit, dan detik dari input
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    const travelTime = parseInt(duration, 10);

    // konversi startTime ke detik
    const startSeconds = convertToSeconds(hours, minutes, seconds);

    //perhitungan waktu tiba
    const arrivalSeconds = startSeconds + travelTime;
    
    const arrivalTime = convertToTime(arrivalSeconds);
    return res.json({ arrival: arrivalTime });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);   
})