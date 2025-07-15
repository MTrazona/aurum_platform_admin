import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signinAuthentication } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { saveToken } from "@/zustand/store/store.provider";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and Password are required.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const data = { identifier: username, password };
      const response = await signinAuthentication(data);

      if (response.jwt) {
        saveToken(response.jwt)
        console.log("Login successful:", response);
        navigate("/dashboard");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center text-white gap-2 text-center">
        <img src="/AurumPlatformText.svg" className="w-64 mb-4" alt="Logo" />
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to login to your account
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm text-white underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
