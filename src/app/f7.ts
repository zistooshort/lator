/// <reference path="../emu/emus.ts" />

class F7EmuApp extends Framework7 {
    constructor () {
        super({
            modalTitle: 'iGBA',
            precompileTemplates: true,
            template7Pages: true,
            template7Data: {
                "emukit": {
                    emus: Emulators.knownHandlers()
                },
                "about": {
                    "igba": iGBAKitTimestamp.getDate() + '/' + iGBAKitTimestamp.getMonth() + '/' + iGBAKitTimestamp.getFullYear() + ' ' + iGBAKitTimestamp.getHours() + ':' + iGBAKitTimestamp.getMinutes(),
                    "iemu": iEmuKitTimestamp.getDate() + '/' + iEmuKitTimestamp.getMonth() + '/' + iEmuKitTimestamp.getFullYear() + ' ' + iEmuKitTimestamp.getHours() + ':' + iEmuKitTimestamp.getMinutes()
                },
                "roms": {},
                "skins": {},
                "credits": {}
            },
            init: false
        });
        
        if (localStorage.getItem('dark-mode') === "true") {
            Dom7('body').removeClass('layout-light').addClass('layout-dark');
            Dom7('.myLabel').css('background', '#131313');
            localStorage.setItem('dark-mode', "true");
        }
        document.getElementById('file-picker').addEventListener('change', () => {
            Emulators.launchFile((document.getElementById('file-picker') as HTMLInputElement).files[0], this);
        });
        (document.getElementById('file-picker') as HTMLInputElement).accept = (() => {
            let list = '';
            Emulators.knownTypes().forEach(type => {
                list += type + ',';
            });
            return list;
        })();
        this.addView('.main-view', {
            dynamicNavbar: true,
            domCache: true
        });

        this.onPageInit('skins', (page) => {
            function current() {
                let title = localStorage.getItem('iGBASkin-Title');
                if (title == 'default') {
                    Dom7(page.container).find('.current-skin-buttons').hide();
                    Dom7(page.container).find('.current-skin-label').text('You currently have the "Default" skin installed.');
                } else {
                    Dom7(page.container).find('.current-skin-buttons').show();
                    Dom7(page.container).find('.current-skin-label').text(`You currently have the ${title} skin installed.`);
                }
            }
            current();
            Dom7(page.container).find('.load-skin').on('click', (e: Event) => {
                let link = Dom7(<HTMLElement>e.target).closest('.load-skin');
                let url = <string>link.data('skinurl');
                let name = <string>link.data('skinname');
                if (url.substring(0, 4) != 'http') {
                    url = `https://igbaskins.igbaemu.com/skins/${url}.css`;
                } else if (url.substring(0, 5) != 'https') {
                    this.alert('Skins MUST be served over HTTPS!');
                    return;
                }
                this.showIndicator();
                Dom7.get(url, null, (data) => {
                    Dom7(iGBAKit.skinelm).text(data);
                    Dom7(document.body).addClass('layout-iGBASkins');
                    localStorage.setItem('iGBASkin', data);
                    localStorage.setItem('iGBASkin-Title', name);
                    this.hideIndicator();
                    this.alert('Loaded ' + name);
                    current();
                });
            });
            Dom7(page.container).find('.edit-skin').on('click', () => {
                var popupHTML =
                    `<div class="popup">
            <div class="navbar">
                <div class="navbar-inner">
                    <div class="left sliding"><a href="#" class="link close-popup">Close</a></div>
                    <div class="center sliding">Skin Editor</div>
                    <div class="right">
                        <a href="c#" class="link save-skin">Save</a>
                    </div>
                </div>
            </div>
            <div class="pages">
                <div data-page="skins" class="page">
                    <div class="page-content no-fastclick">
                        <pre id="editor" class="skin-editor no-fastclick">Please Wait...</pre>
                    </div>
                </div>
            </div>
        </div>`;
                this.popup(popupHTML);
                var skin = localStorage.getItem('iGBASkin');
                Dom7('.save-skin').on('click', () => {
                    var data = '';
                    this.modal({
                        title: 'iGBASkins',
                        text: 'Are you sure you want to save this Skin?',
                        verticalButtons: true,
                        buttons: [
                            {
                                text: 'Yes',
                                onClick: () => {
                                    localStorage.setItem('iGBASkin', data);
                                    Dom7(iGBAKit.skinelm).text(data);
                                    this.closeModal();
                                }
                            },
                            {
                                text: 'Cancel'
                            }
                        ]
                    });
                });
            });
            Dom7(page.container).find('.remove-skin').on('click', () => {
                this.modal({
                    title: 'iGBASkins',
                    verticalButtons: true,
                    text: 'Are you sure you want to remove this Skin?',
                    buttons: [
                        {
                            text: 'Yes',
                            onClick: function () {
                                localStorage.setItem('iGBASkin', '');
                                localStorage.setItem('iGBASkin-Title', 'default');
                                Dom7(iGBAKit.skinelm).text('');
                                Dom7(document.body).removeClass('layout-iGBASkins');
                                current();
                            }
                        },
                        {
                            text: 'Cancel'
                        }
                    ]
                });
            });
            Dom7(page.container).find('.list-block').removeClass('disabled');
            if (!navigator.onLine) {
                this.alert('Sorry! but iGBASkins is currently offline. please connect to Wi-Fi to install new skins.');
                Dom7(page.container).find('.list-block').addClass('disabled');
            }
        });

        this.onPageInit('roms', (page) => {
            let mySwiper = this.swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                autoplay: 750,
                autoplayDisableOnInteraction: false
            });
            var mySearchbar = this.searchbar('.searchbar', {
                searchList: '.list-block-search',
                searchIn: '.item-title, .item-subtitle'
            });
            Dom7(page.container).find('.launch-rom').on('click', (e: Event) => {
                let link = Dom7(<HTMLElement>e.target).closest('.launch-rom');
                Emulators.launchROM(JSON.parse(link.data('rom')), this);
            });
        });

        this.onPageInit('settings', (page) => {
            if (localStorage.getItem('dark-mode') === "true") {
                Dom7('.dark-mode input[type="checkbox"]').prop('checked', localStorage.getItem('dark-mode'));
            }
            Dom7('.dark-mode input[type="checkbox"]').on('change', function () {
                if (Dom7('body').hasClass('layout-light')) {
                    setTimeout(function () {
                        Dom7('body').removeClass('layout-light');
                        Dom7('body').addClass('layout-dark');
                        Dom7('#header').css('background', '#131313');
                        Dom7('.myLabel').css('background', '#131313');
                        localStorage.setItem('dark-mode', "true");
                    }, 400);
                } else {
                    setTimeout(function () {
                        Dom7('body').removeClass('layout-dark');
                        Dom7('body').addClass('layout-light');
                        Dom7('#header').css('background', '#ffb100');
                        Dom7('.myLabel').css('background', '#ffb100');
                        localStorage.setItem('dark-mode', "false");
                    }, 400);
                }
            });
        });

        // Load Data for Template7
        Dom7.getJSON('data.json', null, (data) => {
            try {
                this.params.template7Data['about']['f7'] = this.version;
                this.params.template7Data['credits']['credits'] = data['credits'];
                this.params.template7Data['roms']['roms'] = data['roms'];
                this.params.template7Data['skins']['skins'] = data['skins'];
                console.log(this.params);
                console.log(this.init());
            } catch (e) {
                console.log(e);
            }
        });
    }

    present(html: HTMLElement) {
        let wrap = document.createElement('div');
        wrap.className = 'popup popup-game tablet-fullscreen';
        let pages = document.createElement('div');
        pages.className = 'pages navbar-fixed';
        wrap.appendChild(pages);
        let page = document.createElement('div');
        page.className = 'page';
        pages.appendChild(page);
        let content = document.createElement('div');
        content.className = 'game-page page-content';
        page.appendChild(content);
        content.appendChild(html);
        return this.popup(wrap);
    }

    error(title: string, msg: string): void {
        this.addNotification({
            title: title,
            message: msg
        });
    }
}
