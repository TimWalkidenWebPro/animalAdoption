
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const errors = {};

  if(process.env.NEXT_PUBLIC_REACT_DISABLE_PAYMENT === 'true') {
    return res.status(401).json({ errors: {'payment': 'payment currently disabled'} });
  }

  if (!("paymentType" in body)) {
    errors.paymentType = "Payment type is missing";
  }

  if (!("amount" in body)) {
    errors.amount = "Amount is missing";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
  } else {
    if (body.paymentType === "subscription") {
      res.json({
        url: `https://www.paypal.com/donate/?cmd=_donations&business=${process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_ID}&item_name=Monthly+Donation+to+Candy+Tibby+Trust&currency_code=GBP&amount=${body.amount}&a3=25&p3=1&t3=M&src=1&sra=1`
      })
    } else {
      res.json({
        url: `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_ID}&amount=${body.amount}&currency_code=GBP&item_name=One-Time+Donation`
      })
    }
  }
}
