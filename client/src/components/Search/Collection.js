import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';
import { FaSearch} from 'react-icons/fa';
import './Search.scss';
import axios from "axios";
import Details from '../Thumbnails/Details';
import Loading from '../Loading';


function Collection({movies,rootURL,previousMovies, setPreviousMovies,collections}) {
  const [allMovies]=useState(movies);
  const [collectionsFiltered,setCollectionFiltered]=useState(collections);
  const [collectionToSearch,setCollectionToSearch]=useState("");
  const [resultsDetails,setResultsDetails]=useState([]);
  const [loading, setLoading]=useState(false);
  const fetchDetail= async (id) => {
    
    try{
      const detail= await axios({
        method:'get',
        url:`${rootURL}/api/video/${id}`
      })
      
    
      return detail.data
    }catch(error){
      console.error(error);
    }

  }
  return (
    
    <div className="option">
      <form
        name="search-by-collection"
        
      >
        <div className="option-form">
          <div className="option-form-criterias-criteria-text">
            <input
              type="text"
              name="search-collection"
              placeholder="saisir une collection"
              value={collectionToSearch}
              onChange={(event)=>{
                
                let collectionsList="";
                setCollectionToSearch(event.target.value);
                if (event.target.value===""){
                  setCollectionFiltered(collections);
                } else {
                  collectionsList=collections.filter(collection=> collection.name.toString().toUpperCase().includes(collectionToSearch.toString().toUpperCase()))
                  setCollectionFiltered(collectionsList)
                }
              }}
              
            />
            <ul className="option-form-items">
              {collectionsFiltered.map(collection=>(
                <li 
                  key={collection.id}
                  className="option-form-item"
                  onClick={async(event)=>{
                    
                    setLoading(true);
                    
                    
                    setCollectionToSearch(event.target.textContent)
                    const datas=collectionsFiltered.filter(data=>data.name===event.target.textContent)
                    const collectionId=datas[0].id;
                    const moviesfiltered=allMovies.filter(movie=>movie.collection_id===collectionId)
                    let resultFetch=[];
                    setCollectionToSearch("");                  
                    for(const movie of moviesfiltered){
                      resultFetch.push(await fetchDetail(movie.tmdb_id))
                    }
                    
                    setResultsDetails(resultFetch)
                    setCollectionFiltered(collections);
                    setLoading(false);
                  }}
                >
                  {collection.name}
                </li>
              ))
            }
            </ul>
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
  )
}




export default Collection;
