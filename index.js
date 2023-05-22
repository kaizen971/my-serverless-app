const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

app.post('/sendmail', async (req, res) => {
    let { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

// Export your server for Vercel
module.exports = serverless(app);
