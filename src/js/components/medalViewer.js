import { toggleDisplay, hasClass, removeClass, addClass, toggleClass } from './functions';

export default class Medal {
    constructor({ catalog, title, grid, activeTitle, activeGrid, catalogItem, medal, activeMedal }) {
        this.catalog = document.querySelector(catalog);
        this.title = document.querySelectorAll(title);
        this.grids = document.querySelectorAll(grid);
        this.medalViewLayouts = document.querySelectorAll(medal);
        this.medalView = medal;
        this.medals = document.querySelectorAll(catalogItem);
        this.gridClsname = grid;
        this.medal = medal;
        this.activeMedal = activeMedal
        this.activeTitle = activeTitle;
        this.activeGrid = activeGrid;

        if (typeof title === 'string' && typeof grid === 'string') {
            try {
                this.init();
            } catch (error) {
                throw error;
            }
        }
    }

    init() {
        this.setAttrs([this.title, this.grids], 'model');
        this.setAttrs([this.medals, this.medalViewLayouts], 'medal-id');
        this.setEvents();
    }

    setEvents() {
        this.title.forEach(el => {
            el.onclick = () => {
                let self = el;
                toggleClass(self, this.activeTitle);

                this.title.forEach(element => {
                    if ( element !== self && hasClass(element, this.activeTitle)){
                        removeClass(element, this.activeTitle)
                        this.chooseCatalog(element, this.gridClsname, this.activeGrid)
                    }
                
                });

                this.chooseCatalog(self, this.gridClsname, this.activeGrid);
            };
        });

        this.medals.forEach(el => {
            el.onclick = () => {
                let self = el;
                this.chooseMedalLayout(self, this.medalView);
            };
        });
    }

    chooseMedalLayout(medal, medalViewLayout) {
        const currentMedal = medal.dataset.medalId;
        const currentMedalView = document.querySelector(`${medalViewLayout}[data-medal-id='${currentMedal}']`);
        this.medalViewLayouts.forEach(layout => {
            if (layout !== currentMedalView && hasClass(layout, this.activeMedal) ){
                removeClass(layout, this.activeMedal)                
            }
        })
        addClass(currentMedalView, this.activeMedal)

        console.log(currentMedalView)

    }

    chooseCatalog(el, gridClsname, activeGrid) {
        const currentModel = el.dataset.model;
        const currentGrid = this.catalog.querySelector(`${gridClsname}[data-model='${currentModel}']`);
        toggleClass(currentGrid, activeGrid);
    }
 

    setAttrs(arr, dataAttr) {
        for (const item of arr) {
            item.forEach((el, index) => {
                el.setAttribute(`data-${dataAttr}`, index);
            });
        }
    }
}
