import { toggleDisplay } from './functions';

function createPanel(hintTitle, hintBody) {
    return `
    <div class="hint-panel">
        <div></div>
        <h2>${hintTitle}</h2>
        <div>${hintBody}</div>
    </div>
    `;
}

export default class JsHint {
    constructor(overlay, root, clsName) {
        this.overlay = overlay;
        this.root = root;
        this.hintClsName = clsName;
        this.hints = document.querySelectorAll(this.hintClsName);

        this.init();
    }
    init() {
        console.log(typeof this.hintClsName);
        if (typeof this.hintClsName === 'string') {
            try {
                this.setEvents();
            } catch (e) {
                console.log(e);
            }
        }
    }


    setEvents() {
        this.hints.forEach(el => {
            el.onclick = () => {
                const title = el.dataset.title,
                    body = el.dataset.body;
                const panel = createPanel(title, body);
                this.root.insertAdjacentHTML('beforeend', panel);
            };
        });
    }
}
