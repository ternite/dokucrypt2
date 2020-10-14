# DokuWiki Plugin: DokuCrypt2

This is a plugin for DokuWiki to support client side cryptography.

* https://www.dokuwiki.org/plugin:dokucrypt2
* Licence: MIT (https://opensource.org/licenses/MIT)
* Author: Originally by By Scott Moser. Maintained by Sherri W. (https://syntaxseed.com)

## Usage

```
Hi world.  I have a secret.  Can you read it?
<SECRET>I like ice cream</SECRET>
```

When the user hits 'Save' (or a draft is attempted to be saved) a prompt will open, asking the user to enter a pass phrase key for the encryption. Once supplied, the encryption will be done in the browser and the encrypted text submitted to the server.

## ChangeLog

* 2020-10-14: Temp fix for Dokuwiki 2020-07-29 "Hogfather". DecryptSecret button was not appearing on page edit.
