import Carousel from './components/Carousel';
import jsHint from './components/hint';
import medalViewer from './components/medalViewer';
import changeTheme from './components/changeTheme'

window.addEventListener('load', () => {
   new Carousel({
        main: '.award-grid',
        row: '.award-grid__row',
        activeItem: 'medal__active',
        layout: '.medal__layout',
        activeLayout: 'medal__layout-active',
    });

    const overlay = document.querySelector('.overlay'),
        root = document.querySelector('.root'),
        html = document.querySelector('.html')



 

    new jsHint(overlay, root, '.bem-hint');
    new medalViewer({
        catalog: '.catalog',
        title: '.catalog__title',
        grid: '.catalog__layout-grid',
        activeTitle: 'catalog__title-active',
        activeGrid: 'catalog__grid-active',
        catalogItem: '.catalog__item',
        medal: '.medal__layout',
        activeMedal: 'medal__layout-active'
    })

    new changeTheme({
        themeItem: '.theme__item',
        activeTheme: '.theme__item-active',
        activeClsname: 'theme__item-active',
    })
});
