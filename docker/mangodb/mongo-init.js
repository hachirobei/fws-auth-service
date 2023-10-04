db = db.getSiblingDB('fws-auth');  // Sets the new database context
db.createUser({
    user: 'user',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'fws-auth' }],
});