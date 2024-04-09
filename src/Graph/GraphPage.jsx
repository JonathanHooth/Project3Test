import React from "react";

import Graph from "./Graph";
import AutoGraph from "./AutoGraph";

import "./GraphPage.css"

export default function GraphPage(){

    return(
        <>
        <div className="">
            <AutoGraph nodeAmt={20}/>
        </div>
        </>
    )
}