import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

export default function TopNav() {
  const { role, token } = useSelector((s: RootState) => s.auth);
  console.log(role);
  
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    nav("/login/admin");
  };

  return (
    <nav className="sticky top-0 z-10 shadow-soft-nav bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-3">
        <Link to="/" className="text-lg font-semibold">
          Logo
        </Link>
        <div className="flex items-center gap-5 text-sm group">
          <NavLink
            to="/login/admin"
            className={({ isActive }) =>
              `hover:text-blue-600 px-[10px] ${isActive ? "text-blue-600 font-semibold" : ""}`
            }
          >
            Admin
          </NavLink>

          <NavLink
            to="/login/merchant"
            className={({ isActive }) =>
              `hover:text-blue-600 px-[10px] ${isActive ? "text-blue-600 font-semibold" : ""}`
            }
          >
            Merchant
          </NavLink>

          <NavLink
            to="/login/member"
            className={({ isActive }) =>
              `hover:text-blue-600 px-[10px] ${isActive ? "text-blue-600 font-semibold" : ""}`
            }
          >
            Member
          </NavLink>
          {token && (
            <div className="ml-3 flex items-center gap-2">
              <Link to={role === "merchant" ? "/dashboard/merchant" : role === "admin" ? "/dashboard/admin" : role === "member" ? "/dashboard/member" : "/"}className="btn !rounded-full !bg-gray-100 capitalize !px-[20px]">
          {role}
        </Link>
              <button
                onClick={handleLogout}
                className="btn btn-primary !rounded-full !px-[30px]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
