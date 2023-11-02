import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout () {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    } 

    if (redirect) {
        return <Navigate to={redirect} />
    }
    // console.log(user._id);
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    您好{user.name}！({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">登出</button>
                </div>
                
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
            
            <div className="text-center">
                <Link className="primary max-w-sm mt-2 inline-flex gap-1 rounded-full" to={'/account/'+user._id}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    编辑您的资料
                </Link>
            </div>
        </div>
    );
}


// import { useContext, useState } from "react";
// import { UserContext } from "../UserContext";
// import { Link, Navigate, useParams } from "react-router-dom";
// import axios from "axios";
// import AccountNav from "../AccountNav";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser } = useContext(UserContext);
//     const [isEditing, setIsEditing] = useState(false); 

//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = "profile";
//     }

//     async function logout() {
//         await axios.post("/logout");
//         setRedirect("/");
//         setUser(null);
//     }

//     if (!ready) {
//         return "Loading...";
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={"/login"} />;
//     }

//     if (redirect) {
//         return <Navigate to={redirect} />;
//     }

//     const toggleEditing = () => {
//         // 切换编辑状态
//         setIsEditing(!isEditing);
//     };

//     return (
//         <div>
//             <AccountNav />
//             {subpage === "profile" && !isEditing && ( 
//                 <div className="text-center max-w-lg mx-auto">
//                     <p>您好{user.name}！({user.email})</p>
//                     <button onClick={logout} className="primary max-w-sm mt-2">
//                         登出
//                     </button>
//                     <button className="edit max-w-sm mt-2" onClick={toggleEditing} >
//                         编辑个人资料
//                     </button>
//                 </div>
//             )}
//             {subpage === "profile" && isEditing && (
                
//                 <UserProfileEditForm
//                     user={user}
//                     setIsEditing={setIsEditing}
//                 />
//             )}
//         </div>
//     );
// }

// function UserProfileEditForm({ user, setIsEditing }) {
//     const [editedUser, setEditedUser] = useState({
//         name: user.name,
//         email: user.email,
//         username:user.username,
//         // 添加其他个人资料字段
//         address: user.address,
//         phone: user.phone,
//         birthday: user.birthday,
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedUser({ ...editedUser, [name]: value });
//     };

//     const saveUserProfile = () => {
       
//         axios.put("/user/profile", editedUser).then(() => {
//             setIsEditing(false);
//         });
//     };

//     return (
//         <div className="text-center max-w-lg mx-auto">
//             <h2 className="text-2xl mt-4">编辑个人资料</h2>
//             <form>
//                 <div>
//                     {/* <label>姓名：</label> */}
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="您的姓名"
//                         value={editedUser.name}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     {/* <label>姓名：</label> */}
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="用户名"
//                         value={editedUser.username}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     {/* <label>电子邮件：</label> */}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="您的邮箱"
//                         value={editedUser.email}
//                         onChange={handleInputChange}
//                     />
//                 </div>
                
//                 <div>
//                     {/* <label>电话：</label> */}
//                     <input
//                         type="tel"
//                         name="phone"
//                         placeholder="手机号码"
//                         value={editedUser.phone}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label>生日：</label>
//                     <input
//                         type="date"
//                         name="birthday"
//                         value={editedUser.birthday}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <button onClick={saveUserProfile} className="primary my-4">
//                     保存
//                 </button>
//                 <button
//                     onClick={() => setIsEditing(false)}
//                     className="my-4 ml-2 cancel-button"
//                 >
//                     取消
//                 </button>
//             </form>
//         </div>
//     );
      
// }
