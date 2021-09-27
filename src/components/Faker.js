import React, { Component } from 'react';

export class Faker extends Component {

    constructor(props) {
        super(props);

        const base = 'https://fakerapi.it/api/v1';

        this.api = () => {

            let url = base + props.resource + '?_quantity=' + props.qty;
            props.params.forEach((p) => {
                url += `&_${p[0]}=${p[1]}`;
            })
            return url;
        } 

        this.state = {
            items: [],
            isLoaded: false, 
        }
    }

    componentDidMount() {
        fetch(this.api)
        .then(res => res.json())
        .then(json => {
            this.setState({
            isLoaded: true,
            items: json,
            })
        })
    }
    
    render() {
        const { isLoaded, items } = this.state;
        if (!isLoaded) {
        return <div>Loading... <a href={this.api}>{this.api}</a></div>
        }
        else { 
            const data = items.data[0];
            return (
                <div className="App">
                    <ul>
                        {Object.entries(data).map((entry) => {
                            const [key, val] = entry;
                            return <option value={key}>{val}</option>   
                        })}
                    </ul>
                </div>
            )
        }
    }
}


