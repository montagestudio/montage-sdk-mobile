# montage-sdk-mobile

A re-usable Montage wrapper for native mobile app.

Montage SDK Mobile allowing the best of both world `WebApp` and `Native`, by providing `HTML5` API into the `Web-View` direclty via the via the Native `Swift` on `iOS` or `Java` Implementation on `Android` using by the bridge.

## Supported Platform
* **Apple iOS** - 7+ version
* **Android** - 14+ version 

## Cordova

This SDK is built arround Cordova. Cordova allow developing Native to JavaScript Bridge on Mobile Platforms. 

- More info:
 https://cordova.apache.org

## Quick start

Several quick start options are available:

- Clone the repo: `git clone git@github.com:montagestudio/montage-sdk-mobile.git`.
- Download Zip: ` curl --remote-name https://github.com/montagestudio/montage-sdk-mobile/archive/master.zip`

## Building montage-sdk-mobile

### Packages Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm

OSX:

```
$ brew install nodejs npm
$ gem install cocoapods
$ pod setup
```

Debian/Ubuntu:

```
$ apt-get install nodejs npm
```

### Tools Prerequisites
* NPM - Node.js package manager, should be installed when you install node.js.
* Grunt - Download and Install [Grunt](http://gruntjs.com).
* Bower - Web package manager, installing [Bower](http://bower.io/) 

[Nodejs](http://nodejs.org/) must be installed before you can use npm, bower or grunt.

```
$ sudo npm install  -g bower grunt-cli cordova ios-deploy
```

#### For Apple iOS Development 
- You will need `OSX 10.12.1+` and `XCode 8.3.2 (8E2002)`.
- Device is required for testing the Video Streaming, Emulator is not supported.
- You need to install cocoapods

#### For Android Development 
- You will need `JDK 1.8.0_60` and full `Android SDK Studio 2.2.2+` setup.
- Video and Audio Streaming is supported by Emulator but device recommended.

### Building, Running and debugging

#### Build setup

Install NPM packages in root dir to install grunt and it's dependencies.
Run Bower packages in root dir to install bower dependencies.

```
$ npm install && bower install
```

## Configure SDK

The Montage SDK Mobile come with https://montagestudio.com has a default app.
To customize your application, you need to host your app on an valid https host (e.g https://example.com). 

### Update application config.xml

#### Set application identity

Before generating the app you need to change following `<widget>` tag attributes:

- id: Application unique id (default: com.example)
- version: Application version that need to be change each time you publish a new version  (default: 0.1.x)
- android-packageName: Android application package (default: com.example)
- ios-CFBundleIdentifier: iOS application unique identifier (default: com.example.ios)

Example:
```
<widget id="com.example" version="0.1.0" 
    android-packageName="com.example.anroid"
    ios-CFBundleIdentifier="com.example.ios" 
    xmlns="http://www.w3.org/ns/widgets" ...>
```

#### Update application name and description.

You then need to customize you app name and description by changing the following tags: `<name>`,  `<description>`,  `<author>`.

Example:
```
<name>My App</name>
<description>My Real-time communication app</description>
<author email="support@example.com" href="https://example.com">My Dev Team</author>
```

Cordova config.xml documentation:
- https://cordova.apache.org/docs/en/latest/config_ref/

#### Update application content security policy

For every domain you application need to access (Assets, JS, XHR, Socket) you need to explicitly authorize each domain.

Example:
```
<access origin="https://*.example.com/*" subdomains="true" />
<allow-navigation href="https://*.example.com/*" />
```

Note: We also recommend to using the Content-Security-Policy `<meta>` in your app if you are hosting content inside Cordova www directory instead of a remote server.

- https://github.com/apache/cordova-plugin-whitelist#content-security-policy

#### Update application assets

The icons and splash-screen by default are the one of Montage, you need update the images files in `assets/` directory with you application branding. 

We already created all the files for all the screen sizes and configured `config.xml` to use them.

Note: On Android the generated icons are not created in the right location using, it's a know Cordova issue. You need to move directories insides `res/` into `platforms/android/res/` (Careful not to erase original `platforms/android/res/).

#### Build Commands

After you completed `Tools prerequisites`, `Build setup` and `Configure SDK` steps you can use these commands:

```
$ cordova build ios # build ios app to be used in XCode
$ cordova run ios  # run app in emulator
$ cordova run ios --device # run app on device
```

Simply replace ios by other platform if you want to use `montage-sdk-cordova` for more platforms,
after added the platform using command `cordova add platform $name` (e.g android, blackberry, ...)

## Troubleshooting


### Android license agreements error

Android build resulting in

```
A problem occurred configuring root project 'android'.
> You have not accepted the license agreements of the following SDK components:
  [Android SDK Platform 26, Android SDK Build-Tools 27].
  Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
  Alternatively, to learn how to transfer the license agreements from one workstation to another, go to http://d.android.com/r/studio-ui/export-licenses.html
```

To fix the issue run:
```
$ANDROID_HOME/tools/bin/sdkmanager --licenses
```

### Android "Error: spawn EACCES" on macOs

To fix the issue run:
```
chmod +x /Applications/Android\ Studio.app/Contents/gradle/gradle-4.1/bin/gradle
```

### How to debug Cordova application locally?

#### Android

1. Start application on emulator or device plugged via USB and with USB debugging enabled.
2. Open Chrome `chrome://inspect`.
3. Select you Montage SDK Mobile webview to debug.

#### iOS

1. Start application on emulator or device plugged via USB and with USB debugging enabled.
2. Open Safari 
3. Open menu `Preferences...` > `Advanced` > `Show Develop menu in menu bar`
4. Open menu `Develop`then select your device and then the Montage SDK webview

### How to I start Montage Mobile App from browser?

To start Montage App on iOS on a customized URL or App Server instance you should use the following location:

In Safari address bar:
```
montage:/https://$APP_SERVER_URL
```

Or in Javascript:
```
location = "montage:/https://$APP_SERVER_URL"
```

You will also need to add access to you `$APP_SERVER_URL` by adding the corresponding tag `<access>` to `config.xml`:

Example using example.com for `$APP_SERVER_URL` domain:
```
<access origin="https://*.example.com/*" subdomains="true" />
```

### Updates

After OS update of SDK (Xcode or Android Studio) you may need to regenerate your project.

Update Cordova:
```
sudo npm uninstall cordova -g
sudo npm uninstall cordova-android -g
sudo npm uninstall cordova-ios -g
sudo npm install cordova@7.1.0 ios-sim ios-deploy -g
```

Regenerate Apps:
```
cordova platform remove android
cordova platform add android
```

Update Env:
```
# update Pod repositories
pod repo update

# Remove and then add ios platform
cordova platform remove ios
cordova platform add ios

# Set SWIFT_VERSION to be used
echo "SWIFT_VERSION = 3.0" |tee -a platforms/ios/cordova/*.xcconfig
```

### Build Release

#### Android

Fix missing gradlew
```
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=http\://services.gradle.org/distributions/gradle-2.14.1-all.zip
```

Build and sign:
```
cordova build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk my 
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/android-release-signed.apk 
```

Deploy on test device:
```
adb install platforms/android/build/outputs/apk/android-release-signed.apk
adb shell dumpsys package com.example | grep versionName
```

#### iOS

Build and sign:
```
cordova build ios --device
cd platforms/ios/build/device
/usr/bin/xcrun -sdk iphoneos PackageApplication "$(pwd)/MyApp.app" -o "$(pwd)/MyApp.ipa"
```

### Github access

To clone this git repository, Github require from you to deploy an ssh-key for authentication:
- https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/\
- https://developer.github.com/guides/managing-deploy-keys/#deploy-keys

### Working with Intel XDK IDE
- https://software.intel.com/en-us/xdk/docs/intel-xdk-guided-tutorial 

### Working with Microsoft Visual Studio IDE
- https://taco.visualstudio.com/en-us/docs/get-started-first-mobile-app/
- https://taco.visualstudio.com/en-us/docs/tutorial-package-publish-readme/

```
cordova build ios
```

## Credits

Harold Thetiot
Sylaps Inc

## License

Kaazing Corp, all rights reserved.
