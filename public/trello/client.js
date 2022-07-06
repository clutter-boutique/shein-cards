/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var ROCKET_ICON = 'https://basicbet.ch/icon.png';

TrelloPowerUp.initialize({
    'card-from-url': function(t, options) {
        return new Promise(function(resolve) {
            console.log('t is', t)
            console.log('options are', options)
            resolve({
                name: "Wondering why this doesn't work",
                desc: 'This Power-Up knows cool things about the attached url'
            });
        });
    },
    'card-badges': function(t, options) {
        return {
            text: "Static",
            icon: ROCKET_ICON, // for card front badges onlycolor: null,}
        }
    }
});