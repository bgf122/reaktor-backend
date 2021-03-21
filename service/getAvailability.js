const api_url = "https://bad-api-assignment.reaktor.com/v2/availability/";
const { default: fetch } = require("node-fetch");
const Availability = require("../models/availabilities");
const Products = require("../models/products");

exports.getAvailability = async () => {
    var data = [];
    try { 
        data = await Products.find().distinct('manufacturer');
    } catch (err) {
        console.log(err);
    } finally {
        for (i = 0; i < data.length; i++) {
            try {
                var res = await fetch(api_url+data[i]);
                var rawData = await res.json();
                const fetchAvailability = async () => {
                    res = await fetch(api_url+data[i]);
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
                try {
                    await Availability.insertMany(availability);
                    console.log(`${data[i]} availability added`);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }    
}