# Alchemistry

`This repo uses webpack for building purposes`  
Alchemistry is a dating app for DnD players

## How to install

- Clone or download this repo
- Run `npm install` or `yarn add` (if the tar dependency of node-sass alerts the tar dependency, run `npm audit fix`)
- Run `npm run dev` to transpile full files into the dist folder or `npm run build` to transpile minified files
  > - Run `npm start:dev` to transpile development files and open a local live reload server for static development
- Run `npm start` to start a local express server with the files in the dist folder

## mongoDB scheme
```json
{ "_id": "xxxxxxxxxxxxxxxxx",  
"username": "testaccount",  
"password": "hashedPassword",  
"name": "testaccount",  
"background": "",  
"dndClass": "male",  
"bday": "01-01-1990",  
"faction": "3rd Edition",  
"interest": "Female",  
"traits": "",  
"ideals": "",  
bonds: '',  
flaws: '',  
id: 'testaccount',  
avatar: null,  
characters:  
[ { name: 'Char1',  
background: '',  
race: 'Dwarf',  
dndClass: 'Barbarian',  
level: '',  
age: '',  
faction: '',  
traits: '',  
ideals: '',  
bonds: '',  
flaws: '' },  
{ name: 'Char2',  
background: '',  
race: 'Dwarf',  
dndClass: 'Barbarian',  
level: '',  
age: '',  
faction: '',  
traits: '',  
ideals: '',  
bonds: '',  
flaws: '' } ],  
race: 'Human',  
user: sessionUser,  
dndData:  
}  
```
