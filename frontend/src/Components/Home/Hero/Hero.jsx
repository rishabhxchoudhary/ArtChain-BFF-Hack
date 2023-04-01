import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import stars from "../../../Assets/Home/stars.png"
import moon from "../../../Assets/Home/moon.png"
import mountains_behind from "../../../Assets/Home/mountains_behind.png"
import mountains_front from "../../../Assets/Home/mountains_front.png"
import img53 from "../../../Assets/Home/5348934.jpg"
import './Hero.css'

const Hero = () => {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
  return (
    <>
    <section className='relative flex p-28 justify-center items-center overflow-hidden w-full h-screen'>
        <img src={stars} id="stars" alt='' style={{left : `${offset*0.25}px`}}/>
        <img src={moon} id="moon" alt='' style={{top:`${offset*0.75}px`}}/>
        <img src={mountains_behind} id="mountains_behind" alt='' style={{top: `${offset*0.25}px`}}/>
        <h2 id="text" style={{marginRight : `${offset*4}px`,marginTop: `${offset*1.5}px`}} >ArtChain</h2>
        <Link to="#" id="btn" style={{marginTop:`${offset*1.5}px`}}>Explore</Link>
        <img src={mountains_front} style={{top:"0px"}} id="mountains_front" alt=''/>
    </section>
    <div class="sec">
        <h2>What is it ?</h2>
        <div class="left flex">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quos, aperiam illo impedit rem libero molestiae ex, alias explicabo repellendus cumque nisi harum aut error nam! Assumenda magni, similique eaque hic corporis et consectetur! Quae alias adipisci culpa, molestiae modi, non voluptatum, voluptates necessitatibus hic molestias tempore reprehenderit repellat incidunt eum quisquam, optio libero deleniti doloremque odit temporibus? Totam tempora quis soluta accusantium distinctio! Magni harum reprehenderit officiis vitae excepturi omnis evdignissimos nihil quod tempora doloribus totam! Quae, consectetur placeat! Voluptate commodi id eligendi placeat accusamus error, quos quasi blanditiis sunt incidunt explicabo ex laborum dolor tempora nobis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius fugit eos assumenda vitae suscipit, possimus repellendus. Eum, sapiente molestiae.</p>
            <img src={img53} alt=''/>
        </div>
    </div>
    </>
  )
}

export default Hero