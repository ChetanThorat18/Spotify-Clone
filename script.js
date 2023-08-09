// Function for going to download spotify from google play
function goPlayStore() {
  // URL of the Google Play Store for spotify app
  const playStoreUrl = "https://www.spotify.com/us/download/android/";

  // Redirect to the Play Store URL
  window.location.href = playStoreUrl;
}

// Function for making like for songs
function makeLike() {
  const heartIcon = document.querySelector(".heartGlow");
  // Toggle the 'clicked' class to change the heart color to green
  heartIcon.classList.toggle("clicked");
}
// Func for adding song to fav
function addToFav() {
  const spotifyButton = document.getElementById("spotify-button");
  const heartIcon = spotifyButton.querySelector(".heart-icon");
  let isFavorite = false;

  spotifyButton.addEventListener("click", () => {
    isFavorite = !isFavorite;
    if (isFavorite) {
      heartIcon.style.fill = "green";
    } else {
      heartIcon.style.fill = "white";
    }
  });
}
// call above func
addToFav();

// Play the song(play/pause functionality)
function playBtn() {
  // This function takes a time in the format "MM:SS" (minutes and seconds) and converts it to total seconds.
  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":");
    return parseInt(minutes) * 60 + parseInt(seconds);
  }

  // Represents the initial time displayed in the currentTimeSpan.
  const initialTime = "00:00";
  // Represents the total duration of the audio track.
  const totalTime = "2:59";
  // Represents the path to the pause button
  const pauseImagePath = "../Assets/player_icon3.png";

  // These variables store references to various DOM elements using querySelector and getElementById.
  const playerControlIcons = document.querySelectorAll("#player-icon-id3");
  const playbackBar = document.querySelector(".progress-bar");
  const currentTimeSpan = document.querySelector(".current-time");
  const totalTimeSpan = document.querySelector(".total-time");
  const playPauseIcon = document.getElementById("player-icon-id3");

  // A boolean flag that indicates whether the audio is currently playing.
  let isPlaying = false;
  // Stores the interval ID returned by setInterval, which is used to control the continuous progress bar update.
  let intervalId;
  // Stores the playback position in seconds when the audio is paused. It helps to resume playback from the same point.
  let lastPlaybackPosition = 0; // Store the last playback position

  // These event listeners listen for clicks on the play/pause icons
  // Clears the interval using clearInterval(intervalId) to stop the progress bar updates.
  // Resets the playback bar value and current time display.
  // Sets the appropriate icon as active (pause icon when playing and original icon when paused).
  // If the audio is not playing (isPlaying is false), it starts playback from the last position and updates isPlaying accordingly. If the audio is already playing, it pauses playback and updates isPlaying.
  playerControlIcons.forEach((icon) => {
    icon.addEventListener("click", () => {

      clearInterval(intervalId);
      isPlaying = !isPlaying;
      playerControlIcons.forEach((otherIcon) => {
        if (otherIcon !== icon) {
          otherIcon.src = otherIcon.getAttribute("src");
        }
      });

      if (isPlaying) {
        icon.src = pauseImagePath;
        // isPlaying = true;
        startPlayback(lastPlaybackPosition); // Resume from the last position
      } else {
        icon.src = icon.getAttribute("src");
        isPlaying = false;
        lastPlaybackPosition =
          (timeToSeconds(totalTime) * playbackBar.value) / 100; // Store the current position
      }
      updatePlayPauseIcon();
    });
  });

  playbackBar.value = 0;

  // This event listener listens for changes to the playback bar's input value (dragging the progress bar slider).
  playbackBar.addEventListener("input", () => {
    clearInterval(intervalId);
    // If audio is playing (isPlaying is true), it calculates the current time based on the input value and updates the current time display.
    if (isPlaying) {
      const currentTimeInSeconds =
        (timeToSeconds(totalTime) * playbackBar.value) / 100;
      const minutes = Math.floor(currentTimeInSeconds / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor(currentTimeInSeconds % 60)
        .toString()
        .padStart(2, "0");

      currentTimeSpan.textContent = `${minutes}:${seconds}`;
    }
  });

  // This function handles the continuous update of the progress bar during playback.
  // It takes the startPosition as an argument, which represents the starting point in seconds.
  function startPlayback(startPosition) {
    const duration = timeToSeconds(totalTime);
    const updateInterval = 100; // Update the progress bar every 100ms
    let currentTime = startPosition; // Start from the last position
    // It sets an interval using setInterval to update the progress bar and current time every updateInterval milliseconds.
    // The interval updates the currentTime based on the updateInterval, calculates the playback bar value, and updates the current time display.
    // When the playback duration is reached, the interval is cleared, the pause icon is restored, and isPlaying is set to false.
    intervalId = setInterval(() => {
      if (currentTime >= duration) {
        clearInterval(intervalId);
        playPauseIcon.src = playPauseIcon.getAttribute("src");
        isPlaying = false;
      } else {
        currentTime += updateInterval / 1000;
        playbackBar.value = (currentTime / duration) * 100;
        currentTimeSpan.textContent = formatTime(currentTime);
      }
    }, updateInterval);
  }

  // This function converts time in seconds to the "MM:SS" format.
  // It calculates minutes and seconds from the given timeInSeconds and returns the formatted time.
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

   // This function updates the play/pause icon based on the isPlaying flag
   function updatePlayPauseIcon() {
    if (isPlaying) {
      playPauseIcon.innerHTML = '<img src="/Assets/icons8-pause-64.png">';
    } else {
      playPauseIcon.innerHTML = '<img src="/Assets/player_icon3.png">'; // Set to the original play icon
    }
  }

  // Call the function to set the initial play/pause icon state
  updatePlayPauseIcon();

}
playBtn();

// fun that scroll volume
function volScroll() {
  const scrollableInput = document.getElementById("scrollable-input");

  scrollableInput.addEventListener("wheel", (event) => {
    event.preventDefault(); // Prevent the default scroll behavior

    // Determine the direction of the scroll
    const direction = event.deltaY > 0 ? 1 : -1;

    // Calculate the new value based on the scroll direction and step
    const newValue =
      parseInt(scrollableInput.value) +
      direction * parseInt(scrollableInput.step);

    // Ensure the new value stays within the min and max range
    const clampedValue = Math.min(
      parseInt(scrollableInput.max),
      Math.max(parseInt(scrollableInput.min), newValue)
    );

    // Update the input's value
    scrollableInput.value = clampedValue;
  });
}
volScroll();
