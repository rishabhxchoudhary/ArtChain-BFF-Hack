import React, { useState } from 'react'
import Card from './Card'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import { useStateContext } from '../../Contexts/Context'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import art from '../../Assets/art.jpg'
import { ethers } from 'ethers'

const MarketQuery = (owner_address) => {
  return `
    query {
      arts(where : {from: "0x0000000000000000000000000000000000000000" to: "${owner_address}" }) {
        id
        from
        to
        tokenURI
        price
      }
    }
  `
}

const OwnedQuery = (owner_address) => {
  return `
    query {
      arts(where : {to: "${owner_address}" }) {
        id
        from
        to
        tokenURI
        price
      }
    }
  `
}

async function handleTransaction(to, val) {
  const provider = window.ethereum
  if (provider) {
    // Use MetaMask provider
    const ethersProvider = new ethers.providers.Web3Provider(provider)
    const signer = ethersProvider.getSigner()
    const value = ethers.utils.parseEther(val) // Replace with the amount to send
    const transaction = {
      to: to,
      value: value,
    }
    const result = await signer.sendTransaction(transaction)
    console.log(result)
  } else {
    console.error('Please install MetaMask!')
  }
}

const Profile = () => {
  const { account } = useStateContext()
  const state = useParams()
  const [amount, setAmount] = useState(0)
  const [result, reexecuteQuery] = useQuery({
    query: MarketQuery(state.address),
  })
  const [ownedNft, setOwnedNft_] = useQuery({
    query: OwnedQuery(state.address),
  })
  const handleDonate = (e) => {
    e.preventDefault()
    handleTransaction(state.address, amount)
  }

  return (
    <>
      <div>
        <div className="flex justify-center mt-[100px] flex-col items-center">
          <img
            src={`https://avatars.dicebear.com/api/bottts/${state.address}.svg`}
            className="w-[100px] h-[100px] rounded-full border"
            alt=""
          />
          <h2>{state.address}</h2>
        </div>
        <div className="mt-[20px] flex flex-col p-4 rounded-[10px] w-[50%] m-auto">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
            Fund Creator
          </p>
          <div className="mt-[30px]">
            <input
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Back it because you believe in it.
              </h4>
              <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                Support the Creator for no reward, just because it speaks to
                you.
              </p>
            </div>

            <button
              className="bg-[#cd4a9d] rounded-lg p-3"
              onClick={handleDonate}
            >
              Donate Creater{' '}
            </button>
          </div>
        </div>
        <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl sm:leading-none pl-10 pt-10 mt-10 ml-[20px]">
          <h1 className="inline-block relative">
            <span className="relative z-10">Created Art</span>
            <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
              Created Art
            </span>
          </h1>
        </div>
        <div className="cards flex gap-9 justify-center w-screen h-full flex-wrap p-10 lg:justify-start">
          {result.fetching && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {result.error && console.log(result.error)}
          {!result.fetching &&
            !result.error &&
            result.data.arts.map((art, index) => (
              <Card
                key={index}
                art={art}
                isOwner={account == state.address.toLowerCase() ? 'true' : null}
              />
            ))}
        </div>
        <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl sm:leading-none pl-10 pt-10 mt-10 ml-[20px]">
          <h1 className="inline-block relative">
            <span className="relative z-10">Owned Art</span>
            <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
              Owned Art
            </span>
          </h1>
        </div>
        <div className="cards flex gap-9 justify-center w-screen h-full flex-wrap p-10 lg:justify-start lg:ml-10">
          {result.fetching && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {ownedNft.error && console.log(ownedNft.error)}
          {!ownedNft.fetching &&
            !ownedNft.error &&
            ownedNft.data.arts.map((art, index) => (
              <Card
                key={index}
                art={art}
                isOwner={account == state.address.toLowerCase() ? 'true' : null}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Profile
