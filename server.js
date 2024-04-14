const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

  app.get("/", function(req, res) {
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
  });


  const personSchema = new Schema({
    name: String,
    age: Number,
    favoriteFoods: {
      type: [String]
    }
  }, { collection: 'test' });

  let Person = mongoose.model('Person', personSchema);
  
  const createAndSavePerson = (done) => {
    const personData = {
      name: "John",
      age: 30,
      favoriteFoods: ["Pizza", "Sushi", "Ice Cream"]
    }
  
    const person = new Person(personData);
  
    person.save()
    .then(data => done(null, data))
    .catch(err => done(err));
  
  };


app.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error('Error fetching people:', err);
    res.status(500).json({ error: 'Error fetching people' });
  }
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});