var appUrl = 'https://montagejs.github.io/popcorn/';

var appLocationTimer;
function setAppLocation(url) {
    clearTimeout(appLocationTimer);
    appLocationTimer = setTimeout(function() {

        // Add cordova scheme if missing
        if (url.indexOf('cordova') === -1) {
            url += ((url.indexOf('?') > -1) ? '&' : '?') + 'cordova';
        }
        
        window.location = url;

    }, 250);
}

function handleOpenURL(url) {

    var indentUrl,
        scheme = 'montage',
        schemeProtocol = scheme + ':/';

    // TODO check url host
    if (url && url.indexOf(schemeProtocol) === 0) {
        indentUrl = url.replace(schemeProtocol, '');
        setAppLocation(indentUrl);
    }
}

function checkConnection() {

    var networkState = window.navigator.connection.type,
        offlineEl = document.getElementById("offline"),
        loaderEl = document.getElementById("loader");

    if (networkState === Connection.NONE) {
        offlineEl.style.display = "block";
        loaderEl.style.display = "none";
    } else {
        offlineEl.style.display = "none";
        loaderEl.style.display = "block";
    }
}

if (window.cordova) {
    window.handleOpenURL = handleOpenURL;
} else {
    console.warn('Unable to load Cordova.')
}

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.getElementById("retry").addEventListener("click", this.onDeviceReady, false);
        document.addEventListener("online",  this.onDeviceReady, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {        
        checkConnection();
        setAppLocation(appUrl); 
    }
};

app.initialize();