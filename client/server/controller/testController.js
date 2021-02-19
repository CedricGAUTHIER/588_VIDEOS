const testDataMapper = require ('../dataMapper/testDataMapper');
module.exports={
    deleteUser: async() => {
        
        try {
            testDataMapper.deleteUser(30);

            
            

            
            
            
        }
         catch (error) {
            console.error(error);
        }
    }
}