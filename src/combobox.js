import Listbox from './listbox';
import { KEYS } from './utils';

export default class Combobox {
    constructor( el) {
        this.isOpen = false;
        this.$combobox = el;
        this.$parent = el.parentNode;
        this.nodeListbox = this.getListBox();
        this.isVisible = false;
        //console.log(el.textContent);

        if(!this.nodeListbox) {
            console.error('Lista de elementos no encontrado!');
        } else {
            this.listbox = new Listbox(this.nodeListbox);
            this.selectDefaultChild();
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
    selectDefaultChild() {

        const childs = Array.from(this.nodeListbox.querySelectorAll('[role="option"]'));
        const childSelected = childs.filter(child => child.textContent.trim() === this.$combobox.textContent.trim())[0];
        if( childSelected) {
            this.listbox.select(childSelected);
        }
    }
    selectHandler(ev) {
        
        const customEvent = new CustomEvent('change', {
            detail: this.$combobox.textContent
        });
        this.$combobox.dispatchEvent(customEvent);
        this.hideListbox();
    }

    blurHandler(ev){
        if (ev.relatedTarget !== this.$combobox) {
            this.hideListbox();
        }
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
        if(this.isVisible) {
            this.hideListbox();
        } else {
            this.showListbox();
        }
    }

    hideListbox() {
        this.$combobox.setAttribute('aria-expanded', 'false');
        this.$parent.classList.remove('isOpen');
        setTimeout( () => {
            this.$combobox.focus();
            this.isVisible = false;
        },100);
        
    }

    showListbox() {
        this.$combobox.setAttribute('aria-expanded', 'true');
        this.$parent.classList.add('isOpen');
        this.nodeListbox.focus();
        this.isVisible = true;
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