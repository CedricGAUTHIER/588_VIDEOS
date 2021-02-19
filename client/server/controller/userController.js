const userDataMapper = require ('../dataMapper/userDataMapper');
module.exports={
    signUp: async(request, response) => {
        
        try {
            const userToAdd = {
                ...request.body,
                type:'user',};
            //vérification de la présence du pseudo            
            const pseudoAlreadyExist = await userDataMapper.checkPseudo(userToAdd.pseudo)
            if (pseudoAlreadyExist===0){
                await userDataMapper.addUser(userToAdd);
                response.json({signup:'done'});
            }else{
                response.json({signup:`${userToAdd.pseudo} existe déjà`})
            }
            
            
            
            
        }
         catch (error) {
            console.error(error);
        }
    }
}