<?php
if(!defined('DOKU_INC')) die();
if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');
require_once(DOKU_PLUGIN.'action.php');

class action_plugin_dokucrypt2 extends DokuWiki_Action_Plugin {
	function register($controller) {
		$controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'c_hookjs');
	}
	function c_hookjs(&$event, $param) {
		//$event->data['script'][]=array('type'=>'text/javascript','charset'=>'utf-8','_data'=>'','_data'=>"addInitEvent(function() { return(decryptEditSetup()); });");
        $event->data['script'][]=array('type'=>'text/javascript','charset'=>'utf-8','_data'=>'','_data'=>"jQuery(function(){ return(decryptEditSetup()); });");
	}
}
