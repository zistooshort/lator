/// <reference path="framework7.d.ts" />
/// <reference path="gba.d.ts" />
/// <reference path="../app/inb.ts" />
/// <reference path="../app/t7.ts" />
/// <reference path="../app/f7.ts" />

declare let iGBAKitTimestamp: Date;
namespace iGBAKit {
    export let skinelm = document.createElement('style');
    document.head.appendChild(skinelm);
    var savedskin = localStorage.getItem('iGBASkin');
    if (savedskin == null) {
        localStorage.setItem('iGBASkin', '');
        localStorage.setItem('iGBASkin-Title', 'default');
    } else {
        if (localStorage.getItem('iGBASkin-Title') != 'default') {
            Dom7(skinelm).text(savedskin);
            Dom7('body').addClass('layout-iGBASkins');
        }
    }
}

window.addEventListener('load', () => {
    let splash = document.getElementById('splash');
    function fade(element: HTMLElement) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
                splash.parentElement.removeChild(splash);
            }
            element.style.opacity = op.toString();
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 40);
    }
    fade(splash);
});

Emulators.appplication = new F7EmuApp();