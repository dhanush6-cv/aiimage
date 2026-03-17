import React, { useState } from "react";
import { checkUsage } from "./utils/usageGate"
import { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function ImageEnhancer(){

const [preview,setPreview] = useState(null)
const [result,setResult] = useState(null)
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

function handleFile(e){

const file = e.target.files[0]
if(!file) return

const reader = new FileReader()

reader.onload = (event)=>{
setPreview(event.target.result)
setResult(null)
}

reader.readAsDataURL(file)

}

function enhanceImage(){

if(!preview) return

/* LOGIN RULE */

if(!auth.currentUser){

const allow = checkUsage()

if(!allow){
setShowLogin(true)
return
}

}

const img = new Image()

img.onload = function(){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = img.width * 2
canvas.height = img.height * 2

ctx.imageSmoothingEnabled = true
ctx.imageSmoothingQuality = "high"

ctx.drawImage(img,0,0,canvas.width,canvas.height)

const enhanced = canvas.toDataURL("image/png")

setResult(enhanced)

}

img.src = preview

}

return(

<div className="page">

{/* bubbles */}

<div className="bubble b1"></div>
<div className="bubble b2"></div>
<div className="bubble b3"></div>
<div className="bubble b4"></div>
<div className="bubble b5"></div>

<h1 className="title">AI 4K Image Enhancer</h1>

<div className="btnRow">

<label className="uploadBtn">
Choose Image
<input type="file" hidden onChange={handleFile}/>
</label>

<button className="enhanceBtn" onClick={enhanceImage}>
Enhance
</button>

</div>

<div className="previewContainer">

<div className="previewBox">
<h3>Uploaded Image</h3>
{preview && <img src={preview}/>}
</div>

<div className="previewBox">
<h3>Enhanced Image</h3>
{result && <img src={result}/>}
</div>

</div>

{result &&

<a href={result} download="enhanced.png">
<button className="downloadBtn">
Download
</button>
</a>

}

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
justify-content:center;
color:white;
overflow:hidden;
position:relative;
}

.title{
font-size:40px;
margin-bottom:40px;
text-shadow:0 0 20px #00e5ff;
}

.btnRow{
display:flex;
gap:30px;
margin-bottom:40px;
}

.uploadBtn{
background:#111;
padding:12px 30px;
border-radius:40px;
cursor:pointer;
font-weight:bold;
}

.enhanceBtn{
background:linear-gradient(45deg,#00f2fe,#4facfe);
border:none;
padding:12px 30px;
border-radius:40px;
color:white;
font-weight:bold;
cursor:pointer;
}

.previewContainer{
display:flex;
gap:120px;
}

.previewBox{
width:320px;
height:380px;
background:rgba(255,255,255,0.08);
border-radius:20px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
backdrop-filter:blur(10px);
padding:15px;
}

.previewBox img{
width:100%;
height:100%;
object-fit:contain;
border-radius:10px;
}

.downloadBtn{
margin-top:30px;
background:#4CAF50;
border:none;
padding:14px 40px;
border-radius:40px;
color:white;
cursor:pointer;
font-size:16px;
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

/* bubbles */

.bubble{
position:absolute;
border-radius:50%;
background:rgba(255,255,255,0.08);
animation:float 20s infinite linear;
}

.b1{width:200px;height:200px;left:10%;top:70%;}
.b2{width:150px;height:150px;left:80%;top:20%;}
.b3{width:120px;height:120px;left:60%;top:80%;}
.b4{width:170px;height:170px;left:30%;top:10%;}
.b5{width:140px;height:140px;left:90%;top:60%;}

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(-50px);}
100%{transform:translateY(0px);}
}

`}</style>

</div>

)

}