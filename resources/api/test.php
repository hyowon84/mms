<?php
require_once __DIR__.'/vendor/autoload.php';
include "_common.php";

use SoftLayer\Common\ObjectMask;
use SoftLayer\SoapClient;
use SoftLayer\XmlRpcClient;

$json = array();
$data = array();
$cluster_id = $_SESSION['cluster_id'];


$apiUser = $_SESSION['api_id'];
$apiKey = $_SESSION['api_key'];


if($mode == 'eventlog') {

	$response = SoapClient::getClient('SoftLayer_Event_Log', null, $apiUser, $apiKey);
	$data = $response->getAllObjects();
	
}
else if($mode == 'notilog') {
	$response = SoapClient::getClient('SoftLayer_Notification_Occurrence_Event', null, $apiUser, $apiKey);
	$data = $response->getAllObjects();

}


print_r($data);
?>