var sqlite3 = require('sqlite3').verbose()
var databaseName = 'database/bla.db'
var db = new sqlite3.Database(databaseName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
    if (err) {
        console.log('Error opening database: ' + databaseName)
        process.exit(1)
    }
    else {
        console.log('Opened database: ' + databaseName)
    }
})

var dropUsers = 'DROP TABLE users'
var createUsers = 'CREATE TABLE users (id INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)'
var insertUser = 'INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)'
var selectUser = 'SELECT * FROM users'
var deleteUser = 'DELETE FROM users WHERE id = $id'

var dbRunCb = function (err) {
    if (err) {
        console.log('' + err)
    }
    else {
        console.log(
            '(' +
            this.lastID +
            ',' +
            this.changes +
            ') ' +
            this.sql
        )
    }
}

var dbEachUserCb = function (err, row) {
    if (err) {
        console.log('' + err)
    }
    else {
        console.log(
            row.id + ':' +
            row.first_name + ':' +
            row.last_name + ':' +
            row.email
        )
    }
}

db.serialize(function () {
    db.run(dropUsers, {}, dbRunCb)
    db.run(createUsers, {}, dbRunCb)
    db.run(insertUser, { $first_name: "Test", $last_name: "User", $email: "test@user.com" }, dbRunCb)
    db.run(insertUser, { $first_name: "Foo", $last_name: "Bar", $email: "foo@bar.com" }, dbRunCb)
    db.each(selectUser, {}, dbEachUserCb)
    db.run(deleteUser, { $id: 1 }, dbRunCb)
})

db.close()
