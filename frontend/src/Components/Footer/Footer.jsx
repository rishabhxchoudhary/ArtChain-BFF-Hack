import React from 'react'
import './footer.css'
import logo from '../../Assets/Home/logo.png'

function Footer() {
  return (
    <div>
      <div className="footer flex flex-col items-center md:flex-row md:justify-around gap-28">
        <div className="logo flex flex-col items-center justify-center gap-2">
          <img src={logo} alt="" className="" />
          <div className="text">ArtChain-Art for everyone</div>
          <div className="socials flex gap-3">
            <a href="#" className="l1" title="Mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </a>
            <a href="#" className="l2" title="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </a>
            <a href="#" className="l3" title="Linkedin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </a>
            <a href="#" className="l4" title="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M19.606 6.995c-.076-.298-.292-.523-.539-.592C18.63 6.28 16.5 6 12 6s-6.628.28-7.069.403c-.244.068-.46.293-.537.592C4.285 7.419 4 9.196 4 12s.285 4.58.394 5.006c.076.297.292.522.538.59C5.372 17.72 7.5 18 12 18s6.629-.28 7.069-.403c.244-.068.46-.293.537-.592C19.715 16.581 20 14.8 20 12s-.285-4.58-.394-5.005zm1.937-.497C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5v-7l6 3.5-6 3.5z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="resources flex flex-col gap-1 items-center mt-4">
          <div className="title text-2xl">Resources</div>
          <div className="eth text-sm">
            <a href="https://en.wikipedia.org/wiki/Ethereum" title="Wiki">
              Know more about Ethereum
            </a>
          </div>
          <div className="mm text-sm">
            <a href="https://en.wikipedia.org/wiki/MetaMask" title="MetaMask">
              About MetaMask
            </a>
          </div>
          <div className="nft text-sm">
            <a
              href="https://en.wikipedia.org/wiki/Non-fungible_token"
              title="NFTs"
            >
              Non-Fungible Token
            </a>
          </div>
          <div className="blockchain text-sm">
            <a href="https://en.wikipedia.org/wiki/Blockchain.com" title="NFTs">
              What is blockchain?
            </a>
          </div>
          <div className="faq text-sm">
            <a href="#" title="NFTs">
              FAQs
            </a>
          </div>
        </div>
        <div className="myAcc flex flex-col gap-1 items-center mt-4">
          <div className="title text-2xl">My Account</div>
          <div className="eth text-sm">
            <a href="#" title="">
              Dashboard
            </a>
          </div>
          <div className="mm text-sm">
            <a href="#" title="">
              My collection
            </a>
          </div>
          <div className="mm text-sm">
            <a href="#" title="">
              Favorites
            </a>
          </div>
          <div className="nft text-sm">
            <a href="#" title="">
              Settings
            </a>
          </div>
          <div className="faq text-sm">
            <a href="#" title="">
              Create
            </a>
          </div>
        </div>
        <div className="join flex flex-col gap-1 items-center mt-4 mb-5">
          <div className="subscribe-box flex flex-col items-center ">
            <h2 className="text-2xl">Subscribe to our mailing list</h2>
            <form className="subscribe">
              <input
                type="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                required="required"
              />
              <button type="submit">
                {' '}
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
