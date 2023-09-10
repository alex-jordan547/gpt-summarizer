import { github, logo } from "../assets/index.js";

const Hero = () => {
    return (
       <header className="w-full flex justify-center items-center flex-col ">
            <nav className="flex justify-between items-center w-full mb-10 pt-3">
                <img src={logo} alt="Summarize logo" className="w-28 object-contain"/>

                <button
                type="button"
                onClick={() => window.open("https://github.com/alex-jordan547", "_blank")}
                className="flex justify-center items-center bg-transparent"
                >
                    <img src={github} alt="Alex Jordan" className="w-8 h-8 rounded-full object-cover" title="https://github.com/alex-jordan547"/>

                </button>
            </nav>

           <h1 className="head_text">
               Résumez les articles avec <br className="max-md:hidden"/>
               <span className="orange_gradient">OpenIA GPT-4</span>
           </h1>

           <h2 className="desc">
               Simplifiez votre expérience de lecture grâce à notre résumeur alimenté par l'IA qui transforme les longs articles en courts résumés pour un aperçu rapide et conçit.           </h2>
       </header>
    )
}

export default Hero;
