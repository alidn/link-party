import React from "react";

export default function SpinnerCircle({width = 20, height = 20}) {
    return <div className={"ml-2 align-middle text-center"}><svg style={{position: "relative", top: "calc(50% - 10px)"}} className="spinner align-middle" width={`${width}px`} height={`${height}px`} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/>
    </svg></div>
}