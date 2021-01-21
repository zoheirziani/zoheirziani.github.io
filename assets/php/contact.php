<?php
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel']
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "ziani.zoheir@gmail.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!";
?>