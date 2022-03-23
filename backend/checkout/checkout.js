const stripeApi = require('../stripe/stripe')

const createCheckoutSession = async (req, res) => {
    let { email, amount, paymentMethod, subscription } = req.body;
    try {
        if (!email || !amount || !paymentMethod || !subscription)
            return res.status(400).json({ status: 400, message: "All fields are required!" });
        amount = parseInt(amount);

        if (subscription === "onetime") {
            // One time payment code here
            const paymentIntent = await stripeApi.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "INR",
                receipt_email: email,
                description: "Payment for donation",
                payment_method: paymentMethod,
                confirm: true,
            });
            if (paymentIntent.status === "succeeded") {
                // Payment successful!
                return res.json({
                    status: 200,
                    message: "Payment Successful!",
                    id: paymentIntent.id,
                });
            }
            if (paymentIntent.status === "requires_action") {
                return res.json({
                    status: 200,
                    message: "3D secure required",
                    actionRequired: true,
                    id: paymentIntent.id,
                    clientSecret: paymentIntent.client_secret,
                });
            }
            return res.status(400).json({
                status: 400,
                message: "Payment failed!"
            });
        }

        if (subscription === "monthly") {
            // Recurring payment code here
            const price = await stripeApi.prices.create({
                unit_amount: Math.round(amount * 100),
                recurring: { interval: "month" },
                currency: "INR",
                product_data: {
                    name: "Recurring donation"
                }
            });
            const customer = await stripeApi.customers.create({
                email,
                description: "Donation customer",
                payment_method: paymentMethod,
                invoice_settings: {
                    default_payment_method: paymentMethod
                }
            });
            const subscribe = await stripeApi.subscriptions.create({
                customer: customer.id,
                items: [{ price: price.id }],
                expand: ["latest_invoice.payment_intent"]
            });
            if (
                subscribe.latest_invoice.payment_intent.status === "requires_action"
            ) {
                // proceed to 3ds
                return res.status(200).json({
                    status: 200,
                    message: "3D Secure required",
                    actionRequired: true,
                    clientSecret: subscribe.latest_invoice.payment_intent.client_secret,
                    id: subscribe.latest_invoice.payment_intent.id,
                    invoices: subscribe
                });
            }
            if (subscribe.latest_invoice.payment_intent.status === "succeeded") {
                return res.json({
                    status: 200,
                    message: "Payment successful!",
                });
            }
            return res.status(400).json({ status: 400, message: "Payment failed!" });
        }

        res.status(400).json({ status: 400, message: "Invalid type" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 200, message: "Internal server error" });
    }
}


module.exports = createCheckoutSession