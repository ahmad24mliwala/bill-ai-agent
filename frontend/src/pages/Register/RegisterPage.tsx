import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  register,
} from "../../api/auth";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>,
  ) {

    event.preventDefault();

    try {

      setLoading(true);

      await register({

        full_name: fullName,

        email,

        phone,

        password,

      });

      toast.success(
        "Account created successfully.",
      );

      navigate("/");

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail ??
          "Registration failed.",
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-blue-600">

          Create Account

        </h1>

        <p className="mb-8 text-center text-gray-500">

          Register to use AI Bill Processing System

        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Already have an account?

          <Link
            to="/"
            className="ml-2 font-semibold text-blue-600"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}
