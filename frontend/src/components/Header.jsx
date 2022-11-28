import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutReset, reset } from "../features/auth/authSlice";
import { deleteAdminToken } from "../features/auth/adminAuthReducer";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function Header() {
  const [logoutModal,setLogoutModal]=useState(false)
  const [adminLogoutModal,setadminLogoutModal]=useState(false)
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin") ? true : false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.admin.data);

  const onLogout = () => {
    dispatch(logout());
    dispatch(logoutReset());
    setLogoutModal(false)
    navigate("/login");
  };

  const onLogoutAdmin = () => {
    dispatch(deleteAdminToken());
    dispatch(reset());
    setadminLogoutModal(false)
    navigate("/admin/login");
  };

  const loggingOut=()=>{ setLogoutModal(false)}
  const trueLogout=()=>{ setLogoutModal(true)}
  const adminLoggingOut=()=>{ setadminLogoutModal(false)}
  const trueadminLoggingOut=()=>{ setadminLogoutModal(true)}


  return isAdmin ? (
    <header className="header">
      <div className="logo">
        <Link to="/admin/home">Admin</Link>
      </div>
      <ul>
        {token ? (
          <li>
            <button className="btn" onClick={trueadminLoggingOut}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/admin/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            
          </>
        )}
      </ul>

      <Modal show={adminLogoutModal} onHide={adminLoggingOut}>
       <Modal.Header >
         <Modal.Title>Logout</Modal.Title>
       </Modal.Header>
       <Modal.Body>This action will proceed Logout. Are you sure to continue ? </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={adminLoggingOut}>
           Close
         </Button>
         <Button variant="danger" onClick={onLogoutAdmin}>
           Logout
         </Button>
       </Modal.Footer>
     </Modal>

    </header>
  ) : (
    <header className="header">
      <div className="logo">
        <Link to="/">User</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={trueLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>

      <Modal show={logoutModal} onHide={loggingOut}>
       <Modal.Header >
         <Modal.Title>Logout</Modal.Title>
       </Modal.Header>
       <Modal.Body>This action will proceed Logout. Are you sure to continue ? </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={loggingOut}>
           Close
         </Button>
         <Button variant="danger" onClick={onLogout}>
           Logout
         </Button>
       </Modal.Footer>
     </Modal>


    </header>
  );
}

export default Header;
