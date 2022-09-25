import './App.css';
import { useState, useEffect } from 'react';


const URL = 'https://api.exchangerate.host/latest';

function App() {
  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate.');
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <h1>Eur to Gbp</h1>
      <form onSubmit={convert}>
        <div>
          <label>Eur</label>
          <input type="number" step="0.01"
          value={eur} onChange={e => setEur(e.target.value)}></input>
        </div>
        <div>
          <button>Calculate</button>
        </div>
        <div>
          <label>Rate</label>
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>
          <output>{gbp.toFixed(2)}</output>
        </div>
      </form>
    </div>
  );
}

export default App;
