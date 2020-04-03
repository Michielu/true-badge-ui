import history from './history';

const redirect = (path = "/") => {
    history.push(path);
}

export default redirect;