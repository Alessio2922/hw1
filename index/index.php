<?php
session_start();
include("connect.php");

// Funzione per ottenere il nome utente
function getUsername($conn)
{
  if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];
    $query = mysqli_query($conn, "SELECT users.* FROM `users` WHERE users.email='$email'");
    while ($row = mysqli_fetch_array($query)) {
      return $row['firstName'];
    }
  }
  return false;
}

// Controlla se l'utente è loggato e ottiene il nome utente
$username = getUsername($conn);
?>
<!DOCTYPE html>
<html lang="it">

<head>
  <title>Home - Nirvana</title>
  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Sura:wght@400;700&display=swap" rel="stylesheet">
  <script src="mhw3.js" defer></script>
  <link rel="stylesheet" href="mhw3.css">
  <!-- Mobile -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
  <!-- Testata all'apertura del sito web -->
  <header id="headerSlide" class="slide1">
    <div class="overlay"></div>
    <nav id="contenitore">
      <div>
        <img id="logo-home" src="mhw3-img/nirvana-logo.png" alt="Nirvana Logo">
      </div>
      <div>
        <a class="button" href="#music">Music</a>
        <a class="button" href="#videos">Videos</a>
        <a class="button" href="#search">Search</a>
        <a class="button" href="#mailing-list">Mailing List</a>
        <?php
        if ($username) {
          echo "<p class='button'>Hello " . $username . "</p>";
          echo "<a class='button' href='logout.php'>Logout</a>";
        } else {
          echo "<a class='button' href='index_login.html'>Accedi</a>";
        }
        ?>
      </div>
      <!-- Menù a tendina -->
      <div class="burger" onclick="toggleButtons()">
        <div class="list"></div>
        <div class="list"></div>
        <div class="list"></div>
      </div>
    </nav>
  </header>

  <!-- Sezione per la discografia -->
  <section id="music" class="new-contenitore">
    <div>
      <strong>DISCOGRAPHY</strong>
    </div>
    <nav>
      <a class="new-button" href="..\music\music.html">SEE ALL</a>
    </nav>
  </section>

  <section class="gallery">
    <div class="row">
      <div class="cella"> <img src="mhw3-img/nevermind.jpg" alt="Nevermind"> </div>
      <div class="cella"> <img src="mhw3-img/bleach.jpg" alt="Bleach"> </div>
      <div class="cella"> <img src="mhw3-img/unplugged.jpg" alt="Unplugged"> </div>
      <div class="cella"> <img src="mhw3-img/inutero.jpg" alt="In Utero"> </div>
    </div>
    <div class="row">
      <div class="cella"> <img src="mhw3-img/inutero.jpg" alt="In Utero"> </div>
      <div class="cella"> <img src="mhw3-img/unplugged.jpg" alt="Unplugged"> </div>
      <div class="cella"> <img src="mhw3-img/bleach.jpg" alt="Bleach"> </div>
      <div class="cella"> <img src="mhw3-img/nevermind.jpg" alt="Nevermind"> </div>
    </div>
  </section>

  <!-- Sezione per la ricerca -->
  <section id="search" class="new-contenitore">
    <div>
      <strong>SEARCH</strong>
    </div>
    <nav>
      <a class="new-button" href="..\search\search.html">SEE ALL</a>
    </nav>
  </section>

  <!-- Immagini di esempio per la ricerca  -->
  <section id="album-view">
    <div></div>
    <div></div>
    <div></div>
  </section>
  <section id="modal-view" class="hidden-modal"></section>

  <!-- Sezione video -->
  <section id="videos" class="new-contenitore">
    <div>
      <strong>VIDEOS</strong>
    </div>
    <nav>
      <a class="new-button" href="..\videos\videos.html">SEE ALL</a>
    </nav>
  </section>

  <!-- Video canzone -->
  <div class="video-dim">
    <video controls autoplay muted>
      <source src="mhw3-img/transition1.mp4" type="video/mp4">
    </video>
  </div>

  <!-- Mailing List -->
  <section id="mailing-list" class="new-contenitore">
    <div>
      <strong>MAILING LIST</strong>
    </div>
    <nav>
      <a class="new-button" href="..\mailing_list\mailing_list.html">SEE ALL</a>
    </nav>
  </section>

  <!-- Footer e mailing list -->
  <footer id="footer-data" data-hidden="true">
    <div class="footer-content">
      <div class="footer-section about">
        <h3>About Nirvana</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, beatae iusto animi quos quae quasi
          provident minus? Beatae, incidunt aspernatur labore omnis rem magni at ab. Enim sequi non temporibus?</p>
      </div>
      <div class="footer-section contact">
        <h3>Contact</h3>
        <p>Email: info@nirvana.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
      <div class="footer-section social">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">YouTube</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2024 Nirvana. All rights reserved.
    </div>
  </footer>

  <button id="vedi-altro">Vedi altro</button>

  <!-- API Spotify -->
  <h1>Ricerca Album Nirvana</h1>
  <form id="search-formAPI">
    <label for="albumAPI"></label>
    <input type="textAPI" id="albumAPI" name="albumAPI" required>
    <button type="submit">Cerca</button>
  </form>
  <div id="album-viewAPI"></div>

  <!-- API The Guardian -->
  <h1>Ultimi articoli dal The Guardian su Nirvana</h1>

  <div id="article-container">
    <button id="read-more-button">Leggi altri articoli</button>
  </div>
</body>

</html>