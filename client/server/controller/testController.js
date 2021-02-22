const testDataMapper = require ('../dataMapper/testDataMapper');
module.exports={
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
    }
}