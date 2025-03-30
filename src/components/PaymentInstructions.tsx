import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

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
  const sections = [
    {
      title: "Confirm Your Deposit Details",
      steps: [
        "Double-check your deposit amount and selected payment method.",
        `The minimum deposit is $10 (KES ${(10 * exchangeRate).toFixed(2)} equivalent).`
      ]
    },
    {
      title: "Initiate Payment",
      steps: [
        "Click \"Proceed to Payment\" to be redirected to Pesapal's secure payment gateway."
      ]
    },
    {
      title: paymentMethod === "card" ? "Card Payments (Visa/MasterCard Users)" : "Approve the Payment (Mobile Money Users)",
      steps: paymentMethod === "card" ? [
        "Follow the on-screen steps to enter your card details securely.",
        "Complete any verification steps required by your bank, such as OTP confirmation."
      ] : [
        "Keep your phone nearby – a payment prompt will appear.",
        `Enter your ${paymentMethod === "mpesa" ? "M-Pesa" : "Airtel Money"} PIN when prompted.`
      ]
    },
    {
      title: "Real-Time Payment Tracking",
      steps: [
        "Your payment status updates instantly on the Deposit Progress Tracker.",
        "If successful, your deposit is automatically credited to your account."
      ]
    },
    {
      title: "Need Help?",
      steps: [
        "If you do not receive a payment prompt, check your mobile network and retry.",
        "Contact Vertex Tradings Support if you experience any issues."
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white">Deposit Instructions – Vertex Tradings</h3>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <h4 className="text-lg font-medium text-white">{section.title}</h4>
            <ul className="space-y-2">
              {section.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start gap-2 text-white/70">
                  <Check className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentInstructions;