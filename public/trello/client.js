/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var ROCKET_ICON = 'https://shein-cards.faitaccompli.workers.dev/icon.png';

TrelloPowerUp.initialize({
    'card-from-url': function(t, options) {
        return new Promise(function(resolve) {
            console.log('t is', t)
            console.log('options are', options)
            resolve({
                name: '💻 ' + options.url + ' 🤔',
                desc: 'This Power-Up knows cool things about the attached url'
            });
        });
    }
});