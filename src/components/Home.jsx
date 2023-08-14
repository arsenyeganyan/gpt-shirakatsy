import { useState, useEffect } from 'react';
import '/Users/arsen/Desktop/gpt-replica/src/styles/Home.css';
import { Link, useLoaderData } from 'react-router-dom';

export async function loader(){
    try {
        const res = await fetch('http://localhost:8000');
        const data = res.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}

export default function Home() {
  const data = useLoaderData();

  return (
    <div className="home--container">
        <div className='home--catch'>
            <h1>
                Introducing GPT for Shirakatsy students
            </h1>
            <Link to="/chat" id='home--link'>
                <button>
                    Start chatting
                </button>
            </Link>
        </div>
        <h2>
            Dear Shirakatsy students! Our mission is 
            to make your lives easier by providing you with the necessary resources 
            and tools for making your school projects.
        </h2>
        <h3>
            Powered by the latest technology of 
            GPT-3.5, this website gives you access for the powerful knowledge 
            of AI that will help with creating your projects.
        </h3>
        <div className="sections">
            {data.map((model, index) => (
                <section id={index}>{model.name}</section>
            ))}
        </div>
    </div>
  )
}
