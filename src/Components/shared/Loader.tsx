import { createStyles } from '@mantine/core'
import React from 'react'

export default function Loader() {
    return (
        <div className="loader-inner">
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
