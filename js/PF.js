console.log("i hate")

//Initialize the Variables
let songIndex = "0"
let audioElement = new Audio('../songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Echoes",filePath:"../songs/1.mp3",coverPath:"../covers/echoes.jpeg"},
    {songName: "See Emily Play",filePath:"../songs/2.mp3",coverPath:"../covers/relics.jpg"},
    {songName: "Comfortably Numb",filePath:"../songs/3.mp3",coverPath:"../covers/wall.jpg"},
    {songName: "Another Brick in the Wall,Pt.2",filePath:"../songs/4.mp3",coverPath:"../covers/wall.jpg"},
    {songName: "Wish You Were Here",filePath:"../songs/5.mp3",coverPath:"../covers/wish.png"},
    {songName: "Breathe(In the Air)",filePath:"../songs/6.mp3",coverPath:"../covers/dsotm.png"},
    {songName: "Any Colour You Like",filePath:"../songs/7.mp3",coverPath:"../covers/dsotm.png"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

//Listen to events
//handle play/pause click

masterPlay.addEventListener('click',()=>{
     if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
     }
     else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
     }
})

audioElement.addEventListener('timeupdate', ()=>{
     // update seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
     myProgressBar.value = progress;
     console.log(audioElement.duration);
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        console.log(songIndex)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `../songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex= 0;
        console.log(songIndex)
    }
    else{
        songIndex = parseInt(songIndex);
        songIndex+=1;
        console.log(songIndex)
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex= 6;
        console.log(songIndex)
    }
    else{
        songIndex -= 1;
        console.log(songIndex)
    }
    audioElement.src = `../songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

