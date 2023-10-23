import '../styles/Chat.css';
import { useEffect, useState, useReducer } from 'react';
import {
  Form,
  NavLink,
  useLoaderData,
  useParams,
  useActionData,
  Outlet,
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CanvasLoader from './CanvasLoader';

//nginx build: bin/start-nginx-solo

const BLOBS_ARR = [
  "slideshow-creator",
  "personal-project-tool",
  "community-project-tool",
  "text-to-speech",
  "essay-writer",
  "informatics"
];

export async function action({ params, request }) {
  try {
    const formData = await request.formData();

    const send = formData.get("request");
    const lang = formData.get("lang");
    const progLang = formData.get("prog-lang");
    const size = formData.get("img-size");
    const words = formData.get("words");

    var dataObj;
    switch(params.name) {
      case "slideshow-creator":
      case "personal-project-tool":
      case "community-project-tool":
      case "image-generator":
        dataObj = { title: send, size: size };
        break;
      case "text-to-speech": 
      case "translator":
        dataObj = { message: send, lang: lang };
        break;
      case "informatics":
        dataObj = { message: send, lang: progLang };
        break;
      case "essay-writer":
        dataObj = { title: send, words: words, lang: lang };
        break;
      default:
        dataObj = { message: send };
    }
    console.log(dataObj);

    console.log(params.name);
    const res = await fetch(
      `http://localhost:8000/chat/${params.name}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      }
    );

    if(!res.ok) {
      throw new Error("An error occured: " + res.status);
    }

    const result = BLOBS_ARR.includes(params.name) ? res.blob() : res.json();
    console.log(result);
    return result;
  } catch(err) {
    console.log(err);
  }
}

const ACTION_TYPES = {
  SET_LOADING: "loading",
  SET_CHECK: "check",
}

const reducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: !state.loading
      }
    case ACTION_TYPES.SET_CHECK:
      return {
        ...state,
        check: !state.check
      }
    default:
      return state;
  }
}

export default function Chat() {
  const { name } = useParams();

  
  const prog = ["C++", "C", "Python", "JavaScript", "Java"];

  const [langs, setLangs] = useState({});
  const [displayText, setDisplayText] = useState('');
  const [state, dispatch] = useReducer(reducer, { loading: false, check: false });

  const data = useLoaderData();
  const result = useActionData();

  //getting supported langs
  useEffect(() => {
    fetch('https://shirgpt-87dc8f68f3b6.herokuapp.com/supported-languages/')
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

  //handling loading state and multiline animations
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_LOADING });

    if(result && (BLOBS_ARR.includes(name) === false) && name !== "image-generator") {
      function typeWriter(text, i) {
        if(i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          setTimeout(() => {
            typeWriter(text, i + 1);
          }, 30);
        }
      }
      typeWriter(result.message, 0);
    }
  }, [result]);

  return (
    <div className='chat--page--container'>
      <div className='hamburger--container'>
        <button 
          onClick={() => dispatch({ type: ACTION_TYPES.SET_CHECK })}
          className={state.check ? 'hb--checked' : 'hb--check'}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={state.check ? "sidebar--minimize" : "sidebar--container"}>
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
      </div>
      <div className='chat--main'>
        <div className="form--container">
          <Form className='form' method='post'>
            <div className='main--inputs'>
              <input
                type='text'
                className='input--message'
                placeholder="Enter your messsage"
                name='request'
                required
              />
              <button type='submit' onClick={() => dispatch({ type: ACTION_TYPES.SET_LOADING })}>
                <FontAwesomeIcon icon={faShare} />
              </button>
            </div>
            <div className="additional--inputs">
              {(
                name !== "informatics" && ((BLOBS_ARR.includes(name) ||
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
                  <option value="256x256">256x256</option>
                  <option value="512x512">512x512</option>
                  <option value="1024x1024">1024x1024</option>
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
          {state.loading && (
            <div className='loading--state'>
              <CanvasLoader />
            </div>
          )}
          <div className={state.loading ? "" : "response"}>
            {(result && !state.loading) && 
              <Outlet context={{ name, result, displayText, BLOBS_ARR, download }}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}