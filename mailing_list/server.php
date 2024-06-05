<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "login_index";
$connect = mysqli_connect($host, $user, $pass, $db);

$name = mysqli_real_escape_string($connect, $_POST["fullName"]);
$email = mysqli_real_escape_string($connect, $_POST["email"]);
$phone = mysqli_real_escape_string($connect, $_POST["phone"]);
$message = mysqli_real_escape_string($connect, $_POST["message"]);

mysqli_query($connect, "INSERT INTO form_data_to_mysql 
(name, email, phone, message) VALUES ('" . $name . "','" . $email . "','" . $phone . "','" . $message . "')");

mysqli_close($connect);
