require('dotenv').config();
const client = require ('../db');
const axios = require('axios');
const ApiKey = process.env.TMDB_API_KEY;
const moment = require('moment');
const tools=require('./tools')
moment.locale('fr');

module.exports={
    addMovieById: async (id)=>{
        
        try{
            let result= await axios({
                method:"get",
                url:`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=fr-FR`
            })
            
            const datas={...result.data};
            //const releaseDate=moment(datas.release_date).format("YYYY");
            
            let profitabilityRatio;
            if((datas.revenue===0) || (datas.budget===0)){
                profitabilityRatio=0;
            } else {
                profitabilityRatio=Math.round((datas.revenue/datas.budget)*10)/10;
            }
            const supportId=6;
            let collectionId
            if( datas.belongs_to_collection){
                collectionId=datas.belongs_to_collection.id
                
                await tools.updateCollection(id)
            }
            
            
            const directorId = await tools.updateDirector(id)
            
            await client.query(`
            INSERT INTO "movie" ("title","tag_line","release_date","revenue",
                "budget","runtime","poster","overview","for_adult","tmdb_id",
                "profitability_ratio","support_id","director_id","collection_id")
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
            `,[datas.title,datas.tagline,datas.release_date,datas.revenue,datas.budget,datas.runtime,datas.poster_path,datas.overview,datas.adult,datas.id,profitabilityRatio,supportId,directorId,collectionId]) 
            
            await tools.updateOrigin(id, datas.production_countries);
            await tools.updateType(id, datas.genres);
            await tools.updateProduction(id,datas.production_companies);
            await tools.updatePlay(id);
            console.log(`${datas.title} a été ajouté dans movie`)

            




        } catch (error) {
            console.error(error);    
        }
    },
    
    
    updateMovieSupportID: async ()=>{
        try{
            const ids=[45,44,43,41,42,47,49,50,48]
            for (const id of ids){
                await client.query(`
                    DELETE FROM "movie"
                     WHERE "id" = $1
                `,[id])
                console.log(`mise à jour de ${id}`);
            }
            console.log("support_id est à jour");
        } catch (error) {
            console.error(error);    
        }

    },
    
    
    updateActor: async ()=>{
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
    updateGenre: async ()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr-FR`
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
    updateCompany: async ()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr-FR`
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
            console.log("production_company est à jour !!!!");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },
    updateCountry: async ()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr-FR`
                })
                
                for (let index = 0; index < movie.data.production_countries.length; index++) {
                        console.log(`tmdb_id : ${id.tmdb_id}`)
                        const checkCountry= await client.query(`
                        SELECT "name"
                        FROM "production_country"
                        WHERE "name"=$1
                        `,[movie.data.production_countries[index].name])
                        if (checkCountry.rowCount === 0){
                            await client.query(`
                                INSERT INTO "production_country" ("name", "iso_3166")
                                 VALUES ( $1, $2)
                            `,[movie.data.production_countries[index].name, movie.data.production_countries[index].iso_3166_1])
                            console.log(`${movie.data.production_countries[index].name} a été ajouté`)
                        }else{
                            console.log(`${movie.data.production_countries[index].name} est déjà dans la base`)
                        }
                    }
                
                
            }
            console.log("Les pays sont à jour !!!!");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },
    updateOrigin: async ()=>{
        try {
            
            const ids= await client.query(`
                SELECT "tmdb_id" from "movie"
            `)
            
                        
            for (const id of ids.rows) {
                
                let movie= await axios({
                    method:"get",
                    url:`https://api.themoviedb.org/3/movie/${id.tmdb_id}?api_key=${ApiKey}&language=fr-FR`
                })
                let countries=movie.data.production_countries;
                
                

                for (const country of countries) {
                    let countryIso = await client.query(`
                        SELECT "id","iso_3166"
                        FROM "production_country"
                        WHERE "iso_3166"=$1
                    `,[country.iso_3166_1])
                    let countryID = countryIso.rows[0].id
                    await client.query(`
                    INSERT INTO "origin" ("production_country_id","movie_id")
                         VALUES (${countryID},${id.tmdb_id})
                    `)
                    console.log(`{${countryID},${id.tmdb_id}} a été ajouté à ORIGIN`)
                }
                
            }
            console.log("ORIGIN est à jour !!!!");
            

          
            
        } catch (error) {
            console.error(error);    
        }

    },          
}