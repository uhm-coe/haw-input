# Hawaiian Language Input (haw-input)

This JS module allows you to type Hawaiian Language characters in a given text input element.

Mirrors functionality from the Hawaiian Language Input Chrome extension at https://chromewebstore.google.com/detail/hawaiian-language-input/hkelkgkplogpghhhajjpkabhjkfhojlh

## Setup

1. Import `haw-input` in your JavaScript
2. Call `hawInput(element)` where `element` is a DOM element object that is either a text input or textarea.

## Usage

Type the chord key `` ` `` (backtick), then type the matching letter for lowercase vowel with kahakō or ʻokina as follows:

* a - ā
* e - ē
* i - ī
* o - ō
* u - ū
* ' - ʻ

For example:  To type `ō`, type the sequence `` `o``

Type the chord key `\` (backslash), then type the matching letter for uppercase vowel with kahakō as follows:

* a - Ā
* e - Ē
* i - Ī
* o - Ō
* u - Ū

For example:  To type `Ē`, type the sequence `\e`

To type a backtick or backslash, type the key twice in a row.