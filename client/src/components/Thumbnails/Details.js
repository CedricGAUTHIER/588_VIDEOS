import React from 'react';
import './Thumbnails.scss';
import Moment from 'react-moment';


const Details=({movie})=>  {
  const imageURL=`https://image.tmdb.org/t/p/w500${movie.poster}`;
  
  return (
    <div className="thumbnails-details">
      <div className="thumbnails-details-header">
        <img className="thumbnails-details-header-image" src={imageURL} alt="poster of {movie.title}"/> 
        <div className="thumbnails-details-header-content">
          <div className="thumbnails-details-header-content-headtitle">
            <div className="thumbnails-details-header-content-headtitle-titles">
              <h1> {movie.title} </h1>
              <h2> {movie.tag_line} </h2>
              <p>
                <Moment format="YYYY">
                  {movie.release_date}
                </Moment>
              </p>
            </div>
            <div className="thumbnails-details-header-content-headtitle-infos">
              <p>
                {movie.runtime}
              </p>
              <p>
              {movie.collection_name}
              </p>
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
            budget: {movie.budget} $
          </div>
          <div className="thumbnails-details-content-profit-revenue">
            revenus: {movie.revenue} $
          </div>
          <div className="thumbnails-details-content-profit-ratio">
            coefficient de rentabilité: {movie.profitability_ratio}
          </div>  
        </div>
        <div className="thumbnails-details-content-genres">
          genre:
          
      
        </div>
        <div className="thumbnails-details-content-credit">
        
      
        </div>
        <div className="thumbnails-details-content-production">
        
      
        </div>   
      </div>  
    </div>
  );
}

export default Details;
