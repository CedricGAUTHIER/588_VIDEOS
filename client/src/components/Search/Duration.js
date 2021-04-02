import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';
import { FaSearch} from 'react-icons/fa';
import './Search.scss';
import axios from "axios";
import Details from '../Thumbnails/Details';
import Loading from '../Loading';


function Duration({movies,rootURL,previousMovies, setPreviousMovies}) {
const [allMovies]=useState(movies);
const [betweenMaxDuration,setBetweenMaxDuration]=useState();
const [betweenMinDuration,setBetweenMinDuration]=useState();
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
const getAllDurationSortedWithoutDuplicates=(datasArray)=>{
  let results=[];
  const compare= (a,b)=>(a-b);
  for (const data of datasArray){
    results.push(data.runtime)
  }
  let resultsSorted=results.sort(compare);
  let resultsSortedWithoutDuplicates=[];
  
  for (const result of resultsSorted){
    let found=resultsSortedWithoutDuplicates.filter(element => element === result);
    if (found.length===0){
      resultsSortedWithoutDuplicates.push(result)
      
    }
  }
  return(resultsSortedWithoutDuplicates);
  
}

const allDurations = getAllDurationSortedWithoutDuplicates(allMovies);

let count=0;
const allDurationsObject=allDurations.map(duration=>{
count++;
return ({id:count,duration:duration})
})

const [durationToSearch, setDurationToSearch]=useState(allDurations[0]);

const searchByDuration= async (searchType, scope)=>{
  const scopeMovies = (scope)?(previousMovies):(allMovies);
  let results=[];
  if(searchType==="search-by-ltduration"){
    results=scopeMovies.filter(movie=>(movie.runtime<=durationToSearch))
  }
  if(searchType==="search-by-btduration"){
    results=scopeMovies.filter(movie=>(movie.runtime>=durationToSearch))
  }
  if(searchType==="search-by-between"){
    results=scopeMovies.filter(movie=>((movie.runtime>=betweenMinDuration) && (movie.runtime<=betweenMaxDuration)))
  }
  if (searchType==="duration-sort"){
    
    for (const duration of allDurations){
      const resultsByDuration=(scopeMovies.filter(movie=> movie.runtime===duration))
      
      for (const result of resultsByDuration){
        results.push(result);
      }
    }
  }
  console.log(results)
  for (const result of results){
    await fetchDetail(result.tmdb_id)
  }
  setPreviousMovies(resultsDetails);
}
return(
      <div className="option">
        <form
          name="search-by-duration"
          onSubmit={async(evt)=>{
            evt.preventDefault();
            const searchType=evt.target.duration.value;
            setLoading(true);
            await searchByDuration(searchType,toggleSearchScope);
            setLoading(false);
           
          }}
        >
        <div className="option-form">
          <div className="option-form-criterias">
            <h3>
              Choisissez une option de recherche
            </h3>
            <div className="option-form-criterias-criteria">
              <input
                type="radio"
                id="search-by-ltduration"
                name="duration"
                value="search-by-ltduration"
              />
              <label>
                Films qui durent moins de
              </label>
              <select
                name="ltduration"
                onChange={(evt)=>{
                  
                  setDurationToSearch(parseInt(evt.target.value,10));
                }}
              >
              {allDurationsObject.map(duration=>(
              <option
                key={duration.id}
                value={duration.duration}
              >
                {duration.duration}
              </option>
                ))
              }
              </select>
              <label>
                minutes.
              </label>
            </div>
            <div className="option-form-criterias-criteria">
              <input
                type="radio"
                id="search-by-btduration"
                name="duration"
                value="search-by-btduration"
              />
              <label>
                Films qui durent plus de
              </label>
              <select
                name="btduration"
                onChange={(evt)=>{
                  setDurationToSearch(parseInt(evt.target.value,10));
                }}
              >
              {allDurationsObject.map(duration=>(
              <option
                key={duration.id}
                value={duration.duration}
              >
                {duration.duration}
              </option>
                ))
              }
              </select>
              <label>
                minutes.
              </label>
            </div>
            <div className="option-form-criterias-criteria">
              <input
                type="radio"
                id="search-by-between"
                name="duration"
                value="search-by-between"
              />
              <label>
                Films qui durent entre
              </label>
              <select
                name="betweenduration-min"
                onChange={(evt)=>{
                  setBetweenMinDuration(parseInt(evt.target.value,10));
                }}
              >
              {allDurationsObject.map(duration=>(
              <option
                key={duration.id}
                value={duration.duration}
              >
                {duration.duration}
              </option>
                ))
              }
              </select>
              <label>
                minutes et
              </label>
              <select
                name="betweenduration-max"
                onChange={(evt)=>{
                  setBetweenMaxDuration(parseInt(evt.target.value,10));
                }}
              >
              {allDurationsObject.filter(duration=> duration.duration >= betweenMinDuration).map(duration=>(
              <option
                key={duration.id}
                value={duration.duration}
              >
                {duration.duration}
              </option>
                ))
              }
              </select>
              <label>
                minutes.
              </label>
            </div>
            <div className="option-form-criterias-criteria">
              <input
                type="radio"
                id="duration-sort"
                name="duration"
                value="duration-sort"
              />
              <label>
                Tous les films par durée croissante.
              </label>
              
            </div>
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
                
                console.log("change")
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
        { (loading) && (
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
)
}
export default Duration;
