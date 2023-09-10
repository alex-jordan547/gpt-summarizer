import './App.css';
import Hero from "./components/Hero.jsx";
import Demo from "./components/Demo.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <main>
            <div className="main">
                <div className="gradient">

                </div>
            </div>

            <div className="app">
                <Hero />
                <Demo />
                <Footer />
            </div>
        </main>
    )
}

export default App;