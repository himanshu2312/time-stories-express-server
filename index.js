import express from "express";
// import https from "https"
import {getStories} from './scraper.js';

const app = express();
const PORT = process.env.PORT || 3000

app.get("/getTimeStories", async (req, res) => {
      try {
            const stories = await getStories();
            res.json(stories);
      } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
      }
})


app.listen(PORT, () => {
      console.log(`This server is running on port : ${PORT}`);
})