//
//  The following functions are shared between playlist pages.
//
     function Playlist_AddItem(CurPlaylist, iIndex)
    {
        // For CD playlists, the FileName is not a valid property
        // var FileName = CurPlaylist.GetTrackProperty(iIndex, "Filename");

        //alert("Track#"+iIndex+"; Title:"+CurPlaylist.GetTrackProperty(iIndex, "Title"));
        //alert("Track#"+iIndex+"; Album:"+CurPlaylist.GetTrackProperty(iIndex, "Album"));
        //alert("Track#"+iIndex+"; Artist:"+CurPlaylist.GetTrackProperty(iIndex, "Artist"));
        var Title;
        Title = CurPlaylist.GetTrackProperty(iIndex, "Title");
        
        var  str = "<DIV ID='ITEM" + (iIndex+1) + "' CLASS='ListItem'>"+
                   (iIndex+1)+": "+Title;
        str += "</DIV>";

        if (iIndex == 0)
            PlaylistBox.innerHTML = str;
        else
            PlaylistBox.innerHTML += str;
    }

function InitListBoxWithPlaylist(playlist)
{
        //Remove all the text first
        PlaylistBox.innerHTML = "";

        //alert(playlist.Tracks);
        for(i = 0; i < playlist.Tracks; i++)
        {
         // Add the item to the listbox.
         Playlist_AddItem(playlist, i);         
         //   alert("Title:" + playlist.GetTrackProperty(i, "Title"));
         //   alert("Artist:" + playlist.GetTrackProperty(i, "Artist"));
         //   alert("Album:" + playlist.GetTrackProperty(i, "Album"));
        }
}

 function Playlist_SelectItem(iIndex)
 {
    if(s_iSelected != iIndex) //if it is already selected, don't do anything!
    {
        if(s_iSelected != -1)  //deselect is something is already selected.
        {
            var elemOld = document.all.item("ITEM" + (s_iSelected + 1));
            if(elemOld)
                elemOld.className = "ListItem";
        }
        //Select the new guy now.
        var elemNew = document.all.item("ITEM" + (iIndex + 1));
        if(elemNew)
        {
            elemNew.className = "ListItemSel";
            s_iSelected = iIndex;
        }
        else
            s_iSelected = -1;
    }
 }
 
 // Update the playlist display rows starting from "fromIndex" upto "toIndex"
 function Playlist_UpdateDisplay(fromIndex, toIndex)
 {
    var i;
    for(i = fromIndex; i <= toIndex; i++)
    {
        var str;
        
        if(i < s_CurList.Tracks)
        {
            var Title;
            Title = s_CurList.GetTrackProperty(i, "Title");
            str = "<DIV ID='ITEM" + (i+1) + "' CLASS='ListItem'>"+
                   (i+1)+": "+
                   Title+
                   "</DIV>";
        }
        else
            str = ""; //We need to remove this item.
        
        //Get the current element that has the index i.
        var elem = document.all.item("ITEM" + (i + 1));
        
        if(elem == null)  //If the element is not there
            PlaylistBox.innerHTML += str;
        else
        {
            if(str == "")
                elem.outerHTML = "";
            else
                elem.innerText = (i+1)+": "+Title;
        }
    }
 }
 
 function Playlist_RemoveTrack(iTrackNumber)
 {
    //DebugBreak();
    if(iTrackNumber == -1) //If no one is selected, just return.
        return;
        
    s_CurList.RemoveTrack(iTrackNumber);
    s_fDirty = true;
    
    if(s_iSelected >= s_CurList.Tracks) //Have we just deleted the last track on the list?
    {
        if(s_CurList.Tracks > 0)    //Are there atleast one track left
            Playlist_SelectItem(s_iSelected-1);  //Select the previous track.
        else
            s_iSelected = -1;  //Nobody is selected.
    }
    Playlist_UpdateDisplay(iTrackNumber, s_CurList.Tracks)
    Playlist_SetButtonStates();
}
 
 function Playlist_RepeatTrack(iTrackNumber)
 {
    if(iTrackNumber == -1) //If no one is selected, just return.
        return;
        
    if(s_CurList.Type == 1)     //Check for Music playlist
    {
        var fileName = s_CurList.GetTrackProperty(iTrackNumber, "Filename");
        s_CurList.InsertTrack(fileName, iTrackNumber+1);
    }
    else
    {
        if(s_CurList.Type == 0)
        {
            //For CD playlists we need to enter the track number instead of filename
         	var OriginalTrack = s_CurList.GetTrackProperty(iTrackNumber, "WM/Track");
	        s_CurList.InsertTrack(OriginalTrack, iTrackNumber+1);
        }
    }
    
    s_fDirty = true;
        
    Playlist_UpdateDisplay(iTrackNumber+1, s_CurList.Tracks-1)
    //No need to change the current selection.
    Playlist_SetButtonStates();
}
 
 function Playlist_MoveUp(iTrackNumber)
 {
    if(iTrackNumber > 0)
    {
        s_CurList.MoveTrack(iTrackNumber, iTrackNumber-1);
        s_fDirty = true;
        Playlist_SelectItem(iTrackNumber-1);
        Playlist_UpdateDisplay(iTrackNumber-1, iTrackNumber);
    }    
 }
 
 function Playlist_MoveDown(iTrackNumber)
 {
    if(iTrackNumber == -1)
        return;
        
    if(iTrackNumber < (s_CurList.Tracks-1))
    {
        s_CurList.MoveTrack(iTrackNumber, iTrackNumber+1);
        s_fDirty = true;
        Playlist_SelectItem(iTrackNumber+1);
        Playlist_UpdateDisplay(iTrackNumber, iTrackNumber+1);
    }
 }
 
//This function changes the selection to the new elem passed in and changes the
// value of s_iSelected to the new item.
function Playlist_SetSelection(elm)
{
        if (s_iSelected != -1)
        {
            var elemOld = document.all.item("ITEM" + (s_iSelected + 1));
            if(elemOld)
                elemOld.className = "ListItem";
            else
                alert("Track Item #"+(s_iSelected+1)+"is not found!");
            s_iSelected = -1;
        }
        if (elm.className == "ListItem")
        {
            elm.className = "ListItemSel";
            s_iSelected =  parseInt(elm.id.slice(4)) - 1; //This is zero based!
        }
        
        Playlist_SetButtonStates();
}

function Playlist_OnClick()
{
    var elm = window.event.srcElement; //Find the item where the click occurred.
   
    Playlist_SetSelection(elm);     //Select it.
}

// Pass in the zero based index of the new item to be selected.
function Playlist_SelectItem(iNewItem)
{
    //Find the element of the new item to be selected.
    var elm = document.all.item("ITEM" + (iNewItem + 1));
    Playlist_SetSelection(elm);   //Select the new element.
}
