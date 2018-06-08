import Combobox from './../src/combobox';
import { KEYS } from './../src/utils';

describe('Should build a completely listbox', () => {

    let comboboxAge,
        listbox,
        button;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="c-goi-combobox">

                <div id="label-age-combobox">Seleciona la edad:</div>
                <button id="combobox-age" class="c-goi-combobox__button"
                aria-haspopup="list-age" aria-expanded="false" aria-labelledby="label-age-combobox combobox-age">18 - 25</button>

                <div class="c-goi-combobox__listbox" role="presentation">
                    <ul tabindex="-1" role="listbox" id="list-age">
                        <li role="option">18 - 25</li>
                        <li role="option">26 - 39</li>
                        <li role="option">40 - 55</li>
                        <li role="option">55 - 99</li>
                    </ul>
                </div>
            </div>
    `;
    comboboxAge = new Combobox(document.querySelector('#combobox-age'));
    listbox = document.getElementById("list-age");
    button = document.getElementById("combobox-age");

    });

    test('Should have a id finish with _(n)', () => {
        const option = listbox.querySelector('li:nth-child(2)');
        expect(option.id.slice(-2)).toEqual('_1');
    });

    test('Should be select by default', () => {
        const option = listbox.querySelectorAll('li')[0];
        expect(option.classList.contains('focused')).toBeTruthy();
        const attrAria = listbox.getAttribute('aria-activedescendant');
        expect(option.id).toEqual(attrAria);
        expect(option.classList.contains('focused')).toBeTruthy();
    });

    test('Should open on click', () => {
        expect(button.parentNode.classList.contains('isOpen')).toBeFalsy();
        button.click();
        expect(button.parentNode.classList.contains('isOpen')).toBeTruthy();
    });

});