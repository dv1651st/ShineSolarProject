const myToken = 'as33dienWJawEgm!@44SDeuasrl48zdsl!_';
const myHeader = new Headers({'Authorization': `Bearer ${myToken}`})
const myURL = 'http://localhost:3000/';

function camelize(myString) {
  return myString.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0
        ? letter.toLowerCase()
        : letter.toUpperCase()
    ).replace(/\s+/g, '');
}

async function getData(myQuery) {
  const response = await fetch(myURL+myQuery, { method: 'GET', headers: myHeader});
  const data = await response.json();
  return data;
}

function createRows(data,divName) {
    //select correct section of html
    var target = document.getElementById(divName);

    //get header info and create a list from it
    const columns = target.getElementsByClassName('table')[0].children;

    var keyIndex = [];
    
    //format each string to match the formatting of the keys in our database
    //ex: First Name -> firstName
    //we will use the formatted string to fill each column with the correct data.
    for (let i = 0; i < columns.length; i++) {
      keyIndex.push(camelize(columns[i].textContent));
    }
    
    //create tables from data
    for (let i = 0; i < data.length; i++) {
        var row = Object.assign(document.createElement('div'),{className: 'table'});
        for (let j = 0; j < keyIndex.length; j++) {
            var cell = document.createElement('div');
            const val = document.createTextNode(data[i][keyIndex[j]]);
            cell.appendChild(val);
            row.appendChild(cell);
        }
        target.appendChild(row);
    }
}

const buttons = document.getElementsByTagName("button");

for (let i = 0; i < buttons.length; i++) {
  const myId = buttons[i].getAttribute('id');
  buttons[i].addEventListener("click", function onClick() {
    
    if (myId === "usersButton") {
      if (document.getElementById("one").childElementCount > 1) {
        return null;
      }
      getData("users")
        .then(data => createRows(data,"one"))
    }
    else if (myId === "ordersButton") {
      if (document.getElementById("two").childElementCount > 1) {
        return null;
      }
      getData("orders")
        .then(data => createRows(data,"two"));
    }
    else if (myId === "janeButton"){
      if (document.getElementById("three").childElementCount > 1) {
        return null;
      }
      getData("users?firstName=Jane")
        .then(user => getData(`orders?userId=${user[0].id}`))
        .then(data => createRows(data,"three"));
    }   
  })
}
  
