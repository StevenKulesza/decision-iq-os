<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: application/json');
	$flag = true; 
	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

	if(count($request) != 2){
		http_response_code(400);
		return;
	}

	$filename =  $request[0];
	$audience_id = $request[1];

	define( 'ROOT_DIR', dirname(__FILE__) );
	$str = @file_get_contents(realpath($filename.'.json'));

	if($str !== False){
		$json = json_decode($str, true);
		$data =  $json['data'];

		//get styles block for the given audience
		$audienceStyles = $data[0]['styles']['styles'][$audience_id];

		//make sure the requested audience is in the feed
		if($data[0]['styles']['styles'][$audience_id] === null){
			//if not, use the 'all_audiences' styles block that all feeds contain
			$audienceStyles = $data[0]['styles']['styles']['all_audiences'];
		}

		//assign audience id
		$data[0]['audience_id'] = $audience_id;
		//assign style block
		$data[0]['styles']['styles'] = $audienceStyles;
		$data[0]['styles']['styles']['audience_id'] = $audience_id;

		http_response_code(200);
		echo json_encode($data[0], JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);

		$flag = false;
	}

	if($flag){
		http_response_code(400);
		return;
	}
?>	
