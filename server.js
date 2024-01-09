const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const sharp = require("sharp");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;



const supabaseUrl = 'https://dllyuzcfpenlevizsoly.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = process.env.SUPABASE_KEY; // Replace with your Supabase project key
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());

app.get('/images/:imageName', async (req, res) => {
    try {
        const { data: file, error } = await supabase
            .storage
            .from('imageAssets')
            .download(`public/${req.params.imageName}`,  {buffer: true});

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

        if (error || !file) {
            console.error('Supabase Storage API Error:', error);
            return res.status(404).json({ error: `${req.params.imageName} Image not found` });
        }

        console.log('Downloaded File Information:', typeof file, file);

        const imgWidth = req.query.width || 800;
        const imageResized = await sharp(buffer)
        .resize({ width: imgWidth })
        .toBuffer();

        res.setHeader('Content-Type', 'image/*');
        res.setHeader('Content-Length', imageResized.length);
        res.end(imageResized);

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});