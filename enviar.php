<?php

var_dump($_POST);
die('hola');
if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
   #Todo tu codigo si el archivo se recibió correctamente.
   print_r($_FILES['file']['name']);
}
die('holaaaa');
?>
