import { SOCIALS } from "../constants/index.js";


const Footer = () => {
    return (
        <footer className="p-4 gap-2 flex justify-center w-full items-center mt-auto ">
            <p className="font-inter font-bold text-md">© 2023 Alex Jordan -</p>
            <div className="flex gap-2">
                {
                    SOCIALS.map((social, index) => (
                        <img onClick={() => window.open(social.url,'_blank')} key={`social-${index}`} src={social.icon} className="w-5 h-5 hover:cursor-pointer transition-all duration-500 hover:scale-125" alt={social.name}  title={social.url}/>
                    ))
                }
            </div>
        </footer>
    )
}

export default Footer;