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
    BLOBS_ARR, 
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
      {(BLOBS_ARR.includes(name) ? (
        <div className='link--container'>
          <a
            href={window.URL.createObjectURL(result)}
            download={`output.${download}`}
          >
            <FontAwesomeIcon icon={icon} style={{fontSize: '50px', color: 'black'}}/>
          </a>
          Click on the icon to download file. 
          If you see nothing inside your file, try again or contact the developers.
        </div>
      ) : name === "image-generator" ? (
            <div>
              Get your image by following the
              <a 
                className='image--link' 
                target='_blank'
                href={result.message}
              >
                link
              </a>.
            </div>
          ) : (
            <>
              {displayText}
              <span aria-hidden="true"></span>
            </>
          )
      )}
    </div>
  )
}