
/* Set up the decrypt button and necessary functionality. */
function decryptEditSetup(msg) {
    //alert('setting up');
    var editform=null, wikitext=null, hiddentext=null, preview=null;
    if(!(editform=document.getElementById('dw__editform'))) {
      // alert("no form dw__editform\n");
      return(true);
    }
    if(!(wikitext=document.getElementById('wiki__text'))) {
     // alert("no wiki__text");
     return(false);
    }
    // if there is no preview button, then assume this is a
    // "Recover draft" page, dont do anything.
    if(!(preview=document.getElementById('edbtn__preview'))) {
      return(false);
    }

    // create a hidden element with id 'wiki__text_submit' and
    // name wikitext_edit (same as the wiki__text.  move the real
    // wikI__text element out of the form (so it is not submitted and
    // any <SECRET> text left unencrypted
    if(!(hiddentext=document.createElement('input'))) {
     return(false);
    }
    hiddentext.setAttribute('id', 'wiki__text_submit');
    hiddentext.setAttribute('name', 'wikitext');
    hiddentext.setAttribute('type','hidden');
    editform.insertBefore(hiddentext,null);
    editform.parentNode.insertBefore(wikitext,editform);

    if(!(decryptButton=document.createElement('input'))) {
     return(false);
    }
    decryptButton.setAttribute('id', 'decryptButton');
    decryptButton.setAttribute('name', 'decryptButton');
    decryptButton.setAttribute('type','Button');
    decryptButton.setAttribute('value','DecryptSecret');
    // decryptButton.setAttribute('onclick',decryptEditForm);
    decryptButton.onclick=decryptEditForm;
    decryptButton.setAttribute('class','button');
    decryptButton.setAttribute('className','button'); // required for IE
    preview.parentNode.insertBefore(decryptButton,preview);

    editform.onsubmit = function() {return editFormOnSubmit();};

    // The following is taken from lib/scripts/locktimer.js to make drafts work.
    // We override the locktimer refresh function to abort saving of drafts with unencrypted content.
    dw_locktimer.refresh = function(){

        var now = new Date(),
                params = 'call=lock&id=' + dw_locktimer.pageid + '&';

            // refresh every minute only
            if(now.getTime() - dw_locktimer.lasttime.getTime() <= 30*1000) {
                return;
            }

            // POST everything necessary for draft saving
            if(dw_locktimer.draft && jQuery('#dw__editform').find('textarea[name=wikitext]').length > 0){

                // *** BEGIN dokucrypt modified code
                // Do not allow saving of a draft, if this page needs some content to be encrypted on save.
                // Basically abort saving of drafts if this page has some content that needs encrypting.
                if(encryptForSubmit()===false) { return(false); }
                // *** END dokucrypt modified code

                params += jQuery('#dw__editform').find('input[name=prefix], ' +
                                                       'textarea[name=wikitext], ' +
                                                       'input[name=suffix], ' +
                                                       'input[name=date]').serialize();
            }

            jQuery.post(
                DOKU_BASE + 'lib/exe/ajax.php',
                params,
                dw_locktimer.refreshed,
                'html'
            );
            dw_locktimer.lasttime = now;


        /* // ---------------- PREVIOUS VERSION OF DOKUWIKI --------------
        var now = new Date();
        // refresh every minute only
        if(now.getTime() - dw_locktimer.lasttime.getTime() > 30*1000){ //FIXME decide on time
            var params = 'call=lock&id='+encodeURIComponent(dw_locktimer.pageid);
            if(dw_locktimer.draft){
                var dwform = $('dw__editform');
                // begin plugin modified code
                if(encryptForSubmit()===false) { return(false); }
                // end plugin modified code
                params += '&prefix='+encodeURIComponent(dwform.elements.prefix.value);
                params += '&wikitext='+encodeURIComponent(dwform.elements.wikitext.value);
                params += '&suffix='+encodeURIComponent(dwform.elements.suffix.value);
                params += '&date='+encodeURIComponent(dwform.elements.date.value);
            }
            dw_locktimer.sack.runAJAX(params);
            dw_locktimer.lasttime = now;
        }
        // ---------------------------------- Previous Version ---------------
        */
    };
  }


// Run the setup once the window has loaded.
window.addEventListener('DOMContentLoaded', decryptEditSetup, false);
