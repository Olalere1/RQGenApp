const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.static("dist"));

// NGINX uses the PORT environment variable directly, no need to parse it
const PORT = process.env.PORT || 3000; // Set server port

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
