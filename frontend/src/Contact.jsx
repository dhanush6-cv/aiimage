import React from "react"
import { Link } from "react-router-dom"

export default function Contact(){

return(

<div className="contact-page">

<style>

{`

.contact-page{

min-height:100vh;
background: radial-gradient(circle at top,#0f2027,#203a43,#2c5364);
color:white;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
padding-top:120px;
font-family:Arial, Helvetica, sans-serif;

}

.contact-container{

max-width:700px;
text-align:center;
padding:40px;

}

.contact-heading{

font-size:40px;
font-weight:700;
margin-bottom:30px;

}

.contact-info{

font-size:18px;
margin-bottom:40px;

}

.contact-info p{

margin:12px 0;

}

.contact-link{

cursor:pointer;
color:white;
text-decoration:none;

}

.contact-link:hover{

color:#6dd5fa;

}

.rules-box{

background:rgba(255,255,255,0.08);
backdrop-filter:blur(10px);
border-radius:12px;
padding:30px;
text-align:left;
line-height:1.7;

}

.rules-title{

font-size:24px;
margin-bottom:20px;
text-align:center;

}

.rules-box ul{

padding-left:20px;

}

.rules-box li{

margin-bottom:10px;

}

.back-home{

margin-top:40px;
font-size:16px;
cursor:pointer;

}

.back-home a{

color:white;
text-decoration:none;

}

.back-home a:hover{

color:#6dd5fa;

}

`}

</style>


<div className="contact-container">

<h1 className="contact-heading">Contact</h1>

<div className="contact-info">

<p>

Email:{" "}
<a
href="mailto:aiimagegenerate0@gmail.com"
className="contact-link"
>
aiimagegenerate0@gmail.com
</a>

</p>

<p>

Instagram:{" "}
<a
href="https://instagram.com/aiimagegenerate"
target="_blank"
className="contact-link"
>
aiimagegenerate
</a>

</p>

</div>


<div className="rules-box">

<h2 className="rules-title">Contact Rules</h2>

<ul>

<li>
Please contact us only for website support or technical issues.
</li>

<li>
Do not send spam messages or promotional links.
</li>

<li>
Response time may take up to 24 hours.
</li>

<li>
For premium support please include your registered email.
</li>

<li>
Abusive or inappropriate messages will be ignored.
</li>

<li>
Use clear and detailed messages so we can help faster.
</li>

</ul>

</div>


<div className="back-home">

<Link to="/">Back to home</Link>

</div>

</div>

</div>

)

}