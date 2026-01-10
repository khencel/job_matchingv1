"use client";
import { useState } from "react";
import { loginUser } from "@/redux/slices/login/authSlice";
import { showSuccessToast, showErrorToast, showWarningToast } from "@/app/(util)/toaster";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((s) => s.authState.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showErrorToast("Sign in failed", "Please fill in all fields");
      return;
    }
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      const verified_email = res.user.is_email_verified;
      const role = res.user.role;
      console.log(res);
      
      if (!verified_email) {
        showWarningToast("Sign in failed", "Please verify your email");
        return;
      }


      if (role === "employer") {
          router.push("/employer/overview");
      }

      if (role === "job_seeker") {
        router.push("/"); 
      }
  
       
      // router.push("/"); 
      showSuccessToast("Sign in successful", "Welcome back!");
    } catch (error) {
      console.log(error);
      showErrorToast("Sign in failed", "Invalid email or password");
    }
  };

  return (
    <div className="row m-0">
      <div className="col-md-7 left-content">
        <img src="/logo.png" width={400} alt="" />
      </div>
      <div className="col-md-5 d-flex align-items-center justify-content-center">
        <div className="w-75">
          <div className="input-group">
            <span className="input-group-text">
              <img
                src="/img/login/mail.png"
                alt="email"
                width="20"
                height="20"
              />
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>

          <div className="input-group mt-3">
            <span className="input-group-text">
              <img
                src="/img/login/padlock.png"
                alt="email"
                width="20"
                height="20"
              />
            </span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>
          <div className="mt-3 text-center">
            <div>
              <button
                disabled={loading}
                onClick={handleLogin}
                className="btn btn-primary-custom w-75 rounded-3"
              >
                Sign In
              </button>
            </div>

            <div className="mt-2">
              <span className="primary-text">Forgot Password?</span>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <span className="">Register As</span>

            <div className="row mt-2">
              <div className="col">
                <button className="btb btn-primary-custom rounded-3">
                  Job Seeker
                </button>
              </div>
              <div className="col">
                <button className="btb btn-primary-custom rounded-3">
                  Employer
                </button>
              </div>
              <div className="col">
                <button className="btb btn-primary-custom rounded-3">
                  Supervisory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
