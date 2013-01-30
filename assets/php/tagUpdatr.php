<?php

// authorization info
$tumblr_email    = 'briznad@gmail.com';
$tumblr_password = 'tumblrpass';

// data to edit record
$post_id  = $_GET['postID'];
$post_title = rawurldecode($_GET['postTitle']);
$post_body  = rawurldecode($_GET['postBody']);
$post_tags  = $_GET['postTags'];

// Prepare POST request
$request_data = http_build_query(
	array(
		'email'		=> $tumblr_email,
		'password'	=> $tumblr_password,
		'post-id'	=> $post_id,
		'title'		=> $post_title,
		'body'		=> $post_body,
		'tags'		=> $post_tags
	)
);

// Send the POST request (with cURL)
$c = curl_init('http://www.tumblr.com/api/write');
curl_setopt($c, CURLOPT_POST, true);
curl_setopt($c, CURLOPT_POSTFIELDS, $request_data);
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($c);
$status = curl_getinfo($c, CURLINFO_HTTP_CODE);
curl_close($c);

// Check for success
if ($status == 201) {
    echo "Success! The new post ID is $result.\n";
} else if ($status == 403) {
    echo 'Bad email or password';
} else {
    echo "Error: $result\n";
}

?>