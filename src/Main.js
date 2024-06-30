import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cure from "./Cure";

const Main = ()=>{
    return (
        <> 
            <BrowserRouter> 
                <Routes>
                    <Route index element = { <App/> }/>
                    <Route path = "/cure" element = { <Cure/> }/>
                </Routes>
            </BrowserRouter>
        </>

    );
};

export default Main;