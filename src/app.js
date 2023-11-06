import express from "express";
import open_routes from "./routes/open_routes.js";
import routes from "./routes/routes.js";
import cors from 'cors';

let app = express();

app.use(cors(), express.json(), open_routes, routes);

app.listen("3000", () => {
    console.log("app running");
})