const catchAsync = require("../utilities/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

exports.payment = catchAsync(async (req, res) => {
  // console.log(req.body);

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.tokenId,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    customer: customer.id,
  });

  res.status(200).json(paymentIntent);
});