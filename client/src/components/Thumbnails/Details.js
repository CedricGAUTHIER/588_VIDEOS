import React from 'react';
import './Thumbnails.scss';
import Moment from 'react-moment';
import FlagIcon from '../FlagIcon';

const Details=({movie})=>  {
  const rootURLImage = "https://image.tmdb.org/t/p/w500";
  const imageURL=`${rootURLImage}${movie.poster}`;
  const ratio=movie.profitability_ratio;
  let ratioClass="";
  if(ratio<=1){
    ratioClass="fail";
  }else if((ratio>1) && (ratio<=10)){
    ratioClass="success";
  }else if((ratio>10) && (ratio<=50)){
    ratioClass="blockbuster";
  }else if(ratio>50){
    ratioClass="legend";
  }
  const adultClass=(movie.for_adult)?"for-adult":"for-all";
  const publicText=(movie.for_adult)?"Pour adulte":"Tout public";
  return (
    <div className="thumbnails-details">
      <div className="thumbnails-details-header">
        <img className="thumbnails-details-header-image" src={imageURL} alt="poster of {movie.title}"/> 
        <div className="thumbnails-details-header-content">
          <div className="thumbnails-details-header-content-headtitle">
            <div className="thumbnails-details-header-content-headtitle-titles">
              <h1 className="thumbnails-details-header-content-headtitle-titles-title">
                {movie.title}
              </h1>
              <h2 className="thumbnails-details-header-content-headtitle-titles-tag_line">
                {movie.tag_line}
              </h2>
              <h2 className="thumbnails-details-header-content-headtitle-titles-release_date">
                (<Moment format="YYYY">
                  {movie.release_date}
                </Moment>)
              </h2>
            </div>
            <div className="thumbnails-details-header-content-headtitle-infos">
              <div className="thumbnails-details-header-content-headtitle-infos-runtime">
                <h3 className="thumbnails-details-header-content-headtitle-infos-runtime-title">
                  durée:
                </h3>
                <p className="thumbnails-details-header-content-headtitle-infos-runtime-title-p">
                  <em className="thumbnails-details-header-content-headtitle-infos-runtime-title-p-em">
                    {movie.runtime}
                  </em>
                  minutes
                </p>
                 
              </div>
              <div className="thumbnails-details-header-content-headtitle-infos-runtime">
                <h3 className="thumbnails-details-header-content-headtitle-infos-runtime-title">
                  appartient à la collection:
                </h3>
                <p className="thumbnails-details-header-content-headtitle-infos-runtime-title-p">
                  <em className="thumbnails-details-header-content-headtitle-infos-runtime-title-p-em">
                    {movie.collection_name}
                  </em>
                </p>
                 
              </div>
            </div>
          </div>
          <div className="thumbnails-details-header-content-overview">
            {movie.overview}
          </div>
        </div>
      </div>
      <div className="thumbnails-details-content">
        <div className="thumbnails-details-content-profit">
          <div className="thumbnails-details-content-profit-budget">
            budget: {movie.budget.toLocaleString()} $
          </div>
          <div className="thumbnails-details-content-profit-revenue">
            revenus: {movie.revenue.toLocaleString()} $
          </div>
          <div className={`thumbnails-details-content-profit-ratio ${ratioClass}`}>
            coefficient de rentabilité: {ratio}
          </div>  
        </div>
        <div className="thumbnails-details-content-genres">
          <h3>
            genres:
          </h3>
          <ul className="thumbnails-details-content-genres-list">
            
            <li
              key = {movie.id}
              className={`thumbnails-details-content-genres-item ${adultClass}`}
            >
                  {publicText}
            </li>
            

            {movie.genres.map((genre)=>{
              return (
                <li
                  key = {genre.tmdb_id}
                  className="thumbnails-details-content-genres-item"
                >
                  {genre.name}
                </li>
              )
                
              
            })}

          </ul> 
        </div>
        <div className="thumbnails-details-content-credit">
          <div className="thumbnails-details-content-credit-actors">
            <h3>
              Acteurs:
            </h3>
            <ul className="thumbnails-details-content-credit-actors-list">
              {movie.actors.map((actor)=>{
                return(
                  <li
                    key={actor.tmdb_id}
                    className="thumbnails-details-content-credit-actors-item"
                  >
                    <span className="thumbnails-details-content-credit-actors-item-name">
                      {actor.name}
                    </span>
                    <span className="thumbnails-details-content-credit-actors-item-is">
                    dans le rôle de
                    </span>
                    <span className="thumbnails-details-content-credit-actors-item-character">
                    {actor.character}
                    </span>
                    
                  </li>
                )
              })}
            </ul>
          </div>
          
          <div className="thumbnails-details-content-credit-director">
            <h3>
              Réalisateur:
            </h3>
            <div className="thumbnails-details-content-credit-director-name">
              {movie.director.name}
            </div>
          </div>
        </div>
        <div className="thumbnails-details-content-production">
          <div className="thumbnails-details-content-production-countries">
            <h3>
              Pays d'origine:  
            </h3>
            <ul className="thumbnails-details-content-production-countries-list">
              {movie.countries.map((country)=>{
                return(
                  <li
                    key={country.id}
                    className="thumbnails-details-content-production-countries-item"
                  >
                    <FlagIcon code={country.iso_3166.toLowerCase()} size='lg' />
                    <span className="thumbnails-details-content-production-countries-item-name">
                      
                      {country.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="thumbnails-details-content-production-companies">
            <h3>
              produit par:
            </h3>
          
            <ul className="thumbnails-details-content-production-companies-list">
              {movie.companies.map((company)=>{
                
                return(
                  <li
                    key={company.tmdb_id}
                    className="thumbnails-details-content-production-companies-item"
                  >
                    {(company.iso_3166!=="")&&(
                    <span className="thumbnails-details-content-production-companies-item-flag">
                      <FlagIcon code={company.iso_3166.toLowerCase()} size='lg' />
                    </span>
                    )} 
                    <span className="thumbnails-details-content-production-companies-item-name">
                      {company.name}
                    </span>
                    {(company.logo) && (<img
                      className="thumbnails-details-content-production-companies-item-image"
                      src={`${rootURLImage}${company.logo}`}
                      alt={`logo inconnu`}
                    />)}
                    
                    
                  </li>
                )
              })}
            </ul>
          </div>
          
          
        </div>
        <div className="goto">
            <a href="#top">Retour haut de page</a>
          </div>   
      </div>  
    </div>
  );
}

export default Details;
