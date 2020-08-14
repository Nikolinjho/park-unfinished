import { hasClass, removeClass, addClass } from './functions';

export default class Theme {
    constructor({ themeItem, activeTheme, activeClsname }) {
        this.themeItems = document.querySelectorAll(themeItem);
        this.currentItem = document.querySelector(activeTheme);
        this.activeTheme = document.querySelector(activeTheme);
        this.activeClsname = activeClsname;
        this.html = document.querySelector('.html');
        this.themeChangeCls = 'theme-change';
        this.init();
    }

    init() {
        try {
            this.setTheme();
        } catch (error) {
            throw error;
        }
    }

    setTheme() {
        this.themeItems.forEach(item => {
            item.onclick = () => {
                if (item !== this.activeTheme && !hasClass(item, this.activeClsname)) {
                    const theme = item.dataset.themeMode;
                    this.html.setAttribute('data-theme', theme);
                    addClass(this.html, this.themeChangeCls);
                    this.html.onanimationend = () => {
                        console.log(this.themeChangeCls);
                        removeClass(this.html, this.themeChangeCls);
                    };

                    removeClass(this.activeTheme, this.activeClsname);
                    addClass(item, this.activeClsname);
                    this.activeTheme = item;
                }
            };
        });
    }
}
