import {NextResponse} from "next/server";

export async function POST(req, res) {
  const body = JSON.parse(req.body);
  const errors = {};

  if(process.env.NEXT_PUBLIC_REACT_DISABLE_PAYMENT === 'true') {
    return NextResponse.json({error: 'Payment type disabled'}, {status: 400});
  }

  if (!("paymentType" in body)) {
    errors.paymentType = "Payment type is missing";
  }

  if (!("amount" in body)) {
    errors.amount = "Amount is missing";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({error: errors}, {status: 400});
  } else {
    if (body.paymentType === "subscription") {
      return NextResponse.json({url: `https://www.paypal.com/donate/?cmd=_donations&business=${process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_ID}&item_name=Monthly+Donation&currency_code=GBP&amount=${body.amount}&a3=25&p3=1&t3=M&src=1&sra=1`
    }, {status: 200});

    } else {
      return NextResponse.json({
        url: `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_ID}&amount=${body.amount}&currency_code=GBP&item_name=One-Time+Donation`
      }, {status: 200});
    }
  }
}
