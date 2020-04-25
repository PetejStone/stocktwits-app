import React from 'react'
import {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import './main.scss'
const Main = props => {

    const [symbol, setSymbol] = useState('')
    const [tweets, setTweets] = useState('')

    useEffect(() => {
    //    axios
    //    .get(`http://localhost:4000/${symbol}`) //temp proxy server
    //    .then(res => {
    //     //    console.log(res)
           
    //        setTweets(...tweets, res.data)
    //    })

    },[setTweets])

    const handleChange = (e) => {
        setSymbol(e.target.value)
        console.log(symbol)
    }

    const onSubmit = () => {
        axios
       .get(`http://localhost:4000/${symbol}`) //temp proxy server
       .then(res => {
        //    console.log(res.data)
           
           setTweets([...tweets, res.data.messages])
           
       })
    }


    return (
        <div>
            
            <h1>StockTwits</h1>
             <p>Add Symbol</p>
            <input type="text" value={symbol} onChange={handleChange} type="symbol" />
            <button onClick={onSubmit}>Add Symbol</button>
            {console.log(tweets)}
            {tweets && tweets[0].map(tweet => 
                <div className="tweet">
                 <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"><img src={tweet.user.avatar_url} /> </a>
                 <a href={`https://stocktwits.com/${tweet.user.username}`} target="_blank"> <p>{tweet.user.username}</p> </a>
                 <p>{tweet.body}</p>
                 <a href={`https://stocktwits.com/message/${tweet.id}`} target="_blank">{new Date(tweet.created_at).toUTCString()}</a>
                </div>
                
                
                )}
            
        </div>
    )
}

export default Main