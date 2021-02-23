const testDataMapper = require ('../dataMapper/testDataMapper');
module.exports={
    updateMovieaddMovieById: async(request,response) => {
        
        try {
            await testDataMapper.updateMovieSupportID();
        }
         catch (error) {
            console.error(error);
        }
    },
    addMovieById: async(request,response) => {
        
        const tmdbId=request.body.id
        
        try {
            await testDataMapper.addMovieById(tmdbId);
        }
         catch (error) {
            console.error(error);
        }
    },
    updateDirector: async(request,response) => {
        
        try {
            //const tmdb_ids = await testDataMapper.updateMovie();
            await testDataMapper.updateDirector();
            //console.log("dans controller",tmdb_ids)

            
            //response.send(tmdb_ids);
            
        }
         catch (error) {
            console.error(error);
        }
    },
    updateCollection: async(request,response) => {
        
        try {
            //const tmdb_ids = await testDataMapper.updateMovie();
            await testDataMapper.updateCollection();
            //console.log("dans controller",tmdb_ids)

            
            //response.send(tmdb_ids);
            
        }
         catch (error) {
            console.error(error);
        }
    },
    updateActor: async(request,response) => {
        
        try {
            //const tmdb_ids = await testDataMapper.updateMovie();
            await testDataMapper.updateActor();
            //console.log("dans controller",tmdb_ids)

            
            //response.send(tmdb_ids);
            
        }
         catch (error) {
            console.error(error);
        }
    },
    updateGenre: async(request,response) => {
        
        try {
            await testDataMapper.updateGenre();
        }catch (error) {
            console.error(error);
        }
    },
    updateCompany: async(request,response) => {
        
        try {
            await testDataMapper.updateCompany();
        }catch (error) {
            console.error(error);
        }
    },
    updateCountry: async(request,response) => {
        
        try {
            await testDataMapper.updateCountry();
        }catch (error) {
            console.error(error);
        }
    },
    updateOrigin: async(request,response) => {
        
        try {
            await testDataMapper.updateOrigin();
        }catch (error) {
            console.error(error);
        }
    },
}