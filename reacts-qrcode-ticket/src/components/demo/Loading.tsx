import React from 'react'
import '../../styles/loading.css';
export default function Loading() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}
