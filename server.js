const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour créer un paiement
app.post('/create-paiment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paimentIntent = await stripe.paimentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.status(200).send({
      clientSecret: paimentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
