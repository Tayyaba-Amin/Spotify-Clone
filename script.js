let songIndex = 0;
let songs = [
    {
        songName: "Morning Breeze",
        filePath: "songs/1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Echoes of Time",
        filePath: "songs/2.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        songName: "Quiet Horizons",
        filePath: "songs/3.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        songName: "Golden Path",
        filePath: "songs/4.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        songName: "Midnight Reflections",
        filePath: "songs/5.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        songName: "Calm Waters",
        filePath: "songs/6.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        songName: "Hidden Journey",
        filePath: "songs/7.mp3",
        coverPath: "covers/7.jpg"
    },
    {
        songName: "Crystal Skies",
        filePath: "songs/8.mp3",
        coverPath: "covers/8.jpg"
    },
    {
        songName: "Silent Footsteps",
        filePath: "songs/9.mp3",
        coverPath: "covers/9.jpg"
    },
    {
        songName: "Endless Sunrise",
        filePath: "songs/10.mp3",
        coverPath: "covers/10.jpg"
    }
];
let currentSong = document.getElementById("currentSong");
let songItemPlay = document.getElementsByClassName("songItemPlay");
let songItems = document.getElementsByClassName("songItem");
let audioElement = new Audio(songs[0].filePath);
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let gif = document.getElementById("gif");
gif.style.opacity = 0;
currentSong.innerText = songs[0].songName;
// Populate song names and covers
Array.from(songItems).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =
        songs[i].songName;
});
//  MASTER PLAY 
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        Array.from(songItemPlay)[songIndex].classList.remove("fa-circle-play");
        Array.from(songItemPlay)[songIndex].classList.add("fa-circle-pause");
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        Array.from(songItemPlay)[songIndex].classList.remove("fa-circle-pause");
        Array.from(songItemPlay)[songIndex].classList.add("fa-circle-play");
    }
});
//  PROGRESS BAR 
audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt(
            (audioElement.currentTime / audioElement.duration) * 100
        );
        myProgressBar.value = progress;
    }
});
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
});
//  RESET ALL SONG ICONS 
function makeAllPlays() {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
}
// PLAY SONG 
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    myProgressBar.value = 0;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    currentSong.innerText = songs[songIndex].songName;
}
// SONG CLICK 
Array.from(songItemPlay).forEach((element) => {
    element.addEventListener("click", () => {
        songIndex = parseInt(element.id);
        makeAllPlays();
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
        playSong();
    });
});
// NEXT
next.addEventListener("click", () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    makeAllPlays();
    Array.from(songItemPlay)[songIndex].classList.remove("fa-circle-play");
    Array.from(songItemPlay)[songIndex].classList.add("fa-circle-pause");
    playSong();
});

//  PREVIOUS 
previous.addEventListener("click", () => {
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    makeAllPlays();
    Array.from(songItemPlay)[songIndex].classList.remove("fa-circle-play");
    Array.from(songItemPlay)[songIndex].classList.add("fa-circle-pause");
    playSong();
});
//   Ended
audioElement.addEventListener("ended", () => {
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    makeAllPlays();
    Array.from(songItemPlay)[songIndex].classList.remove("fa-circle-play");
    Array.from(songItemPlay)[songIndex].classList.add("fa-circle-pause");
    playSong();
});