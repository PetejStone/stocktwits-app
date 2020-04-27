import React from 'react'
import {useEffect, useState} from 'react'
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios'
import twitter from 'twitter-text'
import stwt from '../stocktwits-text-js/stocktwits-text.js'
import './main.scss'
// twitter.autoLink(twitter.htmlEscape('#hello < @world >'))


const Main = props => {

    const [symbol, setSymbol] = useState('')
    const [tweets, setTweets] = useState('')
    const [dict, setDict] = useState({})
    const [exists, setExists] = useState(false)
    const [error, setError] = useState(false)
    const [symbolId, setSymbolId] = useState(0)
    useEffect(() => {
    //    axios
    //    .get(`http://localhost:4000/${symbol}`) //temp proxy server
    //    .then(res => {
    //     //    console.log(res)
           
    //        setTweets(...tweets, res.data)
    //    })
       

    },[setTweets,setSymbolId])

    const handleChange = (e) => {
        setSymbol(e.target.value)
        console.log(symbol)
    }

    const onSubmit = () => {
        axios
       .get(`http://localhost:4000/${symbol}`) //temp proxy server
       .then(res => {

           
            
           
           if (symbol in dict) {
               setError(true)
           } else {
                dict[symbol] = symbol
                setTweets([...tweets, res.data.messages])

                setExists(false)
                setError(false)
           }
           
           
       })

       .catch(error => {
            setError(true)
       })
    }

    function createMarkup(text) {
        twitter.autoLink(text)
        return {__html: text};
      }

    function deletion(symbol, index) {
        console.log('dict is currently', dict)
        delete dict[symbol]
        console.log('dict is now', dict)
        
        // setSymbolId(0)
        // setTweets(messages)
        tweets.filter(tweet => tweet !== tweet[index])
        console.log('tweets are npw', tweets)
    }
    
    return (
        <div>
            {console.log(tweets)}
            <h1>StockTwits</h1>
            <h2 onClick={()=> deletion()}>XX</h2>
             <p>Add Symbol</p>
            <input type="text" value={symbol} onChange={handleChange} type="symbol" />
            {exists && <p className="error">You've already added this stock symbol, please pick another one.</p>}
            {error && <p className="error">There has been an error. It is likely the stock symbol you entered does not exist, please try a valid symbol.</p>}
            <button onClick={onSubmit}>Add Symbol</button>

            <div className="symbolList">
                {dict && Object.values(dict).map((value, index) =>
                    <div  id={index && index}
                    onClick={() => {
                        setSymbolId(index)
                    }}>
                        <p onClick={()=> deletion(value, index)}>X</p>
                        <p>{value}</p>
                    </div>
                    )}
            </div>
            

            {tweets && tweets[symbolId].map(tweet => 
                <div className="tweet">
                 <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"><img src={tweet.user.avatar_url} /> </a>
                 <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"> <p>{tweet.user.username}</p> </a>
             
                <p id={tweet.id} dangerouslySetInnerHTML={createMarkup(twitter.autoLink(tweet.body))}></p>
                
                 <a href={`https://stocktwits.com/message/${tweet.id}`} target="_blank">{new Date(tweet.created_at).toUTCString()}</a>
                </div>
                
                
                )}
            {
                
            }
        </div>
    )
}

export default Main