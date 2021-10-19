<?php

/**
 * Created by PhpStorm.
 * User: Александр
 * Date: 16.08.2017
 * Time: 10:56
 */
class Smtpmailer
{

    private $email = "messagefromlanding@gmail.com";
    private $password = "landing2018";
    private $host = 'smtp.gmail.com';
    private $port = '587';
    private $from = "SAB";

    function login($email,$password, $from)
    {
        $this->email = $email;
        $this->password = $password;
        $this->from = $from;
        return $this;
    }

    function send($to, $title, $message)
    {
        if(empty($this->email) || empty($this->password))
            throw new Exception("Empty email or password");

        $from = $this->from;
        $to = "<{$to}>";
        $subject = $title;

        $headers = array(
            'From' => $from,
            'To' => $to,
            'Subject' => $subject,
            'Content-Type'  => 'text/html; charset=UTF-8'
        );

        $mime_params = array(
            'text_encoding' => '7bit',
            'text_charset'  => 'UTF-8',
            'html_charset'  => 'UTF-8',
            'head_charset'  => 'UTF-8'
        );

        $smtp = Mail::factory('smtp', array(
            'host' => $this->host,
            'port' => $this->port,
            'auth' => true,
            'username' => $this->email,
            'password' => $this->password,
        ));

        $mime = new Mail_mime("\n");
        $mime->setHTMLBody($message);
        $body = $mime->get($mime_params);
        $headers = $mime->headers($headers);
        $mail = $smtp->send($to, $headers, $body);
        return $this;
    }
}