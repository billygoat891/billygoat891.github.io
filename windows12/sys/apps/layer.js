system42.on("apps:ready", function(le) {
  "use strict";
  le._apps["layer"] = {
    categories: "Graphics;Viewer",
    icon: "apps/layer.png",
    accept: "image/*",
    uid: 0,
    exec: function(url, opt) {
      //return new Promise(function(resolve, reject) {
      //console.log(resolve, reject)

      if (!url) {
        $log("Usage: layer PATH");
        $log("e.g. : layer /c/files/images/emoticons/smiley-char023.gif");
        //reject()
        return;
      }

      var that = this;
      var le = this.le;
      var app = this.app;
      var image = new Image();
      var trueUrl;
      $file.getUrl(url, function(url) {
        //console.log(url);
        trueUrl = url;
        image.src = url;
      });
      image.onload = load;
      image.onerror = load;
      image.onabort = load;
      var html;
      function load() {
        image.onload = image.onerror = image.onabort = null;

        delete opt.url;
        //delete opt.width;
        //delete opt.height;
        var onopen = opt.onopen || $noop;
        delete opt.onopen;

        var W = image.width;
        var H = image.height;

        var backgroundSize = "cover";

        html = document.createElement("div");
        html.style.background = "url(" + trueUrl + ") no-repeat";
        html.style.backgroundSize = backgroundSize;
        html.style.backgroundPosition = "center";
        html.dataset.imageId = app.uid++;
        html.className = "fullscreen js_image_inline cursor_cross"; // js_image_inline : useful for rasterizeHTML

        //console.log(this.src);
        //console.log(trueUrl);
        //window.URL.revokeObjectURL(trueUrl);
        /////////////////////////////////////////////////////////////////////////////
        var folderPath;
        var fileName;
        var folderObj;
        var folderKeys = [];
        var currentIndex;
        function setFolder(url) {
          folderPath = $fs.utils.getFolderPath(url);
          //console.log(123, folderPath)
          fileName = $fs.utils.getFileName(url);
          folderObj = $io.obj.getPath(le._files, folderPath, "/");
          folderKeys = [];
          $io.obj.each(folderObj, function(val, key) {
            if (/\.(bmp|gif|png|jpe?g|svg|ico|cur|tiff?)/.test(key))
              folderKeys.push(key);
          });
          folderKeys.sort();
          currentIndex = folderKeys.indexOf(fileName);
          /*setTimeout(function() {
            changeImage();
          }, 0);*/
        }

        function pickRandomFolder(obj) {
          var keys = [];
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              if (typeof obj[prop] === "object") keys.push(prop);
            }
          }
          return keys[(keys.length * Math.random()) << 0];
        }
        function pickRandomFile(obj) {
          var keys = Object.keys(obj);
          return keys[(keys.length * Math.random()) << 0];
        }

        function changeImage() {
          //console.log(currentIndex, folderKeys)
          if (currentIndex < 0) currentIndex = folderKeys.length - 1; //0;
          if (currentIndex > folderKeys.length - 1) currentIndex = 0; //folderKeys.length-1;
          if (fileName !== folderKeys[currentIndex]) {
            fileName = folderKeys[currentIndex];
            var url = folderPath + fileName;
            //$file.getUrl(folderPath + fileName, function(url) {
            $url.checkImage(url, function(ok) {
              if (ok) {
                html.style.background = 'url("' + url + '") no-repeat';
                html.style.backgroundSize = backgroundSize;
                html.style.backgroundPosition = "center";
                image.src = url;
              }
            });
            //});
          }
        }
        //console.log(trueUrl);
        setFolder(trueUrl);
        /////////////////////////////////////////////////////////////////////////////

        function randomFolder() {
          var rDir = pickRandomFolder(le._files.c.files.images.gif.vj);
          //console.log(rDir);
          var rFile = pickRandomFile(le._files.c.files.images.gif.vj[rDir]);
          //console.log(rFile);

          setFolder("c/files/images/vj/" + rDir + "/" + rFile);
          var random = ~~(Math.random() * folderKeys.length);
          currentIndex = random !== currentIndex ? random : random + 1;
          changeImage();
        }
        function randomImage() {
          var random = ~~(Math.random() * folderKeys.length);
          currentIndex = random !== currentIndex ? random : random + 1;
          changeImage();
        }
        function prevImage() {
          currentIndex++;
          changeImage();
        }
        function nextImage() {
          currentIndex++;
          changeImage();
        }

        window.$layer = {
          prev: prevImage,
          next: nextImage,
          random: randomImage,
          randomFolder: randomFolder,
        };

        var randomizer = $loop(randomFolder);

        var isLayer = true;

        var keyInstUp, keyInstDown, wheelInst;
        //console.log(url)
        var winInst = $window.call(
          that,
          $extend(
            {
              title: url,
              icon: opt.icon || app.icon,
              header: !isLayer, //false,
              //resizable: !isLayer,//false,
              //if (opt.fullscreen) winInst.maximize(); //automaximize
              automaximize: !!opt.fullscreen,
              contextmenu: {
                "after:FX": [
                  { name: "---" },
                  {
                    name: "View",
                    items: [
                      {
                        name: "Pixelated",
                        key: "p",
                        checkbox: true,
                        selected: false,
                        action: function() {
                          console.log("pixelated");
                          html.classList.toggle("pixelated");
                        },
                      },
                      { name: "---" },
                      {
                        name: "Cover",
                        radio: "View",
                        selected: true,
                        action: function() {
                          backgroundSize = html.style.backgroundSize = "cover";
                        },
                      },
                      {
                        name: "Contain",
                        radio: "View",
                        action: function() {
                          backgroundSize = html.style.backgroundSize =
                            "contain";
                        },
                      },
                      {
                        name: "Fit",
                        radio: "View",
                        action: function() {
                          backgroundSize = html.style.backgroundSize =
                            "100% 100%";
                        },
                      },
                      {
                        name: "Scale",
                        radio: "View",
                        action: function() {
                          backgroundSize = html.style.backgroundSize =
                            "auto auto";
                        },
                      },
                    ],
                  },
                  {
                    name: "Layer",
                    items: [
                      {
                        name: "Previous",
                        key: "left",
                        action: function() {
                          currentIndex--;
                          changeImage();
                        },
                      },
                      {
                        name: "Next",
                        key: "right",
                        action: function() {
                          currentIndex++;
                          changeImage();
                        },
                      },
                      {
                        name: "Random",
                        key: "up",
                        action: function() {
                          var random = ~~(Math.random() * folderKeys.length);
                          currentIndex =
                            random !== currentIndex ? random : random + 1;
                          changeImage();
                        },
                      },
                      {
                        name: "Random Folder",
                        key: "down",
                        action: function() {
                          var rDir = pickRandomFolder(
                            le._files.c.files.images.gif.vj
                          );
                          var rFile = pickRandomFile(
                            le._files.c.files.images.gif.vj[rDir]
                          );
                          setFolder("c/files/images/vj/" + rDir + "/" + rFile);
                          var random = ~~(Math.random() * folderKeys.length);
                          currentIndex =
                            random !== currentIndex ? random : random + 1;
                          changeImage();
                        },
                      },
                      { name: "---" },
                      {
                        name: "Duplicate",
                        key: "ctrl+alt+space",
                        action: function() {
                          //$exe('layer ' + url)
                          le._apps.layer.exec.call(that, url, opt);
                        },
                      },
                      {
                        name: "Open Containing Folder",
                        key: "ctrl+alt+enter",
                        action: function() {
                          //$explorer(folderPath)
                          $explorer(url);
                        },
                      },
                    ],
                  },
                  { name: "---" },
                ],
              },
              contextmenuOnBody: isLayer, //true,
              baseClass: isLayer ? "ui_desktop_layer" : "",
              bodyClass: isLayer
                ? ""
                : "skin_inset_deep ui_layout app_imageviewer",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              //baseHeight: H,
              height: H,
              //baseWidth: W,
              width: W,
              html: html,
              onclose: function() {
                //console.log('???');
                if (keyInstUp && keyInstUp.destroy) keyInstUp.destroy();
                if (keyInstDown && keyInstDown.destroy) keyInstDown.destroy();
                if (wheelInst && wheelInst.destroy) wheelInst.destroy();
                randomizer.destroy();
              },
              onactive: function(base, body) {
                //console.log('onactive')
                //body.focus();
                //body.click();
              },
              ondrag: function(e, x, y) {
                //console.log('?????????', $key.e)
                //console.log(image, x, y)
                if ($key.shift) {
                  le.canvas.draw(image, x, y);
                }
              },
              onresize: function(base, body) {
                //console.log(base);
                //W = base.offsetWidth;
                //H = base.offsetHeight;
              },
              onready: function(base, body) {
                //console.log('???')
                //body.click();
                var win = this;
                //body.className = 'fillspace cursor_minicross';
                body.style.width = "auto";
                body.style.height = "auto";

                /*keyInstUp = $key(body).up(function(key) {
              if (key == 'space') {
                body.classList.remove('transparent');
              }
            });
            keyInstDown = $key(body).down(function(key) {
              //console.log(key)
              if (key == 'esc') {
                win.close()
                changeImage(); return false
              }
              if (key == 'e') {
                randomizer.fn(nextImage)
                randomizer.toggle()
                changeImage(); return false
              }
              if (key == 'r') {
                randomizer.fn(randomFolder)
                randomizer.toggle()
                changeImage(); return false
              }
              if (key == 'space') {
                body.classList.add('transparent');
                changeImage(); return false
              }
              if (key == 'ctrl') {
                win.el.body.className = win.el.body.className.replace(/fx_\w+/, '');
                changeImage(); return false
              }
              if (key == 'left') {
                currentIndex--;
                changeImage(); return false
              }
              if (key == 'right') {
                currentIndex++;
                changeImage(); return false
              }
              if (key == 'up') {
                var random = ~~(Math.random() * folderKeys.length);
                currentIndex = random !== currentIndex ? random : random + 1;
                changeImage(); return false
              }
              if (key == 'down') {
                var rDir = pickRandomFolder(le._files.c.files.images.gif.vj);
                //console.log(rDir);
                var rFile = pickRandomFile(le._files.c.files.images.gif.vj[rDir]);
                //console.log(rFile);

                setFolder('c/files/images/gif/vj/'+rDir+'/'+rFile);
                var random = ~~(Math.random() * folderKeys.length);
                currentIndex = random !== currentIndex ? random : random + 1;
                changeImage(); return false
              }
            });*/

                if (this.cfg.draggable) {
                  wheelInst = $wheel.scale(base);
                }

                onopen.call(this, base, body);

                if (opt.delay) {
                  setTimeout(function() {
                    win.close();
                  }, opt.delay);
                }
              },
            },
            opt
          )
        );

        //if (opt.fullscreen) winInst.maximize(); //automaximize
      }
      //})
    },
  };
});
