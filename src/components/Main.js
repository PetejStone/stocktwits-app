import React from 'react'
import {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom';

const Main = props => {

    useEffect(() => {
       window.location =  `https://api.stocktwits.com/api/2/oauth/authorize?client_id=87ff18157d322323&response_type=code&redirect_uri=http://stocktwits-app.netlify.app&scope=read,watch_lists,publish_messages,publish_watch_lists,direct_messages,follow_users,follow_stocks` 
    })
    return (
        <div>
            <h1>StockTwits</h1>
        </div>
    )
}

export default Main