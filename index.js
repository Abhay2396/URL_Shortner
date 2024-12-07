import express from 'express';
import mongoose from 'mongoose';
import { connectToMongoDB } from './connect.js';
import urlRoute from './routes/url.js';
import URL from './models/url.js';
import staticRoute from './routes/staticRouter.js';
import path from 'path'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use('/url', urlRoute);
app.get('/url/:shortId', async (req, res) => {
    const shortid = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortid
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            }
        }
    });
    res.redirect(entry.redirectURL);
});
app.use('/', staticRoute);

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => { console.log("DB is connected sucessfull") })
app.listen(5000, () => {
    console.log("server is running on this port 5000");
})