import Listbox from './listbox';
import { KEYS } from './utils';

export default class Combobox {
    constructor( el) {
        this.isOpen = false;
        this.$combobox = el;
        this.$parent = el.parentNode;
        this.nodeListbox = this.getListBox();

        if(!this.nodeListbox) {
            console.error('Lista de elementos no encontrado!');
        } else {
            this.listbox = new Listbox(this.nodeListbox);
        }
        
        //add listeners
        this.$combobox.addEventListener('click', this.clickHandler.bind(this));
        this.nodeListbox.addEventListener('changeSelected', this.changeSelectedHandler.bind(this));
        this.nodeListbox.addEventListener('selected', this.selectHandler.bind(this));
        this.nodeListbox.addEventListener('blur', this.blurHandler.bind(this));
        this.$combobox.addEventListener('keydown', this.keypressHandler.bind(this));
        this.nodeListbox.addEventListener('keydown', this.keypressCloseHandler.bind(this));

        return {
            destroy: this.destroy
        }
    }

    selectHandler(ev) {
        
        const customEvent = new CustomEvent('change', {
            detail: this.$combobox.textContent
        });
        this.$combobox.dispatchEvent(customEvent);
        this.hideListbox();
    }

    blurHandler(){
        this.hideListbox();
    }
    changeSelectedHandler(ev) {
        this.$combobox.textContent = ev.detail;
    }

    keypressCloseHandler(ev) {
        const key = ev.which;

        switch (key) {
            case KEYS.ESC:
                this.hideListbox();
                this.selectHandler();
                ev.preventDefault();
                break;
        }
    }
    
    keypressHandler(ev) {
        const key = ev.which;

        switch (key) {
            case KEYS.DOWN:
                this.showListbox();
                ev.preventDefault();
                break;
        }
    }

    clickHandler(ev) {
        ev.preventDefault();
        this.showListbox();
    }

    hideListbox() {
        this.$combobox.setAttribute('aria-expanded', 'false');
        this.$parent.classList.remove('isOpen');
        setTimeout( ()=> this.$combobox.focus());
    }

    showListbox() {
        this.$combobox.setAttribute('aria-expanded', 'true');
        this.$parent.classList.add('isOpen');
        this.nodeListbox.focus();
    }
    
    getListBox() {
        const nextElement = this.$combobox.nextElementSibling;
        if (nextElement.getAttribute('role') === 'listbox' ) {
            return nextElement;
        }

        const childs = nextElement.childNodes;
        let i = childs.length;

        while(i--) {

            if (childs[i].nodeType === 1 && childs[i].getAttribute('role') === 'listbox') {
                return childs[i];
            }
        }
        return null;
    }
    destroy() {
        console.log('destruir... destruir....')
    }
}