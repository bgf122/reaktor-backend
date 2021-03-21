const api_url = "https://bad-api-assignment.reaktor.com/v2/products/";
const { default: fetch } = require("node-fetch");
const Products = require("../models/products");

//fetch data from legacyAPI and insert into mongoDB with custom ID
exports.getGloves = async (req, res) => {
    try {
        const response = await fetch(api_url+"gloves")
        const data = await response.json();
        const gloves = data.map(({id, ...rest}) => ({...rest, _id: id}));
        try {
            await Products.insertMany(gloves);
            console.log('Gloves updated!');
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
exports.getBeanies = async (req, res) => {
    try {
        const response = await fetch(api_url+"beanies")
        const data = await response.json();
        const beanies = data.map(({id, ...rest}) => ({...rest, _id: id}));
        try {
            await Products.insertMany(beanies);
            console.log('Beanies updated!');
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
exports.getFacemasks = async (req, res) => {
    try {
        const response = await fetch(api_url+"facemasks")
        const data = await response.json();
        const facemasks = data.map(({id, ...rest}) => ({...rest, _id: id}));
        try {
            await Products.insertMany(facemasks);
            console.log('Facemasks updated!');
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}
