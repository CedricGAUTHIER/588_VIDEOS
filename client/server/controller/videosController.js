const videosDataMapper = require ('../dataMapper/videosDataMapper');
module.exports={
    allVideosVisitor: async(request, response) => {
        try {
            const allVideos = await videosDataMapper.getAllVideos();
            
            response.send(allVideos);
        }
         catch (error) {
            console.error(error);
        }
    }
}