const express = require('express')
const fs = require('fs')
const cors = require('cors')
const db = require('./database.json')

const port = 8080;
const app = express();

app.use(cors());
app.get('/api', (req, res) => {
    const id = req.query.id;

    if (db.hasOwnProperty(id)) {
        db[id] += 1;
    }
    else {
        db[id] = 1;
    }

    fs.writeFileSync('database.json', JSON.stringify(db));
    res.json({ count: db[id] });
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/api`);
})