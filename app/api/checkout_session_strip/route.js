import {NextResponse} from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const priceId = {
  '5': process.env.NEXT_PUBLIC_STRIPE_FIVE_MONTH,
  '10': process.env.NEXT_PUBLIC_STRIPE_TEN_MONTH,
  '20': process.env.NEXT_PUBLIC_STRIPE_TWENTY_MONTH,
}

export async function POST(request) {
  if(process.env.NEXT_PUBLIC_REACT_DISABLE_PAYMENT === 'true') {
    return NextResponse.json({error: 'Payment type disabled'}, {status: 400});
  }
  const body = await request.json();
  const errors = {};
  if (!("paymentType" in body)) {
    errors.paymentType = "Payment type is missing";
  }

  if (!("amount" in body)) {
    errors.amount = "Amount is missing";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({error: errors}, {status: 400});

  } else {
    try {
      let paymentDetails = null;
      if (body.paymentType === "payment") {
        paymentDetails = {
          line_items: [
            {
              price_data: {
                currency: "GBP",
                tax_behavior: "exclusive",
                unit_amount: body.amount * 100,
                product_data: {
                  name: `One-Off Donation of £${body.amount}  to Support Cats in Need`,
                  tax_code: "txcd_10000000",
                  description: `One-off donation of £${body.amount} to support Candy and Tibby Trust. This contribution helps provide food, medical care, and shelter for cats in need, ensuring they receive the love and protection they deserve`
                },
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        }
      } else if (priceId[body.amount]) {
        paymentDetails = {
          payment_method_types: ['card'],
          mode: 'subscription', // Mode for recurring payments
          line_items: [
            {
              price: priceId[body.amount], // Use the price ID from Stripe
              quantity: 1,
            },
          ],
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        }
      } else {
        const product = await stripe.products.create({
          name: `Recurring Donation - £${body.amount}`,
          description: `Monthly recurring donation - £${body.amount}`,
        });

        const price = await stripe.prices.create({
          unit_amount: body.amount,
          currency: 'GBP',
          recurring: { interval: 'month' },
          product: product.id,
        });

        paymentDetails = {
          payment_method_types: ['card'],
          mode: 'subscription',
          line_items: [
            {
              price: price.id, // Use the dynamically created price
              quantity: 1,
            },
          ],
          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        }
      }

      const session = await stripe.checkout.sessions.create(
          paymentDetails
      );

      return NextResponse.json({url: session.url}, {status: 200});

    } catch (err) {
      console.log(err.message);
      return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
  }
}
