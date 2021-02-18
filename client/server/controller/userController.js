const userDataMapper = require ('../dataMapper/userDataMapper');
module.exports={
    signUp: async(request, response) => {
        
        try {
            const userToAdd = {
                ...request.body,
                type:'user',};
            console.log(userToAdd);
            //vérifier si l'utilisateur existe déjà
            await userDataMapper.addUser(userToAdd);
            
            response.send("Utilisateur ajouté avec succès !!!");
        }
         catch (error) {
            console.error(error);
        }
    }
}