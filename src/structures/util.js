module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

};