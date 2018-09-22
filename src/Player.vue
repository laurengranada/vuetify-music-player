<template>
  <v-app dark>
    <v-content>
      <v-container class="custom-container">
        <player-title-bar ></player-title-bar>
        <player-info-panel :trackInfo="getTrackInfo"></player-info-panel>
        <player-controls-bars 
        :loop="loop"
        :shuffle="shuffle" 
        @toggleshuffle="toggleShuffle"
        @toggleloop="toggleLoop" 
        :progress="progress" 
        @updateseek="setSeek"
        @playtrack="play"
        @pausetrack="pause"
        @stoptrack="stop"
        @skiptrack="skip"
        >
        </player-controls-bars>
        <player-progress-bar :progress="progress" 
        @updateseek="setSeek"></player-progress-bar>
        <player-playlist-panel 
        :playlist="playlist"
        :selectedTrack="selectedTrack" 
        @selecttrack="selectTrack" 
        @playtrack="play">
        </player-playlist-panel>
      <player-search-bar :playlist="playlist"></player-search-bar>
      </v-container>
    </v-content>
  </v-app>
</template>
 
<script>
import PlayerTitleBar from "./components/PlayerTitleBar.vue";
import PlayerPlaylistPanel from "./components/PlayerPlaylistPanel.vue";
import PlayerControlsBars from "./components/PlayerControlsBars.vue";
import PlayerInfoPanel from "./components/PlayerInfoPanel.vue";
import PlayerSearchBar from "./components/PlayerSearchBar.vue";
import PlayerProgressBar from "./components/PlayerProgressBar.vue";

export default {
  components: { PlayerTitleBar, PlayerPlaylistPanel, PlayerControlsBars, PlayerInfoPanel, PlayerSearchBar, PlayerProgressBar },

  data() {
    return {
      playlist: [
        {
          title: "I'll Be Seeing You",
          artist: "Billie Holiday",
          howl: null,
          display: true
        },
        {
          title: "A String Of Pearls",
          artist: "Glenn Miller",
          howl: null,
          display: true
        },
        {
          title: "A Sunday Kind Of Love",
          artist: "Etta James",
          howl: null,
          display: true
        },
        {
          title: "In The Mood",
          artist: "Glenn Miller",
          howl: null,
          display: true
        },
        {
          title: "I Only Have Eyes For You",
          artist: "The Flamingos",
          howl: null,
          display: true
        },
        {
          title: "Moonlight Serenade",
          artist: "Glenn Miller",
          howl: null,
          display: true
        }
      ],
      selectedTrack: null,
      index: 0,
      playing: false,
      loop: false,
      shuffle: false,
      seek: 0,
    };
  },

   computed: {
    currentTrack() {
      return this.playlist[this.index];
    },

    progress(){
      if (this.currentTrack.howl.duration() === 0) return 0
      return this.seek /  this.currentTrack.howl.duration()
    },

    getTrackInfo () {
    let artist = this.currentTrack.artist,
        title = this.currentTrack.title,
        seek = this.seek,
        duration = this.currentTrack.howl.duration()
    return {
      artist,
      title,
      seek,
      duration,
  }
}
  },

    watch: {
    playing(playing){
      this.seek = this.currentTrack.howl.seek()
      let updateSeek
      if (playing){
        updateSeek = setInterval(() =>{
          this.seek = this.currentTrack.howl.seek()
        }, 250)
      } else {
        clearInterval(updateSeek)
      }
    },
  },

  created: function () {
    this.playlist.forEach( (track) => {
    let file = track.title.replace(/\s/g, "_")
    track.howl = new Howl({
      src: [`./playlist/${file}.mp3`],
      onend: () => {
        if (this.loop) {
            this.play(this.index)
        } else {
            this.skip('next')
        }
      }
    })
  })
},

  methods: {
    selectTrack(track) {
      this.selectedTrack = track;
    },

    play(index) {
      var selectedTrackIndex = this.playlist.findIndex(
        track => track === this.selectedTrack
      );

      if (typeof index === "number") {
        index = index;
      } else if (this.selectedTrack) {
        if (this.selectedTrack != this.currentTrack) {
          this.stop();
        }
        index = selectedTrackIndex;
      } else {
        index = this.index;
      }

      let track = this.playlist[index].howl;

      if (track.playing()) {
        return;
      } else {
        track.play();
      }

      this.selectedTrack = this.playlist[index];
      this.playing = true;
      this.index = index;
    },

    pause() {
      this.currentTrack.howl.pause();
      this.playing = false;
    },

    stop() {
      this.currentTrack.howl.stop();
      this.playing = false;
    },

    skip(direction) {
      var index = 0;

      var lastIndex = this.playlist.length - 1;

      if(this.shuffle){
        index = Math.round(Math.random()* lastIndex)
        while (index === this.index){
          index = Math.round(Math.random()* lastIndex)
        }
      }else if (direction === "next") {
        index = this.index + 1;
        if (index >= this.playlist.length) {
          index = 0;
        }
      } else {
        index = this.index - 1;
        if (index < 0) {
          index = this.playlist.length - 1;
        }
      }

      this.skipTo(index);
    },
    skipTo(index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop();
      }

      this.play(index);
    },

    toggleLoop (value){
      this.loop = value
    },

    toggleShuffle(value){
      this.shuffle = value
    },

    setSeek (percents) {
    let track = this.currentTrack.howl
    if (track.playing()) {
      track.seek((track.duration() / 100) * percents)
    }
  }

  },



};
</script>

<style>
  .custom-container{
    box-shadow:  9px 12px 40px 0px black;
    padding: 0px;
    margin-top: 24px;
    margin-bottom: 40px;
  }
</style>
