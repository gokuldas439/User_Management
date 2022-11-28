import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [isLoading,setIsLoading]=useState(true)
  const[data,setData]=useState(null);

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

const fetchUserDetails=async()=>{
  setIsLoading(true)
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const {data} = await axios.get('http://localhost:5000/api/users/me', config)
setData(data);
setIsLoading(false)
}

  useEffect(() => {
    if (!user || !user?.token) {
      navigate("/login");
    }
  fetchUserDetails();
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {data.name}</h1>
        <img className='previewimg' src={data.profilepic} alt="No profile pic found"></img>
        <p>Add a New Profile Pic</p>
      </section>

      <GoalForm fetchUserDetails={fetchUserDetails} />
    </>
  )
}

export default Dashboard
