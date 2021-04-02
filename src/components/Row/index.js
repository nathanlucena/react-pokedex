import React, {Component} from 'react';
import './style.css';
import axios from 'axios';



const TYPE_COLORS = {
    bug : 'B1C12E',
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

   //function to circumvent the split in Ho-ho
function pokemonNameSplit(name){
  if(name.length > 5){
   return name.split('-',1)
  }else{
    return name
  }
}    


export default class Row extends Component{
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types:[]
    }

    async componentDidMount(){
        const {name,url} = this.props;
     
        const pokemonIndex = url.split('/')[url.split('/').length -2];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        
        const pokemonRes = await axios.get(pokemonUrl);
        const types = pokemonRes.data.types.map(type => type.type.name);


        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            types
        }); 
    }


    
    render(){

        return(
            <a className="pokeRow"
                href={`http://localhost:3000/Pokemon/${this.state.pokemonIndex}`}
            >
            
             <h4 className="arrowHover">    
               &gt;
             </h4>
                <p className="index">#{("000"+this.state.pokemonIndex).slice(-3)}</p>
                
                <p className="name">{pokemonNameSplit(this.state.name)}</p>
               

                {this.state.types.map(type => (
                    <span 
                    key={type} 
                    style={{ backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white'}}
                    className="type"
                    >
                      {type}
                    </span>
                  ))}


           
                <img className='sprite' 
                src={this.state.imageUrl} 
                alt="Pokemon Sprite"
                
              
                />

              <h4 className="arrowHover">    
              &lt;
             </h4>
            </a>
        );
    }
}
// {this.state.types.map(type=>(
//     type.slot.type.name
// ))}