require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = (
  name,
  email,
  itemsArray,
  socialPriceInPennies
) => {
  if (!itemsArray.length) {
    throw new RangeError(
      "The incoming array must have a length of more than 0"
    );
  }
  return stripe.checkout.sessions.create({
    line_items: itemsArray.map((item) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
          },
          unit_amount: socialPriceInPennies,
        },
        quantity: 1,
      };
    }),

    mode: "payment",
    // Change the success and cancel URLs later
    success_url: `${process.env.FRONT_END_HOST}/social?session_id={CHECKOUT_SESSION_ID}&name=${name}&email=${email}`,
    cancel_url: `${process.env.FRONT_END_HOST}`,
  });
};

module.exports = { createCheckoutSession };
