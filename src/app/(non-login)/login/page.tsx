
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/login/authSlice";
import type { RootState, AppDispatch } from "@/redux/store/index";
import { showSuccessToast, showErrorToast } from "@/app/(util)/toaster";
import { useRouter } from "next/navigation";

export default function Login() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
    const { loading, isAuthenticated} = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
      if (!email.trim() || !password.trim()) {
        showErrorToast("Sign in failed", "Please fill in all fields");
        return;
      }
      try{ 
          await dispatch(loginUser({ email, password })).unwrap();
          
      } catch(error){
          showErrorToast("Sign in failed","Invalid email or password")
      }
      
    };


    useEffect(() => {
      if(isAuthenticated){
        console.log("User is authenticated, redirecting...");
        showSuccessToast("Sign in successful","You have successfully signed in")
        // You can use Next.js router to redirect
        router.push("/employer/post_a_job/job-information"); // Example redirect
      }
    }, [isAuthenticated]);



  
    return (
        <div className="row m-0">
          <div className="col-md-7 left-content">
            <img src="/logo.png" width={400} alt="" />
          </div>
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <div className="input-group">
                <span className="input-group-text">
                  <img src="/img/login/mail.png" alt="email" width="20" height="20" />
                </span>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text" 
                  className="form-control" 
                  placeholder="Email" 
                />
              </div>

              <div className="input-group mt-3">
                <span className="input-group-text">
                  <img src="/img/login/padlock.png" alt="email" width="20" height="20" />
                </span>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                />
              </div>
              <div className="mt-3 text-center">
                <div>
                  <button 
                    disabled={loading}
                    onClick={handleLogin}
                    className="btn btn-primary-custom w-75 rounded-3">
                    Sign In
                  </button>
                </div>

                <div className="mt-2">
                  <span className="primary-text">
                    Forgot Password?
                  </span>
                </div>
              </div>
              <hr />
              <div className="text-center">
                
                <span className="">
                  Register As
                </span>
                
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