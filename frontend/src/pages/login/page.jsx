import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast, Toaster } from "sonner";
import { Mail, Lock, Loader } from "lucide-react";

import { useAuthStore } from "../../store/auth";

import Container from "../../components/ui/container";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";

export default function LoginPage() {
  const [newLogin, setNewLogin] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await login(newLogin.email, newLogin.password);

    if (!success) toast.error(message);
    else {
      setNewLogin({ email: "", password: "" });
      toast.success(message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <Container className="lg:max-w-sm space-y-6 px-4">
      <Toaster position="bottom-center" />

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6 text-center text-primary dark:text-foreground">
        Login
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 dark:text-foreground">
        {/* Email Input */}
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={setNewLogin.email}
          icon={Mail}
          iconClass="size-4"
          onChange={(e) => setNewLogin({ ...newLogin, email: e.target.value })}
        >
          Email
        </Input>

        {/* Password Input */}
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={setNewLogin.password}
          icon={Lock}
          iconClass="size-4"
          onChange={(e) =>
            setNewLogin({ ...newLogin, password: e.target.value })
          }
        >
          Password
        </Input>

        {/* fetch error  */}
        {error && (
          <p className="text-red-500 dark:text-foreground text-sm">{error}</p>
        )}

        <Button
          type="submit"
          className="bg-primary dark:bg-transparent dark:ring-1 dark:ring-foreground text-white w-full rounded-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </span>
          ) : (
            "Login"
          )}
        </Button>

        {/* Not Account */}
        <p className="text-gray-400 dark:text-gray-200 text-sm flex items-center gap-1">
          Have an account?
          <Link href="/signup">Sign up</Link>
        </p>
      </form>
    </Container>
  );
}
