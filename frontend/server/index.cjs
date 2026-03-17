const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

/* TEST */
app.get("/", (req, res) => {
  res.json({ message: "Server running 🚀" });
});

/* SIMPLE BG REMOVE (OWN CODE) */
app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {

    const input = fs.readFileSync(req.file.path);

    const img = sharp(input);

    const { data, info } = await img
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = data;

    for (let i = 0; i < pixels.length; i += 3) {

      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // remove white background
      if (r > 240 && g > 240 && b > 240) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
      }

    }

    const output = await sharp(pixels, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 3
      }
    })
      .png()
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(output);

  } catch (err) {

    console.log(err);
    res.status(500).json({ error: "Background remove failed" });

  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});