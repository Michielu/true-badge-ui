import ReactGA from 'react-ga';

const TRACKING_ID = "UA-174545552-1";

const GAinit = () => {
    ReactGA.initialize(TRACKING_ID);
}

const GAPageView = (page: string) => {
    ReactGA.pageview(page);
}

const GAModalView = (modal: string) => {
    ReactGA.modalview(modal);
}

export {
    GAinit, GAPageView, GAModalView
}