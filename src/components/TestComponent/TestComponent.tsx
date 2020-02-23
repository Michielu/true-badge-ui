import React from 'react';
import BadgeDataService from '../../api/badge/BadgeDataService';

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
        const a = await BadgeDataService.test();
        console.log("a", a);
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
