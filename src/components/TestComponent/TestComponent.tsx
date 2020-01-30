import React from 'react';

interface Props { }
interface CountProps {
    count: number
}

interface State {
    count: number;
};

class TestComponent extends React.Component<Props, State> {
    state: State = {
        count: 0
    };

    increment = () => {
        this.setState({
            count: (this.state.count + 1)
        });
    };

    decrement = () => {
        this.setState({
            count: (this.state.count - 1)
        });
    };

    getPhoto = async () => {
        const url = "/photos/retrieve";
        const urlBody = {
            "id": "5d93f86afc0f8f0bb8088811"

        }
        const data: any = { //TODO change this any
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(urlBody) // body data type must match "Content-Type" header
        };
        const response = await fetch(url, data);
        const body = await response.json();
        console.log("Body: ", body);
        // this.setState({ groups: body, isLoading: false });
    }

    render() {
        return (
            <div>
                <Count count={this.state.count} />
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
                <button onClick={this.getPhoto} >Fetch from local server</button>
            </div>
        );
    }
}

export default TestComponent;

const Count: React.FunctionComponent<CountProps> = (props) => {
    return <h1>{props.count}</h1>;
};
