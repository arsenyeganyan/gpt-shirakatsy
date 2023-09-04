import { useOutletContext } from 'react-router-dom';
import '../styles/Chat.css';
import React from 'react'

export default function Response() {
  const { 
    name, 
    result, 
    displayText, 
    blobsArr, 
    download
  } = useOutletContext();

  return (
    <div>
      {(name !== "image-generator") &&
        (blobsArr.includes(name) ? (
          <a
            href={window.URL.createObjectURL(result)}
            download={`output.${download}`}
          >
            Download the file by clicking on the icon
          </a>
        ) : (
          <>
            {displayText}
            <span aria-hidden="true"></span>
          </>
        )
      )}
      {(name === "image-generator") && (
        <img src={result.message}/>
      )}
    </div>
  )
}