import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";
import { TextField, MenuItem, Modal } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import Row from "../Row";

const GENERATION = {
  gen0: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898",
  gen1: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
  gen2: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",
  gen3: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=134",
  gen4: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107",
  gen5: "https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156",
  gen6: "https://pokeapi.co/api/v2/pokemon/?offset=649&limit=72",
  gen7: "https://pokeapi.co/api/v2/pokemon/?offset=721&limit=88",
  gen8: "https://pokeapi.co/api/v2/pokemon/?offset=809&limit=89",
};

export default function Home() {
  const [pokelist, setPokelist] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterList, setFilterList] = useState([]);

  const [generation, setGeneration] = useState("gen1");

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeText = (event) => {
    setFilterText(event.target.value);
  };
  const handleChangeGen = (event) => {
    setGeneration(event.target.value);
  };

  useEffect(() => {
    async function getPokemon() {
      const res = await axios.get(GENERATION[generation]);
      setPokelist(res.data["results"]);
      setFilterList(
        pokelist.filter((obj) => obj.name.indexOf(filterText) !== -1)
      );
    }
    getPokemon();
  }, [filterText, pokelist, generation]);


  const bodyModal = (

      <div className="filtersModal">

        <h3 className="titleModal">Filters</h3>

        <div className="filterText">
          <TextField
            size="small"
            onChange={handleChangeText}
            label="Pokemon"
            variant="outlined"
          />
        </div>

        <div className="filterSelect">
          <TextField
            onChange={handleChangeGen}
            size="small"
            label="Select Generation"
            value={generation}
            variant="outlined"
            select
          >
            <MenuItem value="gen0">All Generation</MenuItem>
            <MenuItem value="gen1">Generation 1</MenuItem>
            <MenuItem value="gen2">Generation 2</MenuItem>
            <MenuItem value="gen3">Generation 3</MenuItem>
            <MenuItem value="gen4">Generation 4</MenuItem>
            <MenuItem value="gen5">Generation 5</MenuItem>
            <MenuItem value="gen6">Generation 6</MenuItem>
            <MenuItem value="gen7">Generation 7</MenuItem>
            <MenuItem value="gen8">Generation 8</MenuItem>
          </TextField>
        </div>
      </div>
  );

  return (
    <>

     
        <button className="modalIcon" type="button" onClick={handleOpen}>
          <SearchIcon />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyModal}
        </Modal>
      

      <div className="filters">
        <div className="filterText">
          <TextField
            size="small"
            onChange={handleChangeText}
            label="Pokemon"
            variant="outlined"
          />
        </div>

        <div className="filterSelect">
          <TextField
            onChange={handleChangeGen}
            size="small"
            label="Select Generation"
            value={generation}
            variant="outlined"
            select
          >
               <MenuItem value="gen0">All Generation</MenuItem>
            <MenuItem value="gen1">Generation 1</MenuItem>
            <MenuItem value="gen2">Generation 2</MenuItem>
            <MenuItem value="gen3">Generation 3</MenuItem>
            <MenuItem value="gen4">Generation 4</MenuItem>
            <MenuItem value="gen5">Generation 5</MenuItem>
            <MenuItem value="gen6">Generation 6</MenuItem>
            <MenuItem value="gen7">Generation 7</MenuItem>
            <MenuItem value="gen8">Generation 8</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="screen-border">
        <div className="screen">
          {pokelist ? (
            <div className="row">
              {filterList.map((pokemon) => (
                <Row key={pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))}
            </div>
          ) : (
            <p>Loading pokemon</p>
          )}
        </div>
      </div>
    </>
  );
}
