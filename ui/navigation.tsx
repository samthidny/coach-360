import Link from 'next/link'
import React from 'react'
import './navigation.css';


export default async function Navigation() {

    return (

        <header className="NavBar">
            <Link href="/" className="logo-link">
                <div className="logo logo-font">COACHWISE360</div>
            </Link>
            <div className="menu">
                <ul>
                    <li><Link href="/signin">Sign in</Link></li>
                    <li><Link href="/surveys">Surveys</Link></li> 
                   <li><Link href="/questions">Questions</Link></li>
                   <li><Link href="/people">People</Link></li>
                </ul>
            </div>

        </header>
    )
}


