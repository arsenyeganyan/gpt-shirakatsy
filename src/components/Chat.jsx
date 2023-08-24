import '../styles/Chat.css';
import { useEffect, useState } from 'react';
import {
  Form,
  NavLink,
  useLoaderData,
  useParams,
  useActionData,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

export async function loader() {
  try {
    const res = await fetch('http://localhost:8000/chat/');
    const data = res.json();
    return data;
  } catch(err) {
    console.log(err);
  }
}

export async function action({ params, request }) {
  try {
    const formData = await request.formData();

    const send = formData.get("request");
    const lang = formData.get("lang");
    const size = formData.get("img-size");

    var dataObj = { message: send };
    switch(params.name) {
      case "pptx-creator": 
        dataObj = { title: send, lang: lang };
        break;
      case "image-generator":
        dataObj = { title: send, size: size };
        break;
      case "personal-project-tool":
        dataObj = { title: send, lang: lang };
        break;
      case "text-to-speech":
        dataObj = { message: send, lang: lang };
        break;
    }

    const res = await fetch(`http://localhost:8000/chat/${params.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      })
      
    const result = (
      params.name === "text-to-speech" || 
      params.name === "pptx-creator" || 
      params.name === "personal-project-tool") ? 
        res.blob() : res.json();
    
    return result;
  } catch(err) {
    console.log(err);
  }
}

export default function Chat() {
  const [langs, setLangs] = useState({});
  const { name } = useParams();

  const data = useLoaderData();
  const result = useActionData();

  //getting supported langs
  useEffect(() => {
    fetch('http://localhost:8000/supported-languages/')
    .then(res => res.json())
    .then(json => setLangs(json))
  }, [])

  var download;
  switch(name) {
    case "text-to-speech":
      download = "mp3";
      break;
    case "pptx-creator":
      download = "pptx";
      break;
    case "personal-project-tool":
      download = "docx";
      break;
  }

  return (
    <div className='chat--page--container'>
        <div className="sidebar--container">
          <ul>
            {data.map((model, index) => {
              return model.sections.map((section, index) => (
                <NavLink
                  to={"/chat/" + section.name.toLowerCase().split(' ').join('-')}
                  end
                  className={({ isActive }) => isActive ? "sec--active" : "sec"}
                  key={index}
                >
                  <li>{section.name}</li>
                </NavLink>
              ))
            })}
          </ul>
        </div>
        <div className="form--contanier">
          <Form className='form' method='post'>
            <div className='main--inputs'>
              <input
                type='text'
                className='input--message'
                placeholder="Enter your messsage"
                name='request'
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
                  <select name='lang'>
                    <option value="">--Select language--</option>
                    {langs.supported_languages && 
                      Object.entries(langs.supported_languages).map(([key, value]) => (
                        <option value={value}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                    ))}
                  </select>
              )}
              {name === "image-generator" && (
                <select name='img-size'>
                  <option value="">--Select image size--</option>
                  <option value="1024x1024">1024x1024</option>
                  <option value="256x256">256x256</option>
                  <option value="512x512">512x512</option>
                </select>
              )}
            </div>
          </Form>
        </div>
        <div className='response--container'>
          <div className='response'>
            {(result && name !== "image-generator") && (
              name === "pptx-creator" ||
              name === "text-to-speech" ||
              name === "personal-project-tool" ? (
                <a href={window.URL.createObjectURL(result)} download={`output.${download}`}>
                  Download
                </a>
              ) : result.message)}
            {(result && name === "image-generator") && (
              <img src={result.message}/>
              )}
          </div>
        </div>


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
  )
}