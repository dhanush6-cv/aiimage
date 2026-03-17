import React from "react";

function Terms(){

return(

<div className="termsPage">

{/* LIVE BUBBLES */}

<div className="bubbles">
<span></span><span></span><span></span><span></span>
<span></span><span></span><span></span><span></span>
<span></span><span></span>
</div>

<div className="termsContainer">

<h1>Terms & Conditions</h1>

<p>
By accessing and using AI Image Converter, you agree to comply with
the following terms and conditions.
</p>

<ul>

<li>Users must use this website responsibly and legally.</li>

<li>Do not upload copyrighted, illegal, or harmful images.</li>

<li>The tools provided on this platform are for personal and commercial use.</li>

<li>We are not responsible for misuse of the service.</li>

<li>Services and features may change without prior notice.</li>

<li>Users must comply with all applicable laws when using this website.</li>

<li>Any abuse or automated misuse of the service may lead to restrictions.</li>

<li>The platform may temporarily stop during maintenance or upgrades.</li>

<li>Uploaded images are processed automatically and not stored permanently.</li>

<li>So please accept / follow the terms and conditions</li>
</ul>


</div>


<style>

{`

.termsPage{

min-height:100vh;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
color:white;
padding:80px 20px;
position:relative;
overflow:hidden;
font-family:sans-serif;

}

.termsContainer{

max-width:900px;
margin:auto;
font-size:18px;
line-height:1.8;

}

.termsContainer h1{

font-size:40px;
margin-bottom:25px;
text-align:center;

}

.termsContainer ul{

margin-top:20px;
padding-left:25px;

}

.termsContainer li{

margin-bottom:12px;

}


/* LIVE BUBBLES */

.bubbles span{

position:absolute;
width:25px;
height:25px;
background:rgba(255,255,255,0.15);
border-radius:50%;
bottom:-100px;
animation:rise 10s linear infinite;

}

.bubbles span:nth-child(1){left:5%;animation-duration:8s}
.bubbles span:nth-child(2){left:15%;animation-duration:12s}
.bubbles span:nth-child(3){left:25%;animation-duration:10s}
.bubbles span:nth-child(4){left:35%;animation-duration:14s}
.bubbles span:nth-child(5){left:45%;animation-duration:9s}
.bubbles span:nth-child(6){left:55%;animation-duration:13s}
.bubbles span:nth-child(7){left:65%;animation-duration:11s}
.bubbles span:nth-child(8){left:75%;animation-duration:15s}
.bubbles span:nth-child(9){left:85%;animation-duration:12s}
.bubbles span:nth-child(10){left:95%;animation-duration:10s}


@keyframes rise{

0%{
transform:translateY(0) scale(0.6);
opacity:0;
}

50%{
opacity:1;
}

100%{
transform:translateY(-120vh) scale(1);
opacity:0;
}

}

`}

</style>

</div>

)

}

export default Terms