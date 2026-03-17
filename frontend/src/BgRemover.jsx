import React,{useRef,useState} from "react"
import {useNavigate} from "react-router-dom"
import { checkUsage } from "./utils/usageGate"
import { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

function BgRemover(){

const navigate = useNavigate()

const canvasRef = useRef(null)

const [loading,setLoading] = useState(false)
const [imageReady,setImageReady] = useState(false)
const [showLogin,setShowLogin] = useState(false)

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

/* REMOVE BG */

async function removeBackground(file){

if(!file) return

/* LOGIN RULE */

if(!auth.currentUser){

const allow = checkUsage()

if(!allow){
setShowLogin(true)
return
}

}

/* FILE SIZE */

if(file.size > 8*1024*1024){

alert("Max image size 8MB")
return

}

setLoading(true)

const formData = new FormData()
formData.append("file",file)

try{

const res = await fetch("http://127.0.0.1:8000/remove-bg",{
method:"POST",
body:formData
})

if(!res.ok){
throw new Error("Server error")
}

const blob = await res.blob()
const url = URL.createObjectURL(blob)

const img = new Image()

img.onload = ()=>{

const canvas = canvasRef.current
const ctx = canvas.getContext("2d")

canvas.width = img.width
canvas.height = img.height

ctx.clearRect(0,0,canvas.width,canvas.height)
ctx.drawImage(img,0,0)

setImageReady(true)
setLoading(false)

}

img.src = url

}catch(err){

alert("Background remove failed")
setLoading(false)

}

}

/* DOWNLOAD */

function downloadImage(){

const canvas = canvasRef.current

if(!canvas) return

const link = document.createElement("a")
link.download="removed-background.png"
link.href = canvas.toDataURL("image/png")
link.click()

}

return(

<div className="bgpage">

{/* bubbles */}
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

<button
className="back"
onClick={()=>navigate("/")}>
Back
</button>

<h2>Background Remover</h2>

<label className="uploadBtn">

Choose Image

<input
type="file"
accept="image/*"
onChange={(e)=>removeBackground(e.target.files[0])}
/>

</label>

{loading && (
<p className="processing">Processing...</p>
)}

<br/>

<canvas
ref={canvasRef}
className="previewCanvas">
</canvas>

<br/>

{imageReady && (

<button
className="downloadBtn"
onClick={downloadImage}>
Download Image
</button>

)}

{/* LOGIN POPUP */}

{showLogin && (

<div className="loginPopup">

<div className="loginBox">

<h3>Login & Continue</h3>

<p>Please login to continue using AI tools</p>

<button
className="googleLogin"
onClick={googleLogin}>

Google Login

</button>

<button
className="closeLogin"
onClick={()=>setShowLogin(false)}>

Close

</button>

</div>

</div>

)}

<style>{`

.bgpage{
text-align:center;
padding-top:120px;
color:white;
}

/* BACK */

.back{
position:absolute;
top:20px;
left:20px;
background:rgba(255,255,255,0.15);
border:none;
padding:10px 20px;
border-radius:20px;
color:white;
cursor:pointer;
}

/* UPLOAD */

.uploadBtn{
background:rgba(255,255,255,0.2);
padding:12px 25px;
border-radius:25px;
cursor:pointer;
}

.uploadBtn input{
display:none;
}

/* CANVAS */

.previewCanvas{
margin-top:20px;
max-width:80%;
border-radius:10px;
}

/* DOWNLOAD */

.downloadBtn{
margin-top:20px;
padding:12px 25px;
border-radius:25px;
border:none;
background:#4da6ff;
color:white;
cursor:pointer;
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

.loginBox h3{
margin-bottom:10px;
}

.loginBox p{
font-size:14px;
opacity:0.8;
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

export default BgRemover