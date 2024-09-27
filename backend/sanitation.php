<?php
function clean_input($data){
    return htmlspecialchars(stripslashes(trim($data)));
}
//This file should have all the validation logics starting from files texts auth and more
?>