import { KEYS, getId } from './utils';

export default class ListBox {
    constructor(listboxnode) {

        this.$listbox = listboxnode;
        this.activedescendant = this.$listbox.getAttribute('aria-activedescendant');

        // añado id único
        const allnodes = this.$listbox.querySelectorAll('[role="option"]');
        Array.from(allnodes).forEach( (el, i) => {
            el.id = `${getId()}_${i}`;
        });
        
        // registro de eventos
        this.$listbox.addEventListener('focus', this.focusHandler.bind(this));
        this.$listbox.addEventListener('keydown', this.keyDownHandler.bind(this));
        this.$listbox.addEventListener('click', this.clickHandler.bind(this));

        // return obj public
        return {
            destroy: this.destroy
        }
    }

    setFocus(node) {
        if(!node) return;

        if( this.activedescendant) {
            this.activedescendant.classList.remove('focused');
        }

        if( this.$listbox.scrollHeight > this.$listbox.clientHeight) {
            const scrollTopPosition =  this.$listbox.scrollTop + this.$listbox.clientHeight;
            const elementTopPosition = node.offsetTop + node.clientHeight;

            if ( elementTopPosition > scrollTopPosition ) {
                // bajar 
                this.$listbox.scrollTop = elementTopPosition - this.$listbox.clientHeight;
            } else if (node.offsetTop < this.$listbox.scrollTop) {
                // subir
                this.$listbox.scrollTop = node.offsetTop;
            }
        }

        node.classList.add('focused');
        this.$listbox.setAttribute('aria-activedescendant', node.id);
        this.activedescendant = node;

        // lanzo evento de cambio de selección
        const customEvent = new CustomEvent('changeSelected', {
            detail: node.textContent
        });
        this.$listbox.dispatchEvent(customEvent);
    }

    onselect() {
        if (!this.activedescendant) return;

        const customEvent = new CustomEvent('selected', {
            detail: this.activedescendant.textContent
        });
        this.$listbox.dispatchEvent(customEvent);
    }


    keyDownHandler(ev) {
        if( !this.activedescendant) return;

        const keypress = ev.which;
        let nextItem = null;

        switch (keypress) {
            case KEYS.DOWN:
                nextItem = this.activedescendant.nextElementSibling;
                break;
        
            case KEYS.UP:
                nextItem = this.activedescendant.previousElementSibling;
                break;

            case KEYS.ENTER:
                this.onselect();
                break;

            case KEYS.ESC:
                ev.preventDefault();
                
                break;
                
        }

        if ( nextItem) {
            this.setFocus(nextItem);
            ev.preventDefault();
        }
    }

    clickHandler(ev) {
        if( ev.target.getAttribute('role') === 'option') {
             this.setFocus(ev.target);
             this.onselect();
        }
    }

    focusHandler() {
        if ( this.activedescendant ) return;

        const firstElement = this.$listbox.querySelector('[role="option"]');
        if( firstElement) {
            this.setFocus(firstElement);
        }
    }
    
    destroy() {
        console.log('... destruir ... destruir');
    }
}