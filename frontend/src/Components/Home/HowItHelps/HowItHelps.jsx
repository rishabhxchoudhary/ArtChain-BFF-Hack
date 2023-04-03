import React from 'react';
import './HowItHelps.css';

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
            ArtChain can also help to encourage creativity and innovation in the
            art world by providing a new outlet for artists to create and sell
            their work. ArtChain can help to encourage artists to push
            boundaries and explore new styles and mediums.
          </p>
        </a>
        <a class="card1" href="#">
          <h3>FUNDING</h3>
          <p class="small">
            We're a community of artists and art lovers who are passionate about
            supporting the arts. We provide a platform for artists to connect
            with their fans and build their following, while also giving buyers
            the opportunity to discover new and exciting artists.{' '}
          </p>
        </a>
        <a class="card1" href="#">
          <h3>TRUST</h3>
          <p class="small">
            The use of blockchain technology can help to promote transparency
            and fairness in the art market. ArtChain also helps to build trust
            between buyers and sellers, which can be especially important in the
            art world where authenticity and provenance are often major
            concerns.
          </p>
        </a>
      </div>
    </>
  );
};

export default HowItHelps;
