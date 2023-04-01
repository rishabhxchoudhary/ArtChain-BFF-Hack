import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import upload from '../../Assets/upload.png';
import Input from './Input';

const Create = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    nftName: '',
    description: '',
    yourName: '',
  });

  const onDrop = useCallback((acceptedFile) => {
    console.log(acceptedFile);
  }, []);
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
  });
  console.log(formInput);
  const fileStyle = useMemo(
    () =>
      `border flex flex-col items-center p-10 rounded-sm border-dashed m-10
      ${isDragActive && 'border-black'}},
      ${isDragAccept && 'border-gray-500'}}
      ${isDragReject && 'border-gray-500'}} bg-card-dark`,
    []
  );
  return (
    <div className="flex justify-center sm:px-4 p-12 mt-10 mx-auto w-[80%]">
      <div className="w-3/5 md:w-full">
        <div className="text-center">
          <h1 className="font-semibold text-6xl text-white">Create New Art</h1>
        </div>
        <div className="mt-16">
          <p className="font-semibold text-xl text-white m-10">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex-center flex-col text-center">
                <p className="text-white font-semibold text-xl">
                  JPG, PNG, GIF
                </p>
                <div className="my-12 w-full flex justify-center">
                  <img
                    src={upload}
                    className="h-[100px] w-[100px] object-conatain invert"
                  />
                </div>
                <p className="font-semibold text-xl text-white">
                  Drag and drop a file
                </p>
                <p className="font-semibold text-xl text-white">
                  Or browse a media on the device
                </p>
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
            <div className="flex gap-8 justify-between">
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
              {/* <button className="text-white bg-slate-300 rounded-xl">
                CreateNft
              </button> */}
              <button class="group rounded-2xl h-12 w-48 bg-purple-500 font-bold text-lg text-white relative overflow-hidden">
                Create
                <div class="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

// import React, { useRef, useState } from 'react';
// import { File, NFTStorage } from "nft.storage";
// import "./Create.css"
// import { useStateContext } from '../../Contexts/Context';

// const Create = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [busy, setBusy] = useState(false);
//   const {account,contract} = useStateContext();
//   const formRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !description || !image) {
//       alert('All fields are required.');
//       return;
//     }
//     if (!account) {
//       alert("Please connect your wallet."); return;
//     }
//     if (!contract){alert("Contract not fetched"); return;}

//     setBusy(true);

//     try {
//       console.log(image)
//       const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API });
//       const metadata = await client.store({
//         name:(name),
//         description,
//         image: new File([image], `Nar.jpg`, { type: 'image/jpg' }),
//       });
//       console.log(metadata.url);
//       const transaction = await contract.createArt(metadata.url);
//       await transaction.wait();
//       alert('Your NFT has been created!');
//     } catch (error) {
//       console.log(error);
//       alert('An error occurred while creating the NFT.');
//     }
//     setBusy(false);
//     setName("");
//     setDescription("");
//     setImage(null);
//     formRef.current.reset();
//   };

//   return (
//     <div className="create-nft">
//       <h1>Create NFT</h1>

//       <form onSubmit={handleSubmit} ref={formRef}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" name="name" value={name} autoComplete="off" onChange={(e) => {setName(e.target.value);}} />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea id="description" name="description" value={description} autoComplete="off" onChange={(e)=>{setDescription(e.target.value)}} />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Image</label>
//           <input type="file" id="image" name="image" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
//           {image && (
//             <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', marginTop: '1rem' }} />
//           )}
//         </div>

//         <button type="submit" disabled={busy}>
//           {busy ? 'Busy...' : 'Create'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Create;
