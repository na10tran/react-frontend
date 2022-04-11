import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios';


function MyApp() { 
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter(index, idNum) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });    
    setCharacters(updated);    
    const response = await axios.delete('http://localhost:5000/users/' + idNum );   
    return response.data.users_list;
  }

  function updateList(person) {
    makePostCall(person).then(result =>{
      if(result && result.status === 201)    
        setCharacters([...characters, person]);
    });
  }


  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch(error) {
      //we're not handling errors. just logging into the console.
      console.log(error);
      return false;
    }
  }
  
  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/users' , person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );  

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}
export default MyApp