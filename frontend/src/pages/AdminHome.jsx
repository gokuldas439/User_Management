import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Usertable from "../components/Table";

function AdminHome() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.admin.data);
  console.log(data);

  useEffect(() => {
    if (!data || !data?.admin) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <>
      <Usertable />
    </>
  );
}

export default AdminHome;
