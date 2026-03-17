const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/refund", upload.single("image"), async (req, res) => {

try {

const userEmail = req.body.email;
const message = req.body.message;
const file = req.file;

const transporter = nodemailer.createTransport({

service: "gmail",

auth: {
user: "aiimagegenerate0@gmail.com",
pass: "ucczwpvlqdlpnpli"
},
tls: {
    rejectUnauthorized: false
}
});

await transporter.sendMail({

from: `"Refund User" <${userEmail}>`,

to: "aiimagegenerate0@gmail.com",

replyTo: userEmail,

subject: `Refund Request from ${userEmail}`,

text: `Refund Request

User Email: ${userEmail}

Issue:
${message}
`,

attachments: [
{
filename: file.originalname,
path: file.path
}
]

});

res.json({ status: "success" });

} catch (error) {

console.log(error);

res.json({ status: "error" });

}

});

app.listen(5000, () => {

console.log("Refund server running on http://localhost:5000");

});