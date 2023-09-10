import {useEffect, useState} from "react";
import { copy, linkIcon, loader , tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { ERROR_MESSAGE } from "../constants/index.js";

const Demo = () => {

    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });
    const [allArticles, setAllArticles] = useState([]);
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const [copied, setCopied] = useState(false);
    const [lang, setLang] = useState("fr");


    const handleCopy = (copyUrl) => {

        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl).then(() => {
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({articleUrl:article.url, lang});

        if(data?.summary){
            const newArticle = {...article, summary: data.summary};
            setArticle(newArticle);

            // check if the article is already in the local storage
            const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
            if(articlesFromLocalStorage){
                const isArticleAlreadyInLocalStorage = articlesFromLocalStorage.find((article) => article.url === newArticle.url);
                if(isArticleAlreadyInLocalStorage){
                    return;
                }
            }
            setAllArticles([...allArticles, newArticle]);
            localStorage.setItem("articles", JSON.stringify([...allArticles, newArticle]));
        }
    }

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage);
        }
    },[]);

    return (
        <section className="mt-16 w-full max-w-xl min-h-min">
            {/* Search zone */}
            <div className="flex justify-center items-center mb-4">
                <div className="flex gap-5">
                    <button className={` font-bold font-satoshi transition-all duration-700 ${lang === "fr" ? "orange_gradient" : ""}`} onClick={()=>setLang("fr")}>fr-FR</button>
                    <button className={` font-bold font-satoshi transition-all duration-700 ${lang === "en" ? "orange_gradient" : ""}`} onClick={()=>setLang("en")}>en-GB</button>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2 ">
                <form onSubmit={handleSubmit } className="relative flex justify-center items-center">
                    <img src={linkIcon} alt="Link icon" className="absolute left-0 my-2 ml-3 w-5"/>

                    <input type="text" placeholder="Entrez une url..." value={article.url} onChange={(e)=>setArticle({...article, url: e.target.value})}
                    required
                    className="url_input peer"/>

                    <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" type="submit">
                        &#8629;
                    </button>
                </form>
                {/* Browse URL History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mb-5">
                    {allArticles.map((article, index) => (
                        <div key={`link-${index}`}
                        className="link_card"
                        onClick={() => setArticle(article)}
                        >
                            <div className="copy_btn" onClick={()=>{
                                handleCopy(article.url);
                            }}>
                                <img src={ copied === article.url ? tick : copy } alt="Copy icon" className="w-[40%] h-[40%] object-contain"/>
                            </div>
                            <p className="flex-1 font-satoshi orange_gradient font-bold text-sm truncate">
                                {article.url}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

            {/* Display results */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="Loader" className="w-10 h-10"/>
                ) : error ? (
                    <p className="fonct-inter font-bold text-black text-center">{ERROR_MESSAGE.URL} or {ERROR_MESSAGE.SCRAPPING}...
                    <br/>
                    <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl" > <span className="orange_gradient"> Résumé</span></h2>
                            <div className="summary_box">
                                <p  className="font-inter font-medium text-sm text-gray-700 leading-loose tracking-wide text-justify">{article.summary}</p>
                            </div>
                        </div>
                    )
                )}

            </div>
        </section>
    )
}

export default Demo;