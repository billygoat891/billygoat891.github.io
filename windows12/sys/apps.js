// http://standards.freedesktop.org/menu-spec/latest/apa.html

system42("apps", function(le) {
  "use strict";

  le._apps = {
    reboot: {
      categories: "Utility",
      silent: true,
      hascli: true,
      exec: function() {
        document.location.reload(true);
      },
    },

    format: {
      categories: "Utility",
      silent: true,
      hascli: true,
      exec: function() {
        $confirm(
          "Are you sure to reinstall Windows93, you will loose all your saved data (trust me...)",
          function(ok) {
            if (ok) {
              $file.format(function() {
                document.location.reload(true);
              });
            }
          }
        );
      },
    },

    fullscreen: {
      categories: "Utility",
      silent: true,
      hascli: true,
      exec: function() {
        $fullscreen();
      },
    },

    shutdown: {
      categories: "Utility",
      silent: true,
      hascli: true,
      exec: function() {
        document.body.style.height = window.innerHeight + "px";
        document.body.style.backgroundColor = "#000";
        document.body.className = "noscroll animate zoomOut";
        $audio("/c/files/sounds/shutdown.mp3").play();
        setTimeout(function() {
          document.body.innerHTML = "<div style='display: table;width: 100%;height: "+window.innerHeight+"px;text-align:center;'><p style='display:table-cell;vertical-align:middle;'>IT'S NOW SAFE TO TURN OFF YOUR COMPUTER</p></div>";
          document.body.style.color = "#C3FF00";
          document.body.className = "noscroll animate zoomIn";
        }, 1000);
      },
    },

    terminal: {
      categories: "Utility;TerminalEmulator;System",
      name: "Terminal",
      icon: "apps/terminal.png",
      exec: function(url, opt) {
        var le = this.le;
        var cli;
        var cfg = $extend({ onopen: $noop }, opt);
        $window.call(this, {
          bodyClass: "ui_terminal",
          onopen: function(el, body) {
            cli = $cli(body, {
              exe: $exe,
              cols: 60,
              //prompt:'>',
              cwd: le._path.home.slice(0, -1),
              setPrompt: function() {
                var cwd = this.cwd.replace(le._path.home.slice(0, -1), "~");
                cli.prompt.innerHTML = this.prompt = ">" + cwd + "&nbsp;";
              },
              getPathObj: function(path) {
                return $fs.utils.getPathObj(
                  typeof path === "string" ? path : this.cwd,
                  this.cwd
                );
              },
            });
            cli.window = this;
            if (url) {
              var tree = cli.cfg.getPathObj(url);
              if (tree && tree.obj) {
                cli.cfg.cwd = tree.cwd;
                cli.cfg.setPrompt();
              }
            }
            cli.onkey = function(key, val) {
              if (key === "tab") {
                var cmd = $exe.parse(val);
                if (cmd && cmd.arguments.length)
                  val = cmd.arguments[cmd.arguments.length - 1];
                var obj = cli.cfg.getPathObj().obj;
                if (val.indexOf("/") === 0 || val.indexOf("/") > -1) {
                  var path = val.split("/");
                  val = path.pop();
                  path = path.join("/") + "/";
                  obj = cli.cfg.getPathObj(path).obj;
                }
                var hints = [];
                $io.obj.all(obj, function(item, key) {
                  if (key.indexOf(val) === 0)
                    hints.push(key + (typeof item === "number" ? "" : "/"));
                });
                if (!hints.length && !cmd) {
                  $io.obj.all(le._apps, function(item, key) {
                    if (key.indexOf(val) === 0) hints.push(key);
                  });
                }
                if (!hints.length && !cmd) {
                  $io.obj.all(window, function(item, key) {
                    if (key.indexOf(val) === 0) hints.push(key);
                  });
                }
                if (hints.length === 1)
                  cli.input.value =
                    cli.input.value + hints[0].slice(val.length);
                else if (hints.length) $log(" "), $log(hints.join(", "));

                return false;
              }
            };
            cli.cfg.setPrompt();
            cli.setFocus();
            cfg.onopen(cli);
          },
          onclose: function() {
            cli.destroy();
          },
        });
      },
    },

    pwd: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function() {
        $log(this.cli.cfg.cwd);
      },
    },

    cd: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function(path) {
        if (!path) path = le._path.home;
        var tree = this.cli.cfg.getPathObj(path);
        if (tree && tree.obj) {
          this.cli.cfg.cwd = tree.cwd;
          this.cli.cfg.setPrompt();
        }
      },
    },

    ls: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function(path) {
        var cwd = this.cli.cfg.cwd;
        var dirObj = $io.obj.getPath(this.le._files, path || cwd, "/");
        console.log(dirObj, cwd, path);
        //var lnks = [];
        var dotsdirs = [];
        var dirs = [];
        var files = [];
        $io.obj.each(dirObj, function(val, key) {
          if ($fs.utils.isShortcut(key)) {
            files.push(
              '<a class="ui_log__yellow" href="#!' +
                cwd +
                key +
                '">' +
                key +
                "</a>"
            );
          } else if (typeof val === "number") {
            files.push('<a href="#!' + cwd + key + '">' + key + "</a>");
          } else if (key === ".." || key === ".") {
            dotsdirs.push(
              '<a class="bold ui_log__blue" href="#!' +
                cwd +
                "/" +
                key +
                '/">' +
                key +
                "/</a>"
            );
          } else {
            dirs.push(
              '<a class="bold ui_log__blue" href="#!' +
                cwd +
                "/" +
                key +
                '/">' +
                key +
                "/</a>"
            );
          }
        });
        function cmp(a, b) {
          return a[1].toLowerCase().localeCompare(b[1].toLowerCase());
        }
        $log.html(dotsdirs.reverse().join("\n"));
        $log.html(dirs.sort(cmp).join("\n"));
        $log.html(files.sort(cmp).join("\n"));
      },
    },

    find: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function(pattern, path) {
        if (!pattern) {
          $log("Usage: find PATTERN [PATH]");
          $log('e.g. : "find .png"');
          $log('e.g. : "find /\\.ttf$/" (pattern can be a RegEx)');
          $log('e.g. : "find .ttf c/sys" (optional path)');
        } else {
          var f = $fs.utils.find(
            pattern,
            typeof path === "string" ? path : this.cli.cfg.cwd
          );

          f = $io.map(f, function(key) {
            return '<a href="#!' + key + '">' + key + "</a>";
          });

          $log(" ");
          $log.html(f.join("\n"));
          $log(" ");
          $log(f.length + " result" + (f.length ? "s" : ""));
        }
      },
    },

    tree: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function(path) {
        var tree = this.cli.cfg.getPathObj(path);
        function printDir(obj, indent, path) {
          var keys = Object.keys(obj);
          for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            if (key !== ".." && key !== ".") {
              var prefix = i === keys.length - 1 ? "└── " : "├── ";
              var prefixIndent = i === keys.length - 1 ? "    " : "│   ";
              if (typeof obj[key] === "object") {
                directories++;
                t +=
                  "<br>" +
                  indent +
                  prefix +
                  '<span class="bold ui_log__blue">' +
                  key +
                  "</span>";
                printDir(obj[key], indent + prefixIndent, path + "/" + key);
              } else {
                files++;
                t += "<br>" + indent + prefix + key;
              }
            }
          }
        }
        if (tree) {
          var directories = 0;
          var files = 0;
          var t = ".";

          printDir(tree.obj, "", path);
          $log.html(t);
          $log(" ");
          $log(directories + " directories, " + files + " files");
        }
      },
    },

    help: {
      categories: "Utility",
      terminal: true,
      exec: function() {
        $log('<span class="bold ui_log__blue">Usage :</span>');
        $log("Tab:  autocomplete commands and paths");
        $log("Up:   previous command in history");
        $log("Down: next command in history");
        $log(" ");
        $log('<span class="bold ui_log__blue">Terminal commands : </span>');
        var apps = this.le._apps;
        var cli = [];
        var gui = [];
        var alias = [];
        for (var key in apps) {
          if (apps.hasOwnProperty(key)) {
            if (apps[key].terminal || apps[key].hascli) cli.push(key);
            else if (apps[key].alias) alias.push(key + ": " + apps[key].alias);
            else gui.push(key);
          }
        }
        $log(cli.sort().join(", "));
        $log(" ");
        $log('<span class="bold ui_log__blue">Installed apps : </span>');
        $log(gui.sort().join(", "));
        $log(" ");
        $log('<span class="bold ui_log__blue">Aliases : </span>');
        $log(alias.sort().join("<br>"));
        $log(" ");
      },
    },

    clear: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function() {
        $log.clear();
      },
    },

    history: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function() {
        $log(this.cli.cfg.history.join("\n"));
      },
    },

    clearhist: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function() {
        $cli.clearhistory();
        $log.cyan("Terminal history cleared");
      },
    },

    win: {
      categories: "Utility",
      silent: true,
      terminal: true,
      exec: function(id, action) {
        if (!id) {
          $io.arr.all(document.querySelectorAll(".ui_window"), function(el) {
            var title = document.querySelector(
              "#ui_window_docked_" + el.dataset.windowId
            ).textContent;
            $log.pad("#" + el.id, title, ".");
          });
        } else {
          if ($window.instances[id]) {
            if (typeof action === "string") {
              if ($window.instances[id][action]) {
                if (typeof $window.instances[id][action] === "function") {
                  $window.instances[id][action]();
                } else {
                  $log.obj($window.instances[id][action]);
                }
              } else if ($window.instances[id].cfg[action]) {
                if (typeof $window.instances[id].cfg[action] === "function") {
                  $window.instances[id].cfg[action]();
                } else {
                  $log.obj($window.instances[id].cfg[action]);
                }
              } else {
                $log.error(
                  "No " + action + " option specified for #ui_window_" + id
                );
              }
            } else {
              $log.obj($window.instances[id].cfg, "caller");
            }
          } else {
            $log.error("No window with id ui_window_" + id);
          }
        }
      },
    },

    key: {
      categories: "Utility",
      terminal: true,
      silent: true,
      exec: function() {
        var le = this.le,
          cli = this.cli;
        $log("Press any key to get name and keyCode...");
        $log("Press escape twice to quit");
        var logK = $log.green("=> ");
        var logC = $log.blue("=> ");
        var esc = 0;
        var keyInst = $key().down(
          function(key, obj) {
            var cod = obj.code;
            if (cod === 27) esc++;
            else esc = 0;
            if (esc === 2) destroy();
            logK.textContent = "=> " + key;
            logC.textContent = "=> " + cod;
            cli.input.value = "";
            return false;
          },
          { preventDefault: true }
        );
        cli.input.blur();
        cli.prompt.click();
        cli.prompt.innerHTML = "█&nbsp;";

        function destroy() {
          keyInst.destroy();
          cli.prompt.innerHTML = cli.cfg.prompt;
          cli.input.blur();
          cli.input.focus();
        }

        cli.ondestroy = destroy;
      },
    },

    info: {
      categories: "Utility",
      terminal: true,
      exec: function() {
        $log.repeat("=");
        $log(platform.description);
        $log(new Date().toString());
        setTimeout(function() {
          $log.repeat(" ");
          $log.obj(window.location);
          setTimeout(function() {
            $log.repeat(" ");
            $log.obj(window.navigator);
            $log.repeat(" ");
            setTimeout(function() {
              if (window.navigator && window.navigator.plugins) {
                window.navigator.plugins.refresh(false);
                var numPlugins = window.navigator.plugins.length;
                for (var i = 0; i < numPlugins; i++) {
                  var plugin = window.navigator.plugins[i];
                  if (plugin) {
                    $log.pad("plugin", plugin.name, ".");
                  }
                }
              }
              $log.repeat("=");
            }, 150);
          }, 150);
        }, 150);
      },
    },

    killall: {
      categories: "Utility",
      hascli: true,
      silent: true,
      combo: "ctrl+alt+del",
      exec: function(exept) {
        $io.arr.all(document.querySelectorAll(".ui_window"), function(el) {
          if (el.matches(exept)) return;
          $window.destroy(el);
        });
        $exe("doctor --clean");
        $exe("fx reset");
      },
    },

    /*
      dP"Yb  88""Yb 888888 88b 88 888888 88""Yb .dP"Y8
    dP   Yb 88__dP 88__   88Yb88 88__   88__dP `Ybo."
    Yb   dP 88"""  88""   88 Y88 88""   88"Yb  o.`Y8b
      YbodP  88     888888 88  Y8 888888 88  Yb 8bodP'
    */

    base64: {
      categories: "Utility;Development;Viewer",
      name: "base64",
      silent: true,
      accept: "*",
      exec: function(url) {
        var that = this;
        if (url && typeof url === "string") {
          if (this.cli && this.cli.cli && this.cli.cfg.cwd)
            url = this.cli.cfg.cwd + "/" + url;
          $file.open(url, "DataURL", function(dataURL) {
            if (that.cli) $log(dataURL);
            else $prompt(url + "'s data url", dataURL);
          });
        } else $log.error("url required");
      },
    },
    download: {
      categories: "Utility;Viewer",
      name: "Download",
      silent: true,
      accept: ".zip,.rar,.tar,.gz,.bz",
      exec: function(url) {
        if (typeof url === "string" && url) {
          if (this.cli && this.cli.cli && this.cli.cfg.cwd)
            url = this.cli.cfg.cwd + "/" + url;
          // console.log(url);
          $file.download(url);
        } else $log.error("url required");
      },
    },
    /*
    js: {
      categories: "Viewer",
      name: "js",
      silent: true,
      icon: "apps/iframe.png",
      accept: "application/javascript",
      // inject: "arguments",
      exec: function(url, opt) {
        var arg = this.arg.arguments.replace("js ", "")
        console.log(arg);
        function open(url) {
          $loader.script(url);
        }
        if (!url) {
          $log("Usage: js [PATH]");
          $log('e.g. : "js /a/hello.js"');
        } else {
          try {
            eval(arg);
          } catch (err) {
            if (url.indexOf("/a/") === 0) {
              $file.open(url, "URL", function(val, asType) {
                opt.url = val;
                open(val);
              });
            } else {
              open(url);
            }
          }
        }
      },
    },
    */
    js: {
      categories: "Viewer",
      name: "Run JS",
      icon: "apps/iframe.png",
      accept: "application/javascript",
      exec: function() {
        var url = this.arg.arguments.join(" ");
        
        if (!url) {
          $log("Usage: js [PATH/CODE]");
          $log('e.g. : "js /a/hello.js", "js alert(42)"');
        } else {
          try {
            eval(url);
          } catch (err) {
            if (url.indexOf("/c/") === 0) {
              $loader.script(url);
            } else {
              $file.open(url, "URL", function(val) {
                $loader.script(val);
              });
            }
          }
        }
      }
    },
    iframe: {
      categories: "Viewer;WebBrowser",
      silent: true,
      name: "Iframe",
      icon: "apps/iframe.png",
      exec: function(url, opt) {
        var that = this;
        that.that.window.title = url;
        function open(url) {
          $window.call(
            that,
            $extend(
              {
                bodyClass:
                  opt && opt.noinset ? "" : "skin_inset_deep skin_light",
                url: url,
              },
              opt
            )
          );
        }
        if (url.indexOf("/a/") === 0) {
          $file.open(url, "URL", function(val, asType) {
            opt.url = val;
            open(val);
          });
        } else {
          open(url);
        }
      },
    },

    bananamp: {
      categories: "Audio",
      name: "Bananamp",
      icon: "apps/bananamp.png",
      accept: ".mp3,.ogg,.flac,.mod,.xm,.it,.s3m,.amd,.rad,.hsc,.wav",
      exec: function(url) {
        var songs;
        if (url) {
          songs = Array.prototype.slice.call(arguments, 0, -1);
        } else {
          songs = [];
          $io.obj.each(le._files.c.files.music.modules, function(obj, folder) {
            $io.obj.each(obj, function(_, file) {
              songs.push("/c/files/music/modules/" + folder + "/" + file);
            });
          });
          $io.arr.shuffle(songs);
        }

        $window.call(this, {
          width: 293,
          height: 422,
          url: "/c/programs/bananamp/index.php",
          onready: function() {
            var that = this;
            that.el.iframe.contentWindow.le = le;
            that.el.iframe.contentWindow.$file = $file;
            that.el.iframe.contentWindow.loadSongs(songs);
          },
          onclose: function() {},
        });
      },
    },

    "3d": {
      hascli: true,
      silent: true,
      categories: "Graphics;Viewer",
      icon: "apps/3d.png",
      inject: "arguments",
      exec: function(txt, color) {
        txt = txt || "Windows93";
        var definedColor = false;
        if (typeof color === "string" && color.length > 0) {
          if (color[0] !== "#") color = "#" + color;
          definedColor = true;
        } else {
          color = "#c3ff00";
        }
        if (this.cli && !txt) {
          $log("Usage: 3d TEXT [COLOR]");
          return;
        }
        function changeRoute() {
          if (definedColor) $route('3d "' + txt + '" ' + color);
          else $route('3d "' + txt + '"');
        }
        var key;
        $window.call(this, {
          title: "3d - " + txt,
          automaximize: true,
          baseClass: "ui_desktop_layer ui_layer_3d",
          url: "/c/programs/3d/index.html",
          onready: function() {
            var that = this;
            that.el.iframe.contentWindow.setup(txt, color);
            changeRoute();
            key = $key().up(function(k) {
              if (that && that.el) {
                if (k === "esc") that.close();
                else if (k === "backspace") {
                  txt = txt.slice(0, -1);
                  that.el.iframe.contentWindow.changeTxt(txt, color);
                  changeRoute();
                } else if (k.length === 1) {
                  txt += k;
                  that.el.iframe.contentWindow.changeTxt(txt, color);
                  changeRoute();
                }
              }
            });
          },
          onclose: function() {
            key.destroy();
          },
        });
      },
    },

    font: {
      categories: "Graphics;Viewer",
      name: "Font Viewer",
      accept: ".ttf,.otf",
      exec: function(url, opt) {
        $window.call(this, {
          title: "Font Viewer",
          height: 470,
          width: 757,
          help:
            "<h1>opentype.js</h1>" +
            "<p><strong>Copyright © 2014 Frederik De Bleser</strong>" +
            '<br><a target="_blank" href=https://raw.githubusercontent.com/nodebox/opentype.js/master/LICENSE">MIT License</p>' +
            '<p><a target="_blank" href="http://nodebox.github.io/opentype.js/">http://nodebox.github.io/opentype.js/</a></p>',
          url: "/c/programs/opentype/index.php?path=" + url,
        });
      },
    },

    img: {
      categories: "Graphics;Viewer",
      silent: true,
      name: "Image Viewer",
      icon: "apps/imgviewer.png",
      accept: "image/*",
      //ext: ['png','jpg','gif','bmp','ico','svg'],
      exec: function(url, opt) {
        var app = this.app;
        var le = this.le;
        var command = this.command;
        var that = this;

        if (!url) {
          $log("Usage: img PATH");
          $log("e.g. : img /c/files/images/emoticons/smiley-char023.gif");
          return;
        }

        function refresh() {
          image.onload = $noop;
          image.onerror = $noop;
          image.onabort = $noop;
          image.src = "";
          $file.getUrl(url, function(url) {
            trueUrl = url;
            image.src = url;
          });
        }

        var image = new Image();
        var trueUrl;
        $file.getUrl(url, function(url) {
          trueUrl = url;
          image.src = url;
        });
        image.className = "ui_layout_center app_imageviewer__img";
        image.onload = load;
        image.onerror = load;
        image.onabort = load;
        var div = document.createElement("div");
        div.className = "ui_layout";
        div.appendChild(image);
        function load() {
          if (!opt.height) opt.height = image.height;
          if (!opt.width) opt.width = image.width;
          opt.html = div;
          opt.title = url;
          opt.icon = opt.icon || app.icon;
          opt.url = null;
          opt.command = command;
          opt.reload = refresh;
          opt.onready = function() {
            le._events.on("change:" + url, refresh);
          };
          opt.onclose = function() {
            le._events.off("change:" + url, refresh);
          };
          opt.bodyClass =
            "skin_inset_deep _ui_layout app_imageviewer" +
            (opt.bodyClass ? " " + opt.bodyClass : "");
          $window.call(that, opt);
        }
      },
    },

    /*
    888888 8888b.  88 888888  dP"Yb  88""Yb .dP"Y8
    88__    8I  Yb 88   88   dP   Yb 88__dP `Ybo."
    88""    8I  dY 88   88   Yb   dP 88"Yb  o.`Y8b
    888888 8888Y"  88   88    YbodP  88  Yb 8bodP'
    */

    piskel: {
      categories: "Development;Graphics",
      name: "Piskel",
      type: "Editors",
      icon: "apps/paint.png",
      accept: ".gif,.png,.jpeg,.jpg,.piskel",
      exec: function(url, opt) {
        var win = {
          url: "/c/programs/piskel/index.php",
          height: 600,
          width: 950,
        };
        $editor.call(this, {
          filePath: url,
          type: "Blob",
          about:
            "<b>Piskel v0.4.2</b><br>A simple web-based tool for Spriting and Pixel art. Create pixel art, game sprites and animated GIFs.<br>by Julian Descottes and Vincent Renaudin<br><a href='http://www.piskelapp.com/' target='_blank'>www.piskelapp.com</a>",
          window: win,
        });
      },
    },

    hexed: {
      categories: "Development",
      name: "HexEd",
      type: "Editors",
      icon: "apps/hexedit.png",
      accept: "*",
      exec: function(url, opt) {
        $editor.call(this, {
          filePath: url,
          undo: true,
          about: "<b>HexEd v0.0.1a</b><br>A simple hexadecimal editor",
          type: "Blob", //'ArrayBuffer', //'BinaryString',
          window: {
            url: "/c/programs/HexEd/index.php",
            bodyClass: "skin_inset",
            height: 410,
            width: 480,
          },
        });
      },
    },

    pd: {
      categories: "Development;Music",
      name: "Puke Data",
      type: "Editors",
      icon: "apps/pd.png",
      accept: ".pd",
      exec: function(url, opt) {
        $editor.call(this, {
          filePath: url,
          about:
            '<b>Puke Data</b><br>based on WebPd by Sébastien Piquemal<br><a target="_blank" href="https://github.com/sebpiq/WebPd">https://github.com/sebpiq/WebPd</a>',
          type: "String", //'ArrayBuffer', //'BinaryString',
          window: {
            url: "/c/programs/pukeData/index.php",
            bodyClass: "skin_inset skin_light",
            height: 400,
            width: 600,
          },
        });
      },
    },

    textarea: {
      categories: "Development;TextEditor",
      name: "Textarea",
      type: "Editors",
      icon: "ext/nfo.png",
      accept: ".txt",
      exec: function(url, opt) {
        var cfg = $extend({}, opt);
        if (cfg.url) delete cfg.url;

        $editor.call(this, {
          type: "String",
          filePath: url,
          create: function(el) {
            var txtarea = document.createElement("textarea");
            txtarea.className = "app_textarea fullscreen";
            el.appendChild(txtarea);
            setTimeout(function() {
              txtarea.focus();
            }, 0);
            return {
              readFile: function(val) {
                txtarea.value = val;
              },
              setValue: function(val) {
                txtarea.value = val;
              },
              getValue: function(cb) {
                cb(txtarea.value);
              },
            };
          },
          window: $extend(
            {
              height: 345,
              width: 435,
            },
            cfg
          ),
        });
      },
    },

    /*
       db    88""Yb 88""Yb .dP"Y8
      dPYb   88__dP 88__dP `Ybo."
     dP__Yb  88"""  88"""  o.`Y8b
    dP""""Yb 88     88     8bodP'
    */

    zkype: {
      categories: "Amusement",
      name: "Zkype",
      icon: "apps/zkype.png",
      exec: function() {
        var opt = {};
        //error: 'Warning, a satanic kitten orgy is happening on zkype right now... We are working hard restoring teh normality, stay tuned...'
        var that = this;
        $ajax.get("/c/programs/zkype/zkype.html").done(function(html) {
          opt.html = html;
          opt.width = "700";
          opt.height = "450";
          opt.bodyClass = "skin_inset_deep";
          opt.help =
            'Based on the awesome work by Audun Mathias Øygard (<a target="_blank" href="https://github.com/auduno/clmtrackr">https://github.com/auduno/clmtrackr</a>)';
          opt.onready = function() {
            $loader([
              "/c/programs/zkype/js/utils.js?v=" + le.versionx,
              "/c/programs/zkype/js/clmtrackr.js?v=" + le.version,
              "/c/programs/zkype/js/model_pca_20_svm.js?v=" + le.version,
              "/c/programs/zkype/js/face_deformer.js?v=" + le.version,
              "/c/programs/zkype/js/poisson_new.js?v=" + le.version,
              "/c/programs/zkype/zkype.js?v=" + le.version,
            ]);
          };
          opt.onbeforeclose = function(close) {
            var stream = window.zkype.getStream();
            var ctrack = window.zkype.getCtrack();
            var anim = window.zkype.getAnimation();
            var animGrid = window.zkype.getAnimationGrid();
            window.cancelAnimationFrame(animGrid);
            window.cancelAnimationFrame(anim);
            if (ctrack && ctrack.stop) ctrack.stop();
            if (stream) {
              if (stream.stop) stream.stop();
              else if (stream.getTracks) {
                var track = stream.getTracks()[0];
                track.stop();
              }
            }
            close();
          };
          $window.call(that, opt);
        });
      },
    },

    bytebeat: {
      categories: "Development;Music",
      name: "Byte Beat",
      icon: "apps/bytebeat.png",
      exec: function() {
        var opt = {};
        opt.help =
          "<b>Credits :</b><br><a target=_blank href='https://github.com/greggman/html5bytebeat'>https://github.com/greggman/html5bytebeat</a>";
        opt.url = "/c/programs/bytebeat/index.php";
        opt.width = "700";
        opt.height = "400";
        opt.bodyClass = "skin_inset_deep";
        $window.call(this, opt);
      },
    },

    catex: {
      categories: "Network;WebBrowser",
      name: "Cat Explorer",
      icon: "apps/catexplorer.png",
      exec: function(url) {
        // Source code for "Ignore X-Frame headers" chrome extension
        // https://gist.github.com/dergachev/e216b25d9a144914eae2
        var le = this.le;
        var that = this;
        $loader(["/c/programs/catExplorer/catExplorer.js"], function() {
          $catex.call(that, le, url);
        });
      },
    },
    manifesto: {
      categories: "Amusement",
      icon: "question.png",
      exec: function() {
        var app = this.app;

        var A = [
            "retro-engineering",
            "reverse engineering",
            "deprogrammed obsolescence",
            "media archeology",
            "recycling",
            "retrocomputing",
            "parody",
            "inception",
            "666",
            "acid",
            "freedom",
            "infinity",
            "pony",
            "art",
            "demoscene",
            "memetic",
            "hysteria",
            "proselytism",
            "thought contagion",
            "install Gentoo",
            "dolphin",
            "corgi",
            "doge",
            "hydra",
            "helix",
            "yoda",
            "cat",
            "glitch",
            "troll",
            "noob",
            "ninja",
            "wizard",
            "lenna",
          ],
          B = [
            "easter egg",
            "php",
            "html",
            "html5",
            "javascript",
            "web3.0",
            "NaN",
            "Infinity",
            "random",
            "π",
            "inception",
            "css3",
            "css",
            "free software",
            "prosthetic knowledge",
            "(x,y,z)",
            "virus",
            "internet",
            "wifi",
            "open source",
            "GNU",
            "OS",
            "linux",
            "unix",
            "hyperlink",
            "copyleft",
            "creative commons",
            "MySQL",
            "RSS",
            "nodejs",
            "server",
            "hack",
            "iframe",
            "canvas",
            "glitch",
            "ASCII",
            "utf-8",
            "emoji",
            "cthulhu",
            "unicode",
          ],
          C = [
            "uchronia",
            "popart",
            "anachronism",
            "dadaism",
            "surrealism",
            "new-realism",
            "meta-realism",
            "future",
            "matrix",
            "inception",
            "unproductivity",
            "procrastination",
            "useless",
            "unprofitability",
            "spaghetti code",
            "viral",
            "acid",
            "epic fail",
            "epic win",
            "fap",
            "swag",
            "Z̤̲̙̙͎̥̝A͎̣͔̙͘L̥̻̗̳̻̳̳͢G͉̖̯͓̞̩̦O̹̹̺",
            "nope",
            "chuck norris",
            "over 9000",
            "meta",
            "meta-meta",
            "lulz",
            "poop",
            "glitch",
            "life",
            "system32.dll",
            "myspace",
            "loominati",
            "poney",
            "cthulhu",
            "zerg rush",
            "forever alone",
            "hug",
            "manifesto",
            "internet for ever",
            "fuck the cloud",
            "web3.0",
            "fixing the internet",
          ];

        var WTF = [A, B, C];

        function chance(p) {
          return Math.random() * 100 >= (p || 50) ? false : true;
        }

        function idea() {
          if (chance(2)) {
            var str = $io.arr.random($io.arr.random(WTF));
            return str + " + " + str + " = " + str;
          }
          if (chance(10)) {
            return (
              $io.arr.random($io.arr.random(WTF)) +
              " + " +
              $io.arr.random($io.arr.random(WTF)) +
              " = " +
              $io.arr.random($io.arr.random(WTF))
            );
          } else {
            return (
              $io.arr.random(A) +
              " + " +
              $io.arr.random(B) +
              " = " +
              $io.arr.random(C)
            );
          }
        }

        function m() {
          var msg = idea();
          $alert({
            msg: msg,
            title: "MANIFESTO",
            img: app.icon,
            btnCancel: "wtf?",
            animationIn: "",
            animationOut: "",
            sound: "error",
            oncancel: function(ok) {
              le._sound.error.play();
              this.el.body.querySelector(".ui_alert__text").innerHTML = idea();
              return false;
            },
          });
        }
        m();
      },
    },

    contact: {
      categories: "Amusement",
      exec: function() {
        var d = "windows93.";
        $alert({
          msg:
            '<a href="mai' +
            "lto:contact" +
            "@" +
            d +
            'net">contact' +
            "@" +
            d +
            "net</a>",
          title: "CONTACT US",
          img: "/c/sys/skins/w93/mail.png",
        });
      },
    },

    /*
    888888 8b    d8 88   88 88        db    888888  dP"Yb  88""Yb .dP"Y8
    88__   88b  d88 88   88 88       dPYb     88   dP   Yb 88__dP `Ybo."
    88""   88YbdP88 Y8   8P 88  .o  dP__Yb    88   Yb   dP 88"Yb  o.`Y8b
    888888 88 YY 88 `YbodP' 88ood8 dP""""Yb   88    YbodP  88  Yb 8bodP'
    */

    dmg: {
      categories: "Emulator",
      name: "DMG Emulator",
      icon: "ext/gb.png",
      //install: '/DMG-01.lnk42',
      //ext: ['gb','gbc'],
      accept: ".gb,.gbc",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about =
          "<b>JavaScript GameBoy Color Emulator</b>" +
          "<p><b>Keyboard Controls:</b>\nX/Z = A.\n A/Q= B.\nALT or SHIFT = Select.\nSPACE or ENTER = Start.\nThe direction-pad is the control pad.</p>" +
          '<p><strong>Copyright (C) 2010 - 2012 <a target="_blank" href="https://github.com/grantgalitz">Grant Galitz</a></strong></p>' +
          '<p><a target="_blank" href="https://github.com/grantgalitz/GameBoy-Online">https://github.com/grantgalitz/GameBoy-Online</a></p>';
        $window.call(this, {
          url:
            "/c/programs/Emulatorz/dmg/play.php" + (url ? "?rom=" + url : ""),
          title: opt.title ? opt.title + " - " + app.name : app.name,
          icon: opt.icon || app.icon,
          minWidth: true,
          minHeight: true,
          width: "160",
          height: "144",
          bodyClass: "skin_inset_deep",
          onready: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "File",
              items:[
                {
                  name: "Load",
                  action: function() {
                    $explorer('c/files/roms/dmg/', {browse: true, explorer: true, onclose: function(ok, file) {
                      if (ok) {
                        iframe.src="/c/programs/Emulatorz/dmg/play.php?rom="+file;
                      }
                    }})
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ]
            },
            {
              name: "Options",
              items: [
                {
                  name: "Fullscreen",
                  action: function() {
                    iframe.contentWindow.$fullscreen();
                  },
                },
                { name: "---" },
                {
                  name: "Help",
                  action: function() {
                    $alert.info(about);
                  },
                },
              ]
            },            
          ],
        });
      },
    },

    sms: {
      categories: "Emulator",
      name: "Miracle SMS Emulator",
      icon: "ext/sms.png",
      accept: ".sms",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about =
          "<p><b>Miracle</b><br>"+
          "a Sega Master System emulator in Javascript<br>"+
          "By <a href='https://xania.org/'>Matt Godbolt</a>\n"+
          "Based on <a href='http://matt.west.co.tt/category/javascript/jsspeccy/'>JSSpeccy</a> by <a href='http://matt.west.co.tt/'>Matt Westcott</a><br>"+
          "..which in turn is based on <a href='http://fuse-emulator.sourceforge.net/'>Fuse</a> by Philip Kendall et al. Icons from <a href='http://www.icon-king.com/projects/nuvola/'>Nuvola</a> by David Vignoni.</p>"+                  
          "<p><b>Keyboard Controls:</b>\nQ or A = fire1.\n W or Z= fire2.\nE = Reset.\nP = Pause.\nArrows = Direction pad.</p><p><b>Gamepad Controls:</b>\nSupported.</b></p>";
        $window.call(this, {
          url:
            "/c/programs/Emulatorz/sms/play.php" + (url ? "?rom=" + url : ""),
          title: opt.title ? opt.title + " - " + app.name : app.name,
          icon: opt.icon || app.icon,
          minWidth: true,
          minHeight: true,
          width: "256",
          height: "192",
          bodyClass: "skin_inset_deep",
          onready: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "File",
              items:[
                {
                  name: "Load",
                  action: function() {
                    $explorer('c/files/roms/sms/', {browse: true, explorer: true, onclose: function(ok, file) {
                      if (ok) {
                        iframe.src="/c/programs/Emulatorz/sms/play.php?rom="+file;
                      }
                    }})
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ]
            },
            {
              name: "Options",
              items: [
                {
                  name: "Fullscreen",
                  action: function() {
                    iframe.contentWindow.$fullscreen();
                  },
                },
                { name: "---" },
                {
                  name: "Help",
                  action: function() {
                    $alert.info(about);
                  },
                },
              ]
            },            
          ],
        });
      },
    },

    nes: {
      categories: "Emulator",
      name: "NES Emulator",
      icon: "ext/nes.png",
      accept: ".nes",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about =
          "<p><b>JSNES</b><br>"+
          "NES emulator in Javascript<br>"+
          "<a href='https://jsnes.org/' target='blank'>https://jsnes.org/</a>\n"+
          "<p>DPad: Arrow keys<br/>Start: Return, Select: Shift<br/>A Button: A/Q, B Button: S</p>";
        $window.call(this, {
          url:
            "/c/programs/Emulatorz/nes/play.php" + (url ? "?rom=" + url : ""),
          title: opt.title ? opt.title + " - " + app.name : app.name,
          icon: opt.icon || app.icon,
          minWidth: true,
          minHeight: true,
          width: "256",
          height: "192",
          bodyClass: "skin_inset_deep",
          onready: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "File",
              items:[
                {
                  name: "Load",
                  action: function() {
                    $explorer('c/files/roms/nes/', {browse: true, explorer: true, onclose: function(ok, file) {
                      if (ok) {
                        iframe.src="/c/programs/Emulatorz/nes/play.php?rom="+file;
                      }
                    }})
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ]
            },
            {
              name: "Options",
              items: [
                {
                  name: "Fullscreen",
                  action: function() {
                    iframe.contentWindow.$fullscreen();
                  },
                },
                { name: "---" },
                {
                  name: "Help",
                  action: function() {
                    $alert.info(about);
                  },
                },
              ]
            },            
          ],
        });
      },
    },

    sae: {
      categories: "Emulator",
      name: "Scripted Amiga Emulator",
      icon: "ext/adf.png",
      accept: ".adf",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about =
          "<p><b>Scripted Amiga Emulator</b><br>"+
          "Amiga emulator in Javascript<br>"+
          "--"+
          "--";
        $window.call(this, {
          url:
            "/c/programs/Emulatorz/amiga/play.php" + (url ? "?rom=" + url : ""),
          title: opt.title ? opt.title + " - " + app.name : app.name,
          icon: opt.icon || app.icon,
          minWidth: true,
          minHeight: true,
          width: "320",
          height: "256",
          bodyClass: "skin_inset_deep",
          onready: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "File",
              items:[
                {
                  name: "Insert Floppy [DF0]",
                  action: function() {
                    $explorer('c/files/roms/amiga/', {browse: true, explorer: true, onclose: function(ok, file) {
                      if (ok) {
                        iframe.contentWindow.loadFloppy(0,"/"+file);
                      }
                    }})
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ]
            },
            {
              name: "Options",
              items: [
                {
                  name: "Fullscreen",
                  action: function() {
                    iframe.contentWindow.$fullscreen();
                  },
                },
                { name: "---" },
                {
                  name: "Help",
                  action: function() {
                    $alert.info(about);
                  },
                },
              ]
            },            
          ],
        });
      },
    },

    /*
     dP""b8    db    8b    d8 888888 .dP"Y8
    dP   `"   dPYb   88b  d88 88__   `Ybo."
    Yb  "88  dP__Yb  88YbdP88 88""   o.`Y8b
     YboodP dP""""Yb 88 YY 88 888888 8bodP'
    */

    progressquest: {
      categories: "Game;",
      name: "Progress Quest",
      icon: "apps/progressquest.gif",
      exec: function() {
        var iframe;
        var data = {
          url: "/c/programs/progressQuest/index.php",
          help:
            '&copy;2001-2016 <a class="dim" href="mailto:grumdrig@progressquest.com">grumdrig@progressquest.com</a><br><a class="dim" target="_blank" href="http://progressquest.com/">http://progressquest.com</a>',
          width: 628,
          height: 520,
          onopen: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "Game",
              items: [
                {
                  name: "New Character",
                  action: function() {
                    iframe.contentWindow.location.href =
                      "/c/programs/progressQuest/newguy.php";
                  },
                },
                {
                  name: "Character Roster",
                  action: function() {
                    iframe.contentWindow.location.href =
                      "/c/programs/progressQuest/index.php";
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ],
            },
          ],
        };
        $window.call(this, data);
      },
    },
    /*
    arena93: {
      categories: "Game;",
      name: "Arena 93",
      icon: "apps/arena93.png",
      exec: function() {
        var data = {
          url: "/c/programs/Arena93/index.html",
          width: 640,
          height: 400,
        };
        $window.call(this, data);
      },
    },
    */
    castlegafa: {
      categories: "Game;Shooter",
      name: "Castle GAFA 3D",
      icon: "/c/programs/castleGafa/icon.gif",
      exec: function() {
        var data = {
          url: "/c/programs/castleGafa/index.html",
          icon: "/c/programs/castleGafa/icon.gif",
          title: "Castle GAFA 3D",
          help:
            '<b>Credits :</b><br><a target="_blank" href="https://github.com/loadx/html5-wolfenstein3D">https://github.com/loadx/html5-wolfenstein3D</a><br><a target="_blank" href="http://3d.wolfenstein.com">http://3d.wolfenstein.com</a>',
          width: 640,
          height: 400,
        };
        $window.call(this, data);
      },
    },

    skifree: {
      categories: "Game",
      name: "SkiFree",
      icon: "/c/sys/skins/w93/apps/skifree.gif",
      exec: function() {
        var data = {
          url: "/c/programs/SkiFree/index.html",
          icon: "/c/sys/skins/w93/apps/skifree.gif",
          title: "SkiFree",
          help:
            '<b>Credits :</b><br><a target="_blank" href="https://basicallydan.github.io/skifree.js/">https://basicallydan.github.io/skifree.js/</a>',
          bodyClass: "skin_inset_deep skin_light",
          width: 530,
          height: 530,
          onopen: function() {
            var cnt = 317;
            function notResp() {
              if (cnt === 317) $alert("Program not responding...", notResp);
              else if (cnt > 0)
                $alert(
                  "Program not responding...<br>(remaining retry: " + cnt + ")",
                  notResp
                );
              else
                $alert("Issue Resolved<br>317 clicks has corrected the error");
              cnt--;
            }
            notResp();
          },
        };
        $window.call(this, data);
      },
    },

    solitude: {
      categories: "Game;CardGame",
      name: "Solitude",
      icon: "apps/solitaire.gif",
      //install: '~/yo.lnk42',
      exec: function() {
        var iframe;
        var data = {
          url: "/c/programs/solitude/index.html",
          bodyClass: "skin_inset_deep",
          width: 630,
          height: 440,
          onopen: function(el) {
            iframe = this.el.iframe;
          },
          menu: [
            {
              name: "Game",
              items: [
                {
                  name: "New",
                  action: function() {
                    iframe.contentWindow.newGame();
                  },
                },
                {
                  name: "Retry",
                  action: function() {
                    iframe.contentWindow.klondike();
                  },
                },
                {
                  name: "Yeah",
                  action: function() {
                    $confirm("Do you want to win the game now?", function(ok) {
                      if (ok) {
                        $alert(
                          "click and drag anywhere on the game to see the fun, thanks to mr doob"
                        );
                        iframe.contentWindow.mrdoob();
                      }
                    });
                  },
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ],
            },
          ],
        };
        $window.call(this, data);
      },
    },

    calc: {
      categories: "Utility;",
      icon: "apps/calc.png",
      name: "Calculator",
      exec: function(opt) {
        $window.call(this, {
          url: "/c/programs/calculate/index.php",
          width: 500,
          height: 222,
          resizable: !false,
          maximizable: false,
          onready: function() {
            var hyperspace =
              "" +
              '<link rel="stylesheet" href="/d/0/0.css">' +
              '<div class="ho-shi">' +
              '  <div class="wrap">' +
              '      <div class="wall wall-right"></div>' +
              '      <div class="wall wall-left"></div>   ' +
              '      <div class="wall wall-top"></div>' +
              '      <div class="wall wall-bottom"></div> ' +
              '      <div class="wall wall-back"></div>    ' +
              "  </div>" +
              '  <div class="wrap">' +
              '      <div class="wall wall-right"></div>' +
              '      <div class="wall wall-left"></div>   ' +
              '      <div class="wall wall-top"></div>' +
              '      <div class="wall wall-bottom"></div>   ' +
              '      <div class="wall wall-back"></div>    ' +
              "  </div>" +
              "</div>";
            var div = document.createElement("div");
            div.innerHTML = hyperspace;
            this.el.iframe.contentWindow.hoShi(function() {
              le._dom.screen.appendChild(div);
            });
          },
          help:
            "<p>Based on Calculate by Timothy Armstrong</p>" +
            '<p><a target="_blank" href="https://github.com/timothyarmstrong/calculate">https://github.com/timothyarmstrong/calculate</a><p>',
        });
      },
    },

    mines: {
      categories: "Game;LogicGame",
      icon: "apps/minesweeper.png",
      name: "BrianSweeper",
      exec: function(opt) {
        var iframe, divBoard, win;
        var icon = this.app.icon;
        var gameFormat, maxX, maxY, maxBombs;
        function changeGameFormat(gF, x, y, b) {
          gameFormat = gF;
          maxX = x;
          maxY = y;
          maxBombs = b;
          iframe.contentWindow.init(gameFormat, x, y, b);
          win.changeSize({
            width: divBoard.scrollWidth,
            height: divBoard.offsetHeight,
          });
        }
        var data = {
          url: "/c/programs/minesweeper/index.html",
          width: 516,
          height: 312,
          resizable: false,
          maximizable: false,
          onready: function(el) {
            iframe = this.el.iframe;
            divBoard = iframe.contentWindow.document.getElementById("divBoard");
            changeGameFormat("Beginner");
          },
          menu: [
            {
              name: "Game",
              items: [
                {
                  name: "Beginner",
                  action: function() {
                    changeGameFormat("Beginner");
                  },
                },
                {
                  name: "Intermediate",
                  action: function() {
                    changeGameFormat("Intermediate");
                  },
                },
                {
                  name: "Expert",
                  action: function() {
                    changeGameFormat("Expert");
                  },
                },
                {
                  name: "Custom",
                  action: function() {
                    $window.form(
                      "Custom",
                      { x: 10, y: 10, Bombs: 10 },
                      function(ok, obj) {
                        if (ok)
                          changeGameFormat("Custom", obj.x, obj.y, obj.Bombs);
                      }
                    );
                  },
                },
                { name: "---" },
                {
                  name: "Options",
                  items: [
                    {
                      name: "Troll mode",
                      checkbox: true,
                      selected: true,
                      action: function(ok) {
                        iframe.contentWindow.troll = ok;
                        changeGameFormat(gameFormat, maxX, maxY, maxBombs);
                      },
                    },
                  ],
                },
                { name: "---" },
                {
                  name: "Close",
                  action: function() {
                    this.window.close();
                  },
                },
              ],
            },
            {
              name: "Help",
              items: [
                {
                  name: "Instructions",
                  action: function() {
                    $alert.help(
                      '<div style="text-align:left">' +
                        "<h1>Instructions for MineSweeper</h1>" +
                        "<strong>The Basics:</strong>" +
                        "<ul><li>You are presented with a board of squares, each with a cover. Some squares contain mines (bombs) under the covers. If you open a square containing a bomb, you loose. If you open all squares without bombs, you win.</li>" +
                        "<li>Opening a square which doesn't have a bomb reveals the number of neighboring squares contain bombs. Use this information plus some guess work to avoid the bombs.</li>" +
                        "<li>To open a square, point at the square and click on it. To mark a square you think is a bomb, point and right click. With a single button mouse use the space bar to mark a bomb.</li>" +
                        "</ul>" +
                        "<strong>The Details:</strong>" +
                        "<ul><li>A squares &quot;neighbors&quot; are the squares adjacent above, below, left, right, and all 4 diagonals. Squares on the sides of the board or in a corner have fewer neighbors. The board does not wrap around the edges.</li>" +
                        "<li>If you open a square with 0 neighboring bombs, all its neighbors will automatically open. This can cause a large area to automatically open.</li>" +
                        "<li>To remove a bomb marker from a square, point at it and right-click again.</li>" +
                        "<li>The first square you open <strike>is</strike> never a bomb.</li>" +
                        "<li>If you mark a bomb incorrectly, you will have to correct the mistake before you can win. Incorrect bomb marking doesn't kill you, but it can easily lead to mistakes which do.</li>" +
                        "<li>You don't have to mark all bombs to win; you just need to open all non-bomb squares.</li>" +
                        "<li>Press the yellow face to start a new game.</li>" +
                        "</ul>" +
                        "<strong>The Status Information:</strong>" +
                        "<ul><li>The upper left corner of the screen contains the number of bombs minus the number of marked squares. At the beginning of a game it is just the number of bombs. The number will update as you mark and unmark squares.</li>" +
                        "<li>The yellow face will show a smile face while you play, a clock face when a game board is being built, a dead face when you hit a bomb, a cool face when you win, and a pirate face when you win while cheating.</li>" +
                        '<li>The upper right corner of the screen contains a time counter. The timer will max out at <span title="16 minutes 39 seconds">999</span>.' +
                        "<li>Click on the time to switch to the number of moves counter. Click again to switch back to the time.</li>" +
                        "<li>Press P to pause your game. The board will be covered while paused.</li>" +
                        "</ul>" +
                        "<strong>Options and Enhancements:</strong>" +
                        "<ul><li><b>Open Remaining</b> - Once the correct number of bombs have been marked, the bomb counter will turn blue. Click on the blue bomb counter to open all remaining cells. If any bombs are incorrectly marked, this will cause instant death.</li></ul>" +
                        "</div>"
                    );
                  },
                },
                { name: "---" },
                {
                  name: "About",
                  action: function() {
                    $alert.info(
                      '<h1 style="margin-bottom:0">Minesweeper</h1><strong>written in JavaScript</strong><br><br>' +
                        "This version was written 1997-2014<br>" +
                        "by D. Shep Poor<br>" +
                        "<br>" +
                        "<br>" +
                        'Send comments to <a href="mailto:sheppoor@dataexperts.com">sheppoor@dataexperts.com</a><br>' +
                        "<br>" +
                        "<br>" +
                        "Original on which this game is based<br>" +
                        "Copyright © 1981-1995 Microsoft Corp.",
                      icon
                    );
                  },
                },
              ],
            },
          ],
        };
        win = $window.call(this, data);
      },
    },

    hl3: {
      categories: "Game;Shooter",
      name: "Half-Life 3",
      icon: "apps/hl3.png",
      exec: function() {
        var verbs = [
          "Calculating",
          "Executing",
          "Computing",
          "Loading",
          "Downloading",
          "Generating",
          "Compiling",
          "Formating",
          "Inserting",
          "Browsing",
          "Accessing",
          "Configuring",
          "Connecting to",
          "Forwarding",
          "Manipulating",
          "Pasting",
          "Scanning",
          "Searching for",
          "Processing",
          "Performing",
          "Selecting",
          "Translating",
          "Writing",
          "Transforming",
          "Unzipping",
          "Logging to",
          "Updating",
          "Checking",
          "Decompressing",
          "Exploring",
          "Deleting",
          "Surfing",
          "Initializing",
          "Confirming",
          "Delaying",
          "Messing with",
        ];

        var preNames = [
          "Adobe",
          "super",
          "random",
          "Microsoft",
          "virtual",
          "MOAR",
          "less",
          "Google",
          "pizza",
          "GNU",
          "3D",
          "NVIDIA",
          "Voodoo 3D",
          "3dfx",
          "MEGA",
          "Mozilla",
          "facebook",
          "ultimate",
          "last",
          "next level",
          "wizard",
          "unkwown",
          "hacked",
          "spammed",
          "trojan",
          "data",
          "securised",
          "unsecurised",
          "Valve",
          "epic",
          "over9000",
          "shader",
          "script",
          "module",
          "kitten",
          "teh",
          "lol",
          "troll",
          "meme",
          "software",
          "hardware",
          "half of",
          "first",
          "last",
          "c++",
          "system",
          "VR",
          "emoji",
          "sudo",
          "user",
          "scene",
          "clock",
          "polygon",
          "overclocked",
          "Radeon",
          "Pro SSG",
          "AMD",
          "ultra HD",
          "PRO",
          "perfect-match",
          "high-end",
          "TITAN X",
          "low-cost",
          "GTX",
          "Pascal-powered",
          "Geforce",
          "new",
          "extreme",
          "fury",
          "furry",
          "R4",
          "nano",
          "memory",
          "gaming",
          "8GB",
          "Tri-X",
          "gaming edition",
          "CERN",
          "Nintendo",
          "Gabe Newell's",
          "video game",
          "GoldSrc",
          "John Carmack's",
          "encrypted",
          "forked",
          "fasted",
          "slowed",
          "modded",
          "updated",
          "major",
          "minor",
          "alpha",
          "beta",
          "hard-coded",
          "modern",
          "Steam",
          "OpenGL",
          "SDL",
          "handled",
          "game developer's",
          "Vulkan",
          "Source 2",
          "workshop",
          "static",
          "porn",
          "lag-compensated",
          "hight dynamic range",
          "scalable",
          "facial",
          "pre-computed",
          "auto-generated",
          "skeletal",
          "inversed",
          "signifiant",
          "keyframed",
          "Gentoo",
          "QuickTime",
        ];

        var names = [
          "GPU",
          "CPU",
          "VRAM",
          "anti-aliasing",
          "frame buffer",
          "code",
          "bot",
          "API",
          "laptop",
          "development kit",
          "reality",
          "SDK",
          "tool",
          "3d",
          "model",
          "client",
          "source",
          "branch",
          "build",
          "core",
          "Orange Box",
          "cat",
          "episode",
          "mod",
          "dog",
          "connectors",
          "Quake engine",
          "address",
          "algorithm",
          "email",
          "c++",
          "data",
          "database",
          "document",
          "disk operating system",
          "desktop",
          "ENIAC",
          "electricity",
          "moar ram",
          "attachment",
          "online server",
          "datacenter",
          "explorer",
          "filesystem",
          "file allocation table",
          "pizza",
          "pizza.dll",
          "player",
          "folder",
          "footnotes",
          "freeware",
          "firewall",
          "file",
          "teh internet",
          "format",
          "freeBSD",
          "FTP",
          "Gimp",
          "GNU",
          "hacker",
          "4chan",
          "hard disk",
          "hardware",
          "software",
          "hash_function",
          "cookie",
          "java",
          "kernel",
          "system32.dll (are you sure?) ",
          "keyboard",
          "mouse",
          "link",
          "licensing examples for computer software",
          "live cd",
          "malware",
          "Macintosh",
          "md5",
          "media",
          "megabyte",
          "spam",
          "spammer",
          "scam",
          "scammer",
          "monitor",
          "motherboard",
          "Mozilla Firefox web browser",
          "network",
          "computer",
          "page",
          "Perl script",
          "script",
          "program",
          "release",
          "printer",
          "GPS",
          "PDF",
          "pop up",
          "plug-in",
          "python",
          "random access memory",
          "read only memory",
          "root",
          "Recycle Bin",
          "scan",
          "engine",
          "search engine",
          "shareware",
          "spreadsheet",
          "stylesheet",
          "super computer",
          "super user",
          "SDK",
          "trojan",
          "trojan horse",
          "Ubuntu",
          "update",
          "user",
          "USB",
          "version",
          "virtual community",
          "Visual Basic",
          "virus",
          "vulnerability",
          "window",
          "Wine",
          "X32",
          "X64",
          "Yahoo!",
          "ZIP",
          "like a boss",
          "manager",
          "setup",
          "Service Pack 1",
          "Service Pack 2",
          "Service Pack 3",
          "shit",
          "virus",
          "particule",
          "module",
          "panda",
          "corgi",
          "generator",
          "Half Life 3",
          "Gabe Newell",
          "center",
          "CD-ROM",
          "Source 3",
          "porn",
          "youtuber",
          "steam",
          "pokemon go",
          "home",
          "overclock",
          "graphic card",
          "Team Fortress",
          "milf",
          "Left 4 Dead",
          "linux support",
        ];

        var that = this;
        var image = new Image();
        image.src = "/c/programs/hl3/splash.jpg";
        image.className = "ui_layout_center app_imageviewer__img";
        image.onload = load;
        image.onerror = load;
        image.onabort = load;

        function load() {
          $window.call(that, {
            header: false,
            maximizable: false,
            resizable: false,
            draggable: false,
            contextmenuOnBody: true,
            center: true,
            baseClass: "ui_desktop_layer app_hl3",
            baseHeight: image.height,
            baseWidth: image.width,
            html: image,
            onopen: function(win) {
              var body = this.el.body;
              setTimeout(function() {
                var title = document.createElement("div");
                var text = document.createElement("div");
                var wait = document.createElement("div");
                title.innerHTML =
                  '<h1 style="font-size:45px;margin:0;position:relative">Half-Life <sup style="position:absolute;line-height:1;font-size:16px;top:7px">3</sup></h1><div style="margin-top:3px">CONFIRMED<div>';
                text.textContent = "...";
                wait.textContent = "Please wait";
                title.style.cssText =
                  "font-size:12px;font-family:arial,sans serif;color:#fff;text-align:center;position:absolute;top:42px;left:1%;right:1%";
                text.style.cssText =
                  "font-size:12px;font-family:arial,sans serif;color:#fff;text-align:center;position:absolute;bottom:132px;left:1%;right:1%";
                wait.style.cssText =
                  "font-size:12px;font-family:arial,sans serif;color:#999;text-align:center;position:absolute;bottom:116px;left:1%;right:1%";
                body.appendChild(title);
                body.appendChild(text);
                body.appendChild(wait);

                function chance(p) {
                  return Math.random() * 100 >= (p || 50) ? false : true;
                }

                function init() {
                  if (chance()) {
                    text.textContent =
                      $io.arr.random(verbs) +
                      " " +
                      $io.arr.random(preNames) +
                      " " +
                      $io.arr.random(preNames) +
                      " " +
                      $io.arr.random(names) +
                      "...";
                  } else {
                    text.textContent =
                      $io.arr.random(verbs) +
                      " " +
                      $io.arr.random(preNames) +
                      " " +
                      $io.arr.random(names) +
                      "...";
                  }
                  setTimeout(init, Math.random() * 2000);
                }

                init();
              }, 0);
            },
          });
        }
      },
    },

    /*
       db    8b    d8 88   88 .dP"Y8 888888 8b    d8 888888 88b 88 888888
      dPYb   88b  d88 88   88 `Ybo." 88__   88b  d88 88__   88Yb88   88
     dP__Yb  88YbdP88 Y8   8P o.`Y8b 88""   88YbdP88 88""   88 Y88   88
    dP""""Yb 88 YY 88 `YbodP' 8bodP' 888888 88 YY 88 888888 88  Y8   88
    */

    acidbox: {
      categories: "Amusement;",
      icon: "apps/acidBox.png",
      name: "Acid Box 93",
      hide: true,
      exec: function(opt) {
        $window.call(this, {
          url: "/c/programs/acidBox93/index.html",
          width: 600,
          height: 400,
          resizable: false,
          maximizable: false,
          help:
            "<p><b>Demoscene tribute 4 Acid loverz ^^</b></p>" +
            '<p>Acid mix by Dj Invisible Pink<br>Cracktro maded with <a target="_blank" href="http://codef.santo.fr/">CODEF</a><p>',
        });
      },
    },

    starwars: {
      categories: "Amusement;",
      icon: "apps/yoda.gif",
      name: "StarWars.ascii",
      hide: true,
      exec: function(opt) {
        $window.call(this, {
          url: "/c/programs/starwars/index.html",
          width: 429,
          height: 212,
          resizable: false,
          maximizable: false,
          help:
            "Star Wars Asciimation created by <a href=http://www.asciimation.co.nz/ target=_blank>www.asciimation.co.nz</a>",
        });
      },
    },

    defrag: {
      categories: "Amusement;",
      name: "Defrag",
      icon: "apps/defrag.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/defrag/index.php",
          width: 640,
          height: 495,
          resizable: false,
          maximizable: false,
        });
      },
    },

    lenna: {
      categories: "Amusement;",
      name: "lenna.png",
      icon: "/c/sys/skins/w93/mime/image.png",
      exec: function() {
        $window.call(this, {
          url: "/d/lenna.html",
          width: 512,
          height: 512,
          resizable: false,
          maximizable: true,
        });
      },
    },

    ascii: {
      categories: "Graphics",
      name: "ASCII Gallery",
      icon: "/c/files/images/icons/90s123.png",
      exec: function() {
        $window.call(this, {
          url: "/c/files/images/ascii/ascii.html",
          automaximize: true,
          /*width: 512,
          height: 512,*/
          resizable: false,
          maximizable: false,
          help: "ASCII Art refers to images created only using ASCII text characters."
        });
      },
    },

    gameoflife: {
      categories: "Amusement;",
      name: "Game Of Life",
      icon: "apps/gameOfLife.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/gameOfLife/index.html",
          width: 600,
          height: 600,
          resizable: false,
          maximizable: false,
        });
      },
    },

    whatif: {
      categories: "Amusement;",
      name: "What If",
      icon: "apps/matrix.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/matrix/index.php",
          width: 600,
          height: 300,
        });
      },
    },

    takethis: {
      categories: "Amusement;",
      name: "Take this",
      icon: "apps/dangerous.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/dangerous/index.html",
          width: 500,
          height: 440,
          footer: "&nbsp;",
          resizable: false,
          maximizable: false,
        });
      },
    },

    speech: {
      categories: "Amusement;",
      name: "Speech",
      icon: "apps/voice.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/speech/index.php",
          width: 200,
          height: 420,
          help: "Chrome only :(",
          resizable: false,
          maximizable: false,
        });
      },
    },

    hampster: {
      categories: "Amusement",
      name: "HAMPSTER DANCE",
      icon: "/c/programs/hampsterDance/icon.gif",
      exec: function() {
        var data = {
          url: "/c/programs/hampsterDance/index.html",
          icon: "/c/programs/castleGafa/icon.gif",
          bodyClass: "skin_inset_deep skin_light",
          width: 485,
          height: 418,
        };
        $window.call(this, data);
      },
    },

    wat: {
      categories: "Amusement",
      name: "wat",
      exec: function() {
        $alert({
          title: "Error",
          msg: "Windows has detected that your monitor<br>is not plugined in.",
          img: "/c/sys/skins/w93/error.png",
          sound: "error",
          btnOk: "wat",
        });
      },
    },

    "global thermonuclear war": {
      categories: "Game;LogicGame",
      terminal: true,
      silent: true,
      exec: function() {
        // thanks : https://github.com/aglemann/tic-tac-toe
        var le = this.le,
          cli = this.cli,
          size = 100,
          grid = 3,
          combos = [],
          board = newBoard(),
          IAvsIA = true,
          line = {},
          msg;
        $log(" ");
        $log(" GREETINGS PROFESSOR FALKEN.");
        $log(' Type "start" to play');
        $log(' and "exit" to quit');
        $log(" ");
        $log("     1   2   3  ");
        $log("   +---+---+---+");
        line[0] = $log(" a |   |   |   |");
        $log("   +---+---+---+");
        line[1] = $log(" b |   |   |   |");
        $log("   +---+---+---+");
        line[2] = $log(" c |   |   |   |");
        $log("   +---+---+---+");
        msg = $log.blue(" ");

        function newBoard() {
          return [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        }

        // calculate all winning combos
        for (var i = 0, c = [], d = []; i < grid; i++) {
          for (var j = 0, a = [], b = []; j < grid; j++) {
            a.push(i * grid + j);
            b.push(j * grid + i);
          }
          combos.push(a, b);
          c.push(i * grid + i);
          d.push((grid - i - 1) * grid + i);
        }
        combos.push(c, d);

        // method to check if game won
        // uses depth to give higher values to quicker wins
        function chk(depth) {
          var x, o, z, i;
          for (z in combos) {
            j = x = o = 3;
            while (j--) {
              var k = combos[z][j];
              board[k] === "O" && x--;
              board[k] === "X" && o--;
            }
            if (!x) return size - depth; // x won
            if (!o) return depth - size; // o won
          }
        }

        // negamax search with alpha-beta pruning
        // http://en.wikipedia.org/wiki/Negamax
        // http://en.wikipedia.org/wiki/Alpha-beta_pruning
        var intelligence = 6;
        function search(depth, player, alpha, beta) {
          var i = grid * grid,
            min = -size,
            max,
            value,
            next;
          if ((value = chk(depth))) {
            // either player won
            return value * player;
          }
          if (intelligence > depth) {
            // recursion cutoff
            while (i--) {
              if (board[i] === " ") {
                board[i] = player > 0 ? "O" : "X";
                value = -search(depth + 1, -player, -beta, -alpha);
                board[i] = " ";
                if (max === undefined || value > max) max = value;
                if (value > alpha) alpha = value;
                if (alpha >= beta) return alpha; // prune branch
                if (max > min) {
                  min = max;
                  next = i;
                } // best odds for next move
              }
            }
          }
          return depth ? max || 0 : next; // 0 is tie game
        }

        function reset() {
          board = newBoard();
          draw();
          msg.textContent = " ";
        }

        function end(s) {
          msg.textContent = s;
          setTimeout(function() {
            reset();
            if (IAvsIA) randomStart();
          }, 800);
          return true;
        }

        function draw() {
          for (var i = 0, n = 0; i < 3; i++, n += 3) {
            line[i].textContent =
              " " +
              (i + 10).toString(16) +
              " | " +
              board[n] +
              " | " +
              board[n + 1] +
              " | " +
              board[n + 2] +
              " |";
          }
        }

        function tic(n) {
          if (board[n] === " ") board[n] = "X";
          else return;
          draw();
          if (chk(0) < 0) return end("   WINNER:     X");
          setTimeout(function() {
            var next = search(0, 1, -size, size);
            board[next] = "O";
            draw();
            if (next === undefined) return end("   WINNER:  NONE");
            if (chk(0) > 0) return end("   WINNER:     O");
            if (IAvsIA) {
              setTimeout(autoPlay, 70);
            }
          }, 70);
        }

        function autoPlay() {
          tic(search(0, -1, -size, size));
        }
        var lastRdm = -1;
        function randomStart() {
          var rdm = ~~(9 * Math.random());
          if (rdm !== lastRdm) {
            tic(rdm);
            lastRdm = rdm;
          } else randomStart();
        }
        if (IAvsIA) randomStart();

        draw();

        function destroy() {
          IAvsIA = false;
          $log.blue("    bye...");
          $log.blue(" ");
          cli.prompt.innerHTML = ">&nbsp;";
          cli.onenter = $noop;
        }

        cli.prompt.innerHTML = "█&nbsp;";
        cli.onenter = function(str) {
          if (str == "exit") {
            destroy();
          }
          if (str == "start") {
            IAvsIA = false;
            setTimeout(reset, 200);
          } else {
            str.replace(/([a-c])([1-3])/i, function(_, x, y) {
              tic((parseInt(x, 16) - 10) * 3 + (y - 1));
            });
          }
          return false;
        };
        cli.ondestroy = destroy;
      },
    },

    fx: {
      hascli: true,
      categories: "Graphics",
      icon: "apps/fx.png",
      inject: "arguments",
      init: function() {
        this.app.effects = le._fx;
      },
      exec: function(name, el) {
        var le = this.le;
        var app = this.app;

        if (typeof name !== "string") name = "";

        function reset() {
          $io.arr.all(app.effects, function(effect) {
            var els = document.querySelectorAll(".fx_" + effect);
            $io.arr.all(els, function(item) {
              item.classList.remove("fx_" + effect);
            });
          });
        }

        if (name === "none") {
          reset();
          return;
        }

        if (typeof el === "string") el = document.querySelectorAll(el);
        else if (!$io.isElement(el) && !$io.isNodeList(el)) {
          el = le._dom.screen;
        }

        var oldTransform;
        function repaint(cl) {
          if (el.length) {
            $io.arr.all(el, function(item) {
              _repaint(item, cl);
            });
          } else {
            _repaint(el, cl);
          }
        }
        function _repaint(el, cl) {
          $io.arr.all(el.classList, function(item) {
            if (item.indexOf("fx_") === 0 && cl !== item)
              el.classList.remove(item);
          });
          oldTransform = el.style.webkitTransform;
          el.style.webkitTransform = "scale(1)";
          el.classList.toggle(cl);
          el.style.webkitTransform = oldTransform;
        }

        function getDefault() {
          var out = "none";
          $io.arr.all(el.classList, function(item) {
            if (item.indexOf("fx_") === 0) out = item.replace("fx_", "");
          });
          return out;
        }

        if (!name) {
          if (this.cli) {
            $log("Experimental CSS3 and SVG effects");
            $log(" ");
            $log($io.str.htmlEscape("Usage : fx <effect_name> [css selector]"));
            $log('e.g. : "fx acid"');
            $log('e.g. : "fx blur .ui_window"');
            $log('e.g. : "fx spin .ui_icon"');
            $log(" ");
            $log("Call the command again to switch off the effect.");
            $log("Without [css selector], effects are applied to all screen.");
            $log("(It can make irreversible glitches)");
            $log(" ");
            $log("Available effects :");
            $log(app.effects.join(", "));
            $log(" ");
            return;
          } else {
            $window.form(
              "FX",
              {
                schema: {
                  name: {
                    title:
                      '<img style="position:absolute" width="32" height="32" src="/c/sys/skins/w93/apps/fx.png">',
                    type: "string",
                    enum: ["none"].concat(app.effects),
                    default: getDefault(),
                    attributes: {
                      onchange: function(arg) {
                        repaint("fx_" + this.value);
                      },
                    },
                  },
                },
              },
              function(ok) {
                if (!ok) repaint("fx_none");
              }
            );
          }
        }

        if (app.effects.indexOf(name) > -1) repaint("fx_" + name);
        else $log.error("The effect " + name + " does not exist.");
      },
    },

    acid: "fx acid",
    // ,'spin': 'fx spin'

    rotate: {
      hascli: true,
      categories: "Amusement",
      exec: function() {
        if (this.le._dom.screen.classList.contains("fx_rotate")) {
          this.le._dom.screen.classList.remove("fx_rotate");
          this.le._dom.screen.classList.add("fx_unrotate");
        } else {
          this.le._dom.screen.classList.remove("fx_unrotate");
          this.le._dom.screen.classList.add("fx_rotate");
        }
      },
    },

    "do a barrel roll": {
      hascli: true,
      silent: true,
      categories: "Amusement",
      exec: function() {
        if (this.le._dom.screen.classList.contains("fx_rotate")) {
          this.le._dom.screen.classList.remove("fx_rotate");
          this.le._dom.screen.classList.add("fx_unrotate");
        } else {
          this.le._dom.screen.classList.remove("fx_unrotate");
          this.le._dom.screen.classList.add("fx_rotate");
        }
      },
    },

    gravity: {
      hascli: true,
      silent: true,
      categories: "Amusement",
      exec: function() {
        if (!this.app.done) {
          this.app.done = true;
          $loader(
            ["/c/libs/jquery.min.js", "/c/libs/jGravity.js"],
            function() {
              $("#s42_desktop").jGravity({
                target: ".ui_icon,.ui_window,.virus",
                depth: 15,
              });

              setTimeout(function() {
                location.reload();
              }, 1000 * 180);
            },
            { amd: false }
          );
        }
      },
    },

    virtualpc: {
      categories: "Amusement",
      icon: "apps/inception.png",
      exec: function() {
        $window({
          url: "//www.windows93.net/index.php?v=" + Date.now(),
          title: "VIRTUAL PC",
          icon: "",
          width: 600,
          height: 400,
          resizable: true,
          maximizable: true,
          automaximize: true,
          help: "INCEPTION",
        });
      },
    },

    messenger: {
      categories: "Amusement",
      icon: "/c/programs/messEnger/img/messlogo.png",
      exec: function() {
        $window({
          url: "/c/programs/messEnger/index.php",
          title: "MESS.ENGER®",
          icon: "/c/programs/messEnger/img/messlogo.png",
          width: 240,
          height: 400,
          help:
            'Made by <a target="_blank" href="http://entter.com/">VJ Entter</a> <3',
        });
      },
    },

    robby: {
      categories: "Amusement",
      icon: "apps/robby.png",
      exec: function() {
        $window.call(this, {
          url: "/c/programs/robby/index.php",
          title: "Robby",
          width: 420,
          height: 400,
          resizable: false,
          maximizable: false,
          help:
            'Robby : ascii based game by <a target="_blank" href="http://www.nurykabe.com/">Morusque</a> <3',
        });
      },
    },

    vm: {
      categories: "Amusement",
      silent: true,
      icon: "apps/inception.png",
      exec: function() {
        $window.form(
          "VM",
          {
            schema: {
              name: {
                title:
                  '<img style="position:absolute" width="32" height="32" src="/c/sys/skins/w93/apps/inception.png">',
                type: "string",
                enum: [
                  ["Version 2", "v2"],
                  ["Version 1", "v1"],
                  ["Version 0", "v0"],
                ],
              },
            },
          },
          function(ok, data) {
            if (ok) {
              $exe(
                "iframe http://" +
                  data.name +
                  ".windows93.net/ --width=600 --height=400 --help=INCEPTION"
              );
            }
          }
        );
      },
    },

    hydra: {
      categories: "Amusement",
      icon: "apps/hydra.png",
      exec: function() {
        var icon = this.app.icon;
        function hydra() {
          $alert({
            msg:
              "Cut off a head, two more will take its place.<br>[ Hydra ViRuS BioCoded by Typhon/Échidna ]",
            title: "HYDRA",
            img: icon,
            baseClass: "ui_alert ui_window virus virus--hydra",
            center: false,
            cb: function(ok) {
              hydra();
              hydra();
            },
          });
        }
        hydra();
      },
    },

    doctor: {
      categories: "Security",
      icon: "apps/doctor.gif",
      exec: function(opt) {
        var le = this.le;
        var that = this;

        function killAllVirus(succes, fail) {
          le._dom.screen.classList.remove("acid");
          le._dom.screen.classList.remove("rotate");
          le._dom.screen.classList.remove("invert");
          le._dom.screen.classList.remove("grayscale");
          le._dom.screen.setAttribute("style", "");

          // check if any cmd have a doctor function...
          $io.obj.all(le._clean, function(val) {
            $io.arr.all(val, function(val) {
              val();
            });
          });

          for (var key in le._clean) delete le._clean[key];

          var virus = document.querySelectorAll(".virus");
          if (virus.length) {
            $io.arr.all(virus, function(el) {
              $window.destroy(el);
            });
            if (succes !== false) $docAlert(succes || "All Virus Killed !");
          } else {
            if (fail !== false) $docAlert(fail || "No Virus detected.");
          }
        }

        if (opt && opt.clean) {
          killAllVirus(false, false);
          return;
        }

        function $docAlert(msg) {
          $alert({
            title: "Doctor Marburg Antivirus",
            img: that.app.icon,
            btnOk: "Thanks !",
            msg: msg,
          });
        }

        var funnyDoctorMarburg = [
          function() {
            $confirm(
              {
                title: "Doctor Marburg Antivirus",
                img: that.app.icon,
                btnOk: "Yep!",
                btnCancel: "Nope!",
                msg: "That Hydra virus again ?",
              },
              function(isOk) {
                isOk &&
                  killAllVirus(
                    "Don't click on it next time",
                    "Are you kidding? There is no Hydra here!"
                  );
              }
            );
          },
          function() {
            $confirm(
              {
                title: "Doctor Marburg Antivirus",
                img: that.app.icon,
                btnOk: "Breathe",
                msg: "Breathe in and out please...",
              },
              function(isOk) {
                isOk &&
                  killAllVirus(
                    "Inhale inhale. You're the victim",
                    "Diagnostic : Psycho-somatic addict-insane"
                  );
              }
            );
          },
          function() {
            $prompt(
              {
                title: "Doctor Marburg Antivirus",
                img: that.app.icon,
                btnOk: "Say it",
                msg: "Say 99...",
              },
              function(isOk, res) {
                if (isOk && res == "99") {
                  killAllVirus();
                } else if (isOk) {
                  $confirm(
                    {
                      title: "Doctor Marburg Antivirus",
                      img: that.app.icon,
                      btnOk: "Let's do that",
                      msg:
                        "Mhh, you're very sick, unfortunately I can't do anything for you... Except cleaning your computer",
                    },
                    function(isOk, res) {
                      if (isOk) {
                        killAllVirus();
                      }
                    }
                  );
                }
              }
            );
          },
          function() {
            $confirm(
              {
                title: "Doctor Marburg Antivirus",
                img: that.app.icon,
                msg:
                  "Welcome to Doctor Marburg Antivirus.<br>Would you like to clean your System ?",
              },
              function(isOk, res) {
                if (isOk) {
                  $confirm(
                    {
                      title: "Doctor Marburg Antivirus",
                      img: that.app.icon,
                      btnOk: "Sure",
                      btnCancel: "Not Really",
                      msg:
                        "<b>Warning !</b><br>Doctor Marburg is not responsible for direct, indirect, incidental or consequential damages resulting from any defect, error or failure to perform this ilegal operation.<br><br>Do you want to perform anyway ?",
                    },
                    function(isOk, res) {
                      if (isOk) {
                        $prompt(
                          {
                            title: "Doctor Marburg Antivirus",
                            img: that.app.icon,
                            btnCancel: "Never Mind",
                            msg:
                              "Ok, please confirm with your credit card number",
                          },
                          function(isOk, res) {
                            if (isOk) {
                              $docAlert(
                                "<b> Ilegal operation detected !</b><br>DOCTOR MARBURG had blocked the following malware application to perform an ilegal operation : <br><br><i>DOCTOR MARBURG - ilegal Operation detected</i>"
                              );
                            } else {
                              $confirm(
                                {
                                  title: "Doctor Marburg Antivirus",
                                  img: that.app.icon,
                                  btnOk: "Sure",
                                  msg:
                                    "I was just testing you ;)<br>Do the cleaning operation anyway ?",
                                },
                                function(isOk, res) {
                                  if (isOk) {
                                    killAllVirus();
                                  }
                                }
                              );
                            }
                          }
                        );
                      } else {
                        $docAlert("You're such a Pussy :p");
                      }
                    }
                  );
                } else {
                  killAllVirus("Well, I did it anyway ^^", false);
                }
              }
            );
          },
        ];

        if (document.querySelector(".virus--hydra")) {
          funnyDoctorMarburg[0]();
        } else {
          $io.arr.random(funnyDoctorMarburg)();
        }
      },
    },

    ie6: {
      categories: "Amusement",
      silent: true,
      exec: function(selector) {
        var le = this.le;

        if (!selector) {
          $log.error("Error: CSS selector missing.");
          return;
        }

        var ssInst = $screenshot(selector, function(cnv, el) {
          var pos = el.getBoundingClientRect();

          cnv.className = "virus app_ie6_cnv cursor_move";
          cnv.style.position = "absolute";
          cnv.style.zIndex = $maxZ(".ui_window,.ui_z_indexed").num + 1;
          cnv.style.top = pos.top + "px";
          cnv.style.left = pos.left + "px";
          document.body.appendChild(cnv);

          $el(cnv).on("dblclick contextmenu", function(e) {
            e.preventDefault();
            le.canvas.clear();
          });

          var dragInst = $drag(cnv, {
            ondrag: function(e, x, y) {
              le.canvas.draw(cnv, x, y);
            },
          });

          var keyInst = $key(cnv).combo({
            space: function() {
              le.canvas.clear();
            },
            esc: function() {
              destroy();
            },
          });
          $el(cnv).trigger("click");

          le.canvas.draw(cnv, pos.left, pos.top);
          if (el.classList.contains("ui_window")) $window.destroy(el);

          function destroy() {
            dragInst.destroy();
            keyInst.destroy();
            le.canvas.clear();
            $el(cnv).off("*");
            document.body.removeChild(cnv);
          }

          if (!le._clean.ie6) le._clean.ie6 = [];
          le._clean.ie6.push(destroy);
        });
      },
    },

    glitch: {
      hascli: true,
      categories: "Amusement",
      exec: function(selector, speed, level) {
        var le = this.le;

        $loader(["/c/libs/glitch-canvas.js"], function() {
          // console.log(111, glitch)

          speed = typeof speed === "number" ? speed : 50;
          level = typeof level === "number" ? level : 20;

          var anim,
            canvas,
            ctx,
            my_image_data,
            parameters = {};

          function randomize() {
            parameters.amount = Math.random();
            parameters.seed = Math.random();
            parameters.iterations = Math.random() * level;
            parameters.quality = 0.99;
          }
          randomize();

          var speed = 50;
          var timerId;
          var ssInst = $screenshot(selector, function(cnv, el) {
            canvas = cnv;
            var pos = el.getBoundingClientRect();

            canvas.className = "virus app_glitch _ui_z_indexed";
            canvas.style.position = "fixed";
            //canvas.style.pointerEvents = 'none';
            canvas.style.zIndex =
              $maxZ(".ui_window,.ui_icon,.ui_z_indexed").num + 1;
            canvas.style.top = pos.top + "px";
            canvas.style.left = pos.left + "px";
            ctx = canvas.getContext("2d");
            my_image_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

            document.body.appendChild(canvas);

            function unglitch(e) {
              //console.log(canvas);
              if (e) e.preventDefault();
              clearTimeout(timerId);
              if (canvas) {
                $el(canvas)
                  .off("click", noroute)
                  .off("dblclick touchstart", unglitch)
                  .off("contextmenu", togglePause);
                wheelInst.destroy();
                if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
                canvas = null;
              }

              var index = le._clean.glitch.indexOf(unglitch);
              le._clean.glitch.splice(index, 1);

              if (le._clean.corglitch && le._clean.corglitch.length)
                le._clean.corglitch[0]();
            }

            if (!le._clean.glitch) le._clean.glitch = [];
            le._clean.glitch.push(unglitch);

            var paused = false;
            function togglePause(e) {
              e.preventDefault();
              randomize();
              if (paused) animateGlitch();
              else clearTimeout(timerId);
              paused = !paused;
            }

            function noroute() {
              $route("");
            }

            $el(canvas)
              .on("click", noroute)
              .on("dblclick touchstart", unglitch)
              .on("contextmenu", togglePause);
            var wheelInst = $wheel(
              canvas,
              function(dt, e) {
                clearTimeout(timerId);
                paused = true;
                parameters.iterations = Math.random() * level;
                if (dt === 1) parameters.quality = 0.99 - Math.random();
                else parameters.quality = 0.99;

                if (e.shiftKey) {
                  level += dt;
                  if (level < 1) level = 0;
                }

                glitch(my_image_data, parameters, function(img) {
                  ctx.drawImage(img, 0, 0);
                });
              },
              { throttle: speed / 2 }
            );

            function animateGlitch() {
              parameters.iterations = Math.random() * level;
              parameters.quality = 0.99 - Math.random();
              glitch(my_image_data, parameters, function(img) {
                ctx.drawImage(img, 0, 0);
                timerId = setTimeout(animateGlitch, speed);
              });
            }
            animateGlitch();

            if ("vibrate" in window.navigator) {
              navigator.vibrate(100);
            }
          });
        });
      },
    },

    marburg: {
      categories: "Amusement",
      exec: function() {
        var le = this.le;

        if (!le._clean.marburg) le._clean.marburg = [];
        le._clean.marburg.push(function() {
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          cancelAnimationFrame(animID);
          document.removeEventListener("click", marbugClick, true);
        });

        var canvas = document.createElement("canvas");
        canvas.id = "app_marburg";
        canvas.className = "virus";
        canvas.style.position = "absolute";
        canvas.style.zIndex = "9999";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        le._dom.screen.appendChild(canvas);
        var context = canvas.getContext("2d");
        context.webkitImageSmoothingEnabled = false;
        context.oImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var audioBlop = $audio("/c/sys/sounds/BLOP.ogg");
        var marburg = [];
        var numMarburg = 1;
        var marburgKill = 0;
        var marburgKillCount = 0;
        var killAllWave = 0;
        var marbkill = 0;
        var MarburgInfect = 0;
        var tempMarburg;

        function marbugClick() {
          if (MarburgInfect == 1) {
            tempMarburg = new marburgObjet();
            marburg.push(tempMarburg);
            numMarburg = numMarburg + 1;
            if (marburgKill == 0) {
              audioBlop.play();
            }
          }
        }

        document.addEventListener("click", marbugClick, true);

        var imageObj = new Image();
        imageObj.onload = function() {
          MarbugInfect();
          animate();
        };
        imageObj.src = "/c/files/images/png/error-alpha.png";

        var animID;
        function animate() {
          animID = requestAnimationFrame(animate);
          if (marburg.length > 0) {
            draw();
          }
        }

        function draw() {
          // CLEAR SCREEN
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          var i;
          for (i = 0; i < numMarburg; i++) {
            //the drawing of the shape is handled by a function inside the external class.
            //we must pass as an argument the context to which we are drawing the shape.
            if (!marburg[i]) continue;
            marburg[i].myX += Math.floor(Math.random() * 5) - 2;
            marburg[i].myY += Math.floor(Math.random() * 5) - 2;
            if (marburg[i].mySize < 10) {
              marburg.splice(i, 1);
              continue;
            }
            if (marburg[i].myRandomSize != marburg[i].mySize) {
              marburg[i].mySize =
                marburg[i].mySize +
                (marburg[i].myRandomSize - marburg[i].mySize) / 4;
            }
            context.drawImage(
              imageObj,
              marburg[i].myX - marburg[i].mySize / 2,
              marburg[i].myY - marburg[i].mySize / 2,
              marburg[i].mySize,
              marburg[i].mySize
            );
          }
        }

        function marburgObjet() {
          this.myMaxX = window.innerWidth - 32;
          this.myMaxY = window.innerHeight - 32;
          this.myX = Math.floor(Math.random() * this.myMaxX);
          this.myY = Math.floor(Math.random() * this.myMaxY);
          this.myRandomSize = Math.floor(Math.random() * 128) + 32;
          this.mySize = 10;
        }

        function MarbugInfect() {
          MarburgInfect = 1;
          tempMarburg = new marburgObjet();
          marburg.push(tempMarburg);
          numMarburg = numMarburg + 1;
          audioBlop.play();
        }
      },
    },

    necronomicoin: {
      categories: "Network",
      name: "Necronomicoin",
      icon: "/miner/necronomicoin.png",
      exec: function() {
        var data = {
          url: "/miner/",
          width: 510,
          height: 740,
        };
        $window.call(this, data);
      },
    },

    peng: {
      categories: "Network",
      name: "Peng!",
      icon: "/peng/icon.png",
      exec: function() {
        var data = {
          url: "/peng/",
          width: 640,
          height: 400,
        };
        $window.call(this, data);
      },
    },

    kof93: {
      categories: "Game",
      name: "KOF93",
      icon: "/c/programs/kof93/gief.gif",      
      exec: function() {
        var data = {
          automaximize: true,
          url: "/c/programs/kof93/fix.html",
      help:
        "<strong>King of fighters 93</strong><br>a game for 2 players" +
        '<p><strong>Player1 (GIEF): </strong><br>' +
        'Keys: q,e,s,d,f<br>' +
        'Fireball: ↓↘→ Q<br>' +
        'Tatsu: ↓↙← Q<br></p>' +
        '<p><strong>Player2 (HONDA):</strong><br>' +
        'Keys: SPACE,top,left,right,bottom<br>' +
        'fireball ↓↘→ SPACE<br>' +
        ' honda-press ↓2sec ↑ SPACE<br>' +
        '</p>'+
        '<p><strong>Extra moves:</strong><br>' +
        'dash: →→<br>' +
        'backdash ←←' +
        '</p>'+
        "<p><strong>Design+code:</strong> <a href='http://jankenpopp.com'>Jankenpopp</a><br>"+
        '<strong>Physics engine:</strong> <a href="https://schteppe.github.io/p2.js/" target="blank">p2.js</a> by <a href="https://github.com/schteppe" target="blank">schteppe</a></p>'
        };
        $window.call(this, data);
      },
    },

    potato: {
      exec: function() {
        var data = {
          url:
            "https://www.youtube.com/embed/C7fKoamz0nY?showinfo=0&amp;autoplay=1",
          icon: "c/files/images/icons/potato.png",
          title: "Potato.yt",
          width: 560,
          height: 315,
        };
        $window(data);
      },
    },

    superplayer: {
      exec: function() {
        var data = {
          url:
            "https://www.youtube.com/embed/lNEXAwwnSVs?showinfo=0&amp;autoplay=1",
          icon: "/c/files/images/icons/derp.png",
          title: "JANKENPOPP - SUPER PLAYER",
          width: 560,
          height: 315,
        };
        $window(data);
      },
    },

    anthology: {
      exec: function() {
        var data = {
          url:
            "https://www.youtube.com/embed/sy8Utr0CvBI?showinfo=0&amp;autoplay=1",
          icon: "/c/sys/skins/w93/trophy.gif",
          title: "ANTHOLOGY.AVI",
          width: 560,
          height: 315,
        };
        $window(data);
      },
    },

    hello: {
      categories: "Amusement",
      terminal: true,
      exec: function() {
        $log(".__           .__  .__          ");
        $log("|  |__   ____ |  | |  |   ____  ");
        $log("|  |  \\_/ __ \\|  | |  |  /  _ \\ ");
        $log("|   Y  \\  ___/|  |_|  |_(  <_> )");
        $log("|___|  /\\___  >____/____/\\____/ ");
        $log("     \\/     \\/                  ");
        $log("                    .__       .___");
        $log("__  _  _____________|  |    __| _/");
        $log("\\ \\/ \\/ /  _ \\_  __ \\  |   / __ | ");
        $log(" \\     (  <_> )  | \\/  |__/ /_/ | ");
        $log("  \\/\\_/ \\____/|__|  |____/\\____ | ");
        $log("                               \\/");
        $log("Welcome to Windows 93 :)");
        $log('type "help" or some JavaScript...');
        $log(" ");
      },
    },

    trollbox: {
      categories: "Network;Chat",
      name: "Trollbox",
      icon: "apps/chat.gif",
      exec: function() {
        var data = {
          url: "/trollbox/index.php",
          width: 640,
          height: 400,
        };
        $window.call(this, data);
      },
    },

    recorder: {
      categories: "Sound;Music",
      name: "Recorder",
      icon: "apps/recorder.png",
      exec: function() {
        var data = {
          url: "//www.windows93.net/c/programs/recorder/index.php",
          width: 350,
          height: 197,
        };
        $window.call(this, data);
      },
    },

    whois: {
      categories: "Amusement",
      silent: true,
      terminal: true,
      exec: function() {
        $log(
          "Jankenpopp & Zombectro are running the thing, the Mighty Doctor House is hosting the thing."
        );
      },
    },
  };
});
