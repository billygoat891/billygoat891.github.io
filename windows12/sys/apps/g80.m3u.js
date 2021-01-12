system42.on('apps:ready', function(le) { 'use strict'
  var songs = [];

  le._apps['g80.m3u'] = {
    categories: 'Audio',
    name: 'G80.M3U',
    icon: '/c/sys/skins/w93/mime/audio.png',
    accept: '.mp3,.ogg,.flac,.mod,.xm,.it,.s3m,.amd,.rad,.hsc',
    exec: function(url) {
      if (url) {
        songs.push(url);
      } else {
        songs = [
          '/c/programs/bananamp/m3u/anders/01 world of wonders.mod',
          '/c/programs/bananamp/m3u/anders/02 das woman.mod',
          '/c/programs/bananamp/m3u/anders/03 photobeat.mod',
          '/c/programs/bananamp/m3u/anders/04 chain man.mod',
          '/c/programs/bananamp/m3u/anders/05 chicax iv.mod',
          '/c/programs/bananamp/m3u/anders/06 sicksucker.mod',
          '/c/programs/bananamp/m3u/anders/07 i124q.mod',
          '/c/programs/bananamp/m3u/anders/08 fucktop.mod',
          '/c/programs/bananamp/m3u/anders/09 jull.mod',
          '/c/programs/bananamp/m3u/anders/10 vaticanpowerloop.mod',
          '/c/programs/bananamp/m3u/anders/11 handik.mod',
          '/c/programs/bananamp/m3u/anders/12 jamo babbo6.mod',
          '/c/programs/bananamp/m3u/anders/13 afrikaan2.mod',
          '/c/programs/bananamp/m3u/anders/14 datagroove again.mod'
        ];
      }

      if (le.bananampOpen) {
        if (le.bananampReady) {
          le.bananampReady(songs)
          songs.length = 0;
        }
        return;
      }

      le.bananampOpen = true;
      var about = '<p><b>G80.M3U</b>\n Amiga-stuff</p><p><a href="https://www.goto80.com" target="blank">https://www.goto80.com</a></p>';

      $window.call(this, {
        icon: '/c/sys/skins/w93/mime/audio.png',
        width: 842,
        height: 560,
        help: about,
        url: '/c/programs/bananamp/m3u/index.php',
        onready: function () {
          var that = this
          that.el.iframe.contentWindow.le = le
          that.el.iframe.contentWindow.$file = $file
          that.el.iframe.contentWindow.loadSongs(songs)
          le.bananampReady = that.el.iframe.contentWindow.loadSongs
          songs.length = 0;
        },
        onclose: function () {
          le.bananampReady = false
          le.bananampOpen = false
        }
      })
    }
  }
})
