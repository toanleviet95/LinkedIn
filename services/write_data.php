<?php
    $data = file_get_contents('php://input');
    file_put_contents('../database/data_edit.json',$data);
?>