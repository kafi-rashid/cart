const users = [
    {
        id: 1,
        username: "kafi",
        password: "1234"
    },
    {
        id: 2,
        username: "john",
        password: "1234"
    }
];

module.exports = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static login(username, password) {
        let user = users.slice().find(u => u.username === username && u.password === password);
        if (user) {
            let authUser = JSON.parse(JSON.stringify(user));
            delete authUser.password;
            let message = {
                token: new Date().getTime(),
                user: authUser
            }
            return message;
        }
        return false;
    }
}