import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div
          className="w-20 h-20 rounded-2xl bg-primary-light flex items-center
                        justify-center mb-6"
        >
          <AlertTriangle size={36} className="text-primary" />
        </div>

        <h1 className="text-7xl font-extrabold text-primary mb-2 leading-none">
          404
        </h1>
        <h2 className="text-xl font-semibold text-text-primary mb-3">
          Page not found
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or navigate back to safety.
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Button
            variant="secondary"
            leftIcon={<ArrowLeft size={15} />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
          <Button
            leftIcon={<Home size={15} />}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
