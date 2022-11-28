import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";


function Usertable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  

  const [show, setShow] = useState(false);
  const [deleteShow, setdeleteShow] = useState(false);

  // console.log(selectedUser,"state")
  const [operation, setOperation] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/getusers"
      );
      console.log(data);
      setIsLoading(false);
      setData(data.users);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (data) => {
    setSelectedUser(data);
    setOperation("delete");
    console.log(data)
    setdeleteShow(true)
  };

  const handleEdit = (data) => {
    setSelectedUser(data);
    setOperation("edit");
    console.log(data)
    setShow(true)

  };

  // const [formData, setFormData] = useState(selectedUser)

  
  
  
  const onChange = (e) => {
    console.log("console")
    setSelectedUser((prevState) => ({
      ...prevState,
      [e.target.email]: e.target.value,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = async(e) => {
    try{

   
    console.log("first")
    e.preventDefault()
    const { name, email,_id } = selectedUser
      const userData = {
        _id,
        name,
        email,
        
      }
console.log(userData)
// setIsLoading(true);
const res = await axios.post(
  "http://localhost:5000/api/admin/editUser",
  userData
);
console.log(res);
if(res.data.message==="success"){
  setShow(false)
  toast.success(res.data.message)
  setIsLoading(true);
  fetchData();
  setIsLoading(false);
}
      // dispatch(register(userData))
    }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    }
  }



  const handleClose = () => setShow(false);
  const deletehandleClose = () => setdeleteShow(false);
  
const deleteUserclick=async(e)=>{
  try{

    
    e.preventDefault()
    const { _id } = selectedUser
    const userData = {
      _id,
    }
    const res = await axios.post(
      "http://localhost:5000/api/admin/deleteUser",
      userData
    );
    if(res.data.status==="success"){
      setdeleteShow(false)
      toast.success(res.data.message)
      setIsLoading(true);
      fetchData();
      setIsLoading(false);    }


  }catch(error){
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    
  }
}




  return (
    <>
      {isLoading && <Spinner animation="border" role="status" />}
      {data && (
         <>        
         <Link to='/admin/adduser'><Button variant="success" >Add User</Button></Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-primary d-revert" onClick={()=>handleEdit(user)}>
                    <i className="fa fa-pencil" ></i>
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={()=>handleDelete(user)}>
                    <i className="fa fa-trash" ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      )}

     
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
         <Modal.Title>Edit User</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedUser?.name}
                autoFocus
                name='name'
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={selectedUser?.email}
                name='email'
                onChange={onChange}
              />
            </Form.Group>
       {/* <Modal.Footer> */}
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button variant="primary" type='submit'>
           Save Changes
         </Button>
       </Form>
       </Modal.Body>
       {/* </Modal.Footer> */}
     </Modal>
     


       <Modal show={deleteShow} onHide={deletehandleClose}>
       <Modal.Header >
         <Modal.Title>Delete User</Modal.Title>
       </Modal.Header>
       <Modal.Body>this action will delete the user  : {selectedUser?.email}</Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={deletehandleClose}>
           Close
         </Button>
         <Button variant="danger" onClick={deleteUserclick}>
           Delete
         </Button>
       </Modal.Footer>
     </Modal>


   

    
    </>
  );
}

export default Usertable;
