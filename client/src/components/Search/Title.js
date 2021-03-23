import React, { useState } from 'react';
import Moment from 'react-moment';
import './Search.scss';
import axios from "axios";
import Details from '../Thumbnails/Details';
import Loading from '../Loading';


function Title({movies,rootURL,previousMovies, setPreviousMovies}) {
  const [title, setTitle]=useState("");
  const [allMovies]=useState(movies);
  const [resultsDetails,setResultsDetails]=useState([]);
  const [loading, setLoading]=useState(false);
  const fetchDetail= async (id) => {
    let resultFetchDetail=resultsDetails;
    try{
      const detail= await axios({
        method:'get',
        url:`${rootURL}/api/video/${id}`
      })
      resultFetchDetail.push(detail.data)
      
      setResultsDetails(resultFetchDetail)
    }catch(error){
      console.error(error);
    }

  }
  const filterMovies= async (filter) => {
    const results=filter.filter(movie=>movie.title.toUpperCase().includes(title.toUpperCase()));
              setResultsDetails([]);
              for (const result of results){
                
                await fetchDetail(result.tmdb_id)
                
              }
              
              setPreviousMovies(resultsDetails);
              setTitle("");
  };
  const releaseDate= (datasArray) => {
    let results = [];
    const compare= (a,b)=>(a-b);
    
    for (const data of datasArray){
      const year=data.release_date.split('-');
      results.push(year[0])
    }
    
    return(results.sort(compare))

  }
  


  return (
    <div className="search-search"> 
      <div className="search-search-title">
        <div className="search-search-title-input">
          <input
            type="text"
            name="search-title"
            placeholder="saisir un titre"
            value={title}
            onChange={(event)=>{
              setTitle(event.target.value);
              setResultsDetails([]);
              
            }}
          />
        </div>
        <div className="search-search-title-buttons">
          <button
            
            className="button-all"
            onClick={async ()=>{
              setLoading(true);
              await filterMovies(allMovies);
              setLoading(false);
              
              const datesSorted = releaseDate(resultsDetails);
              let resultsDetailsByDate = [];
              for (const date of datesSorted){
                const resultWithDate=  resultsDetails.filter(result=> result.release_date.split('-')[0] === date)
                resultsDetailsByDate.push(resultWithDate[0])
                

              }
              
              setResultsDetails(resultsDetailsByDate)
            }}
          >
            Rechercher sur tous les titres
          </button>
          {(previousMovies.length>0)&&(
            <button
              className="button-previous"
              onClick={async ()=>{
              setLoading(true);
              await filterMovies(previousMovies);
              setLoading(false);
            }}>
            Rechercher sur les résultats précédents
          </button>  )

          }
          
        </div>
      </div>
      {(loading) && (
        <Loading />
      )}
      {(resultsDetails.length>1) && (
        <div className="search-results">
          <p className="search-results-number">
            {resultsDetails.length} films correspondent à cette recherche
          </p>
          <div className="search-results-movies">
            {resultsDetails.map(result => {
              return <Details key={result.id} movie={result}/>
            }
          )}
            
            
            
          </div>
        </div>        
      )}
      
      {(resultsDetails.length===1) && (
        <div className="search-results">
          <p className="search-results-number">
            1 seul film correspond à cette recherche
          </p>  
          <div className="search-results-movies">
            
            {resultsDetails.map(result=>{
              
              return <Details key={result.id} movie={result}/>
            })}
            
            
            
          </div>
        </div>        
      )}
      {(resultsDetails.length===0) && (
        <div className="search-results">
          <p className="search-results-number">
            Cette recherche n'a donné aucun résultat.
          </p>
          <div className="search-results-movies">
            
            {resultsDetails.map(result=>{
              
              return <Details key={result.id} movie={result}/>
            })}
            
            
            
          </div>
        </div>        
      )}
            
       
      </div>
);
}




export default Title;
