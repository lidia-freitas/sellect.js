# sellect.js
[![Build Status][build-image]][build-url]
[![Code GPA][gpa-image]][gpa-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Bower Version][bower-image]][bower-url]
[![NPM version][npm-image]][npm-url]

## About
A multi-selection dropdown plugin made in vanilla javascript

## Install Choices
- `bower install --save sellect.js`
- `npm install --save sellect.js`
- [download the zip](https://github.com/lidia-freitas/sellect.js/archive/master.zip)

## Examples
[demo]()

## Dependencies
[Font Awesome](http://fontawesome.io/)

### How to use
First of all, load the stylesheets and script files in your application...
```html
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <link rel="stylesheet" href="dist/sellect.min.css">
  
    <script src="dist/sellect.min.js"></script>
```
...create your markup...
```html
<input type="text" id="my-element">
```

...then initialize the plugin
```html
    <script>
        var mySellect = sellect("#my-element", {
            originList: ['banana', 'apple', 'pineapple', 'papaya', 'grape', 'orange', 'grapefruit', 'guava', 'watermelon', 'melon'],
            destinationList: ['banana', 'papaya', 'grape', 'orange', 'guava']
        });  
        
        mySellect.init();
    </script>
```
## Methods

#### init()
Initialize the plugin, create and insert html structure.  
- This method does not accept any arguments.

__Code examples:__  
_Invoke the init method:_  
```javascript
    var mySellect = sellect("#my-element");
   
    mySellect.init();
```

#### getSelected()
Return a list of selected items
- This method does not accept any arguments.

__Code examples:__  
_Invoke the getSelected method:_
```javascript
    var selected = mySellect.getSelected();
```

#### getUnselected()
Return a list of unselected items
- This method does not accept any arguments.

__Code examples:__  
_Invoke the getUnselected method:_
```javascript
    var unselected = mySellect.getUnselected();
```

## Callbacks

### onInsert(event, item)
Called when the destination list receives a new item  
- __event__: Event
- __item__: Node *(HTMLElement)*

__Code examples:__  
_Initialize the plugin with the onInsert callback specified:_
```javascript
    var mySellect = sellect("#my-element", {
        onInsert: function( event, item ) {}
    });
```

### onRemove(event, item)
Called when an item is removed from destination list    
- __event__: Event
- __item__: Node *(HTMLElement)*

__Code examples:__  
_Initialize the plugin with the onRemove callback specified:_
```javascript
    var mySellect = sellect("#my-element", {
        onRemove: function( event, item ) {}
    });
```

## Development
```text
    npm install -g grunt-cli
    npm install && bower install
    grunt
```

## Tests
The karma task will try to open Chrome as browser in which to run the tests. Make sure this is available or change the configuration in karma.conf.js

All tasks can be run by simply running `grunt` or with the `npm test` command, or individually:

  * `grunt test` will run the jasmine unit tests against the source code.
  * `grunt` will lint, test and build a release of your code

## License
(The MIT License)

Copyright (c) 2017 Lidia Freitas 

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[build-url]: https://travis-ci.org/lidia-freitas/sellect.js
[build-image]: http://img.shields.io/travis/lidia-freitas/sellect.js.png

[gpa-url]: https://codeclimate.com/github/lidia-freitas/sellect.js
[gpa-image]: https://codeclimate.com/github/lidia-freitas/sellect.js.png

[coverage-url]: https://codeclimate.com/github/lidia-freitas/sellect.js/code?sort=covered_percent&sort_direction=desc
[coverage-image]: https://codeclimate.com/github/lidia-freitas/sellect.js/coverage.png

[depstat-url]: https://david-dm.org/lidia-freitas/sellect.js
[depstat-image]: https://david-dm.org/lidia-freitas/sellect.js.png?theme=shields.io

[issues-url]: https://github.com/lidia-freitas/sellect.js/issues
[issues-image]: http://img.shields.io/github/issues/lidia-freitas/sellect.js.png

[bower-url]: http://bower.io/search/?q=sellect.js
[bower-image]: https://badge.fury.io/bo/sellect.js.png

[downloads-url]: https://www.npmjs.org/package/sellect.js
[downloads-image]: http://img.shields.io/npm/dm/sellect.js.png

[npm-url]: https://www.npmjs.org/package/sellect.js
[npm-image]: https://badge.fury.io/js/sellect.js.png

