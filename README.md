uMobileHTML5 - Test Application
============================

WARN : At the moment, the purpose of this app is just testing what we can do on a full HTML5 + JQuery Mobile App with uPortal.

You can embed this like a mobile app with phonegap for example.

But you can also simply test it with a HTML5 Browser compliant like Chrome :

chrome --disable-web-security index.html

## Notes about implementation

* for the authentication part we play with hidded iframe 

* we're using localStorage to store user parameters (username/password)

* portlets are displayed with iframe - we can imagine embedding contents of portlet in the local html view but that can be tricky if we want that links works well inside it ... all links (and forms) should be played with ajax ...

## Screenshots

### Embedded in phonegap 

![Login View](https://github.com/vbonamy/uMobileHTML5/raw/master/screenshots/uMobileHTML5-android-1.jpg)

![Home View](https://github.com/vbonamy/uMobileHTML5/raw/master/screenshots/uMobileHTML5-android-2.jpg)

![Portlet View](https://github.com/vbonamy/uMobileHTML5/raw/master/screenshots/uMobileHTML5-android-3.jpg)

