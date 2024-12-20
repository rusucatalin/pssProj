import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart, signUpSuccess, signUpFailure } from "store/authSlice";
import { FirebaseServiceFactory } from "services/firebaseServiceFactory";
import InputField from "../../components/input/InputField";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: any) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(signUpFailure("Passwords do not match"));
      return;
    }

    dispatch(signUpStart());

    const authService = FirebaseServiceFactory.getService("auth");

    try {
      const user = await authService.signUp(email, password);
      await authService.saveUserData(user.uid, { email, name: "New User" });
      sessionStorage.setItem("user", JSON.stringify(user));
      dispatch(signUpSuccess({ uid: user.uid, email }));
      window.location.href = "/home/homePage";
    } catch (err: any) {
      dispatch(signUpFailure(err.message));
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-black-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your details to create your account!
        </p>

        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Confirm Password*"
          placeholder="Re-enter your password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {status === "loading" ? "Signing up..." : "Sign Up"}
        </button>

        <div className="mt-4">
          <span className="text-sm font-medium text-black-700 dark:text-gray-600">
            Already have an account?
          </span>
          <a
            href="/auth/signIn"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
