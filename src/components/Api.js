

export default class Api {

    constructor () {

        this.resource = 'users';
        this.quantity = 1;
        this.params = ['gender=male'];

    }

    get url() {
        const base = 'https://fakerapi.it/api/v1/';

        let url = base + this.resource + '?_quantity=' + this.quantity;
        if (this.params.length > 0) {
            this.params.forEach((param) => {
                url += `&_${param}`;
            })
        }
        return url;
    }

    update(props) {
        this.resource = props.resource;
        this.quantity = props.quantity;
        this.params = props.params;
    }

}
