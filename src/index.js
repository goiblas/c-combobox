import Combobox from './combobox';
import Listbox from './listbox';
import '../style.css';

window.addEventListener('load', () => {
    const comboboxAge = new Combobox(document.querySelector('#combobox-age'));

    const element = document.querySelector(".c-listbox__content");
    new Listbox(element);

    element.addEventListener('changeSelected', (e)=> {
      console.log(e.detail);
    });
});
