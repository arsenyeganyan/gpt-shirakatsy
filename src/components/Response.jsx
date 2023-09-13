import { useOutletContext } from 'react-router-dom';
import '../styles/Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';

export default function Response() {
  const { 
    name, 
    result, 
    displayText, 
    blobsArr, 
    download
  } = useOutletContext();

  var icon;
  switch(download){
    case "docx":
      icon = faFileWord;
      break;
    case "pptx":
      icon = faFilePowerpoint;
      break;
    case "mp3":
      icon = faFileAudio;
      break;
  }

  return (
    <div>
      {(name !== "image-generator") &&
        (blobsArr.includes(name) ? (
          <div className='link--container'>
            <a
              href={window.URL.createObjectURL(result)}
              download={`output.${download}`}
            >
              <FontAwesomeIcon icon={icon} style={{fontSize: '50px', color: 'black'}}/>
            </a>
            Click on the icon to download file.
          </div>
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