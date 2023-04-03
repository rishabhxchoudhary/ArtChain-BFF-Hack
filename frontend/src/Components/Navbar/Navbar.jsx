import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/logo.png'
import { useStateContext } from '../../Contexts/Context'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { account, connectAccounts } = useStateContext()
  const [isConnecting, setIsConnecting] = useState(false)
  const [searchAddress, setSearchAddress] = useState('')
  const navigate = useNavigate()
  const connectionHandler = async () => {
    setIsConnecting(true)
    await connectAccounts()
    setIsConnecting(false)
    navigate('/')
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto mr-2" src={logo} alt="Logo" />
              <span className="text-white font-bold text-lg">ArtChain</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {account && (
                <>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Market
                  </Link>
                  <Link
                    to="/forsale"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    For Sale
                  </Link>
                  <Link
                    to="/owned"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Owned
                  </Link>
                  <Link
                    to="/create"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Create
                  </Link>
                  <Link
                    to="/tracker"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Ethereum Tracker
                  </Link>
                  <input
                    type="text"
                    className="bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 outline-0 placeholder-gray-400 pl-10 pr-3 py-3 w-64"
                    placeholder="Search"
                    value={searchAddress}
                    onChange={(e) => {
                      setSearchAddress(e.target.value)
                      if (e.target.value) navigate(`/profile/${e.target.value}`)
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex navRight flex-1 md:hidden">
            {isConnecting ? (
              <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                Connecting...
              </button>
            ) : account ? (
              <Link to={`/profile/${account}`}>
                <div className="text-white flex items-center gap-1 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                  <img
                    src={`https://avatars.dicebear.com/api/bottts/${account}.svg`}
                    className="h-[30px] w-[30px]"
                    alt="Avatar"
                  />
                  <span className="navbar-account-address">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="lg:pl-96">
                <button
                  onClick={connectionHandler}
                  className="bg-gradient-to-r text-base sm:text-lg from-pink-500 via-red-500 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg"
                >
                  Connect Wallet
                </button>
              </div>
            )}
            {account && (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="border md:hidden bg-gray-700 inline-flex items-end justify-end p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {account && (
                <>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Market
                  </Link>
                  <Link
                    to="/forsale"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    For Sale
                  </Link>
                  <Link
                    to="/owned"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Owned
                  </Link>
                  <Link
                    to="/create"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Create
                  </Link>
                  <Link
                    to="/tracker"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Ethereum Tracker
                  </Link>
                  <input
                    type="text"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    placeholder="Search"
                    value={searchAddress}
                    onChange={(e) => {
                      setSearchAddress(e.target.value)
                      if (e.target.value) navigate(`/profile/${e.target.value}`)
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <form className="flex items-center">
              <input
                type="text"
                className="form-input rounded-l-lg w-full py-2 px-4"
                placeholder="Search"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
