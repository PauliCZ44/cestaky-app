import { createStyles } from '@mantine/core'
import React from 'react'

//Create styled div

export default function Loader() {
    return (
        <div id="loader">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    )
}
