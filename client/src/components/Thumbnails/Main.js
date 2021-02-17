import React from 'react';
import './Thumbnails.scss';
import Moment from 'react-moment';


function Main({movie})  {
  const imageURL=`https://image.tmdb.org/t/p/w500${movie.poster}`;
  const words=movie.overview.split(' ');
  let overviewBegin = [];
  let word='';
  const length = words.length;
  for (let index = 0; index < length/2; index++) {
    word = `${words[index]} `
    overviewBegin.push(word)
    
  }
  overviewBegin.push('....');
  return (
    <div className="thumbnails-main">
      
        <img className="thumbnails-main-poster" src={imageURL} alt="poster of {movie.title}"/> 
      
      <div className="thumbnails-main-content">
        <h1 className="thumbnails-main-content-title">
          {movie.title}
        </h1>
        <h2 className="thumbnails-main-content-tag_line">
          {movie.tag_line}
        </h2>
        <h2 className="thumbnails-main-content-release_date">
          ( <Moment format="YYYY">
            {movie.release_date}
          </Moment> )
        </h2>
        <p className="thumbnails-main-content-overview">
          {overviewBegin}
        </p>
      </div>
    </div>
  );
}

export default Main;
