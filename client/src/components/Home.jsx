import '../styles/Home.css';
import { Link, useLoaderData } from 'react-router-dom';

export async function loader() {
  try {
      const res = await fetch('https://shirgpt-87dc8f68f3b6.herokuapp.com/chat/');
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
            <div className="intro--container">
                <h1>
                    Introducing: GPT for Shirakatsy students
                </h1>
                <Link to="/chat/chat-gpt" id='home--link'>
                    <button>
                        Start Creating
                    </button>
                </Link>
            </div>
            <p>
                Hi! We are developers from your school who
                are on a journey to become better at their profession.
                We specialize in web development. If you have found this website, 
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
                GPT-3.5, this website gives you access to the powerful knowledge 
                of AI that will help with creating your projects.
            </h3>
        </div>
        <div className="sections">
            {data.map((model) => {
                return model.sections.map((section, index) => (
                    <Link 
                        to={"/chat/" + section.name.toLowerCase().split(' ').join('-')}
                        id='home--link'
                    >
                        <section key={index}>{section.name}</section>
                    </Link>
                ))
            })}
        </div>
    </div>
  )
}
