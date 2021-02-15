const client = require ('../../server/db');

module.exports={

    getAllVideos: async()=>{
        const allVideos = await client.query(`
        SELECT "title","subtitle","release_date","overview","id" 
        FROM "content"
        
        `);
        
        return allVideos.rows
    }

}
