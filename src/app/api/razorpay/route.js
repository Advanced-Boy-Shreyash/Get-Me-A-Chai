import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        await connectDB();

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        
        // Check for razorpay id on server
        let paymentRecord = await Payment.findOne({ oid: razorpay_order_id });
        if (!paymentRecord) {
            return NextResponse.json({ success: false, message: "Order Id not Found" });
        }
        
        let user= await User.findOne({username: paymentRecord.to_user})

        const isValid = validatePaymentVerification(
            {
                'order_id': razorpay_order_id,
                'payment_id': razorpay_payment_id
            },
            razorpay_signature,
            user.razrpaySecret
        );

        if (isValid) {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    done: true
                },
                { new: true }
            );

            return NextResponse.json({
                success: true,
                message: "Payment verified successfully",
                redirectUrl: `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
            });
        } else {
            return NextResponse.json({ success: false, message: "Payment Verification Failed" });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
};
