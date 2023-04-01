import React from 'react'
import "./Features.css"
import display from '../../../Assets/display.png';
import seo from '../../../Assets/seo.png';
import transparent from '../../../Assets/transparent.png';

const Features = () => {
  return (
    <section class="dark">

        <div class="container py-4 flex flex-col items-center justify-center gap-10">
            <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:leading-none pl-10 pt-10 mt-10">
            <h1 className="inline-block relative">
                <span className="relative z-10">Features</span>
                <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
                Features
                </span>
            </h1>
            </div>
            <article class="postcard dark blue flex flex-col sm:flex-row p-2 max-w-5xl">
                <div class="postcard__img_link">
                    <img class="postcard__img" src={display} alt="ImageTitle" />
                </div>
                <div class="postcard__text">
                    <h1 class="postcard__title blue"><a href="#">Title</a></h1>
                    <div class="postcard__bar"></div>
                    <div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint sed, mollitia aliquid accusantium, saepe laborum praesentium iste necessitatibus velit, explicabo dicta dolore numquam nostrum aut! Dignissimos ratione a eveniet!</div>
                    <ul class="postcard__tagbox">
                        <li class="tag__item"><i class="fas fa-tag mr-2"></i>Button</li>
                    </ul>
                </div>
            </article>
            <article class="postcard dark red flex flex-col sm:flex-row p-2  max-w-5xl">
                <div class="postcard__img_link">
                    <img class="postcard__img" src={seo} alt="ImageTitle" />	
                </div>
                <div class="postcard__text flex flex-col sm:flex-row">
                    <h1 class="postcard__title red"><a href="#">Title</a></h1>
                    <div class="postcard__bar"></div>
                    <div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum sed qui nulla culpa delectus quam quaerat rerum architecto veritatis nostrum voluptate, excepturi quas ducimus? Sunt amet rem ad. Itaque, fugit.</div>
                    <ul class="postcard__tagbox">
                        <li class="tag__item"><i class="fas fa-tag mr-2"></i>Button</li>
                    </ul>
                </div>
            </article>
            <article class="postcard dark green flex flex-col sm:flex-row p-2  max-w-5xl">
                <div class="postcard__img_link" href="#">
                    <img class="postcard__img" src={transparent} alt="ImageTitle" />
                </div>
                <div class="postcard__text">
                    <h1 class="postcard__title green"><a href="#">Title</a></h1>
                    <div class="postcard__bar"></div>
                    <div class="postcard__preview-txt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt sit porro dolores quibusdam id asperiores ea quod soluta, omnis sint! Optio odit nisi quas velit inventore officia magni odio officiis!</div>
                    <ul class="postcard__tagbox">
                        <li class="tag__item"><i class="fas fa-tag mr-2"></i>Button</li>
                    </ul>
                </div>
            </article>
        </div>
    </section>
  )
}

export default Features