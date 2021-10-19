<?php
/**
 * Created by PhpStorm.
 * User: Sancho
 * Date: 3/2/2018
 * Time: 6:09 PM
 */

require "./vendor/autoload.php";
include "Smtpmailer.php";
$mail = new Smtpmailer();
$mail->send("powellevan78@gmail.com","Обратная связь SAB","Name: ".$_POST['name']."<br>Email: ".$_POST['email']."<br>Phone: ".$_POST['tel']);
