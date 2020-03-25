var g_objExternal = external;
var g_placeInit = null;
var L_GameCenter_Text =    "Game Center";

function OnNavBarLoad()
{
    //external.event.registerSink("Place.TransitionComplete", OnTransitionComplete, true);
    
    external.window.title = L_GameCenter_Text;
    external.window.maximized = true;

    external.Property("Back") = idBack;
    external.Property("Home") = idHome;
    external.Property("Game Tips") = idTips;
    external.Property("Online Gaming") = idWebGames;
    external.Property("Search") = idSearch;
    external.Property("Help") = idHelp;
    external.Property("Exit") = idExit;

    g_placeInit = "Home";
    GoTo(g_placeInit);
}

function GoToPlace(objTravel, szPlace)
{
    var objPlaces = external.places;
    var currPlace = objPlaces.currentPlace;
    if ((szPlace != currPlace.name) || (g_placeInit != null))
    {
        objTravel.persist();
        objTravel.addEntry();
        objPlaces.transitionTo(szPlace);
        g_placeInit = null;
    }
}

function OnButtonClick(buttonID)
{
    var objTravel = external.travellog;

    var placeInit = g_placeInit;
    var oldPlace = external.places.currentPlace.name;
    if (buttonID == "Back")
    {
        if (objTravel.isEntryValid(-1))
        {
            objTravel.travel(-1);
        }
    }
    else if (buttonID == "Forward")
    {
        if (objTravel.isEntryValid(1))
        {
            objTravel.travel(1);
        }
    }
    else
    {
        GoToPlace(objTravel, buttonID);
    }
    var newPlace = external.places.currentPlace.name;
    if ((oldPlace != newPlace) || (placeInit != null))
    {
        if (external.Property(oldPlace) && external.Property(newPlace))
        {
            external.Property(oldPlace).className = "NavBarBlock";
            external.Property(newPlace).className = "NavBarBlockCurrent";
        }
    }
}

// Use this function in the music center to switch between panels
function GoTo(id)
{
    OnButtonClick(id);
    return false;
}

// Use this function to close the music center down
function CloseWindow()
{
    external.window.close();
    return false;
}


/*
function GoToPlace(objTravel, szPlace)
{
   var objPlaces = g_objExternal.places;
   var objCurrPlace = objPlaces.currentPlace;
   if(szPlace != objCurrPlace.name)
   {
      objTravel.persist();
      objTravel.addEntry();
      objPlaces.transitionTo(szPlace);
   }
}
function OnButtonClick(buttonID)
{
    var objTravel = external.travellog;

    var placeInit = g_placeInit;
    var oldPlace = external.places.currentPlace.name;
    if (buttonID == "Back")
    {
        if (objTravel.isEntryValid(-1))
        {
            objTravel.travel(-1);
        }
    }
    else if (buttonID == "Forward")
    {
        if (objTravel.isEntryValid(1))
        {
            objTravel.travel(1);
        }
    }
    else
    {
        GoToPlace(objTravel, buttonID);
    }
    var newPlace = external.places.currentPlace.name;
    if ((oldPlace != newPlace) || (placeInit != null))
    {
        if (external.Property(oldPlace) && external.Property(newPlace))
        {
            external.Property(oldPlace).className = "NavBarBlock";
            external.Property(newPlace).className = "NavBarBlockCurrent";
        }
    }
}

/*function OnButtonClick(buttonID)
{
   var objTravel = external.travellog;

   if(buttonID == "Back")
   {
      if(objTravel.isEntryValid(-1))
         objTravel.travel(-1);
   }
   else if(buttonID == "Forward")
   {
      if(objTravel.isEntryValid(1))
         objTravel.travel(1);
   }
   else
   {
      GoToPlace(objTravel, buttonID);
   }
}

// Use this function in the photo center to switch between panels

function GoTo(id)
{
	OnButtonClick(id);
	return false;
}

// Use this function to close the photo center down

function CloseWindow()
{
	external.window.close();
	return false;
}
*/

function PopulateTaskTable(table, groups)
{
  var i;
  // if needed we can modify this to ignore header and/or footer rows
  var template = table.rows(0);

  for (i=0; i<groups.count; i++)
  {
    var row = template.cloneNode(true);
    var cell = row.children(0);
    PopulateTaskGroup(cell, groups.Item(i));

    table.tBodies(0).appendChild(row);
  }

  table.tBodies(0).removeChild(template);
}

function PopulateTaskGroup(ele, group)
{
  var i;
  var span = document.createElement("SPAN");
  span.className = "tasktitle";
  span.innerText = group.name;
  ele.appendChild( span );
  ele.appendChild( document.createElement("BR") );
  
  for (i=0; i<group.count; i++)
  {
    var task = group.item(i);
    var span = MakeTaskLink( ele, task );
  }
}

function MakeTaskLink(ele, task)
{
  var span = document.createElement("SPAN");
  span.className = "tasksubtitle";
  ele.appendChild( span );
  ele.appendChild( document.createElement("BR") );

  var link = document.createElement("A");
  link.href = "";
  link.innerText = task.name;
  link.setAttribute("task", task);
  link.onclick = OnClickLink;
  span.appendChild( link );
}

function OnClickLink()
{
  var task = event.srcElement.task;
  var cmd = task.invokeCommand;
  // BUGBUG:  Tempory code until all of our places exist
  var newPlace = external.places.place(cmd);
  if ( newPlace )
  {
    window.external.Property("Last Selected Task") = task;
    GoTo(cmd);
  }
  else
  {
    alert( "The place \"" + cmd + "\" does not exist yet." );
  }

  return false;
}

/*
 *  Debugging: Turn on borders for tables so we can see the layout.
 */
function HighlightTables()
{
    var a = document.all.tags("TABLE");
    var i;
    for (i = 0; i < a.length; i++) {
        a(i).border = 1;
// The following is to test Right-To-Left
//        a(i).dir = "rtl";
// The following is to test Left to right
		a(i).dir = "ltr";
    }
}


	

function shellExec(e,flag)
{
    var cmd, arg;
    var a;
    var r1, r2, r3;

	//if object, pass in value, else, pass in string
	if(flag) {
		var s = e.Value;
	} else {
		var s = e;
	}
	
    //r1 = s.replace(/.exe\s/i,".exe\042 \042");
    //r2 = r1.replace(/.bat\s/i,".bat\042 \042");
    //s = r2.replace(/.lnk\s/i,".lnk\042 \042");
	
    // split into filename and argument
    // Remember, the starting part can be quoted.
    if (a = s.match(/^"([^\"]*)"(.*)/))
    {
        cmd = a[1];
        arg = a[2];
    }
    else if (a = s.match(/^(\S+)(.*)/))
    {
        cmd = a[1];
        arg = a[2];
    }
    else
    {
        cmd = s;
        arg = null;
    }

    Shell.ShellExecute(cmd, arg);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
}

/*
function GoToAlpha() {

	//#define SORT_ALPHA    0
	//#define SORT_MRU      1
	//#define SORT_LRU	  2
	//#define SORT_LARGEST  3
	//#define SORT_SMALLEST 4

    //We want sort alpha, so pass in a 0
    //GACAgent.GetGameData(0,0);
    GoTo("Home Alpha");
}

function GoToMRU() {
	//#define SORT_ALPHA    0
	//#define SORT_MRU      1
	//#define SORT_LRU	  2
	//#define SORT_LARGEST  3
	//#define SORT_SMALLEST 4

    //We want sort MRU, so pass in a 1
    //GACAgent.GetGameData(1,0);
    GoTo("Home");

}
*/