import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword, country } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    });
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center bg-blue-500">
      <div className="text-6xl mb-6 text-slate-900">
        SIGN UP here:
      </div>
      <div className="bg-slate-900 p-10 rounded-4xl">
        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col gap-y-4"
        >
          <div>
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="name"
                value={name}
                onChange={handleOnChange}
                placeholder="Enter name"
                className="bg-slate-700 h-[6vh] p-4 rounded-md w-full"
              />
            </label>
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Country <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="country"
                value={country}
                onChange={handleOnChange}
                placeholder="Enter country"
                className="bg-slate-700 h-[6vh] p-4 rounded-md w-full"
              />
            </label>
          </div>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="bg-slate-700 h-[6vh] p-4 rounded-md w-full"
            />
          </label>
          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="bg-slate-700 h-[6vh] flex items-center p-4 rounded-md w-full"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="bg-slate-700 h-[6vh] p-4 rounded-md w-full"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
