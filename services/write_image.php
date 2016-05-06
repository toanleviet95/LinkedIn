<?php
    $data = file_get_contents('php://input');
    $name = $_GET['name'];
    $types = array('jpeg' => "\xFF\xD8\xFF", 'gif' => 'GIF', 'png' => "\x89\x50\x4e\x47\x0d\x0a", 'bmp' => 'BM', 'psd' => '8BPS', 'swf' => 'FWS');
    $bytes = substr($data,0,6);
    $ext = 'other';
    foreach ($types as $type => $header) {
       if (strpos($bytes, $header) === 0) {
           $ext = $type;
           break;
        }
    }
    $output = '../images/'.$name.'.'.$ext;
    file_put_contents($output, $data);
?>