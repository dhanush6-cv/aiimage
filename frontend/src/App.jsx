import { Link } from "react-router-dom"
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BgRemover from "./BgRemover";
import ImageEnhancer from "./ImageEnhancer";
import Sketch from "./Sketch"
import Header from "./Header"
import "./index.css";
import Terms from "./Terms"
import Privacy from "./Privacy"
import Refund from "./Refund";
import Contact from "./Contact";
import About from "./About";
{/*import Premium from "./Premium";*/}
/* HOME PAGE */

function Home(){

const navigate = useNavigate()

return(

<div className="app">

{/* bubbles background */}
<div className="bubbles">
<span></span><span></span><span></span><span></span><span></span>
<span></span><span></span><span></span><span></span><span></span>
</div>

{/* ❌ HEADER REMOVE (Header.jsx already use pannrom) */}

<section className="hero">

<h2>AI Powered Image Tools</h2>

<div className="tools">

<div
className="tool"
onClick={()=>navigate("/background-remover")}
>
Background Remover
</div>

<div
className="tool"
onClick={()=>navigate("/enhancer")}
>
4K Image Enhancer
</div>

<div
className="tool"
onClick={()=>navigate("/sketch")}
>
Photo To Sketch
</div>

</div>

</section>


<div className="contact">

<h2 className="contact-title">
<Link to="/contact" className="contact-title-link">
Contact
</Link>
</h2>

<p className="contact-item">

Email:{" "}
<a href="mailto:aiimagegenerate0@gmail.com" className="plain-link">
 aiimagegenerate0@gmail.com
</a>

</p>

<p className="contact-item">

Instagram:{" "}
<a
href="https://instagram.com/aiimagegenerate"
target="_blank"
className="plain-link"
>
 aiimagegenerate
</a>

</p>

</div>


<footer className="footer">

<div className="line"></div>

<div className="terms">

<Link to="/about">About</Link>
<Link to="/terms">Terms & Conditions</Link>
<Link to="/refund">Refund Policy</Link>
<Link to="/privacy">Privacy Policy</Link>

</div>

</footer>

</div>

)

}


/* APP ROUTES */

function App(){

return(

<>

{/* MAIN HEADER */}
<Header/>

<Routes>

<Route path="/" element={<Home />} />

<Route path="/background-remover" element={<BgRemover />} />

<Route path="/enhancer" element={<ImageEnhancer />} />

<Route path="/sketch" element={<Sketch />} />

<Route path="/terms" element={<Terms />} />

<Route path="/refund" element={<Refund />} />

<Route path="/privacy" element={<Privacy />} />

<Route path="/contact" element={<Contact/>} />

<Route path="/about" element={<About/>} />

{/*<Route path="/premium" element={<Premium/>} />*/}

</Routes>

</>

)

}

export default App