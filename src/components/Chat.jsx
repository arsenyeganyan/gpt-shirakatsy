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

const blobsArr = [
  "slideshow-creator", 
  "personal-project-tool",
  "community-project-tool",
  "text-to-speech",
  "essay-writer",
  "informatics"
];

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
    const progLang = formData.get("prog-lang");
    const size = formData.get("img-size");
    const words = formData.get("words");

    var dataObj = { message: send };
    switch(params.name) {
      case "slideshow-creator":
      case "personal-project-tool":
      case "community-project-tool":
      case "informatics":
        dataObj = { title: send, lang: lang };
        break;
      case "image-generator":
        dataObj = { title: send, size: size };
        break;
      case "text-to-speech": 
      case "translator":
        dataObj = { message: send, lang: lang };
        break;
      case "informatics":
        dataObj = { message: send, lang: progLang };
      case "essay-writer":
        dataObj = { title: send, words: words, lang: lang };
        break;
    }

    const res = await fetch(`http://localhost:8000/chat/${params.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataObj)
    })
      
    const result = blobsArr.includes(params.name) ? res.blob() : res.json();
    return result;
  } catch(err) {
    console.log(err);
  }
}

export default function Chat() {
  const { name } = useParams();

  const [langs, setLangs] = useState({});
  const prog = ["C++", "C", "Python", "JavaScript", "Java"];

  const data = useLoaderData();
  const result = useActionData();

  //getting supported langs
  useEffect(() => {
    fetch('http://localhost:8000/supported-languages/')
    .then(res => res.json())
    .then(json => setLangs(json))
  }, []);

  var download;
  switch(name) {
    case "text-to-speech":
      download = "mp3";
      break;
    case "slideshow-creator":
      download = "pptx";
      break;
    case "personal-project-tool":
    case "community-project-tool":
    case "essay-writer":
    case "informatics":
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
        <div className='chat--main'>

          <div className="form--contanier">
            <Form className='form' method='post'>
              <div className='main--inputs'>
                <input
                  type='text'
                  className='input--message'
                  placeholder="Enter your messsage"
                  name='request'
                  required
                />
                <button type='submit'>
                  <FontAwesomeIcon icon={faShare} />
                </button>
              </div>
              <div className="additional--inputs">
                {(
                  name !== "informatics" && ((blobsArr.includes(name) || 
                    name === "translator" || 
                    name === "grammar-correction"))) && (
                      <select name='lang'>
                        <option value="">--Select language--</option>
                          {langs.supported_languages &&
                            Object.entries(langs.supported_languages).map(
                              ([key, value], index) => (
                                <option value={value} key={index}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </option>
                              )
                            )
                          }
                      </select>
                    )
                }
                {name === "image-generator" && (
                  <select name='img-size'>
                    <option value="">--Select image size--</option>
                    <option value="1024x1024">1024x1024</option>
                    <option value="256x256">256x256</option>
                    <option value="512x512">512x512</option>
                  </select>
                )}
                {name === "informatics" && (
                  <select name="prog-lang">
                    <option value="">--Select Programming Language--</option>
                      {prog.map((value, index) => (
                        <option value={value} key={index}>{value}</option>
                      ))}
                  </select>
                )}
                {name === "essay-writer" && (
                  <input 
                    type="number"
                    name='words'
                    min="100"
                    max="1000"
                    step="10"
                    placeholder='--Word count--'
                    className='input--words'
                  />
                )}
              </div>
            </Form>
          </div>
          <div className='response--container'>
            <div className='response'>
              {(result && name !== "image-generator") && (blobsArr.includes(name) ? (
                <a 
                  href={window.URL.createObjectURL(result)} 
                  download={`output.${download}`}
                >
                  Download
                </a>
              ) : result.message)}
              {(result && name === "image-generator") && (
                <img src={result.message}/>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}