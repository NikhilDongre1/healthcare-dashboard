import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    title: "Streamline Patient Care",
    subtitle:
      "Manage your entire patient lifecycle from one unified dashboard.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
    title: "Data-Driven Insights",
    subtitle:
      "Real-time analytics to help you make smarter clinical decisions.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    title: "Built for Healthcare Teams",
    subtitle: "Collaborative tools designed for modern medical professionals.",
  },
];

interface FormErrors {
  email?: string;
  password?: string;
}

function validate(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email) errors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(email))
    errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.DASHBOARD, { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const errors = validate(email, password);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      void err;
    }
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              HealthCore
            </span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1.5">
            Welcome back
          </h1>
          <p className="text-text-secondary text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <Input
            label="Email address"
            type="email"
            placeholder="you@hospital.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formErrors.email)
                setFormErrors((p) => ({ ...p, email: undefined }));
            }}
            error={formErrors.email}
            leftIcon={<Mail size={16} />}
            fullWidth
            autoComplete="email"
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formErrors.password)
                setFormErrors((p) => ({ ...p, password: undefined }));
            }}
            error={formErrors.password}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="text-text-muted hover:text-text-primary transition-default"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            fullWidth
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-border accent-primary"
              />
              <span className="text-text-secondary">Remember me</span>
            </label>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isLoading}
            className="mt-1"
          >
            Sign in
          </Button>
        </form>

        <p className="mt-8 text-xs text-text-muted text-center">
          © {new Date().getFullYear()} HealthCore. All rights reserved.
        </p>
      </div>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-sidebar">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={[
              "absolute inset-0 flex flex-col transition-opacity duration-700",
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-sidebar/90 via-sidebar/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h2 className="text-2xl font-bold text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-sidebar-text text-sm leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-default z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-default z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={[
                "rounded-full transition-default",
                index === currentSlide
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
};
