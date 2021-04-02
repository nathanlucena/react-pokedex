import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Screen from '../../components/Screen';
import './style.css';

export default function Home(){
  
        return (
          <>
            <div>


              <div  className="home">

              <Header />  
              <Screen/>
              </div>
             <footer>
             <Footer />
             </footer>
               
            </div>
            </>
        );
    }