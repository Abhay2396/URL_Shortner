import shortid from "shortid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" })
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistroy: [],
    });
    return res.render("home", {
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortdd = req.params.shortId;
    const result = await URL.findOne({ shortId: shortdd });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });

}

export {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}