import React,{useState} from "react"
import { checkUsage } from "./utils/usageGate"
import { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function Sketch(){

const [file,setFile]=useState(null)
const [original,setOriginal]=useState("")
const [result,setResult]=useState("")
const [loading,setLoading]=useState(false)
const [showLogin,setShowLogin]=useState(false)

/* GOOGLE LOGIN */

const googleLogin = async()=>{

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
prompt:"select_account"
})

try{

await signInWithPopup(auth,provider)

setShowLogin(false)

}catch(err){

console.log(err)

}

}

const upload=(e)=>{
const f=e.target.files[0]
if(!f) return
setFile(f)
setOriginal(URL.createObjectURL(f))
}

const convert=async()=>{

if(!file) return alert("Upload image")

/* LOGIN RULE */

if(!auth.currentUser){

const allow = checkUsage()

if(!allow){
setShowLogin(true)
return
}

}

setLoading(true)

const formData=new FormData()
formData.append("file",file)

const res=await fetch("http://127.0.0.1:8000/sketch",{
method:"POST",
body:formData
})

const blob=await res.blob()
const url=URL.createObjectURL(blob)

setResult(url)
setLoading(false)

}

const download=()=>{
const link=document.createElement("a")
link.href=result
link.download="sketch.png"
link.click()
}

return(

<div className="page">

{/* live bubbles */}
<div className="bubbles">
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>

<h1 className="title">Photo To Sketch</h1>

<div className="uploadBox">

<label className="uploadBtn">
Choose Image
<input type="file" onChange={upload}/>
</label>

<button className="convertBtn" onClick={convert}>
{loading ? "Processing..." : "Convert"}
</button>

</div>

<div className="container">

<div className="card">

<h3>Uploaded Image</h3>

{original && <img src={original} className="img"/>}

</div>

<div className="card">

<h3>Sketch Image</h3>

{result && <img src={result} className="img"/>}

{result && (
<button className="downloadBtn" onClick={download}>
Download
</button>
)}

</div>

</div>


{/* LOGIN POPUP */}

{showLogin && (

<div className="loginPopup">

<div className="loginBox">

<h3>Login & Continue</h3>

<p>Please login to continue using AI tools</p>

<button
className="googleLogin"
onClick={googleLogin}
>
Google Login
</button>

<button
className="closeLogin"
onClick={()=>setShowLogin(false)}
>
Close
</button>

</div>

</div>

)}

<style>{`

.page{
min-height:100vh;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
display:flex;
flex-direction:column;
align-items:center;
padding-top:40px;
font-family:sans-serif;
color:white;
overflow:hidden;
position:relative;
}

/* bubbles */

.bubbles span{
position:absolute;
bottom:-150px;
width:40px;
height:40px;
background:rgba(255,255,255,0.1);
border-radius:50%;
animation:rise 15s infinite;
}

.bubbles span:nth-child(1){left:10%;animation-duration:10s}
.bubbles span:nth-child(2){left:20%;animation-duration:12s}
.bubbles span:nth-child(3){left:30%;animation-duration:8s}
.bubbles span:nth-child(4){left:40%;animation-duration:14s}
.bubbles span:nth-child(5){left:50%;animation-duration:11s}
.bubbles span:nth-child(6){left:60%;animation-duration:9s}
.bubbles span:nth-child(7){left:70%;animation-duration:13s}
.bubbles span:nth-child(8){left:80%;animation-duration:10s}
.bubbles span:nth-child(9){left:90%;animation-duration:12s}
.bubbles span:nth-child(10){left:95%;animation-duration:15s}

@keyframes rise{
0%{transform:translateY(0) scale(1);opacity:0.4;}
100%{transform:translateY(-1200px) scale(1.5);opacity:0;}
}

/* heading */

.title{
font-size:42px;
font-weight:700;
margin-bottom:30px;
letter-spacing:2px;
text-shadow:0 5px 20px rgba(0,0,0,0.5);
z-index:2;
}

/* upload */

.uploadBox{
display:flex;
gap:20px;
margin-bottom:40px;
z-index:2;
}

.uploadBtn{
background:#ffffff20;
padding:12px 25px;
border-radius:30px;
cursor:pointer;
backdrop-filter:blur(6px);
border:1px solid #ffffff30;
}

.uploadBtn input{
display:none;
}

.convertBtn{
background:#2ea3ff;
border:none;
padding:12px 30px;
border-radius:30px;
font-weight:bold;
color:white;
cursor:pointer;
}

.convertBtn:hover{
background:#1a8be0;
}

/* cards */

.container{
display:flex;
gap:40px;
z-index:2;
}

.card{
width:320px;
background:rgba(255,255,255,0.08);
backdrop-filter:blur(10px);
padding:25px;
border-radius:20px;
text-align:center;
box-shadow:0 10px 40px rgba(0,0,0,0.3);
}

.card h3{
margin-bottom:15px;
}

.img{
width:100%;
border-radius:12px;
}

/* download */

.downloadBtn{
margin-top:15px;
background:#00c896;
border:none;
padding:10px 20px;
border-radius:25px;
color:white;
cursor:pointer;
}

.downloadBtn:hover{
background:#00a67c;
}

/* LOGIN POPUP */

.loginPopup{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
background:rgba(0,0,0,0.45);
backdrop-filter:blur(6px);
z-index:9999;
}

.loginBox{
width:360px;
padding:35px;
border-radius:20px;
background:rgba(255,255,255,0.12);
backdrop-filter:blur(25px);
border:1px solid rgba(255,255,255,0.25);
text-align:center;
box-shadow:0 25px 60px rgba(0,0,0,0.7);
}

.googleLogin{
margin-top:20px;
width:100%;
height:45px;
border-radius:30px;
border:none;
background:white;
color:black;
font-weight:600;
cursor:pointer;
}

.closeLogin{
margin-top:15px;
background:none;
border:none;
color:#ddd;
cursor:pointer;
}

`}</style>

</div>

)

}