import { useState } from 'react'
import './App.css'

function App() {
  const [catImage, setCatImage] = useState(null);
  const [catAttributes, setCatAttributes] = useState({});
  const [bannedValues, setBannedValues] = useState([]);

  const API_KEY = 'live_NH2PiRZ9vFHF2ho8QvmwbfCnqfLxT9Eb6RVzClep7SVijROa2SmSQEwXuNgoFQfZ';
  
  const fetchCat = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      const data = await response.json();
      const catData = data[0];
      const breed = catData.breeds[0] || {};

      if (!breed.name || !breed.temperament || !breed.origin || !breed.life_span) {
        fetchCat(); 
        return;
      }

      if (bannedValues.includes(breed.name) || bannedValues.includes(breed.temperament) || bannedValues.includes(breed.origin) || bannedValues.includes(breed.life_span)) {
        fetchCat()
        return;
      }

      setCatImage(catData.url);
      setCatAttributes({
        breed: breed.name,
        temperament: breed.temperament,
        origin: breed.origin,
        life_span: breed.life_span
      });
    } catch (error) {
      console.error("Failed to fetch cat:", error);
    }
};

  const banValue = (value) => {
    if (!bannedValues.includes(value)) {
      setBannedValues(prev => [...prev, value]);
    }
  };

  const isValueBanned = (value) => {
    return bannedValues.includes(value);
  };

  return (
    <>
      <div className='container'>
        <div className = "mainpart">
          <h1>Find your favorite cat!</h1>
          <h3>Discover all kind of cats that you haven't seen before</h3>
          <p>😹😺😿😿😾🙀😽🐱😻😸😼</p>
          <div className='threeblocks'>
            <div className = 'firstblock'>
            <button className='generate-button' onClick={fetchCat} >Generate</button>
            </div>
            <div className = 'secondblock'>
            {Object.entries(catAttributes).map(([key, value]) => (
              <div 
                key={key} 
                className={`attribute ${isValueBanned(value) ? 'banned' : ''}`} 
                onClick={() => banValue(value)}
              >
                {value}
              </div>
            ))}
            </div>
            <div className='thirdblock'>
            {catImage && <img src={catImage} alt="Random Cat" />}
            </div>
          </div>
        </div>
        <div className='banlist'>
          <h2>Ban List</h2>
          <h3>Select an attribute value that you don't wanna see anymore</h3>
          <ul>
            {bannedValues.map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;