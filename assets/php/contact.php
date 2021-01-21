<?php
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel']
    $message = $_POST['message'];

    $recipient = "ziani.zoheir@gmail.com";
    $subject = "You have received an email";
    $formcontent="From: $name \n Message: $message";
    
    
    $mailheader = "From: $email \r\n";
    
    mail($recipient, $subject, $formcontent, $mailheader);
    header("Location: index.html?mailsend")

}
?>
