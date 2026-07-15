import type { UserProfile } from "../../api/profile";

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({
  profile,
}: ProfileCardProps) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-xl font-bold">

        👤 Profile

      </h2>

      <div className="space-y-4">

        <div>

          <p className="text-sm text-slate-500">

            Full Name

          </p>

          <p className="font-semibold">

            {profile.full_name}

          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Email

          </p>

          <p className="font-semibold">

            {profile.email}

          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Phone

          </p>

          <p className="font-semibold">

            {profile.phone || "-"}

          </p>

        </div>

        <div>

          <p className="text-sm text-slate-500">

            Role

          </p>

          <p className="font-semibold">

            {profile.role}

          </p>

        </div>

      </div>

    </div>

  );

}
