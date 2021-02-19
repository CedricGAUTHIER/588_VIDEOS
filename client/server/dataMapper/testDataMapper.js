const client = require ('../db');



module.exports={

    deleteUser: async(id)=>{
        try {
            await client.query(`
            DELETE FROM "user"
            WHERE "id"=$1
            `,[id]);
            console.log(`id ${id} effacé`)
            
        } catch (error) {
            
        }
    },
}
