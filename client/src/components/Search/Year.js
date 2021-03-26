import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';
import { FaSearch} from 'react-icons/fa';
import './Search.scss';
import axios from "axios";
import Details from '../Thumbnails/Details';
import Loading from '../Loading';


function Year({movies,rootURL,previousMovies, setPreviousMovies}) {
  
  const [betweenMinYear, setBetweenMinYear]=useState();
  const [betweenMaxYear, setBetweenMaxYear]=useState();
  const [decades]=useState([1970,1980,1990,2000,2010])
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
  
  const releaseDate= (datasArray) => {
    let results = [];
    const compare= (a,b)=>(a-b);
    
    for (const data of datasArray){
      const year=data.release_date.split('-');
      results.push(year[0])
    }
    let datas=results.sort(compare);
    let datasWithoutDuplicates=[];
    for (const data of datas){
      let found=datasWithoutDuplicates.filter(element => element === data);
      if (found.length===0){
        datasWithoutDuplicates.push(data)
      }
    }
    return(datasWithoutDuplicates)
  }

  const allYears = releaseDate(allMovies);
  const [yearToSearch, setYearToSearch]=useState(allYears[0]);
  
  const searchByDate= async (searchType,scope)=>{
    const scopeMovies = (scope)?(previousMovies):(allMovies);
    let results=[];
    if(searchType==="search-by-year"){
      results = scopeMovies.filter(movie=> {
        const year = movie.release_date.split("-")[0]
        return(year===yearToSearch)
        }) 
    }
    if (searchType==="search-by-decade"){
      const decadeBegin = parseInt(yearToSearch,10);
      const decadeEnd = decadeBegin+9;
      results = scopeMovies.filter(movie=> {
        const year = movie.release_date.split("-")[0];
        return ((year>=decadeBegin) && (year<=decadeEnd) )
        })
    }
    if (searchType==="search-by-between"){
      results = scopeMovies.filter(movie => {
        const year = movie.release_date.split("-")[0];
        return((year>=(betweenMinYear))&& (year<=(betweenMaxYear)))})
    }
    if (searchType==="year-sort"){
      const dates= releaseDate(scopeMovies)
      let results = [];
      for (const date of dates){
        const resultsDetailsByDate =  scopeMovies.filter(result=> result.release_date.split('-')[0] === date)
        
        for (const result of resultsDetailsByDate){
          const detail = await fetchDetail(result.tmdb_id);
          results.push(detail)
        }
      }
      console.log (results)     
      

    }
    for (const result of results){
      await fetchDetail(result.tmdb_id)
    }
    
    
    setPreviousMovies(resultsDetails);
    
  }

  return (
    
    <div className="option">
      <form
          name="search-by-year"
          onSubmit={async(event)=>{
            event.preventDefault();
            
            const searchType = event.target.year.value;
            setLoading(true);
            await searchByDate(searchType,toggleSearchScope)
            setLoading(false);
          }}
          > 
      <div className="option-form">
      <div className="option-form-criterias">
          <div className="option-form-criterias-title">
            <h3>
                Choisissez une option de recherche
            </h3>
          </div>
          <div className="option-form-criterias-criteria">
            <input
              type="radio"
              id="search-by-year"
              name="year"
              value="search-by-year"
            />
            <label>
              Choisir une date
            </label>
            <select
              name="year-choice"
              onChange={(evt)=>{
                setYearToSearch(evt.target.value);
                
              
              }}  
            >
            {allYears.map(year=>(
              <option
                key={`${year}`}
                value={`${year}`}
              >
                {year}
              </option>
            ))
            }
            </select>
          </div>
          <div className="option-form-criterias-criteria">
            <input
              type="radio"
              id="search-by-decade"
              name="year"
              value="search-by-decade"
            />
            <label>
              Films réalisés dans la décennie
            </label>
            <select
              name="year-decade"
              onChange={(evt)=>{
                setYearToSearch(evt.target.value);
                console.log("onchange",evt.target.value);
              }}  
            >
            {decades.map(year=>(
              <option
                key={`${year}`}
                value={`${year}`}
              >
                {year}
              </option>
            ))
            }
            </select>
          </div>
          <div className="option-form-criterias-criteria">
            <input
              type="radio"
              id="search-by-between"
              name="year"
              value="search-by-between"
            />
            <label>
              Films réalisés entre
            </label>
            <select
              name="year-between-min"
              onChange={(evt)=>{
                setBetweenMinYear(evt.target.value);
                
              }}  
            >
            {allYears.map(year=>(
              <option
                key={`${year}`}
                value={`${year}`}
              >
                {year}
              </option>
            ))
            }
            </select>
            <label>
              et
            </label>
            <select
              name="year-between-max"
              onChange={(evt)=>{
                setBetweenMaxYear(evt.target.value);
                
              }}

            >
            {allYears.filter(year=>year>=betweenMinYear).map(year=>(
              <option
                key={`${year}`}
                value={`${year}`}
              >
                {year}
              </option>
            ))
            }
            </select>
          </div>
          <div className="option-form-criterias-criteria">
            <input
              type="radio"
              id="year-sort"
              name="year"
              value="year-sort"
            />
            <label>
              Tous les films par ordre chronologique
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



);
}




export default Year;
