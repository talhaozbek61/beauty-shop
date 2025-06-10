import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast, Toaster } from "sonner";
import { User, Mail, Lock, Loader } from "lucide-react";

import { useAuthStore } from "../../store/auth";

import Container from "../../components/ui/container";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";

export default function Page() {
  const [newSignUp, setNewSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await signup(
      newSignUp.name,
      newSignUp.email,
      newSignUp.password
    );

    if (!success) toast.error(message);
    else {
      setNewSignUp({ name: "", email: "", password: "" });
      toast.success(message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <Container className="lg:max-w-sm space-y-6 px-4">
      <Toaster position="bottom-center" />

      <h1 className="text-2xl font-semibold mb-6 text-center text-primary dark:text-foreground">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 dark:text-foreground">
        {/* Name Input */}
        <Input
          name="name"
          placeholder="Name"
          type="text"
          value={newSignUp.name}
          icon={User}
          iconClass="size-4"
          onChange={(e) => setNewSignUp({ ...newSignUp, name: e.target.value })}
        >
          Name
        </Input>

        {/* Email Input */}
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={newSignUp.email}
          icon={Mail}
          iconClass="size-4"
          onChange={(e) =>
            setNewSignUp({ ...newSignUp, email: e.target.value })
          }
        >
          Email
        </Input>

        {/* Password Input */}
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={newSignUp.password}
          icon={Lock}
          iconClass="size-4"
          onChange={(e) =>
            setNewSignUp({ ...newSignUp, password: e.target.value })
          }
        >
          Password
        </Input>

        {/* fetch error  */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
            "Sign Up"
          )}
        </Button>

        {/* Not Account */}
        <p className="text-gray-400 text-sm flex items-center gap-1">
          Don't have an account?
          <Link href="/login">Login</Link>
        </p>
      </form>
    </Container>
  );
}
