# Patch Information for Older Version

Older versions of DokuWiki require a patch to use this plugin.

(Versions 2017-02-19 "Frusterick Manners" and older.)

## PATCH 1: Resolving problems with toolbar header buttons

NOTE: This fix was merged into Dokuwiki core as of Oct, 10 2019. So new versions of Dokuwiki released after that date will not need this patch.

The header buttons in the editor toolbar are not working.

Here is the patch for version 2017-02-19b+:

```diff
--- \lib\scripts\edit-original.js
+++ \lib\scripts\edit.js
@@ -143,16 +143,17 @@
  * @author Andreas Gohr <gohr@cosmocode.de>
  */
 function currentHeadlineLevel(textboxId){
     var field = jQuery('#' + textboxId)[0],
         s = false,
         opts = [field.value.substr(0,getSelection(field).start)];
-    if (field.form.prefix) {
-        // we need to look in prefix context
-        opts.push(field.form.prefix.value);
-    }
+        //if (field.form.prefix) {  // Dokucrypt Plugin Mod
+        if (field.form && field.form.prefix) {  // Dokucrypt Plugin Mod
+            // we need to look in prefix context
+            opts.push(field.form.prefix.value);
+        }

     jQuery.each(opts, function (_, opt) {
         // Check whether there is a headline in the given string
         var str = "\n" + opt,
             lasthl = str.lastIndexOf("\n==");
         if (lasthl !== -1) {
```

**Manual Patch Instructions**

1. In the file /lib/scripts.edit.js
2. Find the section: function currentHeadlineLevel(textboxId){
3. Inside that section (function), find: if (field.form.prefix) {
4. Change it to: if (field.form && field.form.prefix) {
5. That's it.

You may need to shift+refresh the page after changing this file.
