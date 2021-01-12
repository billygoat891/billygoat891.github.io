system42.on("apps:ready", function(le) {
  "use strict";

  le._apps["crazy"] = {
    categories: "Amusement",
    name: "Crazy Error",
    icon: "/c/sys/skins/w93/error.png",
    exec: function(url, opt) {
      $loader(["/c/libs/MIDIFile/dist/MIDIFile.js"], function() {
        var cont = le._dom.desktop;
        ////////////////////////////////////////////////
        var styleTopppp =
          "  position: absolute;" +
          "  top: 0;" +
          "  bottom: 0;" +
          "  left: 0;" +
          "  right: 0;" +
          "  width: auto;" +
          "  height: auto;" +
          "  z-index: 500;" +
          "  background-repeat: no-repeat;" +
          "  background-size: contain;" +
          "  image-rendering: pixelated;" +
          "  background-position: center;";

        var bsodEl = document.createElement("div");
        bsodEl.id = "CE_BSOD";
        bsodEl.className = "hide";
        var loginEl = document.createElement("div");
        loginEl.id = "CE_LOGIN";
        loginEl.className = "hide";

        var styles = document.createElement("style");
        styles.innerHTML =
          "#CE_BSOD{" +
          styleTopppp +
          "  background-color: #0102AC;" +
          '  background-image: url("/c/programs/crazyError/BSoD.png");' +
          "}#CE_LOGIN{" +
          styleTopppp +
          "  background-color: #000;" +
          "  background-size: initial;" +
          '  background-image: url("/c/sys/img/logow.png");' +
          "}";

        cont.appendChild(styles);
        cont.appendChild(bsodEl);
        cont.appendChild(loginEl);

        // console.log(cont.offsetWidth)

        var folders = [
          "/c/",
          "/c/sys/cursors/",
          "/c/files/images/icons/",
          "/c/sys/skins/w93/",
          "/c/sys/skins/w93/16/",
          "/c/sys/skins/w93/ext/",
          "/c/libs/",
          "/a/",
          "/c/sys/fonts/C64_TrueType_v1.2-STYLE/",
          "/c/files/music/modules/ACID/",
        ];

        var sequences;

        // var bsodEl = document.get
        var bsod = {
          show: function() {
            bsodEl.classList.remove("hide");
          },
          hide: function() {
            bsodEl.classList.add("hide");
          },
        };
        var login = {
          show: function() {
            loginEl.classList.remove("hide");
          },
          hide: function() {
            loginEl.classList.add("hide");
          },
        };

        // ENGINE
        /////////

        var w2 = cont.offsetWidth / 2;
        var h2 = cont.offsetHeight / 2;

        function pointFromPointAngleRadius(myPoint, myAngle, myRadius) {
          var newPoint = [0.0, 0.0];
          newPoint[0] =
            myPoint[0] +
            Math.cos(myAngle * 3.14 / 180.0) * Math.floor(myRadius);
          newPoint[1] =
            myPoint[1] +
            Math.sin(myAngle * 3.14 / 180.0) * Math.floor(myRadius);
          return newPoint;
        }

        var trigo = {
          cnt: 0,
          exec: function(total) {
            var xy = pointFromPointAngleRadius(
              [w2, h2],
              this.cnt * (360 / total) - 90,
              cont.offsetWidth / 5
            );
            this.cnt++;
            var cnt = this.cnt;
            return {
              left: xy[0] - 380 / 2,
              top: xy[1] - 110 / 2,
            };
          },
        };

        var spin = {
          cnt: 0,
          exec: function(total) {
            var xy = pointFromPointAngleRadius(
              [w2, h2],
              this.cnt * (360 / total) - 90,
              cont.offsetWidth / 5
            );
            this.cnt++;
            var cnt = this.cnt;
            return {
              left: xy[0] - 380 / 2,
              top: xy[1] - 110 / 2,
              baseClass: "ui_alert fx_spin",
            };
          },
        };

        var OK = {
          cnt: 0,
          exec: function() {
            var xy = pointFromPointAngleRadius(
              [w2, h2],
              this.cnt * (360 / 10) - 90,
              cont.offsetWidth / 5
            );
            this.cnt++;
            var cnt = this.cnt;
            return {
              left: xy[0] - 380 / 2,
              top: xy[1] - 110 / 2,
              style: {
                transform: "scale(" + cnt / 2 + ")",
              },
            };
          },
        };

        function resetSeq() {
          trigo.cnt = 0;
          spin.cnt = 0;
          OK.cnt = 0;
          sequences = [
            { top: 200, left: 200, noOut: true },
            { top: 23, left: 23, noOut: true },
            { top: 23, left: cont.offsetWidth - 380 - 23, noOut: true },
          ];
        }
        resetSeq();

        var sounds = {};

        var notes = {
          24: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/24.mp3').play()
            sounds[24].play();
            $alert(
              $extend(
                {
                  title: "Error",
                  msg:
                    "Setup detected that teh operating system in use is not Windows " +
                    "2000 or XP. This setup program and its associated drivers are " +
                    "designed to run only on Windows 2000 or XP. The installation will " +
                    "be terminated.",
                  img: "/c/sys/skins/w93/error.png",
                  // ,bodyClass: 'ui_alert--crazy'
                  center: false,
                  sound: null,
                  onready: function() {
                    if (this.cfg.maxTop && this.cfg.maxLeft) resetSeq();
                  },
                },
                seq
              )
            );
          },
          25: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/25.mp3').play()
            sounds[25].play();
            $alert(
              $extend(
                {
                  title: "TADAAAA",
                  msg: "タスクが正常に失敗しました",
                  img: "/c/sys/skins/w93/trophy.gif",
                  btnOk: "ワオ",
                  sound: null,
                  center: true,
                  animationIn: "tada",
                },
                seq
              )
            );
          },
          26: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/26.mp3').play()
            sounds[26].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg: "タスクが正常に失敗しました",
                  img: "/c/sys/skins/w93/alert.png",
                  btnOk: "ワオ",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          27: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/27.mp3').play()
            sounds[27].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg: "タスクが正常に失敗しました",
                  img: "/c/sys/skins/w93/info.png",
                  btnOk: "ワオ",
                  sound: null,
                  center: false,
                  style: {
                    transform: "scale(2)",
                  },
                  onready: function() {
                    var ttt = this;
                    setTimeout(function() {
                      ttt.destroy();
                    }, 100);
                  },
                },
                seq
              )
            );
          },
          28: function(seq) {
            // truc aleatoire
            // $audio('/c/programs/crazyError/SOUNDS/28.mp3').play()
            sounds[28].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg: "タスクが正常に失敗しました",
                  img: "/c/sys/skins/w93/error.png",
                  btnOk: "ワオ",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          29: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/29.mp3').play()
            sounds[29].play();
            $alert(
              $extend(
                {
                  title: "POUM",
                  msg: "タスクが正常に失敗しました",
                  img: "/c/files/images/icons/no.png",
                  btnOk: "ワオ",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          30: function(seq) {
            // console.log('left')
            // $audio('/c/programs/crazyError/SOUNDS/30.mp3').play()
            sounds[30].play();
            $alert(
              $extend(
                {
                  title: "TCHAK",
                  msg: '何か問題でも "C:\\Program Files" 笑',
                  img: "/c/sys/skins/w93/install.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          31: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/31.mp3').play()
            sounds[31].play();
            $alert(
              $extend(
                {
                  title: "ウィンドウ",
                  msg:
                    "曖昧さ回避 この項目では、コンピュータのウィンドウシステムにおけるウィンドウについて説明しています。一般的な「窓」については「窓」をご覧ください。フロー制御におけるウィンドウについては「スライディングウィンドウ」をご覧ください。シャープの液晶テレビのブランド名称については「ウィンドウ (シャープの製品)」をご覧ください。芸能事務所については「ウィンドー (芸能プロダクション)」をご覧ください。PEARLのアルバムについては「WINDOW」をご覧ください。",
                  img: "/c/files/images/icons/lol.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          32: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/32.mp3').play()
            sounds[32].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg: '何か問題でも "C:\\Program Files" 笑',
                  img: "/c/files/images/icons/yea.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  // ,baseClass: 'fx_spin ui_alert'
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          33: function(seq) {
            // notif
            // $audio('/c/programs/crazyError/SOUNDS/33.mp3').play()
            sounds[33].play();
            $notif(
              $extend(
                {
                  text: "あまりにも多くのエラー笑",
                  speed: 1,
                },
                seq
              )
            );
          },
          34: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/34.mp3').play()
            sounds[34].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg: '何か問題でも "C:\\Program Files" 笑',
                  img: "/c/sys/skins/w93/floppy-format.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  sound: null,
                  center: false,
                },
                seq
              )
            );
          },
          35: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/35.mp3').play()
            sounds[35].play();
            $alert(
              $extend(
                {
                  title: "あまりにも多くのエラー笑",
                  msg: "Windowsエクスプローラが動作を停止しました",
                  img: "/c/sys/skins/w93/alert.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  center: false,
                  sound: null,
                  width: 200,
                },
                seq
              )
            );
          },
          36: function(seq) {
            // shutdown
            // $audio('/c/programs/crazyError/SOUNDS/36.mp3').play()
            sounds[36].play();
            $alert(
              $extend(
                {
                  title: "あまりにも多くのエラー笑",
                  msg: "Windowsエクスプローラが動作を停止しました",
                  img: "/c/sys/skins/w93/question.png",
                  btnOk: "いいえ",
                  btnCancel: "うん",
                  center: false,
                  sound: null,
                },
                seq
              )
            );
          },
          37: function(seq) {
            // bonjour
            // $audio('/c/programs/crazyError/SOUNDS/37.mp3').play()
            sounds[37].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg:
                    '曖昧さ回避 "C:\\WINDOWS" 私は何を入力しているのか分かりません',
                  img: "/c/sys/skins/w93/error.png",
                  center: false,
                  sound: null,
                },
                seq
              )
            );
          },
          38: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/38.mp3').play()
            sounds[38].play();
            $prompt(
              {
                msg: "Enter your Credit card number",
                center: false,
              },
              ""
            );
          },
          39: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/39.mp3').play()
            sounds[39].play();
            $alert(
              $extend(
                {
                  title: "エラー",
                  msg:
                    '曖昧さ回避 "C:\\WINDOWS" 私は何を入力しているのか分かりません',
                  img: "/c/files/images/icons/derp.png",
                  btnOk: "OK",
                  center: false,
                  sound: null,
                  onready: function() {
                    var ttt = this;
                    setTimeout(function() {
                      ttt.destroy();
                    }, 500);
                  },
                },
                seq
              )
            );
          },
          40: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/40.mp3').play()
            sounds[40].play();
            $explorer(folders[~~(Math.random() * folders.length)], {
              window: {
                width: 100 + Math.random() * 400,
                height: 100 + Math.random() * 300,
              },
            });
          },
          41: function(seq) {
            // $audio('/c/programs/crazyError/SOUNDS/41.mp3').play()
            sounds[41].play();
            $alert(
              $extend(
                {
                  title: "Error",
                  msg:
                    "Windows has detected that your monitor<br>is not plugined in.",
                  img: "/c/sys/skins/w93/settings.png",
                  btnOk: "wat",
                  center: false,
                  sound: null,
                },
                seq
              )
            );
          },
        };

        // RUN
        //////

        function loadSound(url) {
          return new Promise(function(resolve, reject) {
            var sound = new Howl({
              buffer: false,
              urls: [url],
              onload: function() {
                resolve(sound);
              },
            });
          });
        }

        var all = [
          fetch("/c/programs/crazyError/CRAZY-ERROR-170BPM.mid", {
            credentials: "include",
          }),
          new Promise(function(resolve, reject) {
            var sound = new Howl({
              buffer: true,
              urls: ["/c/programs/crazyError/CRAZY-ERROR-170BPM.wav"],
              onload: function() {
                resolve(sound);
              },
            });
          }),
        ];

        for (var i = 24; i < 42; i++) {
          all.push(loadSound("/c/programs/crazyError/SOUNDS/" + i + ".mp3"));
        }

        Promise.all(all).then(function(assets) {
          var midi = assets.shift();
          var track = assets.shift();
          assets.forEach(function(sound, i) {
            sounds[24 + i] = sound;
          });
          // console.log(sounds)
          track.volume(0.5);
          midi.arrayBuffer().then(function(buffer) {
            var midiFile = new MIDIFile(buffer);
            midiFile.header.setTicksPerBeat(
              midiFile.header.getTicksPerBeat() / 120 * 170
            );

            var events = midiFile.getMidiEvents();
            var curTime = 0; // performance.now();
            var eventBytes = [];

            // return
            var seqNum = {};
            var seqStart = {};
            var seqCursor = {};
            var lastParam;
            var lastSeq;

            function getTotal(param) {
              var total = seqNum[param][seqCursor[param]];
              // console.log(total)
              return total;
            }

            // return

            var gom = 0;
            for (var i = 0, j = events.length; i < j; i++) {
              var ev = events[i];
              if (ev.param2 > 70 && ev.param1 !== 0) {
                if (lastParam !== ev.param1) {
                  seqCursor[ev.param1] = -1;
                  seqStart[i] = ev.param1;
                  if (!seqNum[ev.param1]) seqNum[ev.param1] = [0];
                  else seqNum[ev.param1].push(0);
                }
                lastParam = ev.param1;
                seqNum[ev.param1][seqNum[ev.param1].length - 1]++;
              }
              //////////////////////
              !(function(ev, i) {
                if (i === 0)
                  setTimeout(function() {
                    track.play();
                  }, curTime + ev.playTime);
                setTimeout(function() {
                  if (seqStart[i]) seqCursor[seqStart[i]]++;
                  // console.log(JSON.stringify(ev))
                  // console.log(i)
                  if (ev.param1 === 0 && ev.param2 >= 70) {
                    // $exe('fx ' + le._fx)
                    // $exe('fx ' + le._fx[~~(Math.random() * le._fx.length)])
                    // gom++
                    resetSeq();
                    $window.instances.forEach(function(item) {
                      if (item && item.destroy) item.close();
                    });
                    $window.instances.length = 0;
                  }

                  if (ev.param1 === 24) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      sequences[0].top += 23;
                      sequences[0].left += 23;
                      notes[ev.param1](sequences[0]);
                      // console.log(seqCursor[ev.param1])
                      // notes[ev.param1](spin.exec(getTotal(ev.param1)))
                      // notes[39](OK.exec())
                    }
                  } else if (ev.param1 === 39) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      notes[ev.param1](OK.exec());
                    }
                  } else if (ev.param1 === 35) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      var tt = getTotal(ev.param1);
                      if (tt > 5) {
                        notes[ev.param1](spin.exec(getTotal(ev.param1)));
                      } else {
                        // notes[ev.param1](trigo.exec(getTotal(ev.param1)))
                        notes[ev.param1]();
                      }
                      // notes[ev.param1](spin.exec(getTotal(ev.param1)))
                    }
                  } else if (ev.param1 === 26) {
                    if (ev.param2 < 70) bsod.hide();
                    else bsod.show();
                  } else if (ev.param1 === 41) {
                    if (ev.param2 < 70) login.hide();
                    else login.show();
                  } else if (ev.param1 === 42) {
                    if (ev.param2 < 70) login.hide();
                    else login.show();
                  } else if (ev.param1 === 29) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      sequences[1].top += 23;
                      sequences[1].left += 23;
                      notes[ev.param1](sequences[1]);
                    }
                  } else if (ev.param1 === 30) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      sequences[2].top += 23;
                      sequences[2].left -= 23;
                      notes[ev.param1](sequences[2]);
                    }
                  } else if (ev.param1 === 32) {
                    if (ev.param2 >= 70 && notes[ev.param1]) {
                      notes[ev.param1](trigo.exec(getTotal(ev.param1)));
                    }
                  } else {
                    if (ev.param2 > 100 && notes[ev.param1]) notes[ev.param1]();
                  }
                }, curTime + ev.playTime);
              })(events[i], i);
              //////////////////////
            }
          });
        });
        //////////////////////////
      });
    },
  };
});
