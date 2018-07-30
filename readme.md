# sp-react-formfields [![NPM version](https://badge.fury.io/js/sp-react-formfields.svg)](https://npmjs.org/package/sp-react-formfields) [![Build Status](https://travis-ci.org/olegrumiancev/sp-react-formfields.svg?branch=master)](https://travis-ci.org/olegrumiancev/sp-react-formfields)

> Collection of React controls used for rendering SharePoint fields in custom forms. Supports new/edit/display rendering modes.
> Also includes a panel ListForm component that expects a ListId, FormMode, and optionally ItemId and ContentTypeId parameters

## Installation

```sh
$ npm install --save sp-react-formfields
```

## Usage

```js
import { ListForm } from 'sp-react-formfields/lib/ListForm';
import { FormField } from 'sp-react-formfields/lib/fields/FormField';
import { FormFieldLabel } from 'sp-react-formfields/lib/fields/FormFieldLabel';
import { FormMode, getQueryString, IListFormProps } from 'sp-react-formfields/lib/interfaces'
```

Main usage is
1) rendering ListForm component as top level parent
2) passing ListId, FormMode, ItemId, ContentTypeId properties to ListForm
3) if ListForm does not have any chldren inside - means all fields for current list or content type will be rendered, or you can specify any number of custom JSX and FormField / FormFieldLabel components inside, passing InternalName string to each.

> Advanced usage with asynchronous component loading that significantly reduces initial load time is provided in the scaffolding project below.

## Please refer to [sp-listform-react](https://github.com/olegrumiancev/sp-listform-react) scaffolding project to get you started quickly
### The project is generated using **[Andrew Koltyakov's](https://github.com/koltyakov/)** incredible [SharePoint Push-n-Pull](https://www.npmjs.com/package/generator-sppp) Yeoman generator
#### The end product of the scaffolded solution will be a series of JS, CSS and HTML files that will be easitly uploadable into SharePoint environment and will act as content for embedding in CEWPs

## License

MIT © [Oleg Rumiancev](https://github.com/olegrumiancev)
