var music_player=document.getElementById("music-player");
let img_box=music_player.querySelector(".img-box img");
var music_list=music_player.querySelector(".music-list ul");
var song_name=music_player.querySelector(".song-name .name");
var artist_name=music_player.querySelector(".song-name .artist");
let music_listy=music_player.querySelector(".music-list");
let PLAY_PAUSE=music_player.querySelector('.play-pause');
let PLAY_PAUSE_btn=music_player.querySelector('.play-pause i');
let progress_area=music_player.querySelector(".progress-area");
let progress_bar=music_player.querySelector('.progress-bar');
let currentTime_song=music_player.querySelector(".current");
let durationTime_song=music_player.querySelector(".duration");
var shuffle_btn=music_player.querySelector('.shuffle');
let html='';
var audio=new Audio();
var is_play=false;
var res;
var shuffle=false;
var song_count=0;
var playlist=[
     {
         id:0,
         name:"Tujhe Bhoolna Toh Chaaha",
         file_name:"All songs/Tujhe Bhoolna Toh Chaaha - Jubin Nautiyal 320 Kbps.mp3",
         artist:"Jubin-nautiyal",
         Img:"all pictures/tughe-bhoolna to chaha.jpg"
     },
     {
        id:1,
         name:"Khairiyat (Happy)",
         file_name:"All songs/Khairiyat (Happy) - Arijit Singh.mp3",
         artist:"Arijit Singh",
         Img:"all pictures/khairaiyat.jpg"
     },
     {
        id:2,
         name:"Aalu Le Le ! Comedy ! Hindi ! Funny",
         file_name:"All songs/Aalu Le Le ! Comedy ! Hindi ! Funny.mp3",
         artist:"Pratibha",
         Img:"all pictures/barish ban jana.jpg"
     },
     {
        id:3,
         name:"Baarish Ban Jaana",
         file_name:"All songs/00000. Baarish Ban Jaana - Payal Dev 320 Kbps.mp3",
         artist:"Payal-Dev",
         Img:"all pictures/barish ban jana.jpg"
     },
     {
        id:4,
         name:"Dekhte-Dekhte-Atif-Aslam",
         file_name:"All songs/0. Dekhte-Dekhte-Atif-Aslam.mp3",
         artist:"Atif-Aslam",
         Img:"all pictures/dekhte-dekhte-jnh1cqda.jpeg"
     },
     {
        id:5,
         name:"Tujhe_Kitna_Chahne_Lage",
         file_name:"All songs/00000. Tujhe_Kitna_Chahne_Lage.mp3",
         artist:"Arijit singh",
         Img:"all pictures/tughe kitna chhne lagge.jpg"
     },
     {
        id:6,
         name:"Ve Maahi - Kesari",
         file_name:"All songs/00. Ve Maahi - Kesari.mp3",
         artist:"Arijit singh",
         Img:"all pictures/ve-maahi-lyrics-kesari.jpg"
     },
     {
        id:7,
         name:"Raataan Lambiyan - Shershaah",
         file_name:"All songs/Raataan Lambiyan - Shershaah.mp3",
         artist:"Jubin Nautiyal",
         Img:"all pictures/rattan lambiyan.jpg"
     },
     {
        id:8,
         name:"Chale Aana",
         file_name:"All songs/0. Chale Aana.mp3",
         artist:"Arman Malik",
         Img:"all pictures/challe ana.jpg"
         
     },
     {
        id:9,
         name:"Veham",
         file_name:"All songs/0000. Veham - Armaan Malik.mp3",
         artist:"Arman Malik",
         Img:"all pictures/veham.jpg"
     },
     {
        id:10,
         name:"Nayan",
         file_name:"All songs/0000. Nayan - Dhvani Bhanushali.mp3",
         artist:"Dhvani Bhanushali",
         Img:"all pictures/barish ban jana.jpg"
     }
     
 ]



 for(var i=0;i<=10;i++)
 {
     html+=`<li>
     <div class="row" onclick="play_click(${i})">
         <span class="song-name">${playlist[i].name}</span>
         <p class="artist">${playlist[i].artist}</p>
     </div>
     <span class="audio-timer">${playlist[i].file_name.length}</span>
 </li>`
 }
 music_list.innerHTML=html;
function random()
{
  return Math.floor(Math.random() * 10);
}
function shuffle2()
{
    if(shuffle==false)
    {
        shuffle_btn.classList.add('clikced_me');
        shuffle=true;
    }
    else{
        shuffle_btn.classList.remove('clikced_me');
        shuffle=false;
    }
}
function random_play()
{
    if(is_play)
    {
        audio.pause();
        is_play=false;
        change_play_pause(is_play);
    }
    res=random();
    song_count=res;
    audio=new Audio(playlist[res].file_name);
    audio.play();
    updateTime();
    is_play=true;
    show_name(res);
    show_picture(res);
    change_play_pause(is_play);
}

function show_name(res)
{
    song_name.innerText=playlist[res].name;
    artist_name.innerText=playlist[res].artist;
}

function show_picture(res)
{
    img_box.src=`${playlist[res].Img}`;
}

function updateTime()
{
    audio.addEventListener("timeupdate",function()
    {
          
           const currentTime=audio.currentTime;
           const duration=audio.duration;
           let progress_width=(currentTime/duration)*100;
           progress_area.style.width=`${progress_width}%`;


        //    updating duration time
           let totalmin=Math.floor((duration / 60));
           let totalsec=Math.floor((duration % 60));
           if(totalsec<10)
           {
               totalsec=`0${totalsec}`;
           }
           durationTime_song.innerText=`${totalmin + ":" +totalsec}`;

        // updating current time
           let current_min=Math.floor((currentTime / 60));
           let current_sec=Math.floor((currentTime % 60));
           if(current_sec<10)
           {
            current_sec=`0${current_sec}`;
           }
           currentTime_song.innerText=`${current_min + ":" +current_sec}`;
           if(shuffle==false)
           {

               shuffle_btn.classList.remove('clikced_me');
           }
           if(currentTime==duration && shuffle==false)
           {
               next();
           }
           else if(currentTime==duration && shuffle==true)
           {
             
              random_play();
           }
         
     });


}
function play_pause()
{
    if(is_play)
    {
        audio.pause();
        is_play=false;
        change_play_pause(is_play);
    }
    else
    {
        audio.play();
        is_play=true;
        change_play_pause(is_play);
    }
}
function next()
{
    if(is_play)
    {
        audio.pause();
        is_play=false;
    }
    if(song_count+1>10)
    {
        audio=new Audio(playlist[0].file_name);
        audio.play();
        updateTime();
        is_play=true;
        show_name(0)
        show_picture(0)
        song_count=0;
        shuffle=false;
    }
    else{
        audio=new Audio(playlist[song_count+1].file_name);
        audio.play();
        updateTime();
        is_play=true;
        show_name(song_count+1);
        show_picture(song_count+1);
        song_count+=1;
        shuffle=false;
    }
  
}

function play_click(ans)
{
    
    if(is_play)
    {
        audio.pause();
        is_play=false;
    }
    shuffle=false;
    audio=new Audio(playlist[ans].file_name);
    audio.play();
    is_play=true;
    song_count=ans;
    show_name(ans);
    show_picture(ans);
    updateTime();
    change_play_pause(is_play);
}
function change_play_pause(is_play)
{
    if(is_play)
    {
        PLAY_PAUSE_btn.innerText="pause"
    }
    else{
        PLAY_PAUSE_btn.innerText="play_arrow";
    }
}


function prev()
{
    if(is_play)
    {
        audio.pause();
        is_play=false;
    }
    if(song_count-1<0)
    {
        audio=new Audio(playlist[10].file_name);
        audio.play();
        updateTime();
        is_play=true;
        show_name(10)
        show_picture(10)
        song_count=10;
        shuffle=false;
    }
    else{
        audio=new Audio(playlist[song_count-1].file_name);
        audio.play();
        updateTime();
        is_play=true;
        show_name(song_count-1);
        show_picture(song_count-1);
        song_count-=1;
        shuffle=false;
    }
  
}
function show_list()
{
    music_listy.classList.add("show");
}


function hide_list()
{
    music_listy.classList.remove("show");
}

//updating progress width with user click
progress_bar.addEventListener('click',(e)=>{
  let progress_bar_width=progress_bar.clientWidth;
  let clicked_offset_x=e.offsetX;
  let total_song_duration=audio.duration;
  audio.currentTime=(clicked_offset_x/progress_bar_width)*total_song_duration;
  play_pause();
});
