import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const[city,setCity]=useState("");
  const [citySelect,setCitySelect]=useState("");
  const [loading,setLoading]=useState(false)
  const handlesubmit=async(e)=>{
    setLoading(true)
    e.preventDefault()
    try{
      const res=await fetch(`https://api.weatherapi.com/v1/current.json?key=121eb9ca1b1a4ac89ff70940242110&q=${city}`)
      if(!res.ok)
      {
        throw new Error('Failed to fetch weather the data')
      }
      const data=await res.json();
      console.log(data)
      setCitySelect(data)
    }
    catch(e){
      alert(e)
      setCitySelect(null);
    }
    finally{
      setLoading(false)
    }
  }
  
  return (
    <div className="App">
      <form className='form' onSubmit={handlesubmit}>
        <input className='input-city' type='text' placeholder='Enter city name' value={city} onChange={(e)=>setCity(e.target.value)}/>
        <button type='submit' className='search-btn'>Search</button>
        </form>
        {loading && <p>Loading data...</p>} 
      {citySelect && 
        <div className='weather-cards'>
          <div className='weather-card'>
              <h6>Temperature</h6>
              <p>{citySelect.current.temp_c}°C</p>
          </div>

          <div className='weather-card'>
              <h6>Humidity</h6>
              <p>{citySelect.current.humidity}%</p>
          </div>

          <div className='weather-card'>
              <h6>Condition</h6>
              <p>{citySelect.current.condition.text}</p>
          </div>

          <div className='weather-card'>
              <h6>Wind-speed</h6>
              <p>{citySelect.current.wind_kph}</p>
          </div>

        </div>
      }
    </div>
  );
}

export default App;
