import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/user.context";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

function Register({ isOpen, onClose }: RegisterProps) {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const { login, register, handleGoogleSuccess } = useAuth();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const checkPasswordStrength = (password: string): string => {
    let strength = "";
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const score = [
      hasLowerCase,
      hasUpperCase,
      hasNumbers,
      hasSpecial,
      isLongEnough,
    ].reduce((acc, curr) => acc + (curr ? 1 : 0), 0);

    if (score === 5) {
      strength = "Strong";
    } else if (score >= 3) {
      strength = "Medium";
    } else {
      strength = "Weak";
    }

    return strength;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const fullName = formData.get("fullName") as string | null;
    const password = formData.get("password") as string | null;
    const email = formData.get("email") as string | null;

    if (!fullName || !password || !email) {
      console.error("Missing form data");
      return;
    }

    const newUser = {
      fullName,
      password,
      email,
    };

    try {
      await register(newUser);
      await login({ email, password });
      onClose(); // Close the dialog after successful registration and login
    } catch (error) {
      console.error("Registration or login failed:", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col text-center align-middle items-center">
          <GoogleLogin
            onSuccess={async (credentialResponse: CredentialResponse) => {
              if (credentialResponse.credential) {
                try {
                  await handleGoogleSuccess({
                    credential: credentialResponse.credential,
                  });
                  onClose(); // Close the dialog after successful login
                } catch (error) {
                  console.error("Google login failed:", error);
                }
              } else {
                console.error("Google credential is undefined");
              }
            }}
            onError={() => {
              console.error("Error working with Google");
            }}
          />
          <span className="mt-4">OR</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name:
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name here"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email:
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email here"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password:
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full"
                  placeholder="Enter your password here"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-sm ${
                    passwordStrength === "Strong"
                      ? "text-green-500"
                      : passwordStrength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Register</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
