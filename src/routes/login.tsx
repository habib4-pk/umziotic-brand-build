import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import authBotanical from "@/assets/auth-botanical.jpg";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Welcome to Umziotic!");
    navigate({ to: "/" });
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Welcome to Umziotic!");
    navigate({ to: "/" });
  };

  return (
    <div className="section-x py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-card rounded-2xl shadow-lift overflow-hidden">
        {/* Left Panel */}
        <div className="p-8 lg:p-12">
          {/* Tabs */}
          <div className="flex border-b border-border mb-8">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-4 flex-1 text-center font-medium transition-colors ${
                activeTab === "login"
                  ? "border-b-2 border-gold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-4 flex-1 text-center font-medium transition-colors ${
                activeTab === "register"
                  ? "border-b-2 border-gold text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="field w-full"
                  placeholder="you@example.com"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-primary">
                    Password
                  </label>
                  <a href="#" className="text-xs text-gold hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="field w-full"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Login
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="btn-outline flex-1 flex items-center justify-center gap-2"
                >
                  <span className="font-semibold text-lg leading-none">G</span> Google
                </button>
                <button
                  type="button"
                  className="btn-outline flex-1 flex items-center justify-center gap-2"
                >
                  <span className="font-semibold text-lg leading-none">f</span> Facebook
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-gold hover:underline font-medium"
                >
                  Register
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="field w-full"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="field w-full"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="field w-full"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="field w-full"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Create Account
              </button>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-gold hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Right Panel */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <img
              src={authBotanical}
              alt="Botanical background"
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="font-display text-3xl text-white mb-2">
              Welcome to Umziotic
            </h2>
            <p className="text-primary-foreground/80 text-sm">
              Your wellness journey starts here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
