import { ArrowLeft, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentInstructionsProps {
  paymentMethod: string;
  amount: string;
  referenceId: string;
  status: string;
  exchangeRate: number;
}

const PaymentInstructions = ({ 
  paymentMethod, 
  amount, 
  referenceId, 
  status,
  exchangeRate
}: PaymentInstructionsProps) => {
  const amountKES = (parseFloat(amount) * exchangeRate).toFixed(2);

  const getStatusMessage = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center text-white/70 mt-4">
            <Clock className="mr-2 h-5 w-5 text-yellow-400" />
            Awaiting your payment
          </div>
        );
      case "processing":
        return (
          <div className="flex items-center text-white/70 mt-4">
            <Clock className="mr-2 h-5 w-5 text-blue-400 animate-pulse" />
            Processing your payment
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center text-green-400 mt-4">
            <CheckCircle className="mr-2 h-5 w-5" />
            Payment received successfully
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center text-red-400 mt-4">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Payment failed. Please try again
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-white mb-6">Deposit Instructions – Vertex Tradings</h3>

      <div className="space-y-6">
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="space-y-6">
            <section>
              <h4 className="text-white text-lg mb-3">Confirm Your Deposit Details</h4>
              <ul className="space-y-2 text-white/70">
                <li>Double-check your deposit amount and selected payment method.</li>
                <li>The minimum deposit is $10 (KES equivalent).</li>
              </ul>
            </section>

            <section>
                <h4 className="text-white text-lg mb-3">Deposit Instructions</h4>
                <ul className="space-y-2 text-white/70">
                  <li>1. Enter your desired deposit amount (minimum $10)</li>
                  <li>2. Select your preferred payment method (M-Pesa, Airtel Money, or Card)</li>
                  <li>3. Fill in your personal details (name, email, phone number)</li>
                  <li>4. Click "Proceed to Payment" to initiate the transaction</li>
                  <li>5. For mobile money, you'll receive a prompt on your phone</li>
                  <li>6. Enter your PIN to confirm the payment</li>
                  <li>7. Wait for confirmation and your balance will update automatically</li>
                </ul>
              </section>

            {(paymentMethod === "mpesa" || paymentMethod === "airtel") && (
              <section>
                <h4 className="text-white text-lg mb-3">Approve the Payment (Mobile Money Users)</h4>
                <ul className="space-y-2 text-white/70">
                  <li>Keep your phone nearby – a payment prompt will appear.</li>
                  <li>Enter your {paymentMethod === "mpesa" ? "M-Pesa" : "Airtel Money"} PIN when prompted.</li>
                </ul>
              </section>
            )}

            {paymentMethod === "card" && (
              <section>
                <h4 className="text-white text-lg mb-3">Card Payments (Visa/MasterCard Users)</h4>
                <ul className="space-y-2 text-white/70">
                  <li>Follow the on-screen steps to enter your card details securely.</li>
                  <li>Complete any verification steps required by your bank, such as OTP confirmation.</li>
                </ul>
              </section>
            )}

            <section>
              <h4 className="text-white text-lg mb-3">Real-Time Payment Tracking</h4>
              <ul className="space-y-2 text-white/70">
                <li>Your payment status updates instantly on the Deposit Progress Tracker.</li>
                <li>If successful, your deposit is automatically credited to your account.</li>
              </ul>
            </section>

            <section>
              <h4 className="text-white text-lg mb-3">Need Help?</h4>
              <ul className="space-y-2 text-white/70">
                <li>If you do not receive a payment prompt, check your mobile network and retry.</li>
                <li>Contact Vertex Tradings Support if you experience any issues.</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="mr-2 h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-white/90 text-sm">
                Transaction Amount: <span className="text-white font-semibold">${amount} (KES {amountKES})</span><br />
                Reference ID: <span className="text-white font-semibold">{referenceId}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {getStatusMessage()}

      <div className="mt-6">
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="text-white border-white/20 hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Deposit Form
        </Button>
      </div>
    </div>
  );
};

export default PaymentInstructions;