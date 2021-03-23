const { getAvailability } = require('./getAvailability');
const { getGloves, getFacemasks, getBeanies } = require('./fetchData');

exports.insertData = async () => {
    const gloves = await getGloves();
    const facemasks = await getFacemasks();
    const beanies = await getBeanies();

    //Make a single list of products
    const products = await (gloves.concat(facemasks)).concat(beanies);

    //Get distinct manufacturers from products
    const manufacturers = await products.map(item => item.manufacturer)
        .filter((value, index, self) => self.indexOf(value) === index);

    const data = await getAvailability(products, manufacturers);

    return data;
}




