system42("upgrade", function(le, voila) {
  "use strict";
  // console.log(le._settings)
  le._settings.skin = "w93";
  voila();
});

// system42('upgrade', function(le, voila) { 'use strict';

//   if (v === 1) {
//     v = 1.1;
//     $store.update(le._path.key.home + 'Desktop/home.lnk42', function(val) {
//       val.exe = '~/';
//       delete val.icon;
//       return val;
//     });
//     $store.update(le._path.key.home + 'Desktop/Storage (A:).lnk42', function(val) {
//       delete val.icon;
//       return val;
//     });
//     $store.update(le._path.key.home + 'Desktop/System (C:).lnk42', function(val) {
//       delete val.icon;
//       return val;
//     });
//   }

//   //le._settings.version = 1;

//   var v = le._settings.version;

//   if (v === 1 || v === 1.1) {
//     //console.log('upgrade')
//     var deskSettings = le._init.desktop();
//     le._desktop = $store.update(le._path.key.home+'.config/desktop.json', function(val) {
//       return $extend(val, deskSettings);
//     });
//     le._settings.version = 1.2;
//   }

//   $file.scan('/a/', function() {
//     voila()
//   });

// });
