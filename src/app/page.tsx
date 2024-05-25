"use client"

import { SetStateAction, useState } from 'react'
import axios from 'axios'


export default function Home() {

  const [image,setImage] = useState("");
  const [message,setMessage] = useState("");

  async function upload() {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios ({
      method:"POST",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers:{
        "pinata_api_key": `${process.env.API_KEY}`,
        "pinata_secret_api_key": `${process.env.API_SECRET}`,
        "Content-Type": "multipart/form-data"
      }
    })

    return `https://amaranth-gentle-otter-982.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
  }
  
  function btnUploadClick(){
    setMessage("Uploading...");
    upload()
    .then(url => setMessage(url))
    .catch(err => setMessage(err.message));
  }
  
  function onFileChange(evt) {
    if (evt.target.files){
      setImage(evt.target.files[0]);
    }
  }

  return (
  <main>
    <div>
      <input type="file" id="image" onChange = {onFileChange}></input>
      <button onClick={btnUploadClick}>Upload</button>
    </div>
    <div>
      {message}
    </div>
  </main>
  )
}