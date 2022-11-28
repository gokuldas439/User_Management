import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";
import axios from "axios";
import { setAdminToken } from "../features/auth/adminAuthReducer";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const navigate=useNavigate()
  const data=useSelector((state)=>state.admin.data);

  console.log(data)

  useEffect(()=>{
    if(data?.admin &&  data?.token){
        navigate('/admin/home')
      }
  },[])




  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const userData = {
        email,
        password,
      };
     

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        userData
      );
      dispatch(setAdminToken(res.data));
      navigate("/admin/home");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Admin Login
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AdminLogin;
