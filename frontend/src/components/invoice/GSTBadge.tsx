interface GSTBadgeProps {

  verified: boolean | null;

}

export default function GSTBadge({

  verified,

}: GSTBadgeProps) {

  if (verified === true) {

    return (

      <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

        ✅ VERIFIED

      </span>

    );

  }

  if (verified === false) {

    return (

      <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">

        ❌ MISMATCH

      </span>

    );

  }

  return (

    <span className="rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">

      ⏳ PENDING

    </span>

  );

}
