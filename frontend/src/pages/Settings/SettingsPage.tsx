import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";

import {
  getProfile,
} from "../../api/profile";

import type {
  UserProfile,
} from "../../api/profile";

import ProfileCard from "../../components/settings/ProfileCard";
import ChangePasswordCard from "../../components/settings/ChangePasswordCard";
import AboutCard from "../../components/settings/AboutCard";

export default function SettingsPage() {

  const [profile, setProfile] =
    useState<UserProfile>();

  const [loading, setLoading] =
    useState(true);

  async function loadProfile() {

    try {

      const data =
        await getProfile();

      setProfile(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to load profile."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadProfile();

  }, []);

  if (loading) {

    return (

      <Layout>

        <div className="rounded-2xl bg-white p-12 text-center shadow">

          Loading...

        </div>

      </Layout>

    );

  }

  if (!profile) {

    return (

      <Layout>

        <div className="rounded-2xl bg-white p-12 text-center shadow">

          Profile not found.

        </div>

      </Layout>

    );

  }

  return (

    <Layout>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">

            ⚙ Settings

          </h1>

          <p className="mt-2 text-gray-500">

            Manage your account information.

          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          <ProfileCard
            profile={profile}
          />

          <ChangePasswordCard />

        </div>

        <AboutCard />

      </div>

    </Layout>

  );

}
