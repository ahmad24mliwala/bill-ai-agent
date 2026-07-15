import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { login } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {

  const navigate = useNavigate();

  const { login: saveToken } = useAuth();

  const [email, setEmail] =
    useState("ahmad@example.com");

  const [password, setPassword] =
    useState("Ahmad@123");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
  ) {

    event.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response =
        await login({

          email,

          password,

        });

      saveToken(
        response.access_token,
      );

      navigate("/dashboard");

    } catch (err: any) {

      console.error(err);

      setError(

        err?.response?.data?.detail ??

        "Invalid email or password."

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-blue-600">

            🤖 AI Bill Processing

          </h1>

          <p className="mt-2 text-gray-500">

            Sign in to continue

          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">

              Email

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              placeholder="Enter your password"
              className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {error && (

            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              {error}

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >

            {

              loading

                ? "Signing In..."

                : "Login"

            }

          </button>

        </form>

        <div className="mt-6 border-t pt-6 text-center">

          <p className="text-sm text-gray-600">

            Don't have an account?

          </p>

          <Link
            to="/register"
            className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-800"
          >

            Create New Account

          </Link>

        </div>

      </div>

    </div>

  );

}
