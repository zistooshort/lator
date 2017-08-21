var debug: any = null;
class GBA implements Emulator {
    title = 'iGBAKit';
    version = iGBAKitTimestamp.getDate() + '/' + iGBAKitTimestamp.getMonth() + '/' + iGBAKitTimestamp.getFullYear() + ' ' + iGBAKitTimestamp.getHours() + ':' + iGBAKitTimestamp.getMinutes();
    handles = ['gba'];
    gba: GameBoyAdvance;
    app: F7EmuApp;

    init () {
        try {
            this.gba = new GameBoyAdvance();
            this.gba.setLogger((level, error) => {
                console.log(error);
                this.gba.pause();
                var screen = document.getElementById('screen');
                this.app.addNotification({
                    title: 'Error',
                    message: 'Oops, Sorry! iGBA crashed while loading the game! We will work on fixing it as soon as possible! We suggest re-openning the app!'
                });
            });
        } catch (e) {
            this.app.alert("iGBAKit was unable to start the simulator");
        }
        if (this.gba && FileReader) {
            this.gba.logLevel = this.gba.LOG_ERROR;
            loadRom('bios.bin', bios => {
                this.gba.setBios(bios);
            });
        }        
    }

    makeControls() {
        let key = this.gba.keypad;
        function fire(code: number) {
            key.keyboardHandler({
                keyCode: code,
                type: 'keydown',
                preventDefault: () => { }
            });
            setTimeout(() => {
                key.keyboardHandler({
                    keyCode: code,
                    type: 'keyup',
                    preventDefault: () => { }
                });
            }, 1);
        }
        let wrap = document.createElement('div');
        wrap.className = 'igba-controls';
        let screenwrap = document.createElement('div');
        screenwrap.className = 'screen-wrap';
        wrap.appendChild(screenwrap);
        let canvas = document.createElement('canvas');
        canvas.className = 'screen';
        this.gba.setCanvas(canvas);
        screenwrap.appendChild(canvas);
        let content = document.createElement('div');
        content.className = 'content-block'; // TODO: This is F7 specific
        content.style.marginTop = '0px'; // TODO: Avoid inline styles
        wrap.appendChild(content);
        let play = document.createElement('div');
        play.id = 'play'; // TODO: Avoid IDs
        content.appendChild(play);
        let controls = document.createElement('div');
        controls.id = 'portrait_controls'; // TODO: Avoid IDs
        play.appendChild(controls);
        let l = document.createElement('div');
        l.className = 'button-l';
        l.innerText = 'L';
        l.addEventListener('click', () => {
            fire(key.KEYCODE_L);
        });
        controls.appendChild(l);
        let r = document.createElement('div');
        r.className = 'button-r';
        r.innerText = 'R';
        r.addEventListener('click', () => {
            fire(key.KEYCODE_R);
        });
        controls.appendChild(r);
        let buttons = document.createElement('div');
        buttons.id = 'buttons'; // Avoid using IDs
        controls.appendChild(buttons);
        let arrows = document.createElement('div');
        arrows.id = 'arrow_keys';
        buttons.appendChild(arrows);
        arrows.appendChild(Emulators.controlButton('arrow-button arrow-button-right', () => {
            fire(key.KEYCODE_RIGHT);
        }));
        arrows.appendChild(Emulators.controlButton('arrow-button arrow-button-left', () => {
            fire(key.KEYCODE_LEFT);
        }));
        arrows.appendChild(Emulators.controlButton('arrow-button arrow-button-up', () => {
            fire(key.KEYCODE_UP);
        }));
        arrows.appendChild(Emulators.controlButton('arrow-button arrow-button-down', () => {
            fire(key.KEYCODE_DOWN);
        }));
        let settings = document.createElement('div');
        settings.id = 'portrait_settings_keys';
        buttons.appendChild(settings);
        let menu = document.createElement('div');
        menu.className = 'menu-button menu-button-menu';
        menu.innerText = 'Menu';
        menu.addEventListener('click', () => {
            let buttons = [
                {
                    text: 'Close Game',
                    onClick: () => {
                        this.gba.pause();
                        this.app.closeModal();
                        this.gba.reset();
                    }
                },
                {
                    text: 'Pause/Un-Pause',
                    onClick: () => {
                        console.log("TOGGLE PAUSE");
                        var e = document.getElementById('pause');
                        if (this.gba.paused) {
                            if (debug && debug.gbaCon) {
                                debug.gbaCon.run();
                            } else {
                                this.gba.runStable();
                            }
                        } else {
                            if (debug && debug.gbaCon) {
                                debug.gbaCon.pause();
                            } else {
                                this.gba.pause();
                            }
                        }
                    }
                },
                {
                    text: 'Reset',
                    onClick: () => {
                        this.gba.pause();
                        this.gba.reset();
                    }
                },
                {
                    text: 'Cancel',
                    color: 'red'
                },
            ];
            this.app.actions(buttons);
        });
        settings.appendChild(menu);
        let start = document.createElement('div');
        start.className = 'menu-button menu-button-start';
        start.innerText = 'Start';
        start.addEventListener('click', () => {
            fire(key.KEYCODE_START);
        });
        settings.appendChild(start);
        let select = document.createElement('div');
        select.className = 'menu-button menu-button-select';
        select.innerText = 'Select';
        select.addEventListener('click', () => {
            fire(key.KEYCODE_SELECT);
        });
        settings.appendChild(select);
        let actions = document.createElement('div');
        actions.id = 'portrait_action_keys';
        buttons.appendChild(actions);
        let b = document.createElement('div');
        b.className = 'control-button button-b';
        b.innerText = 'B';
        b.addEventListener('click', () => {
            fire(key.KEYCODE_B);
        });
        actions.appendChild(b);
        let a = document.createElement('div');
        a.className = 'control-button button-a';
        a.innerText = 'A';
        a.addEventListener('click', () => {
            fire(key.KEYCODE_A);
        });
        actions.appendChild(a);
        return wrap;
    }

    openRom(rom: ROM) {
        let controls = this.makeControls();
        let progresswrap = document.createElement('div');
        progresswrap.className = 'popup popup-fetching';
        let fetchingwrap = document.createElement('div');
        fetchingwrap.className = 'fetching-wrap';
        progresswrap.appendChild(fetchingwrap);
        if (rom.title) {
            let name = document.createElement('div');
            name.className = 'game-name';
            name.innerHTML = rom.title;
            fetchingwrap.appendChild(name);
        }
        let label = document.createElement('div');
        label.className = 'label';
        fetchingwrap.appendChild(label);
        let progress = document.createElement('div');
        progress.className = 'progressbar color-blue';
        fetchingwrap.appendChild(progress);
        let bar = document.createElement('span');
        progress.appendChild(bar);
        let percent = document.createElement('div');
        percent.className = 'label';
        fetchingwrap.appendChild(percent);
        this.app.popup(progresswrap);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', rom.image);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = (e) => {
            if (e.lengthComputable) {
                let percentage = Math.round((e.loaded / e.total) * 100);
                this.app.setProgressbar(progress, percentage, 250);
                percent.innerText = percentage + '%';
            } else {
                progress.style.display = 'none';
                percent.style.display = 'none';
            }
        };
        xhr.onload = () => {
            this.app.closeModal(progresswrap);
            if (xhr.response) {
                progress.style.display = 'none';
                percent.style.display = 'block';
                percent.innerHTML = 'Starting...';
                this.gba.setRom(xhr.response);
                this.gba.runStable();
                this.app.present(controls);
            } else {
                this.app.addNotification({
                    title: 'Unable to play ROM',
                    message: `Failed to download ${rom.title}`
                });
            }

        };
        xhr.send();
    }

    openRomFile(file: File) {
        console.log("RUN: " + file);
        let controls = this.makeControls();
        this.gba.loadRomFromFile(file, (result) => {
            if (result) {
                this.gba.runStable();
                this.app.present(controls);
            } else {
                this.app.addNotification({
                    title: 'Unable to play ROM',
                    message: `Failed to load ${file.name}`
                });
            }
        });
    }
}

Emulators.register(new GBA());