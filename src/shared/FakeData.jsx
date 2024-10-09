import { faker } from "@faker-js/faker"

function randomCarList() {
    return {
        name: faker.vehicle.vehicle(),
        fuelType: faker.vehicle.fuel(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        image: 'https://d2m3nfprmhqjvd.cloudfront.net/blog/20230522183642/BMW-X3-1160x653.webp',
        miles: 1000,
        gearType: 'Automatic',
        price: faker.finance.amount({min: 4000, max: 20000})
    }
}

const carList = faker.helpers.multiple(randomCarList, {
    count: 7
})

export default {
    carList
}