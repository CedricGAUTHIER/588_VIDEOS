const videosDataMapper = require ('../dataMapper/videosDataMapper');
module.exports={
    allVideosVisitor: async(_,response) => {
        try {
            const allVideos = await videosDataMapper.getAllVideos();
            
            response.send(allVideos);
        }
         catch (error) {
            console.error(error);
        }
    },
    videoById: async (request, response) => {
        const id= request.params.id;
        
        try{
            const movieDetails= await videosDataMapper.getMovieDetailsById(id);
            response.send(movieDetails)
        }
        catch (error) {
            console.error(error);
        }


    },
    collectionById: async (request, response) => {
        const tmdbId = request.params.id;
        try{
            const collectionName = await videosDataMapper.getCollectionNameById(tmdbId);
            response.send(collectionName)
        }
        catch (error) {
            console.error(error);
        }

    }
}