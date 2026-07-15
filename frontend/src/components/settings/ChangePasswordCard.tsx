import { useState } from "react";

import toast from "react-hot-toast";

import {
  changePassword,
} from "../../api/profile";

export default function ChangePasswordCard() {

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent,
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      await changePassword({

        current_password:
          currentPassword,

        new_password:
          newPassword,

      });

      toast.success(
        "Password updated."
      );

      setCurrentPassword("");

      setNewPassword("");

    } catch {

      toast.error(
        "Unable to update password."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-xl font-bold">

        🔐 Change Password

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value,
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >

          {

            loading
              ? "Updating..."
              : "Update Password"

          }

        </button>

      </form>

    </div>

  );

}
