import type { TopVendor } from "../../api/dashboard";

interface TopVendorsProps {
  vendors: TopVendor[];
}

export default function TopVendors({
  vendors,
}: TopVendorsProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        🏆 Top Vendors
      </h2>

      {vendors.length === 0 ? (

        <p className="text-slate-500">
          No vendor data available.
        </p>

      ) : (

        <div className="space-y-4">

          {vendors.map((vendor, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div>

                <p className="font-semibold">
                  {vendor.vendor ?? "-"}
                </p>

                <p className="text-sm text-slate-500">
                  Vendor
                </p>

              </div>

              <span className="font-bold text-blue-600">
                ₹{vendor.amount.toLocaleString("en-IN")}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
