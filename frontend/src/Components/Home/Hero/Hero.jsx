import React from 'react'
import './Hero.css'
import arthome from '../../../Assets/arthome.jpg'

const Hero = () => {
  return (
    <>
      <div class="home container flex h-screen items-center">
        <div class="left">
          <h1 class="rainbow-text font-black">The</h1>
          <h1 class="rainbow-text font-black">ArtChain</h1>
          <p className="mb-5 text-2xl">
            Discover, Create and Collect<span> NFT's</span>
          </p>
          <p className="max-w-[500px]">
            The Go-To market place for content creators & buyers to showcase and
            purcase the token of their choice
          </p>
        </div>
        <div class="right hidden sm:block">
          <img className="" src={arthome} alt="" />
        </div>
      </div>
    </>
  )
}

export default Hero
