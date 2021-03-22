import React from 'react';
import axios from 'axios';


const AddMovie=({tmdbId,setTmdbId,rootURL}) => {
    const handleSubmit=async({tmdb_id})=>{
      
      if (tmdb_id.value!==""){
        await axios({
          method:"post",
          url:`${rootURL}/api/add_movie_by_id`,
          data: {id:tmdb_id.value}
        })
        
      }
    }
   
  return (
  <div>
    <h1>ADDMOVIE</h1>
    <form onSubmit={(evt)=>{
          evt.preventDefault();
          handleSubmit(evt.target);
          }}
    >
      <input
        name="tmdb_id"
        type="text"
        placeholder="id tmdb"
        value={tmdbId}
        onChange={(evt)=>{
          setTmdbId(evt.target.value)
        }}
        

        

      />

      
    </form>
  </div>
  
    );
}

export default AddMovie;
