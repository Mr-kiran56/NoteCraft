import React from 'react';
import Notes from './Notes'; 


const Home = ({setAlert}) => {
  return (
    <>
   <div className='home-back' >
    
      <Notes  setAlert={setAlert}/> 
      
    </div>
    </>
  );
};

export default Home;
