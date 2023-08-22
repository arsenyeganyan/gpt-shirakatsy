import '../styles/Chat.css';
import { useEffect, useState } from 'react';
import { 
  Outlet,
  Form,
  NavLink,
  Link,
  useLoaderData,
  useParams
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export async function loader(){
  try {
    const res = await fetch('http://localhost:8000/chat/');
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}

export default function Chat() {
  const data = useLoaderData();
  const { name } = useParams();
  
  const [send, setSend] = useState('');
  const [req, setReq] = useState();
  const [langs, setLangs] = useState({});
  const [rate, setRate] = useState();
  const [words, setWords] = useState();
  const [selectLangs, setSelectLangs] = useState();
  const [selectSize, setSelectSize] = useState();
  const [blob, setBlob] = useState();

  //getting supported langs
  useEffect(() => {
    fetch('http://localhost:8000/supported-languages/')
    .then(res => res.json())
    .then(json => setLangs(json))
  }, [])
  
  // normal data gathering
  function sendData(e) {
    let dataObj = { message: send };

    switch(name) {
      case "pptx-creator": 
        dataObj = { title: send, lang: selectLangs };
      case "image-generator":
        dataObj = { title: send, size: selectSize };
      case "personal-project-tool":
        dataObj = { title: send, lang: selectLangs };
      case "text-to-speech":
        dataObj = { message: send, lang: selectLangs };
    }

    fetch(name === undefined ? 
      'http://localhost:8000/chat/' : 
      `http://localhost:8000/chat/${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      }
    )
    .then(res => name === "text-to-speech" || name === "pptx-creator" ? 
      res.blob() : res.json())
    .then(json => name === "text-to-speech" || name === "pptx-creator" ? 
      setBlob(json) : setReq(json))
    .catch(err => console.log(err))

    setSend('');
    e.preventDefault();
  }
  
  if(blob){
    var download;

    switch(name) {
      case "pptx-creator":
        download = "pptx";
      case "personal-project-tool":
        download = "docx";
      case "text-to-speech":
        download = "mp3"
    }
  }

  return (
    <div className='chat--page--container'>
        <div className="sidebar--container">
          <ul>
            {data.map((model, index) => {
              return model.sections.map((section, index) => (
                <NavLink
                  to={section.name === "Chat GPT" ?
                    "." : section.name.toLowerCase().split(' ').join('-')}
                  end
                  className={({ isActive }) => isActive ? "sec--active" : "sec"}
                  id={index}
                >
                  <li>{section.name}</li>
                </NavLink>
              ))
            })}
          </ul>
        </div>
        <div className="form--contanier">
          <Form onSubmit={sendData} className='form'>
            <div className='main--inputs'>
              <input
                type='text'
                className='input--message'
                placeholder="Enter your messsage"
                name='request'
                onChange={e => setSend(e.target.value)}
                value={send}
              />
              <button type='submit'>
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
            <div className="additional--inputs">
              {(
                name === "pptx-creator" ||
                name === "text-to-speech" || 
                name === "personal-project-tool") && (
                  <select 
                    name='lang' 
                    onChange={e => setSelectLangs(e.target.value)} 
                    value={selectLangs}
                  >
                    <option value="">--Select language--</option>
                    {langs.supported_languages && Object.values(
                      langs.supported_languages).map((value, index) => (
                        <option id={index} value={value.toLowerCase()}>
                          {value.toLowerCase()}
                        </option>
                    ))}
                  </select>
              )}
              {name === "image-generator" && (
                <select 
                  name='img-size'
                  onChange={e => setSelectSize(e.target.value)}
                  value={selectSize}
                >
                  <option value="">--Select image size--</option>
                  <option value="1024x1024">1024x1024</option>
                  <option value="256x256">256x256</option>
                  <option value="512x512">512x512</option>
                </select>
              )}
              {/* <input 
                type="number"
                name='words'
                className='input--words'
                onChange={e => setWords(e.target.value)}
              /> */}
              {/* {name === "text-to-speech" && (  
                <input 
                  type="number" 
                  name='rate'
                  placeholder='Provide the rate'
                  className='input--rate'
                  onChange={e => setRate(e.target.value)}
                />
              )} */}

              {/* {here would be the file input} */}
            </div>
          </Form>
        </div>
        {req && req.message}
        {blob && (
          <a href={window.URL.createObjectURL(blob)} download={`output.${download}`}>
            Downloadasdl;kasldkasld;ka;ldkal;dkasl;dkalsdka;lskd.a,msda,.sdma,dm
          </a>
        )}
        <Outlet context={req}/>
    </div>
  )
}