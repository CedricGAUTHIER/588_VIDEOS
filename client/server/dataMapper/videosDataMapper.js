const client = require ('../../server/db');
const moment = require('moment');
moment.locale('fr');

module.exports={

    getAllVideos: async()=>{
        const allVideos = await client.query(`
        SELECT "title","tag_line","release_date","overview","id","poster" 
        FROM "movie"
        ORDER BY "title" 
        `);

        
        
        
        
        return allVideos.rows
    }

}
