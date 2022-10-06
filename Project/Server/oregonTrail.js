const express = require('express' );
const app = express();
const port = 1337;


app.use(express.static('Client/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './Client/views'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 