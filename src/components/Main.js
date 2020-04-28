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
    const [symbolId, setSymbolId] = useState('')
    const [array,setArray] = useState('')
    const [check, setCheck] = useState(0)
    useEffect(() => {
    //    axios
    //    .get(`http://localhost:4000/${symbol}`) //temp proxy server
    //    .then(res => {
    //     //    console.log(res)
           
    //        setTweets(...tweets, res.data)
    //    })
        setSymbol('')
        setArray(Object.values(dict))
        setSymbolId(0)
        
        

    },[dict, setArray,setDict,setTweets,tweets ])

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
                setArray(Object.values(dict))
                setTweets([...tweets, res.data.messages])
                setExists(false)
                setError(false)
                //console.log(tweets.length)
                setSymbolId(tweets.length)
           }

           document.querySelector('#input').value = ''
           
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
        console.log('dict is currently', dict, array)
        delete dict[symbol]
        setArray(Object.values(dict))
        setSymbol('')
        //setCheck(index)
        
        //console.log(tweets.splice(check,1))
        tweets.splice(index,1)
        if (index === symbolId) {
            setSymbolId(0)
        } else {
            setSymbolId(symbolId-1)
        }
        
        console.log('tweets is now', tweets)
        
    }

    
    
 
    return (
        <div>
            {console.log(tweets, dict,array)}
            <h1>StockTwits</h1>
           
             <p>Add Symbol</p>
            <input id="input" type="text" value={symbol} onChange={handleChange} type="symbol" />
            {exists && <p className="error">You've already added this stock symbol, please pick another one.</p>}
            {error && <p className="error">There has been an error. It is likely the stock symbol you entered does not exist, please try a valid symbol.</p>}
            <button onClick={onSubmit}>Add Symbol</button>

            <div className="symbolList">
                {array && array.map((value, index) =>
                    <div  id={index}>
                        <p onClick={()=>  deletion(value, index)}>X</p>
                        <p onClick={() => setSymbolId(index)}>{value}</p>
                        
                    </div>
                    )}
            </div>
            

            {tweets.length > 0 ? tweets[symbolId].map((tweet,index) => 
                
            <div className="tweet" onClick={() => {
               
            }}>
            
                <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"><img src={tweet.user.avatar_url} /> </a>
                <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"> <p>{tweet.user.username}</p> </a>
            
                <p id={tweet.id} dangerouslySetInnerHTML={createMarkup(twitter.autoLink(tweet.body))}></p>
                
                <a href={`https://stocktwits.com/message/${tweet.id}`} target="_blank">{new Date(tweet.created_at).toUTCString()}</a>
            </div>
               
                
                
                ) : <h3>Please input a symbol</h3>}
            {
                
            }
        </div>
    )
}

export default Main