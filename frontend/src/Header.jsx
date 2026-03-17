import React, { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { resetUsage } from "./utils/usageGate"
export default function Header(){

const [user,setUser] = useState(auth.currentUser)   // ✅ FIX
const [menu,setMenu] = useState(false)

const menuRef = useRef()

const location = useLocation()

/* detect login */

useEffect(()=>{

const unsub = onAuthStateChanged(auth,(u)=>{
setUser(u)
})

return ()=>unsub()

},[])

/* close dropdown when clicking outside */

useEffect(()=>{

function handleClick(e){

if(menuRef.current && !menuRef.current.contains(e.target)){
setMenu(false)
}

}

document.addEventListener("mousedown",handleClick)

return ()=>{
document.removeEventListener("mousedown",handleClick)
}

},[])

/* GOOGLE LOGIN */

const googleLogin = async()=>{

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
prompt:"select_account"
})

try{

await signInWithPopup(auth,provider)

resetUsage()

}catch(err){

console.log(err)

}

}

/* LOGOUT */

const logout = async()=>{

await signOut(auth)

}

/* avatar fallback */

const getAvatar = ()=>{

if(user?.photoURL) return user.photoURL

const letter = user?.email?.charAt(0)?.toUpperCase()

return `https://ui-avatars.com/api/?name=${letter}&background=4da6ff&color=fff`

}

return(

<>

<div className="header">

{/* LEFT TITLE ONLY HOME PAGE */}

{location.pathname === "/" && (

<div className="logo">

AI Image Generator

</div>

)}

{/* RIGHT SIDE LOGIN ONLY HOME PAGE */}

{location.pathname === "/" && (

<div className="header-nav">

{/*<button
className="premium-btn"
onClick={()=>window.location.href="/premium"}
>

💎 Premium

</button>*/}

{/* GOOGLE LOGIN */}

{!user && (

<button className="google-btn" onClick={googleLogin}>

<img
src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
className="google-icon"
/>

Google Login

</button>

)}

{/* PROFILE */}

{user && (

<div className="profile" ref={menuRef}>

<img
src={getAvatar()}
className="profile-img"
onClick={()=>setMenu(!menu)}
onError={(e)=>{
const letter = user?.email?.charAt(0)?.toUpperCase()
e.target.src = `https://ui-avatars.com/api/?name=${letter}&background=4da6ff&color=fff`
}}
/>

{menu && (

<div className="dropdown">

<div className="email">

{user.email}

</div>

<button onClick={logout} className="logout">

Logout

</button>

</div>

)}

</div>

)}

</div>

)}

</div>


<style>{`

.header{

position:fixed;
top:20px;
left:0;
width:100%;

display:flex;
justify-content:space-between;
align-items:center;

padding:0 40px;

z-index:9999;

}

/* LEFT TITLE */

.logo{

font-size:22px;
font-weight:600;

background:linear-gradient(90deg,#4facfe,#00f2fe);

-webkit-background-clip:text;
-webkit-text-fill-color:transparent;

}

/* RIGHT NAV */

.header-nav{

display:flex;
align-items:center;

gap:14px;

}

/* PREMIUM BUTTON */

.premium-btn{

display:flex;
align-items:center;

height:40px;

padding:0 20px;

border-radius:30px;

background:rgba(255,255,255,0.15);

backdrop-filter:blur(10px);

border:1px solid rgba(255,255,255,0.25);

color:white;

cursor:pointer;

font-weight:500;

margin-top:-4px;

}

/* GOOGLE LOGIN */

.google-btn{

display:flex;
align-items:center;

gap:8px;

height:40px;

padding:0 18px;

border-radius:30px;

background:rgba(255,255,255,0.15);

backdrop-filter:blur(10px);

border:1px solid rgba(255,255,255,0.25);

color:white;

cursor:pointer;

}

.google-icon{

width:18px;

}

/* PROFILE */

.profile{

position:relative;

}

.profile-img{

width:40px;
height:40px;

border-radius:50%;

cursor:pointer;

object-fit:cover;

border:2px solid rgba(255,255,255,0.4);

}

/* DROPDOWN */

.dropdown{

position:absolute;
top:50px;
right:0;

background:#111;

padding:12px;

border-radius:10px;

width:200px;

box-shadow:0 10px 25px rgba(0,0,0,0.5);

}

.email{

font-size:13px;

margin-bottom:10px;

color:#aaa;

word-break:break-all;

}

.logout{

width:100%;

padding:8px;

border:none;

border-radius:8px;

background:#ff4d4d;

color:white;

cursor:pointer;

}

`}</style>

</>

)

}