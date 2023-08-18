import '/Users/arsen/Desktop/gpt-replica/src/styles/Home.css';
import { Link, useLoaderData } from 'react-router-dom';

export default function Home() {
  const data = useLoaderData();

  return (
    <div className="home--container">
        <div className='home--catch'>
            <div className="intro--container">
                <h1>
                    Introducing GPT for Shirakatsy students
                </h1>
                <Link to="/chat/" id='home--link'>
                    <button>
                        Start chatting
                    </button>
                </Link>
            </div>
            <p>
                Hi! We are two developers from your school who
                are on a journey to become better at their profession.
                We both specialize in web development. If you have found this website, 
                then you probably know who we are. For the sake of our safety 
                we encourage you to keep our identities private. Thank you.
            </p>
        </div>
        <div className="desc--container">
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
        </div>
        <div className="sections">
            {data.map((model, index) => {
                return model.sections.map((section, index) => (
                    <Link 
                        to={section.name === "Chat GPT" ? 
                            "/chat/" :
                            "/chat/" + section.name.toLowerCase().split(' ').join('-')}
                        id='home--link'
                    >
                        <section id={index}>{section.name}</section>
                    </Link>
                ))
            })}
        </div>
    </div>
  )
}
