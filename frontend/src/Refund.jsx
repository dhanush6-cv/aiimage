import React, { useState } from "react";

export default function Refund() {

const [email,setEmail] = useState("");
const [message,setMessage] = useState("");
const [image,setImage] = useState(null);
const [fileName,setFileName] = useState("");
const [loading,setLoading] = useState(false);

const handleFile = (e)=>{
const file = e.target.files[0];
setImage(file);
setFileName(file.name);
}

const submitRefund = async () => {

if(!email || !message || !image){
alert("Please fill all fields");
return;
}

setLoading(true);

const formData = new FormData();
formData.append("email",email);
formData.append("message",message);
formData.append("image",image);

try{

await fetch("http://localhost:5000/refund",{
method:"POST",
body:formData
});

alert("Refund request submitted");

setEmail("");
setMessage("");
setImage(null);
setFileName("");

}catch(err){

alert("Server error");

}

setLoading(false);

};

return (

<div style={{
minHeight:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
background:"radial-gradient(circle at center,#1e3a8a,#020617)",
color:"white",
fontFamily:"sans-serif"
}}>

<h1 style={{fontSize:"38px",marginBottom:"20px"}}>Refund Policy</h1>

<ul style={{
lineHeight:"35px",
marginBottom:"30px",
fontSize:"17px"
}}>

<li>Refund available only for premium purchase issues</li>
<li>User must provide screenshot proof</li>
<li>Refund requests processed within 3-5 days</li>
<li>Fake requests will be rejected</li>
<li>Contact support if refund not received</li>

</ul>

<input
type="email"
placeholder="Your Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"260px",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"none"
}}
/>

<textarea
placeholder="Describe your issue"
value={message}
onChange={(e)=>setMessage(e.target.value)}
style={{
width:"260px",
height:"90px",
padding:"12px",
borderRadius:"8px",
border:"none",
marginBottom:"20px"
}}
/>

<h3 style={{marginBottom:"10px"}}>Upload Screenshot</h3>

<div style={{
display:"flex",
gap:"15px",
alignItems:"center"
}}>

<label style={{
background:"linear-gradient(45deg,#ff6ec4,#7873f5)",
padding:"10px 18px",
borderRadius:"30px",
cursor:"pointer"
}}>

Choose File

<input
type="file"
onChange={handleFile}
style={{display:"none"}}
/>

</label>

<span style={{fontSize:"14px",opacity:"0.8"}}>
{fileName}
</span>

<button
onClick={submitRefund}
disabled={loading}
style={{
background:"linear-gradient(45deg,#00c6ff,#00ffb3)",
border:"none",
padding:"10px 20px",
borderRadius:"30px",
color:"white",
cursor:"pointer",
fontWeight:"bold"
}}
>

{loading ? "Submitting..." : "Submit Request"}

</button>

</div>

</div>

);

}