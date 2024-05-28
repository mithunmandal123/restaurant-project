require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors=require("cors");
const app = express();
app.use(cors());
app.use(express.json());



app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});
//get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("select * from restaurants where id =$1", [req.params.id]);
        res.status(200).json({
            status: "succes",
            data: {
                restaurant: results.rows[0],
            },
        });
        
    }
    catch (err) {
        console.log(err);
    }



});

//creating a restaurant

app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("insert into restaurants (name,location,price_range) values ($1,$2,$3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }

});


//update Restaurents
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
         const results = await db.query("update restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning id", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }

})

//Delete restaurante

app.delete("/api/v1/restaurants/:id", async(req, res) => {
try{
    const results = await db.query("delete from restaurants where id=$1",[req.params.id]);
    res.status(204).json({
        status: "success",
    });
}
catch(err){
console.log(err);
}
    
})
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on http://localhost:${port}`)

})