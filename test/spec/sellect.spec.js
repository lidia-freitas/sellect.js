/**
 * @file
 *
 * ### Responsibilities
 * - unit test sellect.js
 *
 * Scaffolded with generator-microjs v0.1.2
 *
 * @author Lidia Freitas <>
 */

(function () {
    'use strict';
    var originList, destinationList, element;

    var eventKeyUp = document.createEvent('Event');
    eventKeyUp.initEvent('keyup');

    var eventKeyDown = document.createEvent('Event');
    eventKeyDown.initEvent('keydown');

    var eventFocus = document.createEvent('Event');
    eventFocus.initEvent('focus');

    var eventWindowClick = document.createEvent('Event');
    eventWindowClick.initEvent('click');

    beforeEach(function () {
        var fixture = '<label for="my-element" id="my-label">My Element</label><input type="text" id="my-element">';
        document.body.insertAdjacentHTML('afterbegin', fixture);

        originList = ['banana', 'apple', 'pineapple', 'papaya', 'grape', 'orange', 'grapefruit', 'guava', 'watermelon', 'melon'];
        destinationList = ['banana', 'papaya', 'grape', 'orange', 'guava'];
        element = document.getElementById('my-element');
    });

    afterEach(function () {
        document.body.removeChild(document.getElementById('my-label'));

        if (document.getElementsByClassName('sellect-container')[0]) {
            document.body.removeChild(document.getElementsByClassName('sellect-container')[0]);
        }
        else {
            document.body.removeChild(document.getElementById('my-element'));
        }
    });

    describe('Sellect.init: ', function () {
        it('Should throw an exception', function () {
            var mySellect = sellect('#my-element');

            mySellect.init();

            expect(mySellect).toBeDefined();
            expect(mySellect.options).toBeUndefined();
        });

        it('Should display a list of 5 fruits', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            expect(mySellect).toBeDefined();
            expect(mySellect.options.originList.length).toBe(5);
        });
    });

    describe('Sellect.createHTML', function () {
        it('Should throw an exception', function () {
            var mySellect = sellect();

            mySellect.init();

            expect(mySellect).toBeDefined();
            expect(mySellect.options).toBeUndefined();
        });

        it('Should insert the html structure in the document', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            expect(document.getElementsByClassName('sellect-container')[0].childNodes).toBeDefined();
            expect(document.getElementsByClassName('sellect-container')[0].childNodes.length).toBe(4);
            expect(document.getElementsByClassName('sellect-container')[0].childNodes[0].className.indexOf('sellect-destination-list')).toBeGreaterThan(-1);
            expect(document.getElementsByClassName('sellect-container')[0].childNodes[1].className.indexOf('sellect-element')).toBeGreaterThan(-1);
            expect(document.getElementsByClassName('sellect-container')[0].childNodes[2].className.indexOf('sellect-origin-list')).toBeGreaterThan(-1);
            expect(document.getElementsByClassName('sellect-container')[0].childNodes[3].className.indexOf('sellect-arrow-icon')).toBeGreaterThan(-1);
        });
    });

    describe('Sellect.initializeEvents', function () {
        it('Should throw an exception', function () {
            var mySellect = sellect();

            mySellect.init();

            expect(mySellect).toBeDefined();
            expect(mySellect.options).toBeUndefined();
        });

        it('Should add an event listener to the originList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            expect(mySellect.originListHTML.click).toBeDefined();
            expect(mySellect.originListHTML.click).toEqual(jasmine.any(Function));

            var clickSpy = spyOn(mySellect.originListHTML, 'click');

            mySellect.originListHTML.click();
            expect(clickSpy).toHaveBeenCalled();
        });

        it('Should add an event listener to the detinationList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            expect(mySellect.destinationListHTML.click).toBeDefined();
            expect(mySellect.destinationListHTML.click).toEqual(jasmine.any(Function));

            var clickSpy = spyOn(mySellect.destinationListHTML, 'click');

            mySellect.destinationListHTML.click();
            expect(clickSpy).toHaveBeenCalled();
        });
    });

    describe('Sellect.swapItemDOM', function () {
        it('Should send the item clicked on the originList to the destinationList', function () {
            var mySellect = sellect('#my-element',{
                originList: originList,
                destinationList: destinationList,
                onInsert: function( event, item ) {},
                onRemove: function( event, item ) {}
            });

            mySellect.init();

            mySellect.container.click();
            mySellect.originListHTML.childNodes[0].click();
            expect(mySellect.destinationListHTML.lastChild.textContent).toBe('apple');
            expect(mySellect.originListHTML.firstChild.textContent).toBe('pineapple');
            mySellect.originListHTML.childNodes.forEach(function (item, index, arr) {
                expect(item.offsetParent).not.toBeNull();
            });
        });

        it('Should reorder the items in the originList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.options.element.value = 'apple';
            mySellect.options.element.dispatchEvent(eventKeyUp);

            mySellect.container.click();
            mySellect.originListHTML.childNodes[0].click();

            expect(mySellect.options.element.value).toBe('');
            mySellect.originListHTML.childNodes.forEach(function (item, index, arr) {
                expect(item.offsetParent).not.toBeNull();
            });
        });

        it('Should send the clicked item in the destinationList to the originList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.destinationListHTML.childNodes[0].click();
            expect(mySellect.originListHTML.lastChild.textContent).toBe('banana');
            expect(mySellect.destinationListHTML.firstChild.textContent).toBe('papaya');
        });
    });

    describe('Sellect.filterOriginList', function () {
        it('Should clear the originList', function () {
            var mySellect = sellect('#my-element',{
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.options.element.value = 's';
            mySellect.options.element.dispatchEvent(eventKeyUp);

            expect(mySellect.options.element.value).toBe('s');

            mySellect.originListHTML.childNodes.forEach(function (item, index, arr) {
                expect(item.offsetParent).toBeNull();
            });
        });

        it('Should unhide all items', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.options.element.value = 's';
            mySellect.options.element.dispatchEvent(eventKeyUp);

            mySellect.options.element.value = '';
            mySellect.options.element.dispatchEvent(eventKeyUp);

            mySellect.container.click();

            expect(mySellect.options.element.value).toBe('');

            mySellect.originListHTML.childNodes.forEach(function (item, index, array) {
                expect(item.offsetParent).not.toBeNull();
            });
        });

        it('Should only display apple in the originList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();
            document.getElementsByClassName('sellect-origin-list')[0].style.transition = 'none';

            mySellect.container.click();
            mySellect.options.element.value = 'apple';
            mySellect.options.element.dispatchEvent(eventKeyUp);


            function isVisible(elem) {
                return window.Window.getComputedStyle(elem).opacity === '0' ? false : true;
            }


            expect(mySellect.options.element.value).toBe('apple');

            expect(mySellect.originListHTML.childNodes[0].offsetParent).not.toBeNull();
            expect(mySellect.originListHTML.childNodes[1].offsetParent).not.toBeNull();

            expect(mySellect.originListHTML.childNodes[2].offsetParent).toBeNull();
            expect(mySellect.originListHTML.childNodes[3].offsetParent).toBeNull();
            expect(mySellect.originListHTML.childNodes[4].offsetParent).toBeNull();

        });
    });

    describe('Sellect.captureEmpty', function () {
        it('Should remove the last item from the destinationList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            eventKeyDown.keyCode = 8;
            mySellect.options.element.dispatchEvent(eventKeyDown);

            expect(mySellect.destinationListHTML.lastChild.textContent).toBe('orange');
            expect(mySellect.originListHTML.lastChild.textContent).toBe('guava');
        });

        it('Should end the function execution', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            for (var i = mySellect.destinationListHTML.childNodes.length - 1; i >= 0; i--) {
                mySellect.destinationListHTML.childNodes[0].click();
            }

            eventKeyDown.keyCode = 8;
            mySellect.options.element.dispatchEvent(eventKeyDown);

            expect(mySellect.destinationListHTML.childNodes.length).toBe(0);
            expect(mySellect.originListHTML.childNodes.length).toBe(10);
        });
    });

    describe('Sellect.focusOriginList', function () {
        it('Should select items in descending order', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.container.click();

            for(var i = 0; i < mySellect.originListHTML.childNodes.length; i++){
                eventKeyUp.keyCode = 40;
                mySellect.options.element.dispatchEvent(eventKeyUp);

                for(var j = 0; j < mySellect.originListHTML.childNodes.length; j++){
                    if(mySellect.originListHTML.childNodes[i] !== mySellect.originListHTML.childNodes[j]) {
                        expect(mySellect.originListHTML.childNodes[j].classList.contains('active')).toBe(false);
                    }
                }

                expect(mySellect.originListHTML.childNodes[i].classList.contains('active')).toBe(true);

            }
        });

        it('Should select items incrementally', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            mySellect.container.click();

            mySellect.originListHTML.childNodes[mySellect.originListHTML.childNodes.length - 1].classList.add('active');

            for(var i = mySellect.originListHTML.childNodes.length - 1; i > 0; i--){

                for(var j = mySellect.originListHTML.childNodes.length - 1; j > 0; j--){
                    if(mySellect.originListHTML.childNodes[i] !== mySellect.originListHTML.childNodes[j]){
                        expect(mySellect.originListHTML.childNodes[j].classList.contains('active')).toBe(false);
                    }
                }

                expect(mySellect.originListHTML.childNodes[i].classList.contains('active')).toBe(true);

                eventKeyUp.keyCode = 38;
                mySellect.options.element.dispatchEvent(eventKeyUp);
            }
        });

        it('Should select only the visible items', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();
            var itemActive;

            document.getElementsByClassName('sellect-origin-list')[0].style.transition = 'none';

            eventKeyUp.keyCode = null;
            mySellect.options.element.value = 'l';
            mySellect.options.element.dispatchEvent(eventFocus);
            mySellect.options.element.dispatchEvent(eventKeyUp);

            //mySellect.container.click();

            expect(mySellect.options.element.value).toBe('l');

            eventKeyUp.keyCode = 40;
            mySellect.options.element.dispatchEvent(eventKeyUp);

            itemActive = mySellect.originListHTML.getElementsByClassName('active')[0];
            expect(itemActive.innerText).toBe('apple');

            mySellect.options.element.dispatchEvent(eventKeyUp);

            itemActive = mySellect.originListHTML.getElementsByClassName('active')[0];
            expect(itemActive.innerText).toBe('pineapple');

            mySellect.options.element.dispatchEvent(eventKeyUp);

            itemActive = mySellect.originListHTML.getElementsByClassName('active')[0];
            expect(itemActive.innerText).toBe('watermelon');

            eventKeyUp.keyCode = 38;
            mySellect.options.element.dispatchEvent(eventKeyUp);

            itemActive = mySellect.originListHTML.getElementsByClassName('active')[0];
            expect(itemActive.innerText).toBe('pineapple');
        });

        it('Should not select any item', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();
            var itemActive;

            mySellect.container.click();

            eventKeyUp.keyCode = null;
            mySellect.options.element.value = 'gua';
            mySellect.options.element.dispatchEvent(eventKeyUp);

            expect(mySellect.options.element.value).toBe('gua');

            eventKeyUp.keyCode = 40;
            mySellect.options.element.dispatchEvent(eventKeyUp);

            itemActive = mySellect.originListHTML.getElementsByClassName('active')[0];
            expect(itemActive).toBeUndefined();
        });
    });

    describe('Sellect.selectItemOriginList', function () {
        it('Should add the selected item in originList to the last position of the destinationList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            var randon = parseInt(Math.random() * (mySellect.originListHTML.childNodes.length - 0) + 0);
            var selectedItem = mySellect.originListHTML.childNodes[randon];
            selectedItem.classList.add('active');

            eventKeyUp.keyCode = 13;
            mySellect.options.element.dispatchEvent(eventKeyUp);

            var lastItemIndex = mySellect.destinationListHTML.childNodes.length - 1;

            expect(mySellect.destinationListHTML.childNodes[lastItemIndex]).toBe(selectedItem);
        });
    });

    describe('Sellect.scrollTop', function () {
        it('Should perform originList scrolldown', function () {
            originList = ['banana', 'apple', 'pineapple', 'papaya', 'grape', 'orange', 'grapefruit', 'guava', 'watermelon', 'melon'];
            destinationList = ['banana', 'papaya', 'guava'];

            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            document.getElementsByClassName('sellect-origin-list')[0].style.transition = 'none';
            document.getElementsByClassName('sellect-origin-list')[0].style.maxHeight = '138px';
            document.getElementsByClassName('sellect-origin-list')[0].style.opacity = '1';

            mySellect.container.click();

            for (var i = 0; i <= 5; i++) {
                eventKeyUp.keyCode = 40;
                mySellect.options.element.dispatchEvent(eventKeyUp);
                expect(mySellect.originListHTML.scrollTop).toBe(0);
            }

            eventKeyUp.keyCode = 40;
            mySellect.options.element.dispatchEvent(eventKeyUp);
            expect(mySellect.originListHTML.scrollTop).not.toBe(0);
        });
    });

    describe('Sellect.scrollBottom', function () {
        it('Should perform originList scrollup', function () {
            originList = ['banana', 'apple', 'pineapple', 'papaya', 'grape', 'orange', 'grapefruit', 'guava', 'watermelon', 'melon'];
            destinationList = [];

            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();
            mySellect.container.click();

            for(var i = 0; i <= 7; i++){
                eventKeyUp.keyCode = 40;
                mySellect.options.element.dispatchEvent(eventKeyUp);
            }

            for(var j = 0; j <= 7; j++){
                eventKeyUp.keyCode = 38;
                mySellect.options.element.dispatchEvent(eventKeyUp);
            }

            expect(mySellect.originListHTML.scrollTop).toBe(0);
        });
    });

    describe('Sellect.openOriginList', function () {
       it('Should show OriginList', function () {
           var mySellect = sellect('#my-element', {
               originList: originList,
               destinationList: destinationList
           });

           mySellect.init();

           document.getElementsByClassName('sellect-origin-list')[0].style.transition = 'none';

           function isVisible(elem) {
               return window.getComputedStyle(elem).getPropertyValue('opacity') === '0' ? false : true;
           }

           expect(isVisible(mySellect.originListHTML)).toBe(false);

           mySellect.container.click();

           expect(isVisible(mySellect.originListHTML)).toBe(true);

       });
    });

    describe('Sellect.closeOriginList', function () {
        it('Should hide OriginList', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            document.getElementsByClassName('sellect-origin-list')[0].style.transition = 'none';

            function isVisible(elem) {
                return window.getComputedStyle(elem).getPropertyValue('opacity') === '0' ? false : true;
            }

            expect(isVisible(mySellect.originListHTML)).toBe(false);

            mySellect.container.click();

            expect(isVisible(mySellect.originListHTML)).toBe(true);

            window.dispatchEvent(eventWindowClick);

            expect(isVisible(mySellect.originListHTML)).toBe(false);
        });
    });

    describe('Sellect.toggleOriginList', function () {
        it('Should toggle OriginList visibility', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            mySellect.init();

            function isVisible(elem) {
                return window.getComputedStyle(elem).getPropertyValue('opacity') === '0' ? false : true;
            }

            expect(isVisible(mySellect.originListHTML)).toBe(false);

            mySellect.arrow.click();

            expect(isVisible(mySellect.originListHTML)).not.toBe(true);

            mySellect.arrow.click();

            expect(isVisible(mySellect.originListHTML)).toBe(false);
        });
    });

    describe('Sellect.getSelected', function () {
        it('Should passes if selected itens list is equal', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            var selected = [];

            mySellect.init();

            mySellect.container.click();
            mySellect.originListHTML.childNodes[0].click();

            selected = mySellect.getSelected();

            expect(selected).toEqual(['banana','papaya','grape','orange','guava','apple']);
        });
    });

    describe('Sellect.getUnselected', function () {
        it('Should passes if unselected itens list is equal', function () {
            var mySellect = sellect('#my-element', {
                originList: originList,
                destinationList: destinationList
            });

            var unselected = [];

            mySellect.init();

            mySellect.container.click();
            mySellect.originListHTML.childNodes[0].click();

            unselected = mySellect.getUnselected();

            expect(unselected).toEqual(['pineapple', 'grapefruit', 'watermelon', 'melon']);
        });
    });
})();


