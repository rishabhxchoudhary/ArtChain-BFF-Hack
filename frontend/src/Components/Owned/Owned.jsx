import React, { useState } from 'react'
import { useStateContext } from '../../Contexts/Context'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import { useQuery } from 'urql'
import OwnedCard from './OwnedCard'
import './owned.css'
import { ethers } from 'ethers'
import NoArts from './NoArts'

const OwnedQuery = (owner_address) => {
  return `
  query {
    arts(where : {to: "${owner_address}" }) {
      id
      from
      to
      tokenURI
    }
  }
`
}

const Owned = () => {
  const { account, contract } = useStateContext()
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [loading, setLoading]= useState(false)
  const [price,setPrice] = useState(0)
  const [result, reexecuteQuery] = useQuery({
    query: OwnedQuery(account),
  })

  const outerModalRef = ()=>{
    setSelectedNFT(null);
  }
  const innerModalRef = (e)=>{
    e.stopPropagation();
  }

  const handleSubmit = async ()=>{
    setLoading(true)
    if (!account) {alert("Please connect your wallet."); return;}
    if (!contract) {alert("Contract not fetched"); return;}
    try{
      const wei = ethers.utils.parseEther(price);
      const transaction = await contract.listArt(Number(selectedNFT[0]), wei);
      await transaction.wait();
      alert('Your Art has been put for sale!');
      window.location.reload();
    }
    catch(error){
      alert(error.stack);
      console.log(error);
    }
    setLoading(false)
    setSelectedNFT(null)
    setPrice(0)
    reexecuteQuery();
    }

  return (
    <>
      <div>
        <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:leading-none pl-10 pt-10 mt-10">
          <h1 className="inline-block relative">
            <span className="relative z-10">Your Owned Assets</span>
            <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
                Your Owned Assets
            </span>
          </h1>
        </div>
        <div className="cards flex gap-9 justify-center w-screen h-full flex-wrap p-10 lg:justify-start lg:ml-10">
          {result.fetching &&           
          <>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
          </>}
          {result.error && <div>Some error Occured</div>}
          {!result.fetching && !result.error && result.data.arts.length!=0 ? result.data.arts.map((art, index) => (
            <OwnedCard
              key={index}
              art={art}
              setSelectedNFT={setSelectedNFT}
            />
        )) : (
          <>
          <NoArts/>
          </>
        )
        }
        </div>
      </div>
      {selectedNFT && (
        <div onClick={outerModalRef} className="modal text-black flex items-center justify-center fixed top-0 left-0 w-screen h-screen">
          <div onClick={innerModalRef} className="modal-content p-10 border rounded bg-white max-w-lg w-screen">
            <div className="modal-header flex items-center justify-between mb-2">
              <h2 className="modal-title font-bold text-2xl">Sell Art</h2>
              <button
                className="btn-close bg-transparent border-none cursor-pointer text-lg"
                onClick={() => {
                  setSelectedNFT(null)
                }}
              >
              </button>
            </div>
            <div className="modal-body mb-4">
              <p className='mb-1'>Art Token ID : {selectedNFT[0]}</p>
              <p className='mb-1'>Name : {selectedNFT[1]}</p>
              <p className='mb-1'>Description : {selectedNFT[2]}</p>
              <p className='mb-1'>Enter Price in ETH : </p>
              <input className='border rounded p-2'
               type="number"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value)
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                disabled={loading}
                onClick={() => {
                  setSelectedNFT(null)
                }}
              >
                {loading ? 'Busy..' : 'Cancel'}
              </button>
              {!loading && (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Sell
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Owned;