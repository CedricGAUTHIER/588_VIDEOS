const client = require ('../db');
const moment = require('moment');
moment.locale('fr');
const bcrypt =require ('bcrypt'); 
const saltRound=10; 

module.exports={

    checkPseudo: async(pseudo)=>{
        try {
            const existPseudo = await client.query(`
            SELECT "pseudo"
            FROM "user"
            WHERE "pseudo"=$1
            `,[pseudo]);
            
            return existPseudo.rowCount
        } catch (error) {
            
        }
    },
    addUser: async(newUser)=>{
        try{
            const userAdded=await client.query(`
            INSERT INTO "user" ("pseudo","email","password","type","email_alert")
            VALUES ($1,$2,$3,$4,$5)`,[newUser.pseudo,newUser.email,bcrypt.hashSync(newUser.password,saltRound),newUser.type,newUser.email_alert]);
            return userAdded
        } catch (error){
            console.trace(moment().format('LLLL'),error);
            Response.status(500).send(error);
        }
    }

}
