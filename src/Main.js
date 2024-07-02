import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Landing";
import Cure from "./Cure";
import BookSchedule from "./BookSchedule";

const Main = ()=>{
    return (
        <> 
            <BrowserRouter> 
                <Routes>
                    <Route index element = { <App/> }/>
                    <Route path = "/cure" element = { <Cure/> }/>
                    <Route path = "/bookschedule" element = { <BookSchedule/> }/>
                </Routes>
            </BrowserRouter>
        </>

    );
};

export default Main;