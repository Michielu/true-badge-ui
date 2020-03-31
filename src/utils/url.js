const remoteServerAddress = 'https://guarded-reef-50818.herokuapp.com';
const localServerAddress = 'http://localhost:4000';

const backend_url = process.env.REACT_APP_BACKEND === 'LOCAL' ? localServerAddress : remoteServerAddress;

export default backend_url;