var app = {

    appUrl: "https://montagejs.github.io/popcorn/",
    appCustomScheme: "montage",

    appLocationArg: 'cordova',
    appLocationDelay: 250,
    appLocationTimer: null,
    appLocation: null,

    retryBtn: null,
    loaderEl: null,
    offlineEl: null,

    // Application Constructor
    initialize: function() {
        var self = this;

        self.loaderEl = document.getElementById("loader");
        self.offlineEl = document.getElementById("offline");
        self.retryBtn = document.getElementById("retry");
        
        if (self.retryBtn) {
            self.retryBtn.addEventListener("click", this.onDeviceReady.bind(this), false);   
        }

        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("online",  this.onNetworkReady.bind(this), false);
    },

    getConnection: function (resolve, reject) {
        try {
            
            // Try offline using "?offline"
            if (
                location && 
                    location.search && 
                        location.search.indexOf('offline') !== -1
            ) {
                reject(new Error('offLine'));
                return;
            }   

            if (
                navigator && 
                    navigator.connection && 
                        navigator.connection.type &&
                            navigator.connection.type !== Connection.UNKNOWN
            ) {
                if (navigator.connection.type !== Connection.NONE) {
                    resolve(navigator.connection.type);
                } else {
                    reject(new Error(navigator.connection.type));
                }
            } else if (navigator.onLine) {
                resolve('onLine');
            } else {
                reject(new Error('offLine'));
            }

        } catch (err) {
            reject(err);
        }
    },

    setAppLocation: function (url, resolve, reject) {
        var self = this;
        try {
            // Check Url
            if (!url) {
                reject(new Error("Invalid Url"));
            }

            // Add customArg cordova if missing
            var appLocationArg = self.appLocationArg;
            if (url.indexOf(appLocationArg) === -1) {
                url += ((url.indexOf('?') > -1) ? '&' : '?') + appLocationArg;
            }

            // Perform  delayed redirect
            var appLocation = self.appLocation;
            if (appLocation !== url) {    

                self.appLocation = url;
                
                if (self.appLocationTimer) {
                    clearTimeout(self.appLocationTimer);   
                }

                self.appLocationTimer = setTimeout(function() {

                    // Clear timer
                    self.appLocationTimer = null;

                    // Resolve promise
                    resolve(url);

                    // use replace to remove history
                    window.location.replace(url);

                }, self.appLocationDelay);   
            } else {

                // Resolve
                resolve(url);

                // TODO? OR crash ?
                //reject(new Error('Already opening same url: ' + url));
            }
        } catch (err) {
            reject(err);
        }
    },

    //
    // Events
    // 

    handleOpenURL: function (url) {

        var self = this,
            customProtocol = self.appCustomScheme && self.appCustomScheme + ':/';

        if (
            customProtocol && url &&
                url.indexOf(customProtocol) === 0
        ) {
            // TODO use substr ?
            var indentUrl = url.replace(customProtocol, '');
            self.setAppLocation(indentUrl, function (url) {
                console.log('handleOpenURL, will open url: ' + url);
            }, function (err) {
                console.log('handleOpenURL, failed cause: ' + err);
            });  
        }
    },

    onNetworkReady: function() {
        var self = this,
            appUrl = this.appLocation || this.appUrl;

        self.getConnection(function (networkState) {
            self.setAppLocation(appUrl, function (url) {
                console.log('onNetworkReady, will open url: ' + url);
            }, function (err) {
                console.log('onNetworkReady, failed cause: ' + err);
            }); 
        });
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        var self = this,
            loaderEl = self.loaderEl,
            offlineEl = self.offlineEl;

        offlineEl.classList.add('hidden');
        loaderEl.classList.remove('hidden');
        loaderEl.classList.add('show');

        self.getConnection(function (networkState) {
            self.onNetworkReady();
        }, function (err) {
            loaderEl.classList.add('hidden');
            offlineEl.classList.remove('hidden');
            offlineEl.classList.add('show');
            console.log('getConnection, failed cause: ' + err);
        });
    }
};

app.initialize();