// Function for going to download spotify from google play
function goPlayStore() {
    // URL of the Google Play Store for spotify app
    const playStoreUrl = 'https://www.spotify.com/us/download/android/';
  
    // Redirect to the Play Store URL
    window.location.href = playStoreUrl;
}

// Function for making like for songs
function makeLike() {
    const heartIcon = document.querySelector('.heartGlow');
  
    // Toggle the 'clicked' class to change the heart color to green
    heartIcon.classList.toggle('clicked');
}
  
  