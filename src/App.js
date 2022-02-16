import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const [userDetail,setUserDetail]= useState(null);
  const [selectedUser,setSelectedUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const loadData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
        );
      // console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      alert(err.message);
    }
  };
  const loadUserDetail = async (userid)=>{
    try{
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/"+userid
      );
      setUserDetail(response.data);
    }catch (error){
      console.log(error);
    }};
    useEffect(() =>{
      loadData();
    },[]);
    useEffect(()=>{
    if (selectedUser !== null){
      loadUserDetail(selectedUser);
    }},[selectedUser])
    
          return (
            <div className="App">
              <ul className="list">
              {users.map((user, index) => {
          return (
            <li key={`users-${index}`} onClick={()=>setSelectedUser(user.id)}>
              {user.name}, 
             
            </li>
          );
        })}
              </ul>
             {userDetail !== null ?(
               <div>
                 <h1>User Detail</h1>
                
                {userDetail.name},
                {userDetail.email},
                 {userDetail.phone},
                {userDetail.address.geo.lat}/{""}
                {userDetail.address.geo.lng} 
                 
               </div>
             ) : undefined }
            </div>
          );
        }
        

export default App;