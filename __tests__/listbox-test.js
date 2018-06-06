//import Combobox from './../src/combobox';
import Listbox from './../src/listbox';
import { KEYS } from './../src/utils';

describe('Should build a completely listbox', () => {

    let listbox,
        nodelistbox;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="c-listbox">
            <div class="c-listbox__label" id="c-listbox__label_1">
                Label de la lista
            </div>

            <ul class="c-listbox__content" tabindex="0" role="listbox" aria-label="c-listbox__label_1">
                <li role="option">Option 010 </li>
                <li role="option">Option 2121</li>
                <li role="option">Option 511</li>
                <li role="option">Option 5564</li>
                <li role="option">Option 65464</li>
                <li role="option">Option 445</li>
                <li role="option">Option 4545</li>
                <li role="option">Option 45</li>
                <li role="option">Option 4</li>
                <li role="option">Option 545</li>
            </ul>
        </div>
    `;
    nodelistbox = document.querySelector('.c-listbox__content');
    listbox = new Listbox(nodelistbox);
});

    test('Should have a id finish with _(n)', () => {
        const option = nodelistbox.querySelector('li:nth-child(2)');
        expect(option.id.slice(-2)).toEqual('_1');
    });

    test('Should select the first when focus on listbox', () =>{
        const option = nodelistbox.querySelector('li:first-child');
        nodelistbox.focus();
        expect(option.classList.contains('focused')).toBeTruthy();
    });

    test('Should select option when click it', () =>{
        const option = nodelistbox.querySelector('li:nth-child(4)');
        option.click();
        expect(option.classList.contains('focused')).toBeTruthy();
    });

    test('Should navigate with keys arrows', () =>{
        const eventDown = new KeyboardEvent('keydown', { 'which': KEYS.DOWN });
        const eventUp = new KeyboardEvent('keydown', { 'which': KEYS.UP });

        nodelistbox.focus();

        const option1 = nodelistbox.querySelector('li:first-child');
        expect(option1.classList.contains('focused')).toBeTruthy();


        nodelistbox.dispatchEvent(eventDown);
        const option2 = nodelistbox.querySelector('li:nth-child(2)');
        expect(option2.classList.contains('focused')).toBeTruthy();

        nodelistbox.dispatchEvent(eventDown);
        nodelistbox.dispatchEvent(eventDown);
        nodelistbox.dispatchEvent(eventUp);

        const option3 = nodelistbox.querySelector('li:nth-child(3)');
        expect(option3.classList.contains('focused')).toBeTruthy();
        expect(option1.classList.contains('focused')).toBeFalsy();

        const lastOption = nodelistbox.querySelector('li:last-child');
        lastOption.click();
        nodelistbox.dispatchEvent(eventDown);

        expect(lastOption.classList.contains('focused')).toBeTruthy();
    });
})

