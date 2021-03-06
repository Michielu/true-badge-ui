import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import CreateBadge from "../components/CreateBadge/CreateBadge";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import RenderBadge from "../components/RenderBadge/RenderBadge";
import ErrorPage from "../components/Error/Error";
import Auth from "../components/Auth/Auth";


export default function Routing() {
    return (
        <div>
            {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
            <Switch>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} exact={route.exact} component={route.component} />
                ))}
                <Route path="/b/:id" children={<RenderBadge />}></Route>
                <Route path="/u/:id" children={<RenderBadge />}></Route>
            </Switch>
        </div>
    );
}

const routes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/about",
        component: About,
        exact: true
    },
    {
        path: "/create",
        component: CreateBadge,
        exact: true
    },
    {
        path: "/how",
        component: HowItWorks,
        exact: true
    },
    {
        path: "/error",
        component: ErrorPage,
        exact: true
    },
    {
        path: "/login",
        component: Auth,
        exact: true
    },
    {
        path: "/register",
        component: Auth,
        exact: true
    }
];