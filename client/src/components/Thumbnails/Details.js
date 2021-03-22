import React from 'react';
import './Thumbnails.scss';
import Moment from 'react-moment';
import FlagIcon from '../FlagIcon';

const Details=({movie})=>  {
  const{title, tag_line, release_date, runtime, collection_name, overview, budget, revenue, profitability_ratio, genres, actors, director, countries, companies}=movie;
  const rootURLImage = "https://image.tmdb.org/t/p/w500";
  const imageURL=`${rootURLImage}${movie.poster}`;
  console.log({movie})
  
  const ratioClass=(movie.profitability_ratio > 1)? "success":"fail";
  return (
    <div className="thumbnails-details">
      <div className="thumbnails-details-header">
        <img className="thumbnails-details-header-image" src={imageURL} alt="poster of {movie.title}"/> 
        <div className="thumbnails-details-header-content">
          <div className="thumbnails-details-header-content-headtitle">
            <div className="thumbnails-details-header-content-headtitle-titles">
              <h1 className="thumbnails-details-header-content-headtitle-titles-title">
                {title}
              </h1>
              <h2 className="thumbnails-details-header-content-headtitle-titles-tag_line">
                {tag_line}
              </h2>
              <h2 className="thumbnails-details-header-content-headtitle-titles-release_date">
                (<Moment format="YYYY">
                  {release_date}
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
                    {runtime}
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
                    {collection_name}
                  </em>
                </p>
                 
              </div>
            </div>
          </div>
          <div className="thumbnails-details-header-content-overview">
            {overview}
          </div>
        </div>
      </div>
      <div className="thumbnails-details-content">
        <div className="thumbnails-details-content-profit">
          <div className="thumbnails-details-content-profit-budget">
            budget: {budget.toLocaleString()} $
          </div>
          <div className="thumbnails-details-content-profit-revenue">
            revenus: {revenue.toLocaleString()} $
          </div>
          <div className={`thumbnails-details-content-profit-ratio-${ratioClass}`}>
            coefficient de rentabilité: {profitability_ratio}
          </div>  
        </div>
        <div className="thumbnails-details-content-genres">
          <h3>
            genres:
          </h3>
          <ul className="thumbnails-details-content-genres-list">
            {genres.map((genre)=>{
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
              {actors.map((actor)=>{
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
              {director.name}
            </div>
          </div>
        </div>
        <div className="thumbnails-details-content-production">
          <div className="thumbnails-details-content-production-countries">
            <h3>
              Pays d'origine:  
            </h3>
            <ul className="thumbnails-details-content-production-countries-list">
              {countries.map((country)=>{
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
              {companies.map((company)=>{
                return(
                  <li
                    key={company.tmdb_id}
                    className="thumbnails-details-content-production-companies-item"
                  >
                    <span className="thumbnails-details-content-production-companies-item-flag">
                      <FlagIcon code={company.iso_3166.toLowerCase()} size='lg' />
                    </span>
                     
                    <span className="thumbnails-details-content-production-companies-item-name">
                      {company.name}
                    </span>
                    <img
                      className="thumbnails-details-content-production-companies-item-image"
                      src={`${rootURLImage}${company.logo}`}
                      alt={`logo of ${company.name}`}
                    />
                    
                  </li>
                )
              })}
            </ul>
          </div>
        </div>   
      </div>  
    </div>
  );
}

export default Details;
