const testDataMapper = require ('../dataMapper/testDataMapper');
module.exports={
    updateMovie: async(request,response) => {
        
        try {
            //const tmdb_ids = await testDataMapper.updateMovie();
            await testDataMapper.updateMovie();
            //console.log("dans controller",tmdb_ids)

            
            //response.send(tmdb_ids);
            
        }
         catch (error) {
            console.error(error);
        }
    }
}