// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './Nav';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Footer from './footer';
import d from "./d";
import Section from "./section.jsx"
import data from "./data"
import input from "./note.js"
import data2 from "./data2.js"


function App() {
  return (
    <Provider store={store}>
      <div className="app">
     
        <Nav />
        <Section1 />
        <Section2 cardsData={data}  heading={input[0].headning} caption={input[0].caption}/>
        <Section3 />
        <Section2 cardsData={data2}  heading={input[1].headning} caption={input[1].caption}/>
        <Section4 data={d}/>
       <Section/>
       
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
