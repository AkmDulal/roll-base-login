import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { approve, setContribution } from "../../redux/slices/dataSlice";
import { useMemo, useState } from "react";

export default function MerchantDashboard() {
  const { approvals, notifications } = useSelector((s: RootState) => s.data);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [rate, setRate] = useState<number>(3.5);

  const filtered = useMemo(
    () =>
      approvals.filter((approval) =>
        approval.customer.toLowerCase().includes(query.toLowerCase())
      ),
    [approvals, query]
  );

  return (
    <div className="space-y-6">
      <h1 className="h1">Merchant Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="h2 mb-3">Approve Purchases</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((aUser) => (
                <tr key={aUser?.id} >
                  <td>{aUser?.id}</td>
                  <td>{aUser?.customer}</td>
                  <td>{aUser?.amount}</td>
                  <td>{aUser?.status}</td>
                  <td className="!text-right">
                    <button
                      className="btn btn-primary !py-2"
                      disabled={aUser?.status === "approved"}
                      onClick={() => dispatch(approve(aUser?.id))}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="h2 mb-3">Lookup Customer</h2>
          <input
            className="input mb-2"
            placeholder="Search by name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="text-[12px] text-gray-600">
            Showing {filtered.length} result(s)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="h2 mb-3">Set Contribution Rate</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setContribution(rate));
            }}
            className="flex items-center gap-3"
          >
            <input
              className="input max-w-[140px]"
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
            <button className="btn btn-primary !py-2" type="submit">
              Update
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="h2 mb-3">Notifications</h2>
          <ul className="space-y-2 text-sm">
            {notifications.map((notification) => (
              <li key={notification?.id} className="rounded-lg border border-[#2222] p-2">
                {notification?.text}{" "}
                <span className="text-gray-500">
                  — {new Date(notification?.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
