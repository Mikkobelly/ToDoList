const mongoose = require('mongoose');
const { Item } = require('./models/items');
const Work = require('./models/work');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/todolistDB');
    console.log("Database connected")
}

const items = [
    {
        name: 'Eating'
    },
    {
        name: 'Studying'
    },
    {
        name: 'Sleeping'
    }
];


const seedItems = async () => {
    try {
        await Item.deleteMany({})
        const insertedItem = await Item.insertMany(items)
        console.log(insertedItem)
    } catch (err) {
        console.log(err)
    }
}

// seedItems();

const works = [
    {
        name: 'Cleaning'
    },
    {
        name: 'Laundry'
    },
    {
        name: 'Scheduling'
    }
]

const seedWork = async () => {
    await Work.deleteMany({})
    const insertedWorks = await Work.insertMany(works);
    console.log(insertedWorks)
    mongoose.connection.close()
}

// seedWork();