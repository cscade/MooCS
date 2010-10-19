<?php
/*
	$_GET should contain the following:
		location:	The url of the BCS device
		target:		The resource to access at the BCS target
		mode:		The mode to use to connect to the target (get/post)
		message:	The pre-url-encoded string to pass, if any

	This script will directly echo any response from the target.
*/
$location = $_GET['location'];
$target = $_GET['target'];
$mode = $_GET['mode'];
$message = $_GET['message'];

// create curl resource 
$ch = curl_init(); 

// set url and options
curl_setopt_array($ch, array(
	CURLOPT_URL => sprintf('%s/%s%s', $location, $target, (($mode === 'get' && !empty($message)) ? "?$message" : '')),
	CURLOPT_RETURNTRANSFER => 1));
	
if ($mode === 'post' && !empty($message)) {
	curl_setopt_array($ch, array(
		CURLOPT_POST => 1,
		CURLOPT_POSTFIELDS => $message));
}

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

echo $output;
?>