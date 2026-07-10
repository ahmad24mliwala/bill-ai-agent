export default function InvoiceTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            {[
              "Invoice",
              "Vendor",
              "Amount",
              "GST",
              "Date",
            ].map((heading) => (
              <th
                key={heading}
                className="px-6 py-4 text-left"
              >
                {heading}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {[1, 2, 3, 4, 5].map((row) => (

            <tr
              key={row}
              className="border-b"
            >

              {[1, 2, 3, 4, 5].map((col) => (

                <td
                  key={col}
                  className="px-6 py-5"
                >

                  <div className="h-5 animate-pulse rounded bg-slate-200" />

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
