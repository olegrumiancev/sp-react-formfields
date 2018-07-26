# @olegrumiancev/sp-react-formfields [![NPM version](https://badge.fury.io/js/%40olegrumiancev%2Fsp-react-formfields.svg)](https://npmjs.org/package/@olegrumiancev/sp-react-formfields) [![Build Status](https://travis-ci.org/olegrumiancev/sp-react-formfields.svg?branch=master)](https://travis-ci.org/olegrumiancev/sp-react-formfields)

> Collection of React controls used for rendering SharePoint fields in custom forms. Support new/edit/display rendering modes.

## Installation

```sh
$ npm install --save sp-react-formfields
```

## Usage

```js
import { FormFieldsStore, ListForm, FormField, ... } from 'sp-react-formfields';
```

Main usage is
1) rendering ListForm component as top level parent
2) passing ListId, ListItemId properties to ListForm
3) TODO: if ListForm will not have any chldren inside - means all fields for current list will be rendered, or you can specify any number of FormField components inside, passing InternalName string to each.

## License

MIT © [Oleg Rumiancev](https://github.com/olegrumiancev)
