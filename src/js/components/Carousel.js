import { hasClass, addClass, removeClass } from './functions.js';

export default class Carousel {
    constructor(options) {
        this.main = document.querySelector(options.main);
        this.row = document.querySelector(options.row);
        this.layout = options.layout;
        this.activeItem = options.activeItem;
        this.activeLayout = options.activeLayout;

        this.slides = this.row.children;
        this.slidesLength = this.slides.length;

        // options:
        this.slidesToShow = 1;
        this.startPos = null;
        this.position = null;
        this.margin = parseInt(window.getComputedStyle(this.slides[0]).marginRight);
        this.slideWidth = this.slides[0].offsetWidth + this.margin;
        this.shift = this.slideWidth - this.margin - (window.innerWidth - this.slideWidth - this.margin) / 2;

        this.tempPos = 0;
        this.transformMtrx = 0; // transform translateX
        this.distance = 0; // расстояние движения
        this.initPos = 0; // начальное нажатие
        this.currentX = 0; // текущ позиция
        this.diffPos = 0; // разница в движении

        this.init();
    }

    init() {
        this.control();
    }

    control() {
        this.setAttrs();

        this.downHandler = this.swipeStart.bind(this);
        this.movingHandler = this.swipe.bind(this);
        this.upHandler = this.swipeEnd.bind(this);

        if (window.PointerEvent) {
            this.main.addEventListener('pointerdown', this.downHandler);
        } else {
            this.main.addEventListener('mousedown', this.downHandler);
            this.main.addEventListener('touchstart', this.downHandler);
        }
    }

    setAttrs() {
        this.row.style.cssText = `width: ${this.slideWidth * this.slidesLength}px; transform: translateX(-${this.shift}px)`;
        [...this.slides].forEach((el, index) => {
            el.dataset.pos = index;
            hasClass(el, this.activeItem) ? (this.startPos = +el.dataset.pos) : null;
        });
        this.position = this.startPos;
    }

    swipeStart(e) {
        e.preventDefault();
        this.initPos = e.pageX;
        const style = window.getComputedStyle(this.row);
        this.transformMtrx = new WebKitCSSMatrix(style.webkitTransform).m41;

        if (window.PointerEvent) {
            this.main.addEventListener('pointermove', this.movingHandler);
            this.main.addEventListener('pointerup', this.upHandler);
        } else {
            this.main.addEventListener('mousemove', this.movingHandler);
            this.main.addEventListener('mouseup', this.upHandler);
            this.main.addEventListener('touchmove', this.movingHandler);
            this.main.addEventListener('touchend', this.upHandler);
        }
    }

    swipe(e) {
        e.preventDefault();
        this.currentX = e.pageX;
        this.diffPos = this.currentX - this.initPos;
        this.row.style.transform = `translateX(${this.transformMtrx + this.diffPos}px)`;
    }

    swipeEnd() {
        this.tempPos = Math.abs(Math.round(this.diffPos / this.slideWidth));
        this.distance = Math.round(this.diffPos / this.slideWidth) * this.slideWidth;
        if (this.currentX > this.initPos && this.currentX) {
            this.position -= this.tempPos;

            if (this.position > 0) {
                if (this.tempPos > 0) {
                    this.prevAnime();
                }
                this.row.style.transform = `translateX(${this.transformMtrx + this.distance}px)`;
            } else {
                this.position = 0;
                this.prevAnime();

                this.row.style.transform = `translateX(${Math.abs(this.shift - this.slideWidth)}px)`;
            }
        } else {
            if (this.currentX < this.initPos && this.currentX) {
                this.position += this.tempPos;
                if (this.position < this.slidesLength - this.slidesToShow) {
                    if (this.tempPos > 0) {
                        this.nextAnime();
                    }
                    this.row.style.transform = `translateX(${this.transformMtrx + this.distance}px)`;
                } else {
                    this.position = this.slidesLength - this.slidesToShow;

                    this.nextAnime();

                    let restSlides = this.slidesLength - this.startPos - 1;
                    this.row.style.transform = `translateX(-${Math.abs(this.shift) + restSlides * this.slideWidth}px)`;
                }
            }
        }
        this.initPos = 0
        this.currentX = 0

        if (window.PointerEvent) {
            this.main.removeEventListener('pointermove', this.movingHandler);
            this.main.removeEventListener('pointerup', this.upHandler);
        } else {
            this.main.removeEventListener('mousemove', this.movingHandler);
            this.main.removeEventListener('mouseup', this.upHandler);
            this.main.removeEventListener('touchmove', this.movingHandler);
            this.main.removeEventListener('touchend', this.upHandler);
        }
    }

    nextAnime() {
        removeClass(document.querySelector(`[data-pos='${this.position - 1}']`), this.activeItem);
        removeClass(document.querySelector(`[data-pos='${this.position - 1}'] ${this.layout}`), this.activeLayout);
        addClass(document.querySelector(`[data-pos='${this.position}']`), this.activeItem);
        addClass(document.querySelector(`[data-pos='${this.position}'] ${this.layout}`), this.activeLayout);
    }

    prevAnime() {
        removeClass(document.querySelector(`[data-pos='${this.position + 1}']`), this.activeItem);
        removeClass(document.querySelector(`[data-pos='${this.position + 1}'] ${this.layout}`), this.activeLayout);
        addClass(document.querySelector(`[data-pos='${this.position}']`), this.activeItem);
        addClass(document.querySelector(`[data-pos='${this.position}'] ${this.layout}`), this.activeLayout);
    }
}
