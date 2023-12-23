const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', cors(), async (req, res) => {
    res.send('How');
});

app.post("/post_name" , cors(), async (req, res) => {
    const name = req.body.name;
    console.log(name);
    res.json({ name });
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
