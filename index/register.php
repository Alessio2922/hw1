<?php

include 'connect.php';

if (isset($_POST['signUp'])) {
    $firstName = $_POST['fName'];
    $lastName = $_POST['lName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_security = md5($password);

    $isUsernameValid = filter_var(
        $firstName,
        FILTER_VALIDATE_REGEXP,
        [
            "options" => [
                "regexp" => "/^[a-z\d_]{3,20}$/i"
            ]
        ]
    );

    $pwdLenght = strlen($password);

    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);
    if ($result->num_rows > 0) {
        echo "Email Address Already Exists !";
    } else if ($isUsernameValid === false) {
        echo  'Lo username non è valido. Sono ammessi solamente caratteri 
                alfanumerici e l\'underscore. Lunghezza minina 3 caratteri.
                Lunghezza massima 20 caratteri';
    } else if ($pwdLenght < 2 || $pwdLenght > 20) {
        echo 'Lunghezza minima password 8 caratteri. <br> Lunghezza massima 20 caratteri';
    } else if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.+\-\[\]\*\~_#:?]).{8,20}$/', $password)) {
        echo 'La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale (. + - [ ] * ~ _ # : ?)';
    } else {
        $insertQuery = "INSERT INTO users(firstName,lastName,email,password)
                       VALUES ('$firstName','$lastName','$email','$password_security')";
        if ($conn->query($insertQuery) == TRUE) {
            header("location: index_login.html");
        } else {
            echo "Error:" . $conn->error;
        }
    }
}

if (isset($_POST['signIn'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_security = md5($password);

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password_security'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        header("Location: index.php");
        exit();
    } else {
        echo "Not Found, Incorrect Email or Password";
    }
}
