system42.on("apps:ready", function(le) {
  "use strict";

  le._apps["clippy"] = {
    categories: "Amusement",
    name: "clippy",
    icon: "/c/sys/skins/w93/help.png",
    exec: function(url, opt) {
      $loader(
        [
          "/c/libs/jquery.min.js",
          "/c/libs/clippy/build/clippy.css",
          "/c/libs/clippy/build/clippy.min.js",
        ],
        function() {
          var trucs = [
            "Bonzi",
            "Clippy",
            "F1",
            "Genie",
            "Links",
            "Merlin",
            "Peedy",
            "Rocky",
            "Rover",
          ];

          var truc = $io.arr.random(trucs);

          clippy.load("Clippy", function(agent) {
            agent.show();
            agent.speak(
              "Hi. My name is Clippy. I'm just going to hang out here for a while."
            );
          });
        },
        { amd: false }
      );
    },
  };

  le._apps["lisa"] = {
    categories: "Amusement",
    exec: function() {
      var that = this;
      var image = new Image();
      image.src = "/c/files/images/gif/lisa.gif";
      image.className = "ui_layout_center app_imageviewer__img";
      image.onload = load;
      image.onerror = load;
      image.onabort = load;
      function load() {
        $window.call(that, {
          title: "Virtal Girl",
          header: false,
          resizable: false,
          draggable: false,
          contextmenuOnBody: true,
          baseClass: "ui_desktop_layer app_lisa",
          baseHeight: image.height,
          baseWidth: image.width,
          html: image,
          onopen: function(win) {
            setTimeout(function() {
              win.style.top = "auto";
              win.style.left = "auto";
              win.style.right = "0px";
              win.style.bottom = "-4px";
            }, 0);
          },
        });
      }
    },
  };

  le._apps["vega"] = {
    categories: "Amusement",
    exec: function() {
      var that = this;
      var image = new Image();
      image.src = "/c/files/images/gif/confused_travolta.gif";
      image.className = "ui_layout_center app_imageviewer__img";
      image.onload = load;
      image.onerror = load;
      image.onabort = load;
      function load() {
        $window.call(that, {
          title: "Confused?!",
          header: false,
          resizable: false,
          draggable: false,
          maximizable: false,
          minimizable: false,
          contextmenuOnBody: true,
          maximised: true,
          baseClass: "ui_desktop_layer app_lisa",
          baseHeight: image.height,
          baseWidth: image.width,
          html: image,
          onopen: function(win) {
            setTimeout(function() {
              win.style.top = "auto";
              win.style.left = "auto";
              win.style.right = "0px";
              win.style.bottom = "-4px";
            }, 0);
          },
        });
      }
    },
  };
});
