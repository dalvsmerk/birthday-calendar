var faker = require('faker');

function generatePersons() {
    var persons = [];

    for (var id = 0; id < 10; id++) {
        persons.push({
            "id": id,
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "birthday": faker.date.past(50),
            "relationship": faker.random.arrayElement(["family", "friend", "acquaintance"])
        });
    }
    return persons;

}

var persons = generatePersons();

console.log("{");
console.log('"persons": ');
console.log(JSON.stringify(persons));
console.log("");
console.log("}");
