import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';
import { FaSearch} from 'react-icons/fa';
import './Search.scss';
import axios from "axios";
import Details from '../Thumbnails/Details';
import Loading from '../Loading';


function Title({movies,rootURL,previousMovies, setPreviousMovies}) {
  const [title, setTitle]=useState("");
  const [allMovies]=useState(movies);
  const [resultsDetails,setResultsDetails]=useState([]);
  const [loading, setLoading]=useState(false);
  const [toggleSearchScope,setToggleSearchScope]=useState(false);
  const allVideosClass = (!toggleSearchScope)? "option-form-scope-button-scope-text choose":"option-form-scope-button-scope-text notChoose"
  const previousVideosClass = (toggleSearchScope)? "option-form-scope-button-scope-text choose":"option-form-scope-button-scope-text notChoose"
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
  const filterMovies= async (scope) => {
    const scopeMovies = (scope)?(previousMovies):(allMovies);
    const results=scopeMovies.filter(movie=>movie.title.toString().toUpperCase().includes(title.toString().toUpperCase()));
              setResultsDetails([]);
              for (const result of results){
                
                await fetchDetail(result.tmdb_id)
                
              }
              
              setPreviousMovies(resultsDetails);
              setTitle("");
  };
  
  


  return (
    <div className="option">
      <form
        name="search-by-title"
        onSubmit={async(event)=>{
            event.preventDefault();
            setLoading(true);
            await filterMovies(toggleSearchScope)
            setLoading(false);
          }}
      >
        <div className="option-form">
          <div className="option-form-criterias-criteria-text">
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
          <div className="option-form-scope-button">
            <div className="option-form-scope-button-scope">
              <div className={allVideosClass}>
                Recherche sur toutes les vidéos
              </div>
              <Radio 
                toggle
                onChange={()=>{
                  setToggleSearchScope(!toggleSearchScope)
                  
                  
                }}
              />
              <div className={previousVideosClass}>
                  Recherche sur les résultats précédents
              </div>
            </div>
            <div className="option-form-scope-button-button">
              <button
                  type="submit"
                  className="button-all"
                  onClick={()=>{
                    setResultsDetails([])
                  }}
              >
                <FaSearch /> Rechercher
              </button>
            </div>
            
        
          </div>
        </div>  
      </form>
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
            
            {resultsDetails.map(result=>(
              <Details key={result.id} movie={result}/>
            ))}
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
