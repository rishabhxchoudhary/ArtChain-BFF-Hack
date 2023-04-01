import React from 'react'
import { useStateContext } from '../../Contexts/Context'
import { useQuery } from 'urql'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import ForSaleCard from './ForSaleCard'

const ForSaleQuery = (owner_address) => {
  return `
  query {
    arts(where : {from: "${owner_address}" to: "${process.env.REACT_APP_CONTRACT_ADDRESS}" }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`
}

const ForSale = () => {
  const { account } = useStateContext()
  const [result, reexecuteQuery] = useQuery({
    query: ForSaleQuery(account),
  })

  return (
    <>
      <div>
        <div className="text-gray-100 font-bold text-2xl tracking-wider sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:leading-none pl-10 pt-10 mt-10">
          <h1 className="inline-block relative">
            <span className="relative z-10">Your Assets For Sale</span>
            <span className="absolute top-0 left-0 z-0 text-blue-400 opacity-50 blur-xl">
              Your Assets For Sale
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
          {!result.fetching && !result.error && result.data.arts.map((art, index) => (
            <ForSaleCard
              key={index}
              art={art}
            />
        ))
        }
        </div>
      </div>
    </>
  )
}

export default ForSale;