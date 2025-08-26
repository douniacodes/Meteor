import React, { useState, useEffect, useCallback } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("https://images.unsplash.com/photo-1469122312224-c5846569feb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80");
  const [isDaytime, setIsDaytime] = useState(true);

  const weatherIcons = {
  0: "☀️",  
  
  1: "🌤️",  
  2: "🌤️",  
  3: "☁️",  
  
  45: "🌫️",
  48: "🌫️", 
  
  51: "🌦️", 
  53: "🌦️", 
  55: "🌦️", 
  
  56: "🌧️❄️", 
  57: "🌧️❄️", 
  
  61: "🌧️",  
  63: "🌧️", 
  65: "🌧️",  
  
  66: "🌧️❄️", 
  67: "🌧️❄️", 
  
  71: "❄️", 
  73: "❄️",  
  75: "❄️",  
  
  77: "❄️",  
  
  80: "🌦️", 
  81: "🌦️",  
  82: "🌧️", 
  
  85: "❄️",  
  86: "❄️",  
  
  95: "⛈️",  
  
  96: "⛈️🧊", 
  99: "⛈️🧊", 
};

const weatherBackgrounds = {
  day: {
    // Soleil
    0: "https://images.unsplash.com/photo-1462524500090-89443873e2b4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    1: "https://images.unsplash.com/photo-1533324268742-60b233802eef?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    2: "https://images.unsplash.com/photo-1587124318790-ad54e29fec80?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Nuageux
    3: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Brouillard
    45: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    48: "https://images.unsplash.com/photo-1444837881208-4d46d5c1f127?q=80&w=2845&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Pluie
    51: "https://images.unsplash.com/photo-1447584402565-2a5b35a7ea8a?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    53: "https://images.unsplash.com/photo-1509635022432-0220ac12960b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    55: "https://images.unsplash.com/photo-1488034976201-ffbaa99cbf5c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    61: "https://images.unsplash.com/photo-1610640540473-27b2bb1946a4?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    63: "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    65: "https://images.unsplash.com/photo-1520824425404-75f4f1704203?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    80: "https://images.unsplash.com/photo-1520824425404-75f4f1704203?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    81: "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    82: "https://images.unsplash.com/photo-1620385019253-b051a26048ce?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Neige
    71: "https://images.unsplash.com/photo-1524070297292-0dffb09f2d87?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    73: "https://images.unsplash.com/photo-1524070297292-0dffb09f2d87?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    75: "https://images.unsplash.com/photo-1578403881549-b80b37102b94?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    85: "https://images.unsplash.com/photo-1598301412171-f3b253961f9f?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    86: "https://images.unsplash.com/photo-1598301412171-f3b253961f9f?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Orage
    95: "https://images.unsplash.com/photo-1717944862613-e343a2b852e9?q=80&w=3142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    96: "https://images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    99: "https://images.unsplash.com/photo-1457528877294-b48235bdaa68?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // Images pour la nuit
  night: {
    // Ciel dégagé/nuageux
    0: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    1: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    2: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    3: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    
    // Brouillard
    45: "https://images.unsplash.com/photo-1510596713412-56030de252c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    48: "https://images.unsplash.com/photo-1486184885347-1464b5f10296?q=80&w=2336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Pluie
    51: "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    53: "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    55: "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    61: "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    63: "https://images.unsplash.com/photo-1532203512255-3c9c9d666c50?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    65: "https://images.unsplash.com/photo-1532203512255-3c9c9d666c50?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    80: "https://images.unsplash.com/photo-1532203512255-3c9c9d666c50?q=80&w=1321&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    81: "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    82: "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Neige
    71: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    73: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    75: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    85: "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    86: "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    // Orage
    95: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    96: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    99: "https://images.unsplash.com/photo-1621483092616-780665772d83?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  default: {
    day: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    night: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  }
};

  const checkDaytime = useCallback(() => {
    const hour = new Date().getHours();
    const daytime = hour >= 6 && hour < 20;
    setIsDaytime(daytime);
    
    if (!weather) {
      const defaultBg = daytime ? weatherBackgrounds.default.day : weatherBackgrounds.default.night;
      setBackgroundImage(defaultBg);
    }
  }, [weather, weatherBackgrounds.default.day, weatherBackgrounds.default.night]);

  const setBackgroundByWeather = (weatherCode) => {
    const timeOfDay = isDaytime ? 'day' : 'night';
    const imageUrl = weatherBackgrounds[timeOfDay][weatherCode] || weatherBackgrounds.default[timeOfDay];
    setBackgroundImage(imageUrl);
  };

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("Ville introuvable");
        setWeather(null);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe/Paris`
      );
      const weatherData = await weatherRes.json();

      const weatherInfo = {
        city: name,
        country,
        current: weatherData.current_weather,
        daily: weatherData.daily
      };
      
      setWeather(weatherInfo);
      setBackgroundByWeather(weatherData.current_weather.weathercode);
      setError("");
    } catch (err) {
      setError("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  useEffect(() => {
    checkDaytime();
    const interval = setInterval(checkDaytime, 3600000); 
    return () => clearInterval(interval);
  }, [checkDaytime]);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="app-overlay">
        <div className="weather-card">
          <div className="logo-header">
            <div className="logo-container">
              <img src="/LogoMeteor.png" alt="Météor Logo" className="logo-image" />
              <div className="logo-text">
                <h1 className="logo-title">Météor</h1>
                <div className="logo-subtitle">Prévisions météorologiques</div>
              </div>
            </div>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button 
              onClick={fetchWeather} 
              disabled={loading}
              className="search-btn"
            >
              {loading ? <div className="spinner"></div> : 'Rechercher'}
            </button>
          </div>

          {error && (
            <div className="error-card">
              <p>⚠️ {error}</p>
            </div>
          )}

          {weather && (
            <div className="weather-dashboard">
              <div className="current-weather">
                <h2>{weather.city}, {weather.country}</h2>
                <div className="weather-main">
                  <span className="weather-icon">
                    {weatherIcons[weather.current.weathercode] || "❓"}
                  </span>
                  <div className="temperature">
                    <span className="current-temp">{weather.current.temperature}°C</span>
                    <span className="weather-desc">
                      {Object.keys(weatherIcons).find(key => key === weather.current.weathercode) ? 
                        "Conditions actuelles" : "Inconnu"}
                    </span>
                  </div>
                </div>
                <div className="weather-details">
                  <div className="detail-item">
                    <span className="detail-icon">💨</span>
                    <span className="detail-value">{weather.current.windspeed} km/h</span>
                    <span className="detail-label">Vent</span>
                  </div>
                </div>
              </div>

              <div className="forecast-section">
                <h3>Prévisions sur 7 jours</h3>
                <div className="forecast-grid">
                  {weather.daily.time.map((day, i) => (
                    <div key={i} className="forecast-card">
                      <div className="forecast-day">{new Date(day).toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                      <div className="forecast-icon">
                        {weatherIcons[weather.daily.weathercode[i]] || "❓"}
                      </div>
                      <div className="forecast-temps">
                        <span className="temp-max">{weather.daily.temperature_2m_max[i]}°</span>
                        <span className="temp-min">{weather.daily.temperature_2m_min[i]}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!weather && !error && (
            <div className="welcome-message">
              <div className="welcome-content">
                <div className="welcome-icon">🌤️</div>
                <h2>Découvrez la météo en temps réel</h2>
                <p>Recherchez une ville pour connaître les conditions actuelles et les prévisions à 7 jours</p>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">🌡️</div>
                    <h4>Température précise</h4>
                    <p>Obtenez les températures exactes en temps réel</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📅</div>
                    <h4>Prévisions sur 7 jours</h4>
                    <p>Planifiez votre semaine avec nos prévisions détaillées</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🌍</div>
                    <h4>Monde entier</h4>
                    <p>Consultez la météo partout dans le monde</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;