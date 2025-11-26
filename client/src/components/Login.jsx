import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../api";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "login") {
        const res = await api.post("/auth/login", { email, password });
        setUser(res.data);
        toast.success("Login successful!");
        setShowUserLogin(false);
      } else {
        await api.post("/auth/register", {
          name,
          email,
          username: email.split("@")[0],
          password,
          phone,
          role: "USER",
          address,
        });
        toast.success("Account created! Please login.");
        setState("login");
      }
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <>
            <div className="w-full">
              <p>Name</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" />
            </div>

            <div className="w-full">
              <p>Phone</p>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" />
            </div>

            <div className="w-full">
              <p>Address</p>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" />
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" />
        </div>

        {state === "register" ? (
          <p>Already have account?
            <span className="text-primary cursor-pointer" onClick={() => setState("login")}> click here</span>
          </p>
        ) : (
          <p>Create an account?
            <span className="text-primary cursor-pointer" onClick={() => setState("register")}> click here</span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
