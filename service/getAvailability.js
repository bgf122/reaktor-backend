const api_url = "https://bad-api-assignment.reaktor.com/v2/availability/";
const { default: fetch } = require("node-fetch");
const Products = require('../models/products');

exports.getAvailability = async (products, manufacturers) => {
    for (i = 0; i < manufacturers.length; i++) {
        try {
            var res = await fetch(api_url+manufacturers[i]);
            var rawData = await res.json();
            const fetchAvailability = async () => {
                res = await fetch(api_url+manufacturers[i]);
                rawData = await res.json();
            }
            do {
                await fetchAvailability();
            } while (JSON.stringify(rawData.response).length === 4)
        } catch (err) {
            console.log(err);
        } finally {
            const fixedId = await rawData.response.map(({id, ...rest}) => ({...rest, _id: id.toLowerCase()}));
            const availability = 
                await fixedId.map(({DATAPAYLOAD, ...rest}) => 
                ({...rest, availability: (DATAPAYLOAD
                .replace("<AVAILABILITY>\n  <CODE>200</CODE>\n  <INSTOCKVALUE>", "")
                .replace("</INSTOCKVALUE>\n</AVAILABILITY>", ""))
                .toLowerCase()}));
            console.log(manufacturers[i] + ' done!')     
            try {
                products = await products.map(item1 => ({...item1, ...availability.find(item2 => item2._id === item1._id)}))
            } catch (err) {
                console.log(err);
            } finally {
                await Products.insertMany(products);
                console.log('Database up to date!')
            }
        }
    }    
}