const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const _ = require('lodash');
const { Item } = require('./models/items');
const { List } = require('./models/items');
const Work = require('./models/work');
const day = require('./date');
const items = require('./models/items');

const defaultItems = [
    {
        name: 'Add Items'
    },
    {
        name: 'Tick to Delete'
    }
];

const DBUrl = "mongodb+srv://Mikkobelly:Test123@cluster0.loq7cjn.mongodb.net/todolistDB";

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(DBUrl || "mongodb://localhost:27017/todolistDB");
    console.log("Database connected")
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    try {
        const todos = await Item.find({});
        res.render('list', { listTitle: day, list: todos })
    } catch (e) {
        console.log(e)
    }
})

app.post('/', async (req, res) => {
    const newToDo = req.body.items;
    const newItem = await new Item(newToDo);
    await newItem.save();
    res.redirect('/')
})

app.delete('/', async (req, res) => {
    try {
        const checkedItemId = req.body.checkbox;
        // console.log(req.body)
        await Item.findByIdAndDelete(checkedItemId)
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

app.get('/work', async (req, res) => {
    const works = await Work.find({});
    res.render('list', { listTitle: 'Work List', list: works })
})

app.post('/work', async (req, res) => {
    const newWork = req.body.items;
    const newItem = await new Work(newWork);
    await newItem.save();
    res.redirect('/work')
})

app.delete('/work', async (req, res) => {
    try {
        const checkedItemId = req.body.checkbox;
        await Work.findByIdAndDelete(checkedItemId)
        res.redirect('/work')
    } catch (e) {
        console.log(e)
    }
})

app.get('/:listName', async (req, res) => {
    const listName = _.capitalize(req.params.listName);
    const foundList = await List.findOne({ name: listName });
    if (foundList) {
        res.render('newList', { listTitle: listName, list: foundList.items })
    } else {
        const newList = new List({
            name: listName,
            items: defaultItems
        });
        await newList.save();
        res.redirect(`/${listName}`)
    }
})

app.post('/:listName', async (req, res) => {
    try {
        const newToDo = req.body.items;
        const newItem = new Item(newToDo);
        await newItem.save();
        const { listName } = req.params;
        const foundList = await List.findOne({ name: listName });
        foundList.items.push(newItem);
        await foundList.save();
        res.redirect(`/${listName}`)
    } catch (err) {
        console.log(err)
    }
})

app.delete('/:listName', async (req, res) => {
    try {
        const checkedItemId = req.body.checkbox;
        const listN = req.body.listName;
        const { listName } = req.params;
        List.findOneAndUpdate({ name: listN }, { $pull: { items: { _id: checkedItemId } } }, (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.redirect(`/${listName}`)
    } catch (e) {
        console.log(e)
    }
})

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000")
})