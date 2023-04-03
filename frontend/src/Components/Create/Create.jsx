import React, { useState, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import upload from '../../Assets/upload.png'
import Input from './Input'
import { File, NFTStorage } from 'nft.storage'
import { useStateContext } from '../../Contexts/Context'

const Create = () => {
  const { contract } = useStateContext()
  const [fileUrl, setFileUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [formInput, setFormInput] = useState({
    nftName: '',
    description: '',
    yourName: '',
  })

  const onDrop = useCallback((acceptedFile) => {
    setImage(acceptedFile[0])
    console.log(acceptedFile)
  }, [])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  })
  console.log(formInput)
  const fileStyle = useMemo(
    () =>
      `border flex flex-col items-center p-10 rounded-sm border-dashed m-10
      ${isDragActive && 'border-black'}},
      ${isDragAccept && 'border-gray-500'}}
      ${isDragReject && 'border-gray-500'}} bg-card-dark`,
    [],
  )

  async function handleSubmit(e) {
    e.preventDefault()
    if (
      !formInput.nftName ||
      !formInput.description ||
      !formInput.yourName ||
      !image
    ) {
      alert('Please fill all the fields and upload an image')
      return
    }
    setLoading(true)
    const client = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API,
    })
    const metadata = await client.store({
      name: formInput.nftName,
      description: formInput.description,
      creator: formInput.yourName,
      image: new File([image], `${formInput.name}.jpg`, { type: 'image/jpg' }),
    })

    const transaction = await contract.createArt(metadata.url)
    await transaction.wait()
    alert('Your NFT has been created!')
    setLoading(false)
    window.location.reload()
  }
  return (
    <div className="flex justify-center sm:px-4 p-12 mt-10 mx-auto max-w-[1400px]">
      <div className="w-full">
        <div className="text-center">
          <h1 className="font-semibold text-4xl text-white">Create New Art</h1>
        </div>
        <div className="mt-10">
          <p className="font-semibold text-xl text-white m-10">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex-center flex-col text-center">
                <p className="text-white font-semibold text-xl">
                  JPG, PNG, GIF
                </p>
                <div className="my-12 w-full flex justify-center">
                  {image ? (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        className="object-conatain"
                        alt=""
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={upload}
                        className="h-[100px] w-[100px] object-conatain invert"
                        alt=""
                      />
                    </>
                  )}
                </div>
                <p className="font-semibold text-xl text-white">
                  {image ? 'Change Image' : 'Drag and drop a file'}
                </p>
                {!image && (
                  <p className="font-semibold text-xl text-white">
                    Or browse a media on the device
                  </p>
                )}
              </div>
              <div>
                {fileUrl && (
                  <aside>
                    <div>
                      <img src={fileUrl} alt="asset_file" />
                    </div>
                  </aside>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <Input
                inputType="text"
                title="NFT Name"
                placeholder="Enter NFT Name"
                handleclick={(e) =>
                  setFormInput({ ...formInput, nftName: e.target.value })
                }
              />
              <Input
                inputType="text"
                title="Your Name"
                placeholder="Enter your Name"
                handleclick={(e) =>
                  setFormInput({ ...formInput, yourName: e.target.value })
                }
              />
            </div>
            <Input
              inputType="textarea"
              title="Description"
              placeholder="Mention something about the art"
              handleclick={(e) =>
                setFormInput({ ...formInput, description: e.target.value })
              }
            />

            <div className="mt-4 w-full flex justify-end">
              <button
                disabled={loading}
                onClick={handleSubmit}
                class="group rounded-2xl h-12 w-48 bg-purple-500 font-bold text-lg text-white relative overflow-hidden"
              >
                {loading ? 'Busy...' : 'Create'}
                <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
