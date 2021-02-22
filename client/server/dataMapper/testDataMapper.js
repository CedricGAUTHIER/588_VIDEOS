const client = require ('../db');



module.exports={

    updateMovie: async()=>{
        try {
            
            
            const revenue = await client.query(`
                SELECT "revenue"
                  FROM "movie"
                `);
            //console.log(revenue.rows);
            const budget = await client.query(`
            SELECT "budget"
              FROM "movie"
            `);
            const ids = await client.query(`
            SELECT "id"
              FROM "movie"
            `);
            console.log(ids.rows);


            
            const revenueArray=[];
            revenue.rows.forEach(revenue => {
                const revenueValue=revenue.revenue
                revenueArray.push(revenueValue)
                
            });
            
            //console.log(revenueArray);
            
            const budgetArray=[];
            budget.rows.forEach(budget => {
                const budgetValue=budget.budget
                budgetArray.push(budgetValue)
                
            });
            
            //console.log(budgetArray);

            const idArray=[];
            ids.rows.forEach(id => {
                const idValue=id.id
                idArray.push(idValue)
                
            });
            
            //console.log(idArray);

            const ratioArray=[]
            revenueArray.forEach((movie,index)=> {
                if((movie!==0) && (budgetArray[index]!==0)){
                    ratioArray.push(Math.round((movie/budgetArray[index])*10)/10)
                } else {
                    ratioArray.push("non communiqué");
                }
            })

            const datas=[];
            revenueArray.forEach((objet, index) => {
                datas.push({
                    id: idArray[index],
                    revenue: objet,
                    budget: budgetArray[index],
                    ratio: ratioArray[index]
                 })
            })

            console.log(datas);
            
            for (const data of datas) {
                if(data.ratio !=="non communiqué"){
                    const updating=await client.query(`
                    UPDATE "movie"
                    SET "profitability_ratio"=$1, "updated_at"=CURRENT_TIMESTAMP
                    WHERE id=$2
                    `,[data.ratio,data.id])
                }
            }
            //const revenue = await client.query(`
            //    UPDATE "movie"
            //        SET "support_id"='2',"updated_at"=CURRENT_TIMESTAMP
            //        WHERE "tmdb_id"=${id}
            //    `);
        
            
            //(revenue/budget)*100     
            
        } catch (error) {
                console.error(error);    
                }
            },

        
}