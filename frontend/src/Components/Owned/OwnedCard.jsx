import React, { useEffect, useState } from 'react'

const OwnedCard = ({ art , setSelectedNFT }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const uri = 'https://dweb.link/ipfs/' + art.tokenURI.slice(7)
    async function getUsers() {
      setLoading(true)
      try {
        const response = await fetch(uri, {
          method: 'GET',
        })
        const json = await response.json()
        setName(json.name)
        setDescription(json.description)
        const img_url = 'https://dweb.link/ipfs/' + json.image.slice(7)
        setImage(img_url)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    getUsers()
  }, [art.tokenURI])
  return (
    <>
      {loading ? (
        <>
          <div className="relative group hover:text-gray-100 w-[320px]">
            <div className="absolute inset-0 bg-[#27394C] max-w-xs rounded group-hover:blur-sm"></div>
            <div className="relative max-w-xs rounded overflow-hidden shadow-lg bg-gray-900 hover:shadow-xl transition duration-300 ease-in-out ">
              <div className="w-full h-[228px] skeleton rounded"></div>
              <div className="px-6 py-4 h-[180px]">
                <div className="skeleton rounded skeletontext-head"></div>
                <div className="skeleton rounded skeletontext"></div>
                <div className="skeleton rounded skeletontext"></div>
                <div className="skeleton rounded skeletontext"></div>
                <div className="skeleton rounded skeletontext"></div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <button
                  disabled={true}
                  className="bg-blue-500 skeleton hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg"
                >
                  Loading...
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative group hover:text-gray-100 w-[320px]">
          <div className="absolute inset-0 bg-pink-600 blur-sm max-w-xs rounded group-hover:blur"></div>
          <div className="relative max-w-xs rounded overflow-hidden shadow-lg bg-gray-900 hover:shadow-xl transition duration-300 ease-in-out">
            <img className="w-full h-[228px] skeleton" src={image} alt={name} />
            <div className="px-6 py-4 h-[180px] overflow-scroll scrollbar-hide">
              <div className="font-bold text-xl mb-2 ">{name}</div>
              <p className="text-base mb-4">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button onClick={()=>{setSelectedNFT([art.id,name,description])}} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:shadow-lg">
                Sell
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default OwnedCard
