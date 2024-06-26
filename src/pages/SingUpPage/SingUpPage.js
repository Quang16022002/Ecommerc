import React, { useState } from "react";
import "./SingUpPage.scss";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as UserService from "../../services/UserService";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SingInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const [isDisabled, setIsDisabled] = useState(true); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
    setIsDisabled(!e.target.value || !password);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
    setIsDisabled(!email || !confirmPassword || !e.target.value);
  };
  
  const handleOnchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setIsDisabled ( !password || !e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  
    
   
  };
  const navigate = useNavigate();
  const mutation = UseMutationHooks((data) => UserService.singupUser(data));
  const { data, isPending } = mutation;

  if (data && data.status === "OK") {
    toast.success("Đăng ký thành công!");
    navigate("/singin");
   
  }

  return (
    <div>
       <div>

      {/* {isLoading && <div className="overlay"></div>} */}

      <div style={{ marginTop: 110 }} className="singup">
        <div className="styles__Root-sc-2hr4xa-0 jyAQAr">
          <div className="styles__Left-sc-2hr4xa-1 iwneWf">
            <div className="styles__StyledLoginWithPhone-sc-si1ros-0 jdahxv">
              <div className="heading">
                <h4>Xin chào,</h4>
                <p>Tạo tài khoản tại đây</p>
              </div>
       

              <form onSubmit={handleSignUp}>
                <div className="input_login">
                  <input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={handleOnchangeEmail}
                  />
                </div>
                <div className="input_login">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handleOnchangePassword}
                  />
                  <span className="show-btn" onClick={togglePasswordVisibility}>
                    <i
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </span>
                </div>
                <div className="input_login">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={handleOnchangeConfirmPassword}
                  />
                  <span
                    className="show-btn"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    ></i>
                  </span>
                </div>
               
                <div className="err-login" style={{ marginTop: 5 }}>
                  {data?.status === "ERR" && (
                    <span style={{ paddingTop: 10, color: "red" }}>
                      {data?.message}
                    </span>
                  )}
                </div>
                <button className="button_continue" type="submit" disabled={isDisabled}>
                  {" "}
                  Tiếp tục
                </button>
              </form>
              <Link style={{ textDecoration: "none" }} to="/singin">
                <p className="login-with-email">Đăng nhập bằng email</p>
              </Link>
              <div className="styles__StyledSocial-sc-si1ros-1 ghIlRk">
                <p className="social-heading">
                  <span>Hoặc tiếp tục bằng</span>
                </p>
                <ul className="social__items">
                  <li className="social__item">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
                      alt="facebook"
                    />
                  </li>
                  <li className="social__item">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                      alt="google"
                    />
                  </li>
                </ul>
                <p className="note">
                  Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
                  <a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">
                    điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">
                    Chính sách bảo mật thông tin cá nhân
                  </a>{" "}
                  của eiser
                </p>
              </div>
            </div>
          </div>
          <div className="styles__Right-sc-2hr4xa-2 cxqVZX">
            <img
              src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              width="203"
            />
            <div className="content">
              <h4>Mua sắm tại eiser</h4>
              <span>Siêu ưu đãi mỗi ngày</span>
            </div>
          </div>
        </div>
      </div>
       </div>
      <FooterComponent />
    </div>
  );
};

export default SingInPage;
