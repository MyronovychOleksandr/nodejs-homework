const fs = require("fs").promises;
const path = require("path");
const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((data) => console.table(data))
    .catch((err) => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const elementById = data.find((elem) => elem.id === contactId);
      console.table(elementById);
    })
    .catch((err) => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(async (data) => {
      const newData = data.filter((elem) => elem.id !== contactId);
      const stringifyData = JSON.stringify(newData);
      await fs.writeFile(contactsPath, stringifyData);
      await fs
        .readFile(contactsPath, "utf-8")
        .then((data) => JSON.parse(data))
        .then((data) => console.table(data));
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(async (data) => {
      let newData = [];
      if (!!name & !!email & !!phone) {
        newData = [
          ...data,
          {
            id: uuid(),
            name,
            email,
            phone,
          },
        ];
      }
      const stringifyData = JSON.stringify(newData);
      await fs.writeFile(contactsPath, stringifyData);
      await fs
        .readFile(contactsPath, "utf-8")
        .then((data) => console.table(JSON.parse(data)));
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
