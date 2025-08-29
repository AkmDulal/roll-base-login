import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function AdminDashboard() {
  const { users, merchants } = useSelector((state: RootState) => state.data);
  console.log(merchants, "usersusersusersusers");

  return (
    <div className="space-y-6">
      <h1 className="h1">Admin Dashboard</h1>

      <div className="card">
        <h2 className="h2 mb-3">Manage Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((uList) => (
              <tr key={uList?.id}>
                <td>{uList?.id}</td>
                <td>{uList?.name}</td>
                <td>{uList?.email}</td>
                <td
                  className={`
        font-semibold capitalize 
        ${uList.role === "admin" ? "text-yellow-700 " : ""}
        ${uList.role === "merchant" ? "text-blue-600" : ""}
        ${uList.role === "member" ? "text-green-600" : ""}
      `}
                >
                  {uList?.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="h2 mb-3">Merchants</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Store</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {merchants.map((mList) => (
              <tr key={mList.id}>
                <td>{mList.id}</td>
                <td>{mList.storeName}</td>
                <td>{mList.owner}</td>
                <td
                  className={`
        font-semibold capitalize 
        ${mList.status === "pending" ? "text-red-700 " : ""}
        ${mList.status === "active" ? "text-blue-600" : ""}
      `}
                >
                  {mList.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
