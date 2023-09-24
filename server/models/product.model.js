const products = [
    {
        id: 1,
        name: "Jack Daniel's Tennessee Whiskey",
        price: 29.99,
        image: "assets/images/JD.png",
        quantity: 10
    },
    {
        id: 2,
        name: "Grey Goose Vodka",
        price: 19.99,
        image: "assets/images/Grey.png",
        quantity: 15
    },
    {
        id: 3,
        name: "Bacardi Superior White Rum",
        price: 24.99,
        image: "assets/images/Bacardi.jpg",
        quantity: 12
    },
    {
        id: 4,
        name: "Bombay Sapphire Gin",
        price: 22.99,
        image: "assets/images/Sapphire.png",
        quantity: 8
    },
    {
        id: 5,
        name: "Patrón Silver Tequila",
        price: 34.99,
        image: "assets/images/Tequila.jpg",
        quantity: 20
    }
];

module.exports = class Product {
    constructor(id, name, price, image, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    static getAll() {
        return products.slice();
    }

    static getById(productId) {
        let product = this.getAll().find(prod => prod.id === parseInt(productId));
        if (product) {
            return product;
        }
        return null;
    }

    static deleteById(productId) {
        const toRemoveIndex = this.getAll().findIndex(prod => prod.id === parseInt(productId));
        if (toRemoveIndex !== -1) {
            products.splice(toRemoveIndex, 1);
            return true;
        }
        return false;
    }

}