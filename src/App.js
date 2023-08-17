import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Capitalize from './helpers/Capitalize';

function App() {
  const [data, setData] = useState(null);//Todos los pokemones
  const [pokemon, setPokemon] = useState(null);//El pokemon seleccionado
  const [historia, setHistoria] = useState(null);//Historia del pokemon seleccionado

  const baseURL = "https://pokeapi.co/api/v2/pokemon/";

     //para selección
     const handleClick = (data, e) => {

      axios.get(baseURL + data).then((res) => {
        //alert(res.data)
        console.log(res.data.name)
        setPokemon(res.data);
      });
    };

  useEffect(() => {

    //forma axios + async/await
    let getPokemons = async () => {
      const response = await axios.get(baseURL)
      setData(response.data.results)
    }
    getPokemons()

    axios.get(baseURL + 'pidgeot').then((res) => {
      //alert(res.data)
      console.log(res.data.name)
      setPokemon(res.data);
    });


  }, []);

  //if (!pokemon) return null;

  return (
    <div className="App">
      <header className="App-header">
      <div className='col-12'>
      <div className='row col-12'>
        <div className='col-6 p-2'>
          <p>Elegir pokemon</p>
          <div>
            {data?.map((pokemon) => (
              <button className="btn btn-outline-secondary m-1" onClick={()=> handleClick(pokemon.name)} key={pokemon.name}>{Capitalize(pokemon.name)}</button>
            ))}
          </div>
        </div>
        <div className='col-6 p-2'>
          <div className="card" style={{width: "18rem", margin: "auto"}}>
            <div className='p-2 d-flex justify-content-center' style={{width: "100%", height: "200px", overflow: "hidden"}}>
              <img src={pokemon?.sprites.other.dream_world.front_default} className="card-img-top" alt="..." style={{width: "70%"}}/>
            </div>
            <div className="card-body bg-light">
              <h5 className="card-title h3 text-secondary">{pokemon?.name ? Capitalize(pokemon?.name) : ""}</h5>
              <p className="card-text"></p>
            </div>
            <ul className="list-group list-group-flush h5 text-info">
              <li className="list-group-item text-success bg-light">Type: {pokemon?.types[0].type.name}</li>
              <li className="list-group-item text-success bg-light">{pokemon?.abilities[0].ability.name ? "Ability 01: " + pokemon?.abilities[0].ability.name : ""}</li>
              <li className="list-group-item text-success bg-light">{pokemon?.abilities[1] ? "Ability 02: " + pokemon?.abilities[1].ability.name : "Ability 02: "}</li>
            </ul>
          </div>  
          </div>      
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;
