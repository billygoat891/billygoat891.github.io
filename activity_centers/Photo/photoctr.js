var g_objExternal = external;

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

  template.style.display = "none";
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

function GetFileExtension(name) 
{
    var ext = name.substring(name.lastIndexOf(".") + 1, name.length);
    return ext.toLowerCase();        
}

function IsImageFile(ext) 
{
    var types = "jpg,gif,bmp,dib";
    return types.indexOf(ext) > -1;
}

function AddToRecentPictures(fldritm)
{
    if (!fldritm)
        return;

    if (fldritm.IsFolder)
    {
        // Current SHAddToRecentDocs implementation rejects anything without an exteion.
        // To work around this problem, add a non-folder item in the folder to recent docs
        // so the folder itself can be remembered as well

        var items = fldritm.GetFolder.Items();
        var count = items.Count;

        for ( var i = 0; i < count; i++ )
        {
            var item = items.Item(i);
            var ext = GetFileExtension(item.Path);

            if (!item.IsFolder && IsImageFile(ext))
            {
                fldritm = item;
                break;
            }
        }
    }

    var shell = new ActiveXObject("Shell.Application");
    shell.AddToRecent(fldritm);
}        

var L_NotEditableFormat_Text = "This format is not editable in Beta 1.";
