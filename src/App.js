import React, { Component, useEffect, useState, useCallback } from 'react';


export class Faker extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoaded: false, 
            api: {
                resource: 'users',
                quantity: 1,
                params: ['gender=male'],
                url: ''
            },
        }

        this.url = async (props) => {
            const base = 'https://fakerapi.it/api/v1/';
            let url = base + props.resource + '?_quantity=' + props.quantity;
            if (props.params.length > 0) {
                props.params.forEach((param) => {
                    url += `&_${param}`;
                })
            }
            return url;
            
        }
        
    }


    componentDidMount() {
        fetch(this.url(this.state.api))
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json
            })
        })
    }
    
    render() {

        const { isLoaded, items, api } = this.state;
        api.url = this.url(api);
        if (!isLoaded) {
        return <div>Loading... <a href={api.url}>{api.url}</a></div>
        }
        else { 
          // console.log(this.api(), this.state.items)
            const data = items.data[0];
            return (
                
                <div className="App">
                    <form className="App__form">
                        
                        <input
                            id='resource'
                            type="text"
                            placeholder="Resource"
                            onChange= {(e) => {
                                this.setState({
                                    api: {
                                        ...this.state.api,
                                        resource: e.target.value
                                    }
                                })
                                console.log(this.state.api.resource)
                            }}
                        />
                        <input
                            id='quantity'
                            type="text"
                            placeholder='Quantity' 
                            onChange= {(e) => {
                                this.setState({
                                    api: {
                                        ...this.state.api,
                                        quantity: e.target.value
                                    }
                                })
                                console.log(this.state.api.quantity)
                            }}
                        />
                        <input
                            id='params'
                            type="text"
                            placeholder="Params"
                            onChange= {(e) => {
                                this.setState({
                                    api: {
                                        ...this.state.api,
                                        params: e.target.value.split(',')
                                    }
                                })
                                console.log(this.state.api.params)
                            }}
                        />
                        <button id='submit' type="submit" onClick={console.log(this.state.api)}>Request</button>
                    </form>
                    <ul>
                        {Object.entries(data).map((entry) => {
                            const [key, val] = entry;
                            return <li key={key}>{val}</li>   
                        })}
                    </ul>
                </div>
            )
        }
    }
}

function getUrl(props) {
    const base = 'https://fakerapi.it/api/v1/';
    let url = base + props.res + '?_quantity=' + props.qty;
    if (props.par.length > 0) {
        props.par.forEach((param) => {
            url += `&_${param}`;
        })
    }
    return url;
}

function App() {

    const [resource, setResource] = useState('addresses');
    const [quantity, setQuantity] = useState(1);
    const [params, setParams] = useState([]);
    const [url, setUrl] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const fetchData = useCallback(() => {
        console.log(url)
        setIsLoaded(false);
        setUrl(getUrl({
            res: resource,
            qty: quantity,
            par: params,
        }));
        
        fetch(url)
        .then(res => res.json())
        .then(json => {
            setItems(json);
            setIsLoaded(true);
        })
    }, [url])

    useEffect(() => {
        console.log('fetching', url)
        fetchData();
    }, [fetchData]);

    if (!isLoaded) {
        return <div>Loading... <a href={url}>{url}</a></div>
    }
    else { 
        const data = items.data[0];
        return (
            
            <div className="App">
                <form className="App__form" onSubmit={fetchData}>
                    
                    <input
                        id='resource'
                        type="text"
                        placeholder="Resource"
                        defaultValue={resource}
                        onChange= {(e) => {
                            setResource(e.target.value)
                            console.log(resource)
                        }}
                    />
                    <input
                        id='quantity'
                        type="text"
                        placeholder='Quantity' 
                        defaultValue={quantity}
                        value={quantity}
                        onChange= {(e) => {
                            setQuantity(e.target.value)
                            console.log(quantity)
                        }}
                    />
                    <input
                        id='params'
                        type="text"
                        placeholder="Params"
                        defaultValue={params}
                        onChange= {(e) => {
                            setParams(e.target.value.split(','))
                            console.log(params)
                        }}
                    />
                    <button id='submit' type="submit">Fetch</button>
                </form>
                <ul>
                    {Object.entries(data).map((entry) => {
                        const [key, val] = entry;
                        return <li key={key}>{val}</li>   
                    })}
                </ul>
            </div>
        )
    }
}

export default App;