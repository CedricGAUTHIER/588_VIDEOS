require('dotenv').config();
const client = require ('../db');
const axios = require('axios');
const ApiKey = process.env.TMDB_API_KEY;
module.exports={
    updateDirector:async (id)=>{
        
        try {   
                
                const movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}&language=fr-FR`
                }) 
                const crew=movie.data.crew
                const director=crew.filter(person=>(person.job==='Director' && person.department==='Directing'))
                
                if(director.length!==0){
                
                    const checkDirector= await client.query(`
                    SELECT "tmdb_id"
                      FROM "director"
                     WHERE "tmdb_id"=$1 
                    `,[director[0].id])
                    
                    if(checkDirector.rowCount===0){
                        await client.query(`
                        INSERT INTO "director" ("tmdb_id","photo", "name")
                             VALUES ( $1, $2, $3)
                        `,[director[0].id, director[0].profile_path, director[0].name])
                        console.log(`${director[0].name} a été ajouté`)
                    }else{
                        console.log(`${director[0].name} est déjà dans la base DIRECTOR`)
                    }
                }else{
                    console.log("inconnu");
                }
                console.log("table director à jour");
                return director[0].id

            
            
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updateCollection: async (id) => {
        try {
            
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=fr-FR`
                }) 
                let collection=movie.data.belongs_to_collection

                if(collection){
                    const checkCollection= await client.query(`
                        SELECT "tmdb_id"
                        FROM "collection"
                        WHERE "tmdb_id"=$1 
                        `,[collection.id])
                    if(checkCollection.rowCount===0){
                        await client.query(`
                        INSERT INTO "collection" ("tmdb_id", "name")
                            VALUES ( $1, $2)
                        `,[collection.id, collection.name])
                        console.log(`la collection ${collection.name} a été ajoutée`)
                    }else{
                        console.log(`la collection ${collection.name} est déjà dans la base`)  
                    }
                    
                    
                }else{
                    console.log("pas de collection")
                }
            
            console.log("table collection à jour");
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updateOrigin: async (id, countries) => {
        /*mise à jour de origin (movie_id + production_country_id):
                - movie_id= id
                - production_country_id:
                    1- lister les production_countries
                    2- stocker l'iso_3166_1 de chaque pays.
                    3- récupérer pour l'iso_3166_1, l'id de l'iso_3166 de la table
                        production_countries
                    4- faire un tableau d'ids
                    5- écrire dans origine : id du film + id du pays
            */
        try {
                console.log(`dans origin`);
                for (const country of countries) {
                    const countryId = await client.query(`
                    SELECT "id"
                    FROM "production_country"
                    WHERE "iso_3166"=$1
                    `,[country.iso_3166_1])
                    
                    await client.query(`
                    INSERT INTO "origin" ("movie_id","production_country_id")
                    VALUES ($1,$2)
                    `,[id,countryId.rows[0].id])

                    console.log(`movie_id(${id}) - production_country(${countryId.rows[0].id})`);    
                }
                
                 console.log(`la table origin est à jour`);           
            
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updateType: async (id, genres) => {
        /*mise à jour de type (movie_id + genre_id):
                - movie_id= id
                - production_country_id:
                    1- lister les production_countries
                    2- stocker l'iso_3166_1 de chaque pays.
                    3- récupérer pour l'iso_3166_1, l'id de l'iso_3166 de la table
                        production_countries
                    4- faire un tableau d'ids
                    5- écrire dans origine : id du film + id du pays
            */
        try {
                for (const genre of genres) {
                    await client.query(`
                        INSERT INTO "type" ("movie_id","genre_id")
                             VALUES ($1,$2)
                    `,[id,genre.id])

                    console.log(`genre ${genre.name} : movie_id(${id}) - genre_id(${genre.id})`);    
                }
                
                 console.log(`la table type est à jour`);           
            
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },

    updateProduction: async (id, companies) => {
        /*mise à jour de type (movie_id + production_company_id):
                - movie_id= id
                - production_country_id:
                    1- lister les production_countries
                    2- stocker l'iso_3166_1 de chaque pays.
                    3- récupérer pour l'iso_3166_1, l'id de l'iso_3166 de la table
                        production_countries
                    4- faire un tableau d'ids
                    5- écrire dans origine : id du film + id du pays
            */
        try {
                for (const company of companies) {
                    await client.query(`
                        INSERT INTO "production" ("movie_id","production_company_id")
                             VALUES ($1,$2)
                    `,[id,company.id])

                    console.log(`company ${company.name} : movie_id(${id}) - production_company_id(${company.id})`);    
                }
                
                 console.log(`la table production est à jour`);           
            
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updatePlay:async (id)=>{
        
        try {   
                
                const movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}&language=fr-FR`
                }) 
                const cast=movie.data.cast;
                const actors=[]
                for (let index = 0; index < 5; index++) {
                    if (index<cast.length){
                        actors.push(cast[index])
                    }
                }

                for (const actor of actors) {
                    await client.query(`
                        INSERT INTO "play" ("movie_id","actor_id")
                             VALUES ($1,$2)
                    `,[id,actor.id])

                    console.log(`actor ${actor.name} : movie_id(${id}) - actor_id(${actor.id})`);    
                }
                
                 console.log(`la table play est à jour`);  

            
            
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
}
