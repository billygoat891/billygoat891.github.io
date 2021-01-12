system42.on("apps:ready", function(le) {
  "use strict";
  le._apps["pony"] = {
    categories: "Music;Graphics",
    name: "Poney Jockey",
    icon: "apps/poney.gif",
    //accept: '.json',
    exec: function() {
      var scope = this;

      var anim = {
        Invert: $loop(function() {
          scope._everything.classList.toggle("invert");
        }),
        Tada: $loop(function() {
          scope._everything.classList.toggle("tada");
          scope._everything.classList.toggle("animate");
        }, 100),
        Hue: $loop(function() {
          scope._everything.style.filter =
            "hue-rotate(" + Math.random() * 360 + "deg)";
          scope._everything.style.webkitFilter =
            "hue-rotate(" + Math.random() * 360 + "deg)";
        }),
        Blur: $loop(function() {
          scope._everything.style.filter = "blur(" + Math.random() * 60 + "px)";
          scope._everything.style.webkitFilter =
            "blur(" + Math.random() * 60 + "px)";
        }),
        Saturate: $loop(function() {
          scope._everything.style.filter =
            "saturate(" + Math.random() * 500 + "%)";
          scope._everything.style.webkitFilter =
            "saturate(" + Math.random() * 500 + "%)";
        }),
        Contrast: $loop(function() {
          scope._everything.style.filter =
            "contrast(" + Math.random() * 1500 + "%)";
          scope._everything.style.webkitFilter =
            "contrast(" + Math.random() * 1500 + "%)";
        }),
      };

      var layout = {
        default: [
          "f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12",
          "1 2 3 4 5 6 7 8 9 0 backspace",
          "tab a z e r t y u i o p ^ $",
          "caps q s d f g h j k l m \u00f9 * enter",
          "shift < w x c v b n , ; : !",
          "ctrl alt space",
        ],
      };

      var poney = {};
      var poneyFn = {};
      var poneyFill = {};

      var layoutDiv = document.createElement("div");
      layoutDiv.className = "vj_layout";
      var lineDiv = document.createElement("div");
      var keyDiv = document.createElement("button");
      function displayLayout(layout) {
        $io.arr.all(layout, function(line) {
          var lineD = lineDiv.cloneNode(false);
          layoutDiv.appendChild(lineD);
          var keys = line.split(" ");
          $io.arr.all(keys, function(k) {
            var kk = keyDiv.cloneNode(false);
            //console.log(kk);
            kk.innerHTML = k;
            kk.id = "vj_key_" + k;
            lineD.appendChild(kk);
            kk.addEventListener(
              "focus",
              function() {
                current.textContent = k;
                //if (vj_sound[k]) sound.value = vj_sound[k];
                $io.obj.all(poney, function(item, key) {
                  //console.log('key', item, key);
                  poneyFill[key](item[k] || "");
                });
              },
              false
            );
          });
        });
        return layoutDiv;
      }

      var ui = document.createElement("div");
      ui.appendChild(displayLayout(layout["default"])); //'yo';

      var keys = {};

      var vjCombo = document.createElement("div"),
        truc = document.createElement("div"),
        image = document.createElement("input"),
        klass = document.createElement("input"),
        js = document.createElement("textarea");
      vjCombo.className = "vj_truc";

      //var selectEffects = document.getElementById('select_effects');

      function createSelector(what, fn) {
        //poney[what];
        poney["sound"] = $store(
          "vj/sound",
          {
            "1": "/c/files/sounds/yanp.mp3",
            space: "/c/files/sounds/air-horn.mp3",
            a: "/c/files/sounds/aplausos_2.mp3",
            z: "/c/files/sounds/Aw this stuff is really fresh.mp3",
            e: "/c/files/sounds/badumtss.swf.mp3",
            r: "/c/files/sounds/ballsofsteel.swf.mp3",
            t: "/c/files/sounds/boomheadshot.swf.mp3",
            y: "/c/files/sounds/censor-beep-1.mp3",
            u: "/c/files/sounds/check this out.mp3",
            i: "/c/files/sounds/chewbacca.swf.mp3",
            o: "/c/files/sounds/CHORD.mp3",
            p: "/c/files/sounds/chuck.mp3",
            q: "/c/files/sounds/combobreaker.mp3",
            s: "/c/files/sounds/crack_the_whip.mp3",
            d: "/c/files/sounds/cuek.swf.mp3",
            f: "/c/files/sounds/DAMN SON! WHERED YOU FIND THIS.mp3",
            g: "/c/files/sounds/doh.swf.mp3",
            h: "/c/files/sounds/double_rainbow.mp3",
            j: "/c/files/sounds/drama.swf.mp3",
            k: "/c/files/sounds/dramatic-end.mp3",
            l: "/c/files/sounds/dramatic-look-kill-bill1.mp3",
            m: "/c/files/sounds/dramatic.swf.mp3",
            ù: "/c/files/sounds/dry-fart.mp3",
            w: "/c/files/sounds/duke-nukem-shit-happens.mp3",
            x: "/c/files/sounds/dun_dun_1.mp3",
            c: "/c/files/sounds/efeitos-sonoros-brasil-sil-sil-rede-globo.mp3",
            v: "/c/files/sounds/emobullshit.ogg",
            b: "/c/files/sounds/exterminate.mp3",
            n: "/c/files/sounds/fatality.swf.mp3",
            ",": "/c/files/sounds/final-fantasy-v-music-victory-fanfare.mp3",
            ";": "/c/files/sounds/fua.mp3",
            ":": "/c/files/sounds/fuck.mp3",
            "!": "/c/files/sounds/fuckoff.mp3",
            shift: "/c/files/sounds/hh.mp3",
            ctrl: "/c/files/sounds/gabba.mp3",
            alt: "/c/files/sounds/gameboy.mp3",
            tab: "/c/files/sounds/censor-beep-1.mp3",
            caps: "/c/files/sounds/snare.mp3",
            f1: "/c/files/sounds/yanp.mp3",
            f2: "/c/files/sounds/wtf_boom.mp3",
            f3: "/c/files/sounds/wouh_02.mp3",
            f4: "/c/files/sounds/wouh_01.mp3",
            f5: "/c/files/sounds/utini.mp3",
            f6: "/c/files/sounds/trollolol.swf.mp3",
            f7: "/c/files/sounds/tripple rainbow.mp3",
            f8: "/c/files/sounds/thisissparta.swf.mp3",
            f9: "/c/files/sounds/tada.mp3",
            f10: "/c/files/sounds/snoop-dogg-smoke-weed-everyday.mp3",
            f11: "/c/files/sounds/sound-9______.mp3",
            f12: "/c/files/sounds/lalalalala.swf.mp3",
            enter: "/c/files/sounds/over9000.swf.mp3",
            backspace: "/c/files/sounds/lightsaber_02.mp3",
          },
          $noop,
          function() {
            return poney["sound"];
          }
        );
        poney[
          "effect"
        ] = {}; /*$store({}, 'vj/effect', function() {
        return poney['effect']
      });*/
        /*$db({}, 'vj/'+what,
        function(val) {
          poney[what] = val;
        },
        function() {return poney[what]}
      );*/
        var labelsound = document.createElement("label");
        var labeleffect = document.createElement("label");
        var inp = document.createElement("input");
        //var effect = selectEffects.cloneNode(true);//document.createElement('select');
        //effect.id = '';
        var btn = document.createElement("button");
        var div = vjCombo.cloneNode(false);
        inp.placeholder = "sound";
        inp.className = "vj_input" + what;
        inp.style.display = "none";
        btn.style.display = "none";
        div.appendChild(inp);
        div.appendChild(btn);
        btn.innerHTML = "Import";
        labelsound.textContent = "Choose a sound";
        labeleffect.textContent = "Choose an effect";
        //truc.appendChild(labelsound);
        truc.appendChild(div);

        /*var effect = $el.create('select', null,
        {class: 'vj_select_effects'},
        [
          $el.create('option', '--- effects ---', {value: ''}),
          $el.create('option', 'none', {value: ''}),
          $el.create('option', 'acid', {value: 'ef_acid'}),
          $el.create('option', 'blur', {value: 'ef_blur'}),
          $el.create('option', 'invert', {value: 'ef_invert'}),
          $el.create('option', 'edge', {value: 'ef_edge'}),
          $el.create('option', 'zombi', {value: 'ef_zombi'}),
          $el.create('option', 'emboss', {value: 'ef_emboss'}),
          $el.create('option', 'xray', {value: 'ef_xray'}),
          $el.create('option', 'turbulence', {value: 'ef_turbulence'}),
          $el.create('option', 'glitch', {value: 'ef_glitch'}),
          $el.create('option', 'spectrum', {value: 'ef_spectrum'}),
          $el.create('option', 'Volvo', {value: 'volvo'}),
          $el.create('option', 'Saab', {value: 'saab'}),
          $el.create('option', 'Mercedes', {value: 'mercedes'}),
          $el.create('option', 'Audi', {value: 'audi'})
        ],
        truc
      );*/

        var effect = document.createElement("select");
        effect.className = "vj_select_effects";

        //effect.appendChild()

        effect.style.display = "none";
        //truc.appendChild(labeleffect);
        //truc.appendChild(effect);
        /*btn.addEventListener('click', function() {
        $explorer('/c/sounds', {explorer:true, browse:true, onclose:function(ok, val) {
          inp.value = val;
          poney['sound'][current.textContent] = val;
          poneyWindow.focus();
        }});
      }, false);*/
        btn.onclick = function() {
          $explorer("/c/files/sounds/", {
            list: true,
            browse: true,
            onclose: function(ok, val) {
              inp.value = val;
              poney["sound"][current.textContent] = val;
              poneyWindow.focus();
            },
          });
        };
        effect.onchange = function() {
          poney["effect"][current.textContent] = this.value;
        };
        poneyFn["sound"] = function(val) {
          //fn(val);
          $audio(val).play();
        };
        poneyFn;
        ["sound"].stop = function(val) {
          //fn(val);
          $audio(val).stop();
        };
        poneyFn["effect"] = function(val) {
          scope._everything.classList.add(val);
        };
        poneyFn["effect"].stop = function(val) {
          scope._everything.classList.remove(val);
        };
        poneyFill["sound"] = function(val) {
          inp.value = val;
        };
        poneyFill["effect"] = function(val) {
          var ef = effect.querySelectorAll("option");
          $io.arr.all(ef, function(item) {
            //console.log(item.value, val)
            if (item.value == val) item.selected = true;
          });
        };
      }

      createSelector();
      /*  createSelector('sound', function(item) {
      $audio(item).play();

    });*/

      var current = document.createElement("div");
      current.className = "vj_current hide";
      ui.appendChild(current);
      ui.appendChild(truc); //'yo';

      function popitup(url) {
        var newwindow = window.open(
          url,
          "vjmonitor",
          "location=0,toolbar=0,menubar=0,directories=0,status=0,height=300,width=500"
        );
        if (window.focus) {
          newwindow.focus();
        }
        return false;
      }

      var preview;
      function vj(fn) {
        fn(preview);
      }
      vj.listen = function(fn) {
        preview = fn();
        if (!preview) return;
        preview.style.background = "red";
      };
      vj.popup = function() {
        popitup("/vjpreview.html");
      };

      var poneyWindow = null;

      vj.open = function() {
        //current.textContent = 'Click on a key, assign effects, then press that key on your keyboard... PONEY PARTY \\m/'

        $window({
          title: "poney jockey",
          icon: "/c/sys/skins/w93/apps/poney.gif",
          bodyClass: "ui_vj skin_base",
          html: ui,
          animationIn: false,
          width: 340,
          height: 130,
          onopen: function(el) {
            /*setTimeout(function() {
            $error('EPILEPSY WARNING<br>Microsoft VBScript runtime (0x800A01AD)<br> ActiveX component can\'t create object:<br> PONEY JOCKEY (beta unstable version) is opening the gates of hell!');
          }, 100);*/

            poneyWindow = el;
            $key().down(function(k) {
              k = k.toLowerCase();
              var keyEleme = document.getElementById("vj_key_" + k);
              if (keyEleme && !keyEleme.classList.contains("pressed")) {
                keyEleme.classList.add("pressed");
                keys[k] = true;
                $io.obj.all(poney, function(item, key) {
                  if (item[k]) poneyFn[key](item[k]);
                });
              }
              return false;
            });
            $key().up(function(k) {
              k = k.toLowerCase();
              var keyEleme = document.getElementById("vj_key_" + k);
              if (keyEleme && keyEleme.classList.contains("pressed")) {
                keyEleme.classList.remove("pressed");
                keys[k] = false;
                $io.obj.all(poney, function(item, key) {
                  if (item[k] && poneyFn[key] && poneyFn[key].stop)
                    poneyFn[key].stop(item[k]);
                });
              }
              return false;
            });
            $key(document.body, function() {
              return false;
            });
          } /*,
        onclose: function(el) {
          $key(function(k) {
            console.log(k);
          });
        }*/,
        });
      };

      vj.open();
    },
  };
});
