const client = require ('../../server/db');
const moment = require('moment');
moment.locale('fr');

module.exports={

    getAllVideos: async()=>{
        const allVideos = await client.query(`
        SELECT * 
        FROM "movie"
        ORDER BY "title" 
        `);
        return allVideos.rows
    },
    getMovieDetailsById: async(id)=>{
        
        let movieDetails={
            collection_name: "Pas de collection associée",
            support_name: "non précisé",
            director:{
                name:"non précisé",
                photo:""
            }
        };
        
        const ids= async(id, column, table, linkyColumn, linkyTable)=>{
            const ids = await client.query(`
            SELECT ${column} 
            FROM ${table}
            WHERE "movie_id"=$1 
            `,[id]);
            let items=[];
        for (const id of ids.rows) {
            const details= await client.query(`
                SELECT *
                FROM ${linkyTable}
                WHERE ${linkyColumn}=$1
            `,[id[column]]);
            items.push(details.rows[0])
            
        }
        return items
        };
        

        const movie = await client.query(`
            SELECT * 
              FROM "movie"
             WHERE "tmdb_id" = $1
        `,[id]);
        movieDetails={
            ...movieDetails,
            ...movie.rows[0],
        }
        
        
        const collectionId= movie.rows[0].collection_id;
        const supportId=movie.rows[0].support_id;
        const directorId= movie.rows[0].director_id;

        const collectionName= await client.query(`
            SELECT "name"
              FROM "collection"
             WHERE "tmdb_id"=$1 
        `,[collectionId]);

        if(collectionName.rowCount!==0){
            movieDetails={
                ...movieDetails,
                collection_name : collectionName.rows[0].name,
            }
            
        }

        const supportName= await client.query(`
            SELECT "name"
              FROM "support"
             WHERE "id"=$1 
        `,[supportId]);

        if(supportName.rowCount!==0){
            movieDetails={
                ...movieDetails,
                support_name : supportName.rows[0].name,
            }
            
        }

        const director= await client.query(`
            SELECT "name","photo"
              FROM "director"
             WHERE "tmdb_id"=$1
        `,[directorId])

        if(director.rowCount!==0){
            movieDetails={
                ...movieDetails,
                director : director.rows[0],
            }
            
        }
    const genres = await (ids(id,"genre_id","type", "tmdb_id", "genre"))
    const actors = await (ids(id,"actor_id","play", "tmdb_id", "actor"));
    const countries = await (ids(id,"production_country_id","origin", "id", "production_country"));
    const companies = await (ids(id,"production_company_id","production", "tmdb_id", "production_company"));
    
        movieDetails={
            ...movieDetails,
            genres,
            actors,
            countries,
            companies,
        }
        return movieDetails
    },


}
