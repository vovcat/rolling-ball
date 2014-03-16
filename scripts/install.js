
/*
 * install.js
 * This javascript file contains the code to install a Hosted App for Firefox OS.
 */

// get a reference to the button
var installButton = document.getElementById('playground');


function install(ev) {

    // Define the manifest URL
    var manifest_url = "http://www.francesco.iovine.name/mdn/rolling-ball/public_html/manifest.webapp";

    // Install the app
    var installLocFind = navigator.mozApps.install(manifest_url);

    // App is installed
    installLocFind.onsuccess = function(data) {        
        // relies on system notifications
    };

    // App wasn't installed
    installLocFind.onerror = function() {
        // relies on system notifications
    };
}

/* If the OS id Firefox OS */
if (navigator.mozApps) {

    // check whether the app is installed
    var installCheck = navigator.mozApps.checkInstalled("http://www.francesco.iovine.name/mdn/rolling-ball/public_html/manifest.webapp");

    installCheck.onsuccess = function() {

        /* If the app is already installed */
        if (installCheck.result) {

        } else { /* If not */

            // install the app when the user clicks on the install button
            installButton.addEventListener('click', install, false);

        }
    };
}
