/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, User, Store } from "lucide-react";

const registerSchema = z
  .object({
    username: z.string().min(3, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    shopNames: z
      .array(z.string().min(2, "Shop name must be at least 2 characters"))
      .min(3, { message: "At least 3 shop names are required" })
      .refine((shops) => new Set(shops).size === shops.length, {
        message: "Shop names must be unique",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [registerApi] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      shopNames: ["", "", ""], // Start with 3 inputs
    },
  });

  const { fields, append, remove } = useFieldArray<any, any>({
    control,
    name: "shopNames",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const registerData = { ...data };

      const result = await registerApi(registerData).unwrap();

      if (result?.data?.accessToken) {
        dispatch(
          setUser({
            user: result.data.user,
            token: result.data.accessToken,
          })
        );
        toast.success("Registration successful!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br  p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/80 shadow-2xl border-0 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Create an Account
          </CardTitle>
          <p className="text-center text-sm text-gray-500">
            Join us and start your journey 🚀
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  {...registerField("username")}
                  className="pl-10"
                  placeholder="ekramul123"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  {...registerField("email")}
                  className="pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  {...registerField("password")}
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type="password"
                  {...registerField("confirmPassword")}
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Shop Names */}
            <div>
              <Label>Shop Names</Label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...registerField(`shopNames.${index}`)}
                        className="pl-10"
                        placeholder={`Shop name ${index + 1}`}
                      />
                    </div>
                    {fields.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.shopNames && (
                <p className="text-sm text-red-500">
                  {errors.shopNames.message as string}
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append("")}
              >
                + Add Shop
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
