system42.on("apps:ready", function(le) {
  "use strict";
  
  	le._apps["dosbox"] = {
	      title: "Dosbox",
	      categories: "Emulator",
	      name: "dosbox",
	      icon: "/c/sys/skins/w93/apps/dosbox.png",
	      exec: function() {
	        var that = this;
	        var iframe, win;
	        var about ="";
	        var soft = "";
	        var data = {
	          title: "Dosbox",
	          name: "dosbox",
	          icon: "/c/sys/skins/w93/apps/dosbox.png",
	          url: " ",
	          width: 640,
	          height: 400,
	          resizable: true,
	          automaximize: false,
	          maximizable: true,
	          //
	          onopen: function(el) {
	            iframe = this.el.iframe;
	          },
	          //
	          onready: function(el) {
	            
	          },
	          //
	          menu: [
	            {
	              name: "Load",
	              items: [
	                //
	                //
	                {
	                  name: "Programming",
	                  items: [
	                    //
	                    //
	                    { name: "GW Basic", 
	                      action: function(){soft="GWBASIC"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                  
	                    { name: "LoveDOS", 
	                      action: function(){soft="LoveDOS"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Q Basic", 
	                      action: function(){soft="QBasic"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},

	                    { name: "Turbo C", 
	                      action: function(){soft="Turbo_C"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                       
	                    { name: "Turbo C++", 
	                      action: function(){soft="Turbo_C_PP"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                  
	                    //
	                  ],
	                },
	                //
	                //
	                {
	                  name: "Game Creation Tools",
	                  items: [
	                    //
	                    //
	                    { name: "Adventure Game Studio", 
	                      action: function(){soft="Adventure_Game_Studio"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                  
	                    { name: "Ascii Quest", 
	                      action: function(){soft="Asciiquest"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "MegaZeux", 
	                      action: function(){soft="MegaZeux"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    //
	                  ],
	                },
	                //
	                //
	                {
	                  name: "Sound Trackers",
	                  items: [
	                    //
	                    //
	                    { name: "Adlib Tracker II", 
	                      action: function(){soft="Adlib_Tracker_II"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                  
	                    { name: "Fast Tracker 2", 
	                      action: function(){soft="Fast_Tracker_2"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Impulse Tracker", 
	                      action: function(){soft="Impulse_Tracker"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},

	                    { name: "Master Player", 
	                      action: function(){soft="Master_Player"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                         
	                    { name: "Scream Tracker 3", 
	                      action: function(){soft="Scream_Tracker_3"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    //
	                  ],
	                },
	                //
	                //
	                {
	                  name: "Games",
	                  items: [
	                    //
	                    // A
	                    //
	                    { name: "Alone in the dark", 
	                      action: function(){soft="Alone_in_the_dark"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                        
	                    { name: "Alone in the dark 2", 
	                      action: function(){soft="Alone_in_the_dark_2"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Alone in the dark 3", 
	                      action: function(){soft="Alone_in_the_dark_3"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                        
	                    { name: "Jack in the dark", 
	                      action: function(){soft="Jack_in_the_dark"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Alley Cat", 
	                      action: function(){soft="Alley_Cat"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Abuse", 
	                      action: function(){soft="Abuse"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Alien Rampage", 
	                      action: function(){soft="Alien_Rampage"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Adventures in Math", 
	                      action: function(){soft="Adventures_in_Math"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // B
	                    { name: "BAT", 
	                      action: function(){soft="BAT"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                        
	                    { name: "Battle Chess", 
	                      action: function(){soft="Battle_Chess"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                                            
	                    { name: "BloodNet", 
	                      action: function(){soft="BloodNet"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // C
	                    { name: "Commander Keen", 
	                      action: function(){soft="Keen1"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},

	                    { name: "Civilization", 
	                      action: function(){soft="Civilization"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                 
	                 	{ name: "Colossal Cave Adventure", 
	                      action: function(){soft="Colossal_Cave_Adventure"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // D
	                    { name: "Dave", 
	                      action: function(){soft="Dave"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Destruction Derby", 
	                      action: function(){soft="Destruction_Derby"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	  					{ name: "Disc", 
	                      action: function(){soft="Disc"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Digger", 
	                      action: function(){soft="Digger"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Doom", 
	                      action: function(){soft="Doom"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Duke3d", 
	                      action: function(){soft="Duke3d"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Dune", 
	                      action: function(){soft="Dune"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Dune2", 
	                      action: function(){soft="Dune2"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Dreamweb", 
	                      action: function(){soft="Dreamweb"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Dungeon Master", 
	                      action: function(){soft="Dungeon_Master"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // K
	                    { name: "Karateka", 
	                      action: function(){soft="Karateka"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                   
	                   	{ name: "KGB", 
	                      action: function(){soft="KGB"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                        
	                    // L   
	                    { name: "Lands of lore", 
	                      action: function(){soft="Lands_of_lore"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	 
	                    // N
	                    { name: "Neuromancer", 
	                      action: function(){soft="Neuromancer"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},

	                    // P
	                    { name: "Prince of persia", 
	                      action: function(){soft="Prince_of_persia"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // R
	                    { name: "Rogue", 
	                      action: function(){soft="Rogue"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // S
	                    { name: "Sapiens", 
	                      action: function(){soft="Sapiens"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	   					
	   					{ name: "Shuffle Puck Cafe", 
	                      action: function(){soft="Shuffle_Puck_Cafe"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // T
	                    { name: "Theme Hospital", 
	                      action: function(){soft="Theme_Hospital"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                                         
	                    { name: "Tower Assault", 
	                      action: function(){soft="Tower_Assault"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                       
	                    // W
	                    { name: "Winter Challenge", 
	                      action: function(){soft="Winter_Challenge"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    	                    
	                   	{ name: "Worms", 
	                      action: function(){soft="Worms"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    // X
	                    { name: "Xonix", 
	                      action: function(){soft="Xonix"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    	                    
	                   	// Z
	                    { name: "ZZT", 
	                      action: function(){soft="ZZT"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    //
	                  ],
	                },
	                //
	                { name: "---" },
	                //
	                {
	                  name: "PC98 Games",
	                  items: [
	                    //
	                    //
	                    { name: "EVO", 
	                      action: function(){soft="EVO"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Touhou", 
	                      action: function(){soft="Touhou"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Touhou 2", 
	                      action: function(){soft="Touhou_2"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Touhou 3", 
	                      action: function(){soft="Touhou_3"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Touhou 4", 
	                      action: function(){soft="Touhou_4"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                    
	                    { name: "Touhou 5", 
	                      action: function(){soft="Touhou_5"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
						
						{ name: "Rusty", 
	                      action: function(){soft="Rusty"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
						
						{ name: "Rude Breaker", 
	                      action: function(){soft="Rude_Breaker"; win.changeTitle(soft.replace(/_/g," ")); iframe.src="/d/programs/dosbox/?soft="+soft;},},
	                  
	                  ],
	                },
	                //
	                { name: "---" },
	                //
	                {
	                  name: "Close",
	                  action: function() {
	                    this.window.close();
	                  },
	                },
	              ],
	            },
	            {
	              name: "Options",
	              items: [
	                {
	                  name: "Fullscreen",
	                  action: function() {
	                    iframe.contentWindow.dosbox.requestFullScreen();
	                  },
	                },
	              ],
	            },

	            {
	              name: "Help",
	              items: [
	                {
	                  name: "Help",
	                  action: function() {
	                    $alert.info(
	                      "<p><b>Save</b><br>Feel free to save your data:<br>saves are persistent!</p><p><b>Mouse</b><br>Mouse based programs could run<br>better in fullscreen mode.</p><p><b>Problem?</b><br>Depending on random factors (including PC configuration, browser version): emulation will work better with FF or Chromu.<br>Incognito mode works better sometimes (PC98).<br>Just make your own tests.</p>"
	                    );
	                  },
	                },
	                { name: "---" },
	                {
	                  name: "About",
	                  action: function() {
	                    $alert.info(
	                      "<b>Em-DOSBox</b><p>An Emscripten port of DOSBox.<br>by <a href='https://github.com/dreamlayers/em-dosbox' target='blank'>Dreamlayers and DOSBOX Team.</a><br>[Much thanks 2 them :3]<br><br>App selection & tweak: Jankenpopp</p>"
	                    );
	                  },
	                },
	              ],
	            },
	          ],
	        }
	        //
	        //
	        win = $window.call(this, data);   
	      },
	},
	//
	le._apps["maze"] = {
      categories: "Game",
      icon: "/c/files/images/icons/maze.png",      
      name: "Maze 3D",
      exec: function() {
        $window.call(this, {
          url: "c/programs/maze/index.html",
          icon: "/c/files/images/icons/maze.png",
          title: "3D MAZE",
          width: 275,
          height: 230,
          resizable: false,
          maximizable: false
        });
      },
    },
    //
    le._apps["b"] = {
      categories: "Network",
      icon: "/c/sys/skins/w93/devices/floppyB.gif",      
      name: "b",
      exec: function() {
      	var about ="This is an <b>Imageboard</b>, it's a forum which operates mostly via posting images.";
        $window.call(this, {
          url: "b/",
          icon: "/c/sys/skins/w93/floppyB.png",
          title: "b",
          width:900,
          height:600,
          help: about,
          resizable: true,
          maximizable: true,
          automaximize: false
        });
      },
    },
    //
    le._apps["beepbox"] = {
      categories: "Music",
      icon: "apps/modbox.png",      
      name: "Modded Beepbox",
      accept: ".beep",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about ="<b>ModBox 3.2.2</b>"+
        "<p>BeepBox is an online tool for sketching and sharing chiptune melodies.\nModBox expands the world of BeepBox into a whole new realm!\n\n"+
        "BeepBox is developed by <a href='http://www.johnnesky.com/' target='blank'>John Nesky</a>.\n\n"+
        "Modded Beepbox is developed by Quirby64, Theepicosity, Fillygroove, and DARE.</p>"+
        "<p><a href='https://www.beepbox.co' target='blank'>https://www.beepbox.co</a>\n"+
        "<a href='https://moddedbeepbox.github.io/3.0/' target='blank'>https://moddedbeepbox.github.io/3.0/</p></a>";
        var beep="";
        if(url){
         	if (url.charAt(0)!="#") {
		       $file.open(url, 'String', function(blob){
		        	beep=blob;
		        	$window.call(this, {
			          url: "/c/programs/modbox/"+beep,
			          icon: "/c/sys/skins/w93/apps/modbox.png",
			          title: "Modded Beepbox",
			          help: about,
			          width:935,
			          height:683,
			          resizable: true,
			          maximizable: true,
			          automaximize: false
			        });
		        })
         	}else{
	        	$window.call(this, {
		          url: "/c/programs/modbox/"+url,
		          icon: "/c/sys/skins/w93/apps/modbox.png",
		          title: "Modded Beepbox",
		          help: about,
		          width:935,
		          height:683,
		          resizable: true,
		          maximizable: true,
		          automaximize: false
		        });
         	}
        }else{
        	$window.call(this, {
	          url: "/c/programs/modbox/",
	          icon: "/c/sys/skins/w93/apps/modbox.png",
	          title: "Modded Beepbox",
	          help: about,
	          width:935,
	          height:683,
	          resizable: true,
	          maximizable: true,
	          automaximize: false
	        });
        }
      },
    },
    //
    le._apps["pokerainbow"] = {
      categories: "Game",
      icon: "/c/sys/skins/w93/apps/pokeRainbow.png",
      name: "Poke Rainbow",
      exec: function(opt) {
        var iframe, win;
        var icon = this.app.icon;
        var about =
          "<b>JavaScript GameBoy Color Emulator</b>\n\n" +
          '<strong>Copyright (C) 2010 - 2012 <a target="_blank" href="https://github.com/taisel">Grant Galitz</a></strong>\n' +
          '<a target="_blank" href="http://taisel.github.io/GameBoy-Online/">http://taisel.github.io/GameBoy-Online/</a>';
        var controls = "<p><b>Keyboard Controls:</b>\nX = A.\nC = B.\nSHIFT = Select.\nENTER = Start.\nThe direction-pad is the control pad.\n\n<b>Joystick/Gamepad:</b>\nPlug some USB device and push buttons.\nDepending of various factors, it *should* work.</p>";
        function changeSpeed(x) {
          var speed=[0.5,1,2,4,8,16,32,9001];
          for (var i = 0; i < speed.length; i++) {
              if (i!=x) {win.cfg.menu[0].items[1].items[i].selected=false;};
          };
          iframe.contentWindow.setSpeed(speed[x])
        }
        var data = {
          url: " ",
          automaximize: false,
          width: 640,
          height: 576,
          resizable: false,
          maximizable: true,
          center: true,
          onready: function(el) {
            iframe = this.el.iframe;
            // dirty trick to get joypad infos, could create problems...
            if (iframe.src=="http://www.windows93.net/") {iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=0";};
          },
          menu: [
            {
              name: "Games",
              items: [
                //
                //
				{
                  name: "Load",
                  items: [
                  	//
                    {
                      name: "4 Pokimon Games",
                      action: function() {
                          iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=0";
                      },
                    },
                    //                    
                    {
                      name: "4 First DMG Games",
                      action: function() {
                          iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=1";
                      },
                    },
                    //                    
                    {
                      name: "4 Classics Games",
                      action: function() {
                          iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=2";
                      },
                    },
                    //
                    {
                      name: "4 Worst Games",
                      action: function() {
                          iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=3";
                      },
                    },
                    //
					{
                      name: "4 Music Softs",
                      action: function() {
                          iframe.src="/c/programs/pokeRainbow/?id="+win.id+"&preset=4";
                      },
                    },
                    //

                  ],
                },
                //
                {
                  name: "Sound",
                  items: [
                    {
                      name: "On/Off",
                      checkbox: true,
                      selected: false,
                      action: function() {
                        if (win.cfg.menu[0].items[1].items[0].selected) {
                          if (navigator.vendor=="Google Inc.") {
                            $alert({
                              btnOk: "FUUUUUU",
                              btnCancel: "Ok",
                              msg: "<b>It seems that you use Coogle Ghrome™</b>\n\nIf you don\'t ear any sound, click FUUUUUU.\nIf you ear sound, congrats! Just click Ok.",
                              cb: function(ok) {
                                if(ok){
                                  $exe('pokerainbow');
                                  win.close();
                                }
                              },
                          });
                            iframe.contentWindow.setSound(1);
                          }else{
                            iframe.contentWindow.setSound(1);
                          }
                        }else{  
                          iframe.contentWindow.setSound(0);
                        }
                      },
                    },
                  ],
                },
                //
                //
                {
                  name: "Speed",
                  items: [
                    {
                      name: "0.5",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {  
                        var x=0; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },
                    {
                      name: "1",
                      checkbox: true,
                      selected: true,
                      action: function(ok) {
                        var x=1; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "2",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        var x=2; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "4",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        var x=3; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "8",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        var x=4; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "16",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        var x=5; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "32",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        var x=6; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                      },
                    },  
                    {
                      name: "Over 9000",
                      checkbox: true,
                      selected: false,
                      action: function(ok) {
                        setTimeout(function(){ 
                          $alert({
                            img: "c/sys/skins/w93/question.png",
                            btnOk: "Yeah, thanks!",
                            msg: "Did that application crash successfully?",
                            cb: function(ok) {
                              win.close();
                            },
                          });
                         }, 3000);
                        var x=7; if (win.cfg.menu[0].items[1].items[x].selected) {changeSpeed(x)};
                        //
                        //
                      },
                    }, 
                  ],
                },
                //
                //
                { name: "---" },
                //
                {
                  name: "Game controller",
                  items: [
                    {
                      name: "",
                    },
                  ]
                },
                //
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
                  name: "Controls",
                  action: function() {
                    $alert.info(
                      controls
                    );
                  },
                },
                { name: "---" },
                {
                  name: "About",
                  action: function() {
                    $alert.info(
                      about,
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
    //
    le._apps["93realms"] = {
      categories: "Game",
      icon: "/c/files/images/icons/wizard.png",      
      name: "93 Realms",
      exec: function() {
      	var about="<p><b>•._.••´¯``•.¸¸.• 93 Realms •.¸¸.•´´¯`••._.•</b>\nMulti-User Dungeon for Windows93.\n<a href='telnet://windows93.net:8082'>telnet windows93.net 8082</a></p>"+
      			  "<p><b>Game Engine:</b>\nBased on SimpleMUD by <a href='https://github.com/lnguyenfx' target='blank'>Long Nguyen</a>.\nThe original codebase for SimpleMUD was written in C++ by <a href='https://github.com/RonPenton' target='blank'>Ron Penton</a>, the author of MUD Game Programming book.</p>"+
      			  "<p><b>Telnet Client:</b> <a href='https://github.com/mudchina/webtelnet' target='blank'>Raymond Xie</a>.</p>"+
      			  "<p><b>Custom Code & Game Editor:</b> Jankenpopp.\n<b>Additional Code:</b> Ziad87 & Pokazef.\n"+
      			  "<b>Map & Game Data:</b> <a href='http://www.nurykabe.com/' target='blank'>Morusque</a>.</p>"+
      			  "<p><b>How to play:\n</b>First create your character.\nThen type 'help' for a list of commands.</p>";
        $window.call(this, {
          url: "http://windows93.net:8083",
          icon: "/c/files/images/icons/wizard.png",
          title: "93 Realms",
          help: about,
          width:510,
          height:510,
          resizable: true,
          maximizable: true,
          automaximize: false
        });
      },
    },
    //
    le._apps["arena93"] = {
      categories: "Game",
      icon: "apps/arena93.png",      
      name: "Arena 93 Multiplayer",
      exec: function() {
      	var about="<p><b>Arena 93 Multiplayer</b>\nShare this link to play with your friends: <a href='http://www.windows93.net/#!arena93' target='blank'>http://www.windows93.net/#!arena93</a>\n<b>Code:</b> jankenpopp</p>";
        $window.call(this, {
          url: "//www.windows93.net:8084",
          icon: "apps/arena93.png",
          title: "93 Realms",
          help: about,
          width: 640,
          height: 400
        });
      },
    },
    //
    le._apps["ansi"] = {
      // modified ansilove.js (line 750) to ignore some buggy .ans files 
      categories: "Graphics;Viewer",
      silent: false,
      icon: "apps/imgviewer.png",
      accept: ".ans,._txt,.nfo,.asc,.diz,.ion,.bin,.idf,.pcb,.tnd,.xb,.ANS",
      exec: function(url, opt) {

        var that = this;
        var le = this.le;
        var app = this.app;
        var html;
        var renderer = document.createElement("canvas"); renderer.className = "ansi";
        var rendererCtx = renderer.getContext('2d');
        var folderPath;
        var fileName;
        var folderObj;
        var folderKeys = [];
        var currentIndex;

        var about =
          '<b>Ansilove - ANSi to PNG converter</b>\n<a target="_blank" href="https://www.ansilove.org/">https://www.ansilove.org/</a>' +
          '<p>ANSI art is a computer art form that was widely used at one time on BBSes. It is similar to ASCII art, but constructed from a larger set of 256 letters, numbers, and symbols.' +
          '<p><b>Mouse Controls:</b>\nClick = Next image in current folder.</p>' +
          '<p><b>Keyboard Controls:</b>\nRight = Next image.\nLeft = Previous image.</p>' +
          '<p><strong>Copyright (c) 2003-2019\n<a target="_blank" href="https://www.cambus.net/">Frederic Cambus</a>, a.k.a. \"<a target="_blank" href="https://cleaner.ansilove.org/">Cleaner</a>\"</strong></p>';

        function click(){
          currentIndex++;
          changeImage();
        }

        function fullScreenCanvas(cv){
        	if(cv.webkitRequestFullScreen) {
               	cv.webkitRequestFullScreen();
           	}
        	else {
        		cv.mozRequestFullScreen();
        	}    
        }
        
        $window.call(
          that, 
          $extend({
                icon: "/c/sys/skins/w93/apps/imgviewer.png",
                title: "AnsiLove "+url,
                html: renderer,
                help: about,
                bodyClass: "ansilove u-scroll-y",
                width: 655,
                height: 375,
            onready: function() {
              $el(renderer.offsetParent).on("click", click);
            },
            onclose: function() {

            },
            //
            menu: [
            {
              name: "File",
              items:[
                {
                  name: "Load",
                  action: function() {
                    $explorer('c/files/images/ansi/', {browse: true, explorer: true, onclose: function(ok, file) {
                      if (ok) {
                        open(file)
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
                  name: "Previous",
                  action: function() {
                    currentIndex--;
                    changeImage();
                  },
                },
                {
                  name: "Next",
                  action: function() {
                    currentIndex++;
                    changeImage();
                  },
                },
                {
                  name: "Fullscreen",
                  action: function() {
                    console.log(rendererCtx.canvas)
                    fullScreenCanvas(rendererCtx.canvas)
                    //$fullscreen();
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
            //
            contextmenu: {
              "after:FX": [
                { name: "---" },
                {
                  name: "Ansi",
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
                  ],
                },
                { name: "---" },
              ],
            },
            //
          })
        );

        if (Object.keys(opt).length==0||url=='') {
			$loader(["/c/libs/ansilove/ansilove.js"], function() {});        
          	$explorer('c/files/images/ansi/', {browse: true, explorer: true, onclose: function(ok, file) {
            	if (ok) {open(file)}
            }})
        }else{
	        $loader(["/c/libs/ansilove/ansilove.js"], function() {
	          if (url.indexOf("/a/") === 0) {
	            $file.open(url, "URL", function(val, asType) {
	              opt.url = val;
	              open(val);
	            });
	          } else {
	            open(url);
	          }
	        });
        }

        function open(url) {
          AnsiLove.render(url, function(canvas, sauce) {
            rendererCtx.canvas.width=canvas.width;
            rendererCtx.canvas.height=canvas.height;
            rendererCtx.drawImage(canvas, 0, 0);
          });
          setFolder(url);
        }

        function setFolder(url) {
          folderPath = $fs.utils.getFolderPath(url);
          fileName = $fs.utils.getFileName(url);
          folderObj = $io.obj.getPath(le._files, folderPath, "/");
          folderKeys = [];
          $io.obj.each(folderObj, function(val, key) {
            if (/\.(ans|_txt|nfo|asc|diz|ion|bin|idf|pcb|tnd|ANS|xb?)/.test(key))
              folderKeys.push(key);
          });
          folderKeys.sort();
          currentIndex = folderKeys.indexOf(fileName);
        }

        function changeImage() {
          if (currentIndex < 0) currentIndex = folderKeys.length - 1; //0;
          if (currentIndex > folderKeys.length - 1) currentIndex = 0; //folderKeys.length-1;
          if (fileName !== folderKeys[currentIndex]) {
            fileName = folderKeys[currentIndex];
            var url = folderPath + fileName;
            open(url);
            $window.current.changeTitle('AnsiLove '+url);
          }
        }

      },
    },
    //
    le._apps["wlc"] = {
      categories: "Video",
      name: "WideoLAN",
      icon: "mime/video.png",
      accept: ".mp4,.ogv,.webm,.mov",
      exec: function(url, opt) {
        var app = this.app;
        var iframe;
        var about =
          "boop";
        $window.call(this, {
          url:
            "/c/programs/wlc" + (url ? "?w=" + url : ""),
          title: opt.title ? opt.title + " - " + app.name : app.name,
          icon: opt.icon || app.icon,
          minWidth: true,
          minHeight: true,
          width: "320",
          height: "240",
          bodyClass: "skin_inset_deep",
          onready: function(el) {
            iframe = this.el.iframe;
          },
        });
      },
    },
    //
	le._apps["sim93"] = {
      categories: "Game",
      icon: "/c/sys/skins/w93/apps/visualNovel.png",      
      name: "SIM 93",
      exec: function() {
      	var about ="<b>SIM 93</b>\nA visual novel game released in 2015 to promote <b>Teh Windows93 Europe Tour</b>.\n \n<b>Design & Code:</b> Jankenpopp\n<b>FM Music: </b>Random 90's teenagers";
        $window.call(this, {
          url: "c/programs/visualNovel/index.html",
          icon: "/c/sys/skins/w93/apps/visualNovel.png",
          title: "WINDOWS 93 SIMULATOR",
          width:640,
          height:480,
          help: about,
          resizable: false,
          maximizable: false,
          automaximize: false
        });
      },
    },
    //
    le._apps["midi"] = {
      categories: "Music",
      icon: "/c/sys/skins/w93/apps/midiPlayer.png",      
      name: "Midi Jukebox",
      exec: function() {
      	var about ="<b>MIDIjs</b>\nThe 100% JavaScript MIDI Player.\n<a href='http://www.midijs.net/' target='blank'>www.midijs.net</a>";
        var info =  "<b>[--__-_] A R C H I V E   T E A M [_-__--]\n"+
        			"\n"+
					"   The GEOCITIES MIDI SWIPE Version 1.0\n"+
					"         FLAT AND UNIQUE Version\n"+
					"      Compiled on November 10, 2009</b>\n"+
					"\n"+
					" On October 27, 2009, Yahoo! Inc. shut down the Geocities service, a collection of\n"+
					" free webpages with entries and hosted sites dating back to 1995. Along with this\n"+
					" shutdown was the destruction of millions of files and history, lost to the dustbin\n"+
					" of time.\n"+
					"\n"+
					" ...well, except what dozens of people from around the world were desperately\n"+
					" downloading as fast as they could. This band of archivists, including members of\n"+
					" Archive Team, Reocities, Geocities.ws, and many others, did their best to ensure\n"+
					" at least a portion of this collection of files would live on.\n"+
					"\n"+
					" This is a quick and dirty collection of MIDI files taken from the Neighborhoods of\n"+
					" Geocities, given arbitrary unique names and sorted by first letter/character. MIDI\n"+
					" files could be summoned by browsers when visiting a website and could provide a\n"+
					" music soundtrack while looking at that page. The MIDI files themselves came from\n"+
					" a wide variety of sources, professional and amateur, and represent, in most cases,\n"+
					" commercial songs re-written for the MIDI format. Some have credits baked into the\n"+
					" files; others do not. Some are complicated orchestrations using the best of what\n"+
					" the MIDI format has to offer, while others are simplistic and repetitive.\n"+
					"\n"+
					" Please note that many of these files have been renamed arbitrarily to allow all the\n"+
					" filenames to fit into flat directories, and should not be considered the actual\n"+
					" names used by the website authors when putting together their sites. A simple dupe\n"+
					" checking has occurred so the exact same file doesn't appear in multiple places,\n"+
					" although any changes to the file in any way over time would make it appear to be\n"+
					" different even though the music would not. Also note that copyright and creator's\n"+
					" rights still exist for both the music and the files themselves, and no use of\n"+
					" these files is implied or permitted by Archive Team's compiling of them.\n"+
					"\n"+
					" In total, over 51,000 songs are located in this collection, spanning the full\n"+
					" 1995-2009 lifetime of Geocities.\n"
        $window.call(this, {
          url: "c/programs/midi/index.php",
          icon: "/c/sys/skins/w93/apps/midiPlayer.png",
          title: "Midi Jukebox",
          width:806,
          height:500,
          help: about+'\n\n'+info,
          resizable: true,
          maximizable: true,
          automaximize: false
        });
      },
    },
    //
	le._apps["radio"] = {
      categories: "Music",
      icon: "/c/files/images/icons/radio_small.png",      
      name: "Derp.FM",
      exec: function() {
      	var about ="<b>Derp.FM</b><p>This is a <b>Webradio</b>, it plays forever.<br>It can also be listened to here: http://windows93.net:8085/mpd.ogg</p><p>The playlist includes pop, punk, chiptune, breakcore, hardcore, synthwave, electro, hip-hop, trap, parody, noise & experimental music.</p><p>Feel free to suggest us some tracks!</p>";
        $window.call(this, {
          url: "http://radio.windows93.net/index.html",
          icon: "/c/files/images/icons/radio_small.png",
          title: "Derp.FM",
          width:600,
          height:280,
          help: about,
          footer: "<span style='float:right;'>http://windows93.net:8085/mpd.ogg</span>",
          resizable: true,
          maximizable: true,
          automaximize: false
        });
      },
    }
    //
	le._apps["flash"] = {
	  title: "Adobe Pizza Player™",
	  categories: "Emulator",
	  name: "Adobe Pizza Player™",
	  icon: "/c/files/images/icons/adobe.png",
	  exec: function() {
	    var that = this;
	    var iframe, win;
	    var about = "";
	    var soft = "";
	    var data = {
	      title: "Adobe Pizza Player™",
	      name: "flash",
	      icon: "/c/files/images/icons/adobe.png",
	      url: " ",
	      width: 640,
	      height: 400,
	      resizable: true,
	      automaximize: false,
	      maximizable: true,
	      //
	      onopen: function(el) {
	        iframe = this.el.iframe;
	        iframe.src = "/d/programs/flash/";
	      },
	      //
	      onready: function(el) {

	      },
	      //
	      menu: [{
	          name: "File",
	          items: [{
	              name: "Browse Files",
	              action: function() {
	                iframe.src = "/d/programs/flash/";
	              },
	            },
	            {
	              name: "Random File",
	              action: function() {
	                var src = iframe.src.split('/').splice(2);
	                if (src[0] == "www.windows93.net" && src[1] == "d" && src[2] == "programs" && src[3] == "flash") {
	                  iframe.contentWindow.randomFlash();
	                } else {
	                  iframe.src = "/d/programs/flash/?random=1";
	                }
	              },
	            },
	            {
	              name: "---"
	            },
	            {name:"Open local file...",action:function(){$explorer("/a/",{browse:!0,explorer:!0,onclose:function(b,c){b&&(a.contentWindow.location.href="/d/programs/flash/?swf=",a.addEventListener("load",function(){$file.open(c,"ArrayBuffer",async function(b){await a.contentWindow.player.play_swf_data(b),a.contentWindow.$("#loadingConsoleContainer").remove()})},{once:!0}))}})}},
	            {
	              name: "---"
	            },
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
	          items: [{
	              name: "Fullscreen",
	              action: function() {
	                iframe.contentWindow.openFullscreen();
	              },
	            },
	            {
	              name: "---"
	            },
	            {
	              name: "Share Link",
	              action: function() {
	                iframe.contentWindow.share();
	              },
	            },
	            {
	              name: "Download File",
	              action: function() {
	                iframe.contentWindow.download();
	              },
	            },
	          ]
	        },
	        {
	          name: "About",
	          action: function() {
	            about = "<h3>Ruffle</h3>" +
	              "<p><b>Flash Player emulator in Javascript<br>" +
	              "<a href='https://ruffle.rs/' target='blank'>https://ruffle.rs</a></b></p>" +
	              "<p>It's now official, Adobe Flash only has a few years left to live. At the end of 2020, all development and support will be stopped. It's actually a good thing that the web we have today isn't built on Flash, but it's sad to see all this content disappear because of obsolescence. Back in the days the Flash scene was very large with many online games and cool websites. Fortunately, there are enthusiasts (like <a href='https://ruffle.rs' target='blank'>Ruffle</a> and <a href='http://bluemaxima.org/flashpoint/' target='blank'>Flashpoint</a>) who work on emulators so that we can enjoy the content forever. Much love to them! Massive bigup to <a href='https://archive.org/' target='blank'>archive.org</a> too!</p>" +
	              "<p><b>Tweaks & selecta:</b> Jankenpopp<br><b>Open Local File:</b> utf-4096</p>"
	            $alert.info(about);
	          },
	        },
	      ],
	    };
	    win = $window.call(this, data);
	  },
	}
    //
});
