const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"bdytsjj6qosstkmtc3cd-mysql.services.clever-cloud.com",
    user:"ukbrzywwu48dyowb",
    password:"HhBbQjpH0hmvEodTVsz8",
    database:"bdytsjj6qosstkmtc3cd"
})

app.get('/',(req,res)=>{
    // console.log("get")
    const sql="SELECT Ename, Eid, Edept, DATE_FORMAT(Edob, '%d-%m-%Y') as Edob, Egender, Edesign, Esalary, Eaddress, Elocation, Epincode, Eexperience, Eage FROM Employee"; // Using DATE_FORMAT to format the date
    db.query(sql,(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
})
// ipo poi add pannu
app.post('/Homenew', (req, res) => {
    console.log("postdata");  
    console.log("req-post:", req.body);  
    const sql = "INSERT INTO Employee (Ename, Eid, Edept, Edob, Egender, Edesign, Esalary, Eaddress, Elocation, Epincode, Eexperience, Eage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        
        req.body.Ename,
        req.body.Eid,
        req.body.Edept,
        req.body.Edob,
        req.body.Egender,
        req.body.Edesign,
        req.body.Esalary,
        req.body.Eaddress,
        req.body.Elocation,
        req.body.Epincode,
        req.body.Eexperience,
        req.body.Eage,
    ];
    console.log("completed");

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("created");
    });
    res.status(200).send({message:"created"}); //Done
});

  
app.delete('/:Eid', (req, res, next) => {
    const sql = "DELETE FROM Employee WHERE Eid= ?";
    const Eid=req.params.Eid;

    db.query(sql, [Eid], (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log("deleted");
    });
});


app.post('/update/:Eid',(req,res)=>{
    const sql= "UPDATE Employee SET Ename=?, Edept=?, Edob=?, Egender=?, Edesign=?, Esalary=?, Eaddress=?, Elocation=?, Epincode=?, Eexperience=?, Eage=? WHERE Eid=?";
    const Eid=req.params.Eid;
    db.query(sql,[req.body.Ename, req.body.Edept, req.body.Edob, req.body.Egender, req.body.Edesign, req.body.Esalary, req.body.Eaddress, req.body.Elocation, req.body.Epincode, req.body.Eexperience, req.body.Eage,Eid],(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            res.status(200).json(data);
        }
    })
})



app.listen(8081, ()=>{
    console.log("Listening...");
})