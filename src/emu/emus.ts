declare let iEmuKitTimestamp: Date;

interface Emulator {
    openRom(url: ROM): void;
    openRomFile(file: File): void;
    handles: string[];
    title: string;
    version: string;
    app: F7EmuApp;
    init(): void;
}

interface ROM {
    type: string;
    title: string;
    cover: string;
    author: string;
    image: string;
}

namespace Emulators {
    let known: { [type: string]: Emulator } = {};
    let handlers: Emulator[] = [];
    export let appplication: F7EmuApp;

    export function register(emu: Emulator) {
        emu.app = appplication;
        emu.init();
        emu.handles.forEach(handle => {
            known[handle] = emu;
        });
        handlers.push(emu);
    }

    export function launchROM(rom: ROM, app: F7EmuApp) {
        if (known[rom.type]) {
            known[rom.type].openRom(rom);
        } else {
            app.addNotification({
                title: 'No Handler',
                message: `iEmuKit doesn't know how to play '${rom.title}'`
            });
        }
    }

    export function launchFile(rom: File, app: F7EmuApp) {
        let bits = rom.name.split('.');
        console.log(bits);
        console.log(known[bits[bits.length - 1]]);
        if (known[bits[bits.length - 1]]) {
            known[bits[bits.length - 1]].openRomFile(rom);
        } else {
            app.addNotification({
                title: 'No Handler',
                message: `iEmuKit doesn't know how to play '${rom.name}'`
            });
        }
    }

    export function knownTypes() {
        let ts = [];
        for (let type in known) {
            if (Object.prototype.hasOwnProperty.call(known, type)) ts.push(type);
        }
        return ts;
    }

    export function knownHandlers () {
        let ret: {title: string, version: string}[] = [];
        handlers.forEach(handler => {
            ret.push({
                title: handler.title,
                version: handler.version
            });
        })
        return ret;
    }

    export function controlButton(css: string, handle: (() => void), repeat = false) {
        let html = document.createElement('div');
        html.className = css;
        html.addEventListener('click', () => {
            console.log('!! should repeat !!')
            handle();
        });
        return html;
    }
}