import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

export default function AdminLogin() {
  const { role } = useSelector((s: RootState) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard/admin");
    }
  }, [role, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Email and password are required");
    dispatch(login({ role: "admin" }));
    navigate("/dashboard/admin");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-section ">
        <div className="">
          <h1 className="h1 mb-2">Logo</h1>
          <h1 className=" mb-4 text-[#535353] text-[18px]">
            Admin Into Your Account
          </h1>
        </div>
        <form onSubmit={submit} className="space-y-4 pt-[50px]">
          <div>
            <label className="labelText">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="labelText">
              Password
            </label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
