/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import {
  Closed_Eye,
  Eye,
  Fb_logo,
  Google_logo,
  Logo_instagram,
} from "../../assets/icons";
import { Template } from "../../components/template/template";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  userLogin,
  signInWithGoogle,
  signInWithFacebook,
} from "../../redux/middlewares/auth-middleware";
import { useToast } from "@chakra-ui/react";
import { constant } from "../../constant";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { showToast } from "../../lib/toast";
// ...

// ...
const SocialLoginButton = ({ provider, onClick, icon, label }) => {
  const toast = useToast();
  const nav = useNavigate();

  const handleSocialLogin = async () => {
    try {
      await onClick();
      nav("/home");
      showToast(toast, constant.success, `Logged in with ${label}`, "success");
    } catch (err) {
      showToast(toast, err.message, `Failed to log in with ${label}`, "error");
    }
  };

  return (
    <button className={`${provider}-button`} onClick={handleSocialLogin}>
      <div className="flex justify-center items-center gap-[5px]">
        <span>{icon}</span>
        <span>{`Log in with ${label}`}</span>
      </div>
    </button>
  );
};
export const LoginPage = () => {
  const toast = useToast();
  const [see, setSee] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      const result = await dispatch(userLogin(values));
      if (result === constant.success) {
        nav("/home");
      }
      showToast(
        toast,
        result,
        "Login Success",
        "success",
        "Login Failed",
        result
      );
    },
  });

  useEffect(() => {
    console.log(auth.currentUser);
  }, []);

  return (
    <>
      <Template>
        <Logo_instagram style={{ marginBottom: "24px", maxWidth: "174px" }} />
        <div className="flex flex-col gap-[14px] w-full items-center">
          <div className="input-container">
            <input
              type="text"
              className="mobile-input"
              placeholder="Phone number, email or username"
              style={{ paddingRight: "25px" }}
              onChange={(e) => formik.setFieldValue("user", e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type={see ? "text" : "password"}
              className="mobile-input"
              placeholder="Password"
              style={{ paddingRight: "5px" }}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
            />

            <button
              style={{ paddingRight: "10px" }}
              onClick={() => setSee(!see)}
            >
              {see ? (
                <Eye name="see" width={"13px"} />
              ) : (
                <Closed_Eye name="closed" width={"13px"} />
              )}
            </button>
          </div>
          <div
            className="input-container flex-col  gap-2"
            style={{ background: "none", border: "none" }}
          >
            <a href="/forgot-password">
              <div className="flex justify-end text-[14px] font-semibold cursor-pointer">
                Forgot Password
              </div>
            </a>

            <button className="auth-button" onClick={formik.handleSubmit}>
              Log in
            </button>
          </div>

          <div className=" text-[13px]">
            Don't have an account?{" "}
            <span>
              <a href="/register" className="font-semibold">
                Sign up.
              </a>{" "}
            </span>
          </div>

          <div className="flex w-full items-center max-w-[320px]">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-2 mt-[-3px]">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <SocialLoginButton
            provider="facebook"
            onClick={() => dispatch(signInWithFacebook())}
            icon={<Fb_logo width="16px" height="16px" />}
            label="Facebook"
          />

          <SocialLoginButton
            provider="google"
            onClick={() => dispatch(signInWithGoogle())}
            icon={<Google_logo width="16px" height="16px" />}
            label="Google"
          />
        </div>
      </Template>
    </>
  );
};
