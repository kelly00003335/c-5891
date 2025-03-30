
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
      <h3 className="text-2xl font-semibold text-white mb-6">Payment Instructions</h3>
      
      {paymentMethod === "mpesa" && (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white text-lg mb-4">How to Pay with M-Pesa</h4>
            <ol className="space-y-3 text-white/70 list-decimal ml-5">
              <li>Go to M-Pesa on your phone</li>
              <li>Select "Lipa na M-Pesa"</li>
              <li>Select "Pay Bill"</li>
              <li>Enter Business Number: <span className="text-white font-medium">174800</span></li>
              <li>Enter Account Number: <span className="text-white font-medium">{referenceId}</span></li>
              <li>Enter Amount: <span className="text-white font-medium">KES {amountKES}</span></li>
              <li>Enter your M-Pesa PIN and confirm</li>
              <li>You will receive an SMS confirmation from M-Pesa</li>
            </ol>
          </div>
          
          <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-white/90 text-sm">
                  Important: Please use the exact account number <span className="text-white font-semibold">{referenceId}</span> for this transaction to ensure it is correctly linked to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === "airtel" && (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white text-lg mb-4">How to Pay with Airtel Money</h4>
            <ol className="space-y-3 text-white/70 list-decimal ml-5">
              <li>Dial *222# on your Airtel line</li>
              <li>Select "Make Payments"</li>
              <li>Select "Pay Bill"</li>
              <li>Enter Business Name or Number: <span className="text-white font-medium">VERTEX</span></li>
              <li>Enter Reference Number: <span className="text-white font-medium">{referenceId}</span></li>
              <li>Enter Amount: <span className="text-white font-medium">KES {amountKES}</span></li>
              <li>Confirm the payment with your Airtel Money PIN</li>
              <li>You will receive a confirmation message</li>
            </ol>
          </div>
          
          <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-white/90 text-sm">
                  Important: Please use the exact reference number <span className="text-white font-semibold">{referenceId}</span> for this transaction to ensure it is correctly linked to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === "card" && (
        <div className="space-y-6">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-white text-lg mb-4">Credit Card/Visa Payment</h4>
            <p className="text-white/70 mb-4">
              You will be redirected to our secure payment gateway powered by Pesapal to complete your payment.
            </p>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                Secure SSL encrypted payment
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                Supported cards: Visa, Mastercard, American Express
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                No additional fees
              </li>
            </ul>
            
            <div className="mt-4">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Proceed to Secure Payment
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="mr-2 h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-white/90 text-sm">
                  You will be charged <span className="text-white font-semibold">${amount} (KES {amountKES})</span> on your card statement. The transaction reference will be <span className="text-white font-semibold">VERTEX-{referenceId}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
