//Importar as dependências
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Importar as páginas
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';


//Criar o componentes com as rotas
function Routes(){
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;