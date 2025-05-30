require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = (
  name,
  email,
  itemsArray,
  socialPriceInPennies
) => {
  const metadataObject = {};
  if (!itemsArray.length) {
    throw new RangeError(
      "The incoming array must have a length of more than 0"
    );
  }
  let itemId = 1;
  return stripe.checkout.sessions.create({
    line_items: itemsArray.map((item) => {
      metadataObject[`itemId${itemId}`] = item.id;
      itemId++;
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
    success_url: `${process.env.FRONT_END_HOST}/social?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONT_END_HOST}`,
    customer_email: email,
    metadata: metadataObject,
  });
};

const retreiveCheckoutSession = (sessionId) => {
  return stripe.checkout.sessions
    .retrieve(sessionId, {
      expand: ["line_items"],
    })
    .then(({ customer_details, metadata }) => {
      return {
        customer_details,
        metadata,
      };
    });
};

module.exports = { createCheckoutSession, retreiveCheckoutSession };
