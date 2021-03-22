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


    }
}