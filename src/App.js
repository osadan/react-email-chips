import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chips from './chips/Chips';

function App() {
  const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return (
    <div className="App">
    <Chips 
    chips={[
      { email: 'react@gmail.com', valid: true, key: '1'}, 
      { email: 'javascript@gmail.com', valid: true, key:'2'}, 
      { email: 'scss@gmail.com', valid: true, key: '3'}
    ]} 
    placeholder="Add a tag..." 
    save={data => console.log('new data', data) }  
    pattern={pattern}
    required={true}
    title="Send notifications to:"
    ></Chips>
    </div>
  );
}

export default App;
