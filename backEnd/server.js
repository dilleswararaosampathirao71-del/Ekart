const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vinay123",
    database: "ecart"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});app.post("/addtocart", (req, res) => {

    const { name, price, image } = req.body;

    const checkQuery = "SELECT * FROM cart WHERE name = ?";

    db.query(checkQuery, [name], (err, result) => {

        if (result.length > 0) {

            const updateQuery = "UPDATE cart SET quantity = quantity + 1 WHERE name = ?";
            db.query(updateQuery, [name], () => {
                res.send("Quantity Updated");
            });

        } else {

            const insertQuery = "INSERT INTO cart (name, price, quantity, image) VALUES (?, ?, 1, ?)";
            db.query(insertQuery, [name, price, image], () => {
                res.send("Item Added");
            });
        }
    });
});
app.get("/cart", (req, res) => {
    db.query("SELECT * FROM cart", (err, result) => {
        res.json(result);
    });
});
app.put("/update/:id", (req, res) => {

    const { change } = req.body;

    const query = "UPDATE cart SET quantity = quantity + ? WHERE id = ?";
    db.query(query, [change, req.params.id], () => {
        res.send("Updated");
    });
});
app.delete("/delete/:id", (req, res) => {
    db.query("DELETE FROM cart WHERE id = ?", [req.params.id], () => {
        res.send("Deleted");
    });
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});