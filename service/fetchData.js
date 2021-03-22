const api_url = "https://bad-api-assignment.reaktor.com/v2/products/";
const { default: fetch } = require("node-fetch");
const Products = require("../models/products");

//fetch data from legacyAPI and insert into mongoDB with custom ID
exports.getGloves = async (req, res) => {
    try {
        const response = await fetch(api_url+"gloves")
        const data = await response.json();
        const gloves = await data.map(({id, ...rest}) => ({...rest, _id: id}));
        console.log('gloves done');
        return gloves;     
    } catch (err) {
        console.log(err);
    }
}
exports.getBeanies = async (req, res) => {
    try {
        const response = await fetch(api_url+"beanies")
        const data = await response.json();
        const beanies = await data.map(({id, ...rest}) => ({...rest, _id: id}));
        console.log('beanies done');
        return beanies;
    } catch (err) {
        console.log(err);
    }
}
exports.getFacemasks = async (req, res) => {
    try {
        const response = await fetch(api_url+"facemasks")
        const data = await response.json();
        const facemasks = await data.map(({id, ...rest}) => ({...rest, _id: id}));
        console.log('facemasks done');
        return facemasks;
    } catch (err) {
        console.log(err);
    }
}
