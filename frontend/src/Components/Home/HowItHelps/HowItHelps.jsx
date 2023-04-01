import React from 'react'
import './HowItHelps.css'

const HowItHelps = () => {
  return (
    <>
      <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:leading-none pl-10  flex">
        <h1 className="inline-block relative">
          <span className="relative z-10">How does ArtChain help?</span>
          <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
            How does ArtChain help?
          </span>
        </h1>
      </div>
      <div class="bankai flex m-10 gap-20">
        <a class="card1" href="#">
          <h3>ENCOURAGE</h3>
          <p class="small">
            We encourage digital content creators to come forward and showcase
            their art by createing NFTs.
          </p>
        </a>
        <a class="card1" href="#">
          <h3>FUNDING</h3>
          <p class="small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            at assumenda accusantium incidunt quidem? Ea praesentium nobis illo
            facere? Cumque dolorem quas similique soluta facere perferendis eius
            commodi, est laboriosam!{' '}
          </p>
        </a>
        <a class="card1" href="#">
          <h3>HAHAA</h3>
          <p class="small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            at assumenda accusantium incidunt quidem? Ea praesentium nobis illo
            facere? Cumque dolorem quas similique soluta facere perferendis eius
            commodi, est laboriosam!
          </p>
        </a>
      </div>
    </>
  )
}

export default HowItHelps
