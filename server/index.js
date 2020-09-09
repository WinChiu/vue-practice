const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/post");
app.use('/api/posts', posts);

//Handle production
if (process.env.NODE_ENV === 'production') { // If we deploy to heroku, this will be true
    app.use(express.static(__dirname + '/public'));

    // Hande SPA
    app.use(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    }); // Refer to any route at all
}


app.listen(PORT, () => console.log(`server running on port ${PORT}`));