import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

export default function MerchantLogin() {
  const { role } = useSelector((s: RootState) => s.auth);
  const [store, setStore] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "merchant") {
      navigate("/dashboard/merchant");
    }
  }, [role, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !password)
      return setError("Store details and password are required");
    dispatch(login({ role: "merchant" }));
    navigate("/dashboard/merchant");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-section ">
        <div className="">
          <h1 className="h1 mb-2">Logo</h1>
          <h1 className=" mb-4 text-[#535353] text-[18px]">
            Merchant Into Your Account
          </h1>
        </div>
        <form onSubmit={submit} className="space-y-4 pt-[50px]">
          <div>
            <label className="labelText">Store Details</label>
            <input
              className="input"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="Store Name / ID"
            />
          </div>
          <div>
            <label className="labelText">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
