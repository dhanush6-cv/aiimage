import React from "react"

export default function About(){

return(

<div className="about-page">

<style>{`

.about-page{

min-height:100vh;
display:flex;
justify-content:center;
align-items:center;

background: radial-gradient(circle at top,#0f2027,#203a43,#2c5364);

color:white;
font-family:Arial;

padding:40px;

}

.about-box{

max-width:750px;
background:rgba(255,255,255,0.08);
backdrop-filter:blur(10px);

border-radius:14px;

padding:40px;

box-shadow:0 10px 30px rgba(0,0,0,0.5);

}

.about-title{

font-size:40px;
font-weight:700;

margin-bottom:25px;

text-align:center;

}

.about-text{

line-height:1.7;
font-size:18px;

margin-bottom:25px;

text-align:center;

}

.about-points{

margin-top:20px;

}

.about-points li{

margin-bottom:12px;
font-size:17px;

}

`}</style>


<div className="about-box">

<h1 className="about-title">

About

</h1>

<p className="about-text">

AI Image Generator is an advanced AI powered platform that helps users
edit and enhance images instantly without any technical skills.

</p>


<ul className="about-points">

<li>⚡ Instant AI background removal</li>

<li>🖼️ 4K AI image enhancement</li>

<li>✏️ Convert photos into artistic sketches</li>

<li>🚀 Fast cloud processing</li>

<li>📱 Works on both mobile and desktop</li>

<li>🔒 Secure image processing</li>

<li>💎 Premium tools with advanced AI features</li>

</ul>


</div>

</div>

)

}