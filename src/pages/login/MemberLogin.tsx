import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

export default function MemberLogin() {
    const { role } = useSelector((s: RootState) => s.auth);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

   useEffect(() => {
      if (role === "member") {
        navigate("/dashboard/member");
      }
    }, [role, navigate]);

  const sendOtp = () => {
    if (!identifier) return setError("Phone or Email is required to send OTP");
    setError(null);
    setOtpSent(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return setError("Phone/Email required");
    if (!password && !otp) return setError("Provide Password or OTP");
    dispatch(login({ role: "member" }));
    navigate("/dashboard/member");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-section ">
        <div className="">
          <h1 className="h1 mb-2">Logo</h1>
          <h1 className=" mb-4 text-[#535353] text-[18px]">
            Member Into Your Account
          </h1>
        </div>

        <form onSubmit={submit} className="space-y-4 pt-[50px]">
          <div>
            <label className="labelText">Phone / Email</label>
            <input
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <label className="labelText">Password (or use OTP)</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {otpSent && (
            <div>
              <label className="mb-1 block text-sm">OTP</label>
              <input
                className="input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button type="button" onClick={sendOtp} className="underline cursor-pointer">
              Send OTP
            </button>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
