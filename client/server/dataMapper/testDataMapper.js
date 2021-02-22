require('dotenv').config();
const client = require ('../db');
const axios = require('axios');
const ApiKey = process.env.TMDB_API_KEY;

module.exports={

    updateDirector: async()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `) 
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}/credits?api_key=${ApiKey}&language=fr-FR`
                }) 
                let crew=movie.data.crew
                let director=crew.filter(person=>(person.job==='Director' && person.department==='Directing'))
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
                

            }
            console.log("fini");
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updateCollection: async()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `) 
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr`
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
                        console.log(`${collection.name} a été ajouté`)
                    }else{
                        console.log(`la collection ${collection.name} est déjà dans la base`)  
                    }
                    
                    
                }else{
                    console.log("pas de collection")
                }
            }
            console.log("fini");
            

            
            
        } catch (error) {
            console.error(error);    
        }
    },
    updateActor: async()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}/credits?api_key=${ApiKey}&language=fr-FR`
                })
                
                for (let index = 0; index < 5; index++) {
                    if (index<movie.data.cast.length){
                        const checkActor= await client.query(`
                        SELECT "tmdb_id"
                        FROM "actor"
                        WHERE "tmdb_id"=$1
                        `,[movie.data.cast[index].id])
                        if (checkActor.rowCount === 0){
                            await client.query(`
                                INSERT INTO "actor" ("tmdb_id", "name", "character")
                                 VALUES ( $1, $2, $3)
                            `,[movie.data.cast[index].id, movie.data.cast[index].name,movie.data.cast[index].character])
                            console.log(`${movie.data.cast[index].name} a été ajouté`)
                        }else{
                            console.log(`${movie.data.cast[index].name} est déjà dans la base`)
                        }
                    }
                }
                
                
            }
            console.log("fini");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },
    updateGenre: async()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr`
                })
                
                for (let index = 0; index < movie.data.genres.length; index++) {
                    
                        const checkGenre= await client.query(`
                        SELECT "tmdb_id"
                        FROM "genre"
                        WHERE "tmdb_id"=$1
                        `,[movie.data.genres[index].id])
                        if (checkGenre.rowCount === 0){
                            await client.query(`
                                INSERT INTO "genre" ("tmdb_id", "name")
                                 VALUES ( $1, $2)
                            `,[movie.data.genres[index].id, movie.data.genres[index].name])
                            console.log(`${movie.data.genres[index].name} a été ajouté`)
                        }else{
                            console.log(`${movie.data.genres[index].name} est déjà dans la base`)
                        }
                    }
                
                
            }
            console.log("genre est à jour !!!!");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },
    updateCompany: async()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr`
                })
                
                for (let index = 0; index < movie.data.production_companies.length; index++) {
                        console.log(`tmdb_id : ${id.tmdb_id}`)
                        const checkCompany= await client.query(`
                        SELECT "tmdb_id"
                        FROM "production_company"
                        WHERE "tmdb_id"=$1
                        `,[movie.data.production_companies[index].id])
                        if (checkCompany.rowCount === 0){
                            await client.query(`
                                INSERT INTO "production_company" ("tmdb_id", "name", "logo", "iso_3166")
                                 VALUES ( $1, $2, $3, $4)
                            `,[movie.data.production_companies[index].id, movie.data.production_companies[index].name, movie.data.production_companies[index].logo_path, movie.data.production_companies[index].origin_country])
                            console.log(`${movie.data.production_companies[index].name} a été ajouté`)
                        }else{
                            console.log(`${movie.data.production_companies[index].name} est déjà dans la base`)
                        }
                    }
                
                
            }
            console.log("genre est à jour !!!!");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },        
}