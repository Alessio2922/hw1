<?php

    // App key
    $client_id = "87992b0ba33e4a30b67d835e6cda9aab";
    $client_secret = "b95da579b8af4ff5886271db429c1c4f";

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    //echo $result;
    curl_close($curl);
    
    $token = json_decode($result)->access_token;
    $query = ($_GET["q"]);

    $data = http_build_query(array("q" => $query, "type" => "album"));
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/search?".$data);
    $headers = array("Authorization: Bearer ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    //echo "<pre>";
    echo $result;
    //echo "</pre>";
    curl_close($curl);

?>