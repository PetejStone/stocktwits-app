import React from 'react'
import {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'

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
            {tweets && tweets[0].map(tweet => <p>{tweet.body}</p>)}
            
        </div>
    )
}

export default Main