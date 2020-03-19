import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {
    return <nav>
        <Link exact='true' to='/'>首页</Link>
        <Link to='/html'>Html5</Link>
        <Link to='/css'>CSS3</Link>
        <Link to='/js'>JS</Link>
        <Link to='/node'>Node.js</Link>
    </nav>
}