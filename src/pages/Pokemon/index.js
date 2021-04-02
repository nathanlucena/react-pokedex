import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

export default function Pokemon() {

  const { pokemonIndex } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [status, setStatus] = useState({ hp: 0, attack: 0, defense: 0, spAttack: 0, speed: 0 });
  const [types, setTypes] = useState([]);
  const [evs, setEvs] = useState({ hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0 });
  const [flavor, setFlavor] = useState('');
  const [genera, setGenera] = useState('');
  const [catchRate, setCatchRate] = useState();
  const [ratioFemale, setRatioFemale] = useState(0);
  const [ratioMale, setRatioMale] = useState(0);
  const [noGender, setNoGender] = useState('none');
  const [shape, setShape] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [eggGroup, setEggGroup] = useState([]);
  const [hatchSteps, setHatchSteps] = useState('');
  const [evolutionNames, setEvolutionNames] = useState([]);
  const [evolutionSprites, setEvolutionSprites] = useState([]);
  const [evolutionIndex, setEvolutionIndex] = useState([]);

  const typeColors = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551',
    fire: 'F08030',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };

  var ind = 0;


  //function to circumvent the split in Ho-ho
function pokemonNameSplit(name){
  if(name.length > 5){
   return name.split('-',1)
  }else{
    return name
  }
}           

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
        const responseSpecie = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`);
        const evoChainUrl = responseSpecie.data.evolution_chain.url;
        const responseEvoChain = await axios.get(evoChainUrl);

        function getEvolutions() {
          let evoLine = [[responseEvoChain.data.chain.species.url]];
          let namesEvo = [];
          let indexEvo = [];
          let spritesEvo = [];
          let filterEvoLine = [];
          let plusEvo = [];

          if (responseEvoChain.data.chain.evolves_to.length === 0) {
            for (let i = 0; i <= evoLine.length; i++) {
              filterEvoLine = evoLine[0].map(evo => evo);
            }

          } else if (responseEvoChain.data.chain.evolves_to !== 0) {

            if (responseEvoChain.data.chain.evolves_to[0].evolves_to.length === 0) {
              evoLine.push(responseEvoChain.data.chain.evolves_to.map(evo => evo.species.url));

          
              filterEvoLine = [evoLine[0]];

              for (let i = 0; i < evoLine.length; i++) {
                plusEvo = evoLine[1].map(evo => evo);
              }

              filterEvoLine = filterEvoLine.concat(plusEvo);


            } else if (responseEvoChain.data.chain.evolves_to[0].evolves_to.length !== 0) {
              
              if(responseEvoChain.data.chain.evolves_to.length === 1){
                evoLine.push(responseEvoChain.data.chain.evolves_to.map(evo => evo.species.url));
                evoLine.push(responseEvoChain.data.chain.evolves_to[0].evolves_to.map(evo => evo.species.url));
               
                filterEvoLine = [evoLine[0], evoLine[1]];
  
                for (let i = 0; i < evoLine.length; i++) {
                  plusEvo = evoLine[2].map(evo => evo);
                }
  
                filterEvoLine = filterEvoLine.concat(plusEvo);
                
              //Evolution Line of Wurmpler
              }else  if(responseEvoChain.data.chain.evolves_to.length === 2){
                evoLine.push(responseEvoChain.data.chain.evolves_to.map(evo => evo.species.url));
                evoLine.push(responseEvoChain.data.chain.evolves_to[0].evolves_to.map(evo => evo.species.url));
                evoLine.push(responseEvoChain.data.chain.evolves_to[1].evolves_to.map(evo => evo.species.url));

                filterEvoLine = evoLine[0];
                plusEvo = evoLine[1].map(evo =>evo);
                filterEvoLine = filterEvoLine.concat(plusEvo[0]);
                filterEvoLine = filterEvoLine.concat(evoLine[2]);
                filterEvoLine = filterEvoLine.concat(plusEvo[1]);
                filterEvoLine = filterEvoLine.concat(evoLine[3]);
              }
           
            }
          };

          async function getInfoEvolutions(evo) {
            let index;
            let link = await axios.get(evo);
            index = link.data.pokedex_numbers[0].entry_number;
            let linkSprite = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);

            namesEvo.push(linkSprite.data.name);
            setEvolutionNames(namesEvo.map(evo => evo));

            indexEvo.push(link.data.pokedex_numbers[0].entry_number);
            setEvolutionIndex(indexEvo.map(evo => evo));

            spritesEvo.push(linkSprite.data.sprites.versions['generation-viii'].icons.front_default);
            setEvolutionSprites(spritesEvo.map(evo => evo));
          };
          filterEvoLine.map(evo => evo).forEach(getInfoEvolutions);
        }
        getEvolutions();



        setPokemonName(response.data.name);
        setImageUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000"+pokemonIndex).slice(-3)}.png`);
        setAbilities(response.data.abilities.map(ability => ability.ability.name));
        setTypes(response.data.types.map(type => type.type.name));
        setEggGroup(responseSpecie.data.egg_groups.map(egg => egg.name));
        setHatchSteps(255 * (responseSpecie.data.hatch_counter));

        responseSpecie.data.flavor_text_entries.map(flavor => {
          if (flavor.language.name === 'en') {
            setFlavor(flavor.flavor_text);
            return;
          }
        });

        responseSpecie.data.genera.map(genus => {
          if (genus.language.name === 'en') {
            setGenera(genus.genus)
            return
          }
        });

        const catchRate = (100 / 255) * responseSpecie.data.capture_rate;
        setCatchRate(catchRate.toFixed(2));

        const femaleRate = responseSpecie.data.gender_rate;
        if (femaleRate === -1) {
          setNoGender('');
        } else {
          setRatioFemale(12.5 * femaleRate);
          setRatioMale(12.5 * (8 - femaleRate));
        }

        const shape = responseSpecie.data.shape.name;
        switch (shape) {
          case 'ball':
            setShape('https://cdn.bulbagarden.net/upload/1/17/Body01.png');
            break;
          case 'squiggle':
            setShape('https://cdn.bulbagarden.net/upload/7/7a/Body02.png');
            break;
          case 'fish':
            setShape('https://cdn.bulbagarden.net/upload/d/d3/Body03.png');
            break;
          case 'arms':
            setShape('https://cdn.bulbagarden.net/upload/2/2c/Body04.png');
            break;
          case 'blob':
            setShape('https://cdn.bulbagarden.net/upload/d/da/Body05.png');
            break;
          case 'upright':
            setShape('https://cdn.bulbagarden.net/upload/8/88/Body06.png');
            break;
          case 'legs':
            setShape('https://cdn.bulbagarden.net/upload/b/bc/Body07.png');
            break;
          case 'quadruped':
            setShape('https://cdn.bulbagarden.net/upload/c/cc/Body08.png');
            break;
          case 'wings':
            setShape('https://cdn.bulbagarden.net/upload/9/98/Body09.png');
            break;
          case 'tentacles':
            setShape('https://cdn.bulbagarden.net/upload/9/97/Body10.png');
            break;
          case 'heads':
            setShape('https://cdn.bulbagarden.net/upload/3/36/Body11.png');
            break;
          case 'humanoid':
            setShape('https://cdn.bulbagarden.net/upload/4/45/Body12.png');
            break;
          case 'bug-wings':
            setShape('https://cdn.bulbagarden.net/upload/0/09/Body13.png');
            break;
          case 'armor':
            setShape('https://cdn.bulbagarden.net/upload/4/4b/Body14.png');
            break;
          default:
            break;
        }
        console.log(responseSpecie);
        const heightFts = ((response.data.height * 0.328084 + 0.00001) * 100) / 100;
        setHeight((heightFts * 0.3048).toFixed(1));
        const weightLb = ((response.data.weight * 0.220462 + 0.00001) * 100) / 100;
        setWeight((weightLb * 0.453592).toFixed(1))
        response.data.stats.map((stat) => {
          switch (stat.stat.name) {
            case 'hp':
              status['hp'] = stat['base_stat'];
              break;
            case 'attack':
              status['attack'] = stat['base_stat'];
              break;
            case 'defense':
              status['defense'] = stat['base_stat'];
              break;
            case 'special-attack':
              status['spAttack'] = stat['base_stat'];
              break;
            case 'special-defense':
              status['spDefense'] = stat['base_stat'];
              break;
            case 'speed':
              status['speed'] = stat['base_stat'];
              break;
            default:
              break;
          }
        });
        setStatus({ hp: status['hp'], attack: status['attack'], defense: status['defense'], speed: status['speed'], spAttack: status['spAttack'], spDefense: status['spDefense'] });

        const evs1 = response.data.stats
          .filter(stat => {
            if (stat.effort > 0) {
              return true;
            }
            return false;
          })
        evs1.map((stat) => {
          switch (stat.stat.name) {
            case 'hp':
              evs['hp'] = stat.effort
              break;
            case 'attack':
              evs['attack'] = stat.effort
              break;
            case 'defense':
              evs['defense'] = stat.effort
              break;
            case 'special-attack':
              evs['spAttack'] = stat.effort
              break;
            case 'special-defense':
              evs['spDefense'] = stat.effort
              break;
            case 'speed':
              evs['speed'] = stat.effort
              break;
            default:
              break;
          }
        }
        );

        setEvs({ hp: evs['hp'], attack: evs['attack'], defense: evs['defense'], speed: evs['speed'], spAttack: evs['spAttack'], spDefense: evs['spDefense'] });

      } catch (err) {
        console.error(err);
      }
    }
    getPokemon();

  }, []);




  return (
    <>
      <Header />
      <div className="pad">

     
      <div className="pokemonCard">
        <table className="mainTable" style={{ backgroundColor: `#${typeColors[types[0]]}` }}>
          <tbody>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr>
                      <th className="block" width="10%">
                        <div className="indexCard">
                          <p>#{("000" + pokemonIndex).slice(-3)}</p>
                        </div>

                      </th>
                      <td className="block" width="40%">
                        <div>
                          <p className="nameCard"> {pokemonNameSplit(pokemonName)}</p>
                          <p className="generaCard">{genera} </p>
                        </div>
                      </td>
                      <td className="block" width="50%">
                        <div className="typesCard">
                          {types.map(type => (
                            <span
                              key={type}
                              style={{ backgroundColor: `#${typeColors[type]}`, color: 'white' }}
                              className="typeCard"

                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr width="100%">
                      <td className="block" colSpan="2" width="50%">
                        <div>
                          <img className='pokemonImg'
                            src={imageUrl}
                            alt="Pokemon Sprite"
                          />
                       <a className="linkImg" target="__blank" href="https://www.pokemon.com/" >Image from Offcial Pokemon Website</a>
                        </div>
                      </td>
                      <td className="block" width="50%">
                        <table className="statusTable">
                          <tbody>
                            <tr>
                              <td>
                                <p className="titleStatus">Hp:  </p>
                                <div className="statusBar">
                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['hp']}%`,

                                    }}
                                  >
                                    <p>{status['hp']}</p>
                                  </div>

                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${255 - status['hp']}%`,

                                    }}
                                  >
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="titleStatus">Attack:</p>
                                <div className="statusBar">

                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['attack']}%`,

                                    }}
                                  >
                                    <p>{status['attack']}</p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${190 - status['attack']}%`,
                                    }}
                                  >
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="titleStatus">Defense:</p>
                                <div className="statusBar">
                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['defense']}%`,

                                    }}
                                  >
                                    <p>{status['defense']}</p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${250 - status['defense']}%`,
                                    }}
                                  >
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="titleStatus">Special Attack:</p>
                                <div className="statusBar">
                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['spAttack']}%`,

                                    }}
                                  >
                                    <p>{status['spAttack']}</p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${194 - status['spAttack']}%`,
                                    }}
                                  >
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="titleStatus">Special Defense:</p>
                                <div className="statusBar">

                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['spDefense']}%`,

                                    }}
                                  >
                                    <p>{status['spDefense']}</p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${250 - status['spDefense']}%`,
                                    }}
                                  >
                                  </div>
                                </div>
                                <div>

                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p className="titleStatus">Speed:</p>
                                <div className="statusBar">

                                  <div
                                    className="progressBarLeft"
                                    role="progressbar"
                                    style={{
                                      width: `${status['speed']}%`,

                                    }}
                                  >
                                    <p>{status['speed']}</p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${200 - status['speed']}%`,

                                    }}
                                  >
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo">
                      <td width="49%" className="tdInfo">
                        <b>Evolution Line</b>
                        <div className="block">
                          <div className="evolutionDiv">
                            {evolutionIndex.map(index =>

                              <div key={index} >

                                <a className="evolutionBlock" href={index}>

                                  <img title={`#${index}`} className="evoluitonSprite" alt={`#${index}`} src={evolutionSprites[ind]} />
                                  <p>{pokemonNameSplit(evolutionNames[ind])}</p>

                                </a>
                                <div style={{ display: 'none' }}> {ind++} </div>

                              </div>

                            )}
                          </div>

                        </div>


                      </td>
                      <td className="tdInfo" width="49%">
                        <b>Description</b>
                        <div className="block" style={{ margin: '2vh' }}>
                          <p>{flavor} </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo">
                      <td width="49%" className="tdInfo">
                        <b>Gender Ratio: </b>

                        <table className="block">
                          <tbody>
                            <tr>
                              <td >
                                <div className="genderBar">
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${ratioFemale}%`,
                                      backgroundColor: '#c2185b'
                                    }}
                                    aria-valuenow="15"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    <p> </p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: `${ratioMale}%`,
                                      backgroundColor: '#1976d2'
                                    }}
                                    aria-valuenow="15"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    <p> </p>
                                  </div>
                                  <div
                                    className="progressBar"
                                    role="progressbar"
                                    style={{
                                      width: '100%',
                                      backgroundColor: '#7c5296',
                                      display: `${noGender}`
                                    }}
                                    aria-valuenow="15"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    <p>Unknow</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="genderText">
                                  <p>{ratioFemale}% Female       {ratioMale}% Male</p>
                                </div>
                              </td>

                            </tr>
                          </tbody>


                        </table>
                      </td>
                      <td width="49%" className="tdInfo">
                        <b>Shape</b>
                        <table>
                          <tbody>
                            <tr>
                              <td className="block">
                                <img className='pokemonShape'
                                  src={shape}
                                  alt="Pokemon Shape"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo">
                      <td width="49%" className="tdInfo">
                        <b>Abillitys</b>
                        <div className="block">
                          {abilities.map(ability => (
                            <p key={ability} >
                              {ability}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="tdInfo" width="49%">
                        <b>Egg Groups</b>
                        <div className="block">
                          {eggGroup.map(egg => (
                            <p key={egg} >
                              {egg}
                            </p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo" width="49%">
                      <td width="49%" className="tdInfo">
                        <b>Catch Rate</b>
                        <div className="block">
                          {catchRate}%
                          </div>
                      </td>
                      <td width="49%" className="tdInfo">
                        <b>Hatch Steps</b>
                        <div className="block">
                          <p>   {hatchSteps} steps </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo">
                      <td className="tdInfo" width="49%">
                        <b>Height</b>
                        <div className="block">
                          {height}m
                        </div>
                      </td>
                      <td className="tdInfo" width="49%">
                        <b>Weight</b>
                        <div className="block">
                          {weight}kg
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                    <tr className="trInfo" >
                      <td className="tdInfo" width="99%">
                        <b>Evs yield</b>
                        <table>
                          <tbody>
                            <tr className="trInfo">
                              <td className="block">
                                Hp: {evs['hp']};
                        </td>
                              <td className="block">
                                Attack: {evs['attack']};
                        </td>
                              <td className="block">
                                Defense: {evs['defense']};
                        </td>
                              <td className="block">
                                Speed: {evs['speed']};
                        </td>
                              <td className="block">
                                Sp. Attack: {evs['spAttack']};
                        </td>
                              <td className="block">
                                Sp. Defense: {evs['spDefense']};
                        </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <Footer />
    </>
  );
}