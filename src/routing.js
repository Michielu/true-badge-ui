import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";

export default function Routing() {
    return (
        <div>
            <button><Link to="/">Home</Link></button>
            <button> <Link to="/about">About</Link></button>

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
    }
];