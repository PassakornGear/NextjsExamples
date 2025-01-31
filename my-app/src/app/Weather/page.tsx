"use client"
import React, { useState } from 'react';
import axios from 'axios';

// กำหนดประเภทของข้อมูล weather
interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface Coord {
    lon: number;
    lat: number;
}

interface WeatherResponse {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


export default function Page() {
    const [city, setCity] = useState<string>(''); // กำหนดประเภทของ city เป็น string
    const [weather, setWeather] = useState<WeatherResponse | null>(null); // กำหนดประเภทของ weather
    const [error, setError] = useState<string>(''); // กำหนดประเภทของ error เป็น string
    const apiKey = '006e3e2288714ee3c3dec5713c8951e2'; // ใส่ API Key ของคุณที่นี่

    const getWeather = async (e: React.FormEvent) => { // กำหนดประเภทของ e เป็น React.FormEvent
        e.preventDefault();
        if (!city) return;

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('ไม่สามารถดึงข้อมูลสภาพอากาศได้');
            setWeather(null);
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 flex items-center justify-center p-12">
            <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Weather App</h1>
                <form onSubmit={getWeather} className="mb-6">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="p-3 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="ml-1 p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors text-xs"
                        >
                            Get Weather
                        </button>
                    </div>
                </form>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {weather && (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-700">{weather.name}, {weather.sys.country}</h2>
                        <p className="text-lg text-gray-600">Temperature: {weather.main.temp}°C</p>
                        <p className="text-lg text-gray-600">Humidity: {weather.main.humidity}%</p>
                        <p className="text-lg text-gray-600">Weather: {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
