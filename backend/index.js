const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const stripe = require('stripe')('sk_test_dGlEta8NtrfaEe1jl6kuZzlm00oCaR83gF');
const stripe = require('stripe')('sk_test_51GsJEqALCR9ctSLfdYOmdYYjp1ELZljfwA1ZDOIbovzJYYMKNgiwvTDOhapJDQlqFHJ01Xu5C6Ca0AJ1jM1NlnHm00fM0ZxL0L');


const port = 3001

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors({ origin: '*' }));

app.post('/api/payment', async (req, res) => {
    // const {email, amount, cartItems} = req.body;
    const { amount, email } = req.body;
    console.log(req.body)
    const amnt = parseInt(amount) * 100;
    // const amount_ = parseInt(amount);
    // const amountN = Math.round(amount_ * 100)

    console.log(amnt)
    try {
        const paymentCharge = await stripe.charges.create({
                amount: amnt,
                currency: 'usd',
                source: req.body.token,
                description: "shipping",
                receipt_email: email,
            });
            console.log('resdata ', paymentCharge);
            res.json({'payment_result': paymentCharge});

    } catch (err) {
        console.log('resdata', err);
        res.json({'payment_result': err});

    }


    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amnt,
    //     currency: 'USD',
    //     // Verify your integration in this guide by including this parameter
    //     metadata: {integration_check: 'accept_a_payment'},
    //     receipt_email: email,
    // });

    // res.json({'client_secret': paymentIntent['client_secret']})

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))