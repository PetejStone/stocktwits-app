import React from 'react'
import {useEffect, useState} from 'react'
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios'
import twitter from 'twitter-text'
import stwt from '../stocktwits-text-js/stocktwits-text.js'
import './main.scss'
import stockImage from '../images/stocktwitimg.jpg'
// twitter.autoLink(twitter.htmlEscape('#hello < @world >'))


const Main = props => {

    const [symbol, setSymbol] = useState('') //used for fetching tweets from api
    const [tweets, setTweets] = useState('') //current state of all tweets
    const [dict, setDict] = useState({}) //dictionary object to hold symbols (used for displaying symbol or checking if it already exists)
    const [exists, setExists] = useState(false) //...if user tries to add a symbol that's already been added
    const [error, setError] = useState(false) //...if user tries to add a symbol that does not exist, or server error
    const [symbolId, setSymbolId] = useState('') //ID of desired symbol for filtering the display
    const [array,setArray] = useState('')
    const [length,setLength] = useState('')
    
    useEffect(() => {

        setSymbol('') //set symbol back to blank once data is fetched, will reset form
        setArray(Object.values(dict)) //set array to values of the dict object
        setSymbolId(0) //set default state of symbolID to 0 
        
        

    },[dict, setArray,setDict,setTweets,tweets ])

    //function to handle user input
    const handleChange = (e) => {
        setSymbol(e.target.value)
        
    }

    //on submission of form
    const onSubmit = (e) => {

        
        e.preventDefault() //prevent page refresh
        axios
       .get(`https://stocktwitsapp.herokuapp.com/${symbol}`) //fetch data from proxy server
       .then(res => { 

           if (symbol in dict) {//if symbol has already been fetched
               setError(false)
               setExists(true)
               
           } else {
                dict[symbol] = symbol //add symbol to dictionary
                setArray(Object.values(dict)) //create array of symbols
                setTweets([...tweets, res.data.messages]) //set tweets to the fetched messages
                console.log(res.data.messages.length)

                setLength(res.data.messages.length)
                //set both errors back to false
                setExists(false)
                setError(false)
                
                setSymbolId(tweets.length) //set ID to the current length (id), for display
           }

               document.querySelector('#input').value = ''// resets form
           
       })

       .catch(error => {
            setExists(false)
            setError(true)
            
       })
    }

    //filtering messages through function that autoLinkins mentions, cashtags, and urls
    //**using twitter-text package
    function createMarkup(text) {
        twitter.autoLink(text)
        return {__html: text};
      }

    //function for deleting desired symbols
    function deletion(symbol, index) {
       
        //delete from dictionary
        delete dict[symbol]
        setArray(Object.values(dict))
        setSymbol('')
       
        //delete from tweets
        tweets.splice(index,1)

        //reset display of tweets depending on view
        if (index === symbolId) {
            setSymbolId(0)
        } else {
            setSymbolId(symbolId-1)
        }
        
       
        
    }

    
    
 
    return (
        <div className="main">
            
            <h1>StockTwits</h1>
           
             <p>Add Symbol</p>

             {//form for fetching symbols
             }
             <form onSubmit={(e) => onSubmit(e)}>  
                <input id="input" type="text" value={symbol} onChange={handleChange} type="symbol" />
                
                {//only display if former is true
                }
                {exists && <p className="error">You've already added this stock symbol, please pick another one.</p>}
                {error && <p className="error">There has been an error. It is likely the stock symbol you entered does not exist, please try a valid symbol.</p>}
                {array.length > 0 && <p className="displayInfo">Click on symbol to alternate tweets, <br/> Or 'X' to remove tweets <br/>
                <span className="error">The max # of tweets available from API is 30</span> </p>}
                
                
                <button onClick={onSubmit} className="formButton">Add Symbol</button>

            </form>
            
            {//map through symbols and display on page 
            }
            <div className="symbolList"> 
                {array && array.map((value, index) =>
                    <div className="symbol" id={index}>
                        <div>   
                            <p onClick={()=>  deletion(value, index)}>X</p>
                            <p onClick={() => setSymbolId(index)}>{value.toUpperCase() }</p>
                        </div> 
                        <p className='length'>({length} tweets)</p>
                    </div>
                    )}
            </div>
            
            {//reqquired stocktwits logo display
            }
            <p className="disclaimer">*Stocktwit stream made available from</p>
            <a href="https://stocktwits.com" target="_blank"><img src={stockImage} className="stockimage"/></a>
            
            {//map through and display tweets, if no tweets exists, display h3 below
            }
            {tweets.length > 0 ? tweets[symbolId].map((tweet,index) => 
                
            <div className="tweet" onClick={() => {
               
            }}>
                <div className="user">
                    <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"><img src={tweet.user.avatar_url} /> </a>
                    <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"> <p>{tweet.user.username}</p> </a>
                </div>

                <div className="content">
                    <p id={tweet.id} dangerouslySetInnerHTML={createMarkup(twitter.autoLink(tweet.body))}></p>
                    <a href={`https://stocktwits.com/message/${tweet.id}`} className="timestamp" target="_blank">{new Date(tweet.created_at).toUTCString()}</a>
                </div>
                
                
            </div>
               
                
                
                ) : <h3 className="displayInfo">Please input a symbol</h3>}
            {
                
            }
        </div>
    )
}

export default Main