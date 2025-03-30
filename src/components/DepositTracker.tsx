
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface DepositTrackerProps {
  status: string;
}

const DepositTracker = ({ status }: DepositTrackerProps) => {
  const steps = [
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "completed", label: "Completed" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);
  
  const getStepIcon = (stepId: string) => {
    if (status === "failed") {
      return stepId === "completed" ? (
        <XCircle className="h-6 w-6 text-red-500" />
      ) : stepId === status ? (
        <XCircle className="h-6 w-6 text-red-500" />
      ) : (
        <CheckCircle className="h-6 w-6 text-green-500" />
      );
    }
    
    if (stepId === status) {
      if (status === "pending") {
        return <Clock className="h-6 w-6 text-yellow-500" />;
      } else if (status === "processing") {
        return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      } else {
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      }
    } else if (steps.findIndex(s => s.id === stepId) < currentStepIndex) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else {
      return <Clock className="h-6 w-6 text-white/30" />;
    }
  };

  return (
    <Card className="p-6 glass-effect">
      <h3 className="text-2xl font-semibold text-white mb-6">Deposit Status</h3>
      
      <div className="space-y-6">
        {status === "failed" ? (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center text-white">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <p className="font-medium">Payment Failed</p>
              <p className="text-white/70 text-sm">There was an issue with your payment. Please try again.</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center mb-8 relative">
                <div className={`rounded-full flex items-center justify-center z-10 h-12 w-12 ${
                  status === "failed" && step.id === "completed" 
                    ? "bg-red-500/10 border border-red-500/30"
                    : step.id === status
                    ? status === "completed"
                      ? "bg-green-500/10 border border-green-500/30"
                      : status === "processing"
                      ? "bg-blue-500/10 border border-blue-500/30"
                      : "bg-yellow-500/10 border border-yellow-500/30"
                    : steps.findIndex(s => s.id === step.id) < currentStepIndex
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-white/5 border border-white/10"
                }`}>
                  {getStepIcon(step.id)}
                </div>
                
                <div className="ml-4">
                  <p className={`font-medium ${
                    status === "failed" && step.id === "completed"
                      ? "text-red-500"
                      : step.id === status
                      ? status === "completed"
                        ? "text-green-500"
                        : status === "processing"
                        ? "text-blue-500"
                        : "text-yellow-500"
                      : steps.findIndex(s => s.id === step.id) < currentStepIndex
                      ? "text-green-500"
                      : "text-white/50"
                  }`}>
                    {step.label}
                  </p>
                  
                  <p className="text-sm text-white/50">
                    {step.id === "pending" && "Waiting for your payment"}
                    {step.id === "processing" && "Verifying your payment"}
                    {step.id === "completed" && (status === "failed" ? "Payment could not be processed" : "Funds added to your account")}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`absolute left-6 top-12 h-8 w-0.5 ${
                    steps.findIndex(s => s.id === steps[index + 1].id) <= currentStepIndex
                      ? "bg-green-500/50" 
                      : "bg-white/10"
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DepositTracker;
