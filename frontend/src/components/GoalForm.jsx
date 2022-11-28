import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function GoalForm({fetchUserDetails}) {
  const { user } = useSelector((state) => state.auth);
  const [isLoading,setIsLoading]=useState(false)


  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    // uploadImage(event.target.files[0]);
    // console.log(event.target.files[0])
    // const formData = new FormData()
    // formData.append("file", files[0])

    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async(e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("avatar", userInfo.file);
      setIsLoading(true)
      const { data } = await axios.post(
        "http://localhost:5000/api/users/updateprofile",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsLoading(false)
if(data.status==="success"){
  toast.success(data.message)
  fetchUserDetails()
  setuserInfo({
    file: [],
    filepreview: null,
  })

}
    } catch (error) {
      setIsLoading(false)
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }   
 }
 if (isLoading) {
  return <Spinner />
}
 
 return (
  <>
    <div className="container mr-60">
      <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> : null}
        <div className="form-row">
          <label className="text-white"> Select Image : </label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={(e) => submit(e)}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>

      {userInfo.filepreview !== null ? (
        <img
          className="previewimg"
          src={userInfo.filepreview}
          alt="UploadImage"
        />
      ) : null}
    </div>
    </>
  );
}

export default GoalForm;
