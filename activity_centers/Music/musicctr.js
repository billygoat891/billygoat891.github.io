var L_NewTrack_Text =       "Track ";
var L_Percent_Text =        "%";
var L_Done_Text =           "Done";
var L_Cancelled_Text =      "Cancelled";
var L_Failed_Text =         "Failed";
var L_DurationFormat_Text = "%1:%2";
var L_Unknown_Text =        "Unknown";
var L_Colon_Text =          ":";
var L_Period_Text =         ".";
var L_Copyright_Unavailable= "Information unavailable"

function GoToPlace(objTravel, placeTo)
{
    var objPlaces = external.places;
    if (placeTo != objPlaces.currentPlace.name)
    {
        objTravel.persist();
        objTravel.addEntry();
        objPlaces.transitionTo(placeTo);
    }
}

function EnableBackButton(objTravel)
{
    var eleBackText = external.Property("BackText");
    if (eleBackText != null)
    {
        if (objTravel.isEntryValid(-1))
        {
            eleBackText.className = "NavBarItem";
        }
        else
        {
            eleBackText.className = "NavBarItemDisabled";
        }
    }
}

// Use this function to switch between panels
function GoTo(placeNew)
{
    var objTravel = external.travellog;

    if (placeNew == "Back")
    {
        if (objTravel.isEntryValid(-1))
        {
            objTravel.travel(-1);
        }
    }
    else if (placeNew == "Forward")
    {
        if (objTravel.isEntryValid(1))
        {
            objTravel.travel(1);
        }
    }
    else
    {
        GoToPlace(objTravel, placeNew);
    }

    // Enable/disable the Back button
    EnableBackButton(objTravel);

    // Impt: It is necessary to return false here.
    return false;
}

// Use this function to close the music center down
function CloseWindow()
{
    external.window.close();
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
        a(i).dir = event.ctrlKey ? "rtl" : "ltr";
    }
}

function SumOffsetLeft(ele)
{
    var eleParent = ele.offsetParent;

    if (eleParent == null)
    {
        return ele.offsetLeft;
    }
    else
    {
        return ele.offsetLeft + SumOffsetLeft(eleParent);
    }
}

function SumOffsetTop(ele)
{
    var eleParent = ele.offsetParent;

    if (eleParent == null)
    {
        return ele.offsetTop;
    }
    else
    {
        return ele.offsetTop + SumOffsetTop(eleParent);
    }
}

function PositionPlayer()
{
    var x = SumOffsetLeft(Master);
    var y = SumOffsetTop(Master);

    // BUGBUG: panel.x and panel.y return 0 for non-popup panels.  panelNavBar
    // usage should be replaced by the following once this is fixed:
    // var panel = external.panels.panel(ThisPanel);
    //var panelNavBar = external.panels.panel("NavBar");
    //y += panelNavBar.height;

    var panelPlayer = external.panels.panel("Player");
    
    external.panels.lockLayout();
    panelPlayer.moveto(x, y, Master.style.pixelWidth, Master.style.pixelHeight);
    external.panels.unlockLayout();
}

function OnTransitionComplete(placeFrom, placeTo)
{
    var eleNavBarItem = null;
    if (placeTo == "Home")
    {
        eleNavBarItem = "Home";
    }
    else if (placeTo == "CD" || placeTo == "CDRecord")
    {
        eleNavBarItem = "CD";
        var Player = external.Property("Player");
        if (Player != null)
        {
            var nDisk = Player.CurrentCD;
            if (nDisk >= 0)
            {
                OnDiscInserted(nDisk);
                OnPlay();
            }
            else
            {
                OnDiscRemoved(nDisk);
            }
        }
    }
    else if (placeTo == "CD Playlist")
    {
        eleNavBarItem = "CD";
    }
    else if (placeTo == "MusicOnline")
    {
        eleNavBarItem = "MusicOnline";
    }
    else if (placeTo == "InternetRadio")
    {
        eleNavBarItem = "InternetRadio";
    }
    else if (placeTo == "MyMusic" || placeTo == "Import Music" || placeTo == "AutoJukeBox"
            || placeTo == "MusicPlaylist" || placeTo == "SavePlaylist" || placeTo == "ChoosePlaylist"
            || placeTo == "EditPlaylist")
    {
        eleNavBarItem = "MyMusic";
    }

    // Setup the Navbar focus
    if (eleNavBarItem != null)
    {
        var currentNavBarItem = external.Property("currentNavBarItem");
        if (currentNavBarItem != null)
        {
            external.Property(currentNavBarItem).className = "NavBarBlock";
        }
        external.Property(eleNavBarItem).className = "NavBarBlockCurrent";
        external.Property("currentNavBarItem") = eleNavBarItem;
    }
}

function OnNavBarLoad()
{
    external.event.registerSink("Place.TransitionComplete", OnTransitionComplete, true);

    external.Property("Back") = idBack;
    external.Property("Home") = idHome;
    external.Property("CD") = idCD;
    external.Property("MusicOnline") = idMusicOnline;
    external.Property("InternetRadio") = idInternetRadio;
    external.Property("MyMusic") = idMyMusic;
    external.Property("Exit") = idExit;
    external.Property("BackText") = idBackText;

    // Have to enter the starting place into the travel log
    external.travellog.addEntry();
    EnableBackButton(external.travellog);
}

function OnHomePanelLoad()
{
    //HighlightTables();
    window.setTimeout("external.window.maximized = true;", 500);
}

function OnPlayerPanelLoad()
{
    external.Property("Player") = Player;

    external.Property("ACHelp") = ACHelp;

    external.Property("MCHelp") = MCHelp;
}

function OnCDPanelLoad()
{
    //HighlightTables();
    external.Property("eleNoCD") = idNoCD;
    external.Property("eleInvalidCD") = idInvalidCD;
    external.Property("eleNewAlbum") = idNewAlbum;
    external.Property("eleNewTracks") = idNewTracks;
    external.Property("eleTrackInfo") = idTrackInfo;
    
    external.Property("eleAlbumNameHeading") = idAlbumNameHeading;
    external.Property("eleCoverArt") = idCoverArt;
    external.Property("eleCoverArtUnavailable") = idCoverArtUnavailable;
    external.Property("eleSmallAlbum") = idSmallAlbum;
    external.Property("eleSmallArtist") = idSmallArtist;
    external.Property("eleCopyrightText") = idCopyrightText;
}

function OnEjectCD()
{
    var Player = external.Property("Player");
    if (Player != null)
    {
        Player.Eject();
    }
}

function GetTrackNum(eleClicked)
{
    var num = -1;
    var szTrackNew = "idTrackNew"; // Do not localize this.
    
    var idRow = eleClicked.id;
    if (idRow && (idRow.substring(0, szTrackNew.length) == szTrackNew))
    {
        var start = idRow.indexOf(".");
        if (start >= 0)
        {
            var szRowNum = idRow.substring(start + 1, idRow.length);
            if (szRowNum && (szRowNum.length > 0))
            {
                num = parseInt(szRowNum);
                if (isNaN(num))
                {
                    num = -1;
                }
            }
        }
    }
    return num;
}

function OnTrackClick()
{
    var nRow = GetTrackNum(window.event.srcElement);
    if (nRow >= 0)
    {
        var Player = external.Property("Player");
        var nDisk = Player.CurrentCD;
        if (nDisk >= 0)
        {
            Player.CurrentTrack = nRow;
        }
    }
}

function FillNewAlbum(playlist)
{
    var eleNewTracks = external.Property("eleNewTracks");

    var cRows = eleNewTracks.rows.length;
    var i;
    for (i = 0; i < cRows; i++)
    {
        eleNewTracks.deleteRow(0);
    }

    var rowNew;
    var cTracks = playlist.Tracks;
    for (i = 0; i < cTracks; i++)
    {
        rowNew = eleNewTracks.insertRow();
        rowNew.id = "idTrackNew." + i;
        rowNew.className = "trackrow";
        
        // index #
        var cellIndexNo = rowNew.insertCell();
        cellIndexNo.id = "idTrackNewCellIndex." + i;
        cellIndexNo.className = "indexnocolumn";
        cellIndexNo.innerText = (i + 1) + L_Period_Text;

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.id = "idTrackNewCell1Padding." + i;
        cellPaddingTrack.className = "paddingtrackcolumn";

        // track title
        var cellTrackName = rowNew.insertCell();
        cellTrackName.id = "idTrackNewCellName." + i;
        cellTrackName.className = "tracknamecolumn";
        cellTrackName.innerText = L_NewTrack_Text + (i + 1);

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.id = "idTrackNewCell2Padding." + i;
        cellPaddingTrack.className = "paddingtrackcolumn";

        // track duration
        var cellDuration = rowNew.insertCell();
        cellDuration.id = "idTrackNewCellDuration." + i;
        cellDuration.className = "trackdurationcolumn";
        cellDuration.innerText = FormatDurationInfo(playlist.GetTrackProperty(i, "Duration"));

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.id = "idTrackNewCell3Padding." + i;
        cellPaddingTrack.className = "padright";
    }
}


// This function gets the track duration in milliseconds.
// It is converted to Min:Sec format and the given element gets that text.
function FormatDurationInfo(duration)
{
    // track duration is in milliseconds.
    var secsTotal = Math.round(duration / 1000);
    var mins = Math.floor(secsTotal / 60);
    var secs = (secsTotal % 60);
    if (secs < 10)
    {
        secs = "0" + secs;
    }

    var ACHelp = external.Property("ACHelp");
    //ACHelp = null;
    if (ACHelp != null)
    {
        return ACHelp.ACFormatString(L_DurationFormat_Text, mins, secs);
    }
    else
    {
        return mins + L_Colon_Text + secs;
    }
}

function FillTrackInfo(playlist)
{
    var eleAlbumNameHeading = external.Property("eleAlbumNameHeading");
    var eleSmallAlbum = external.Property("eleSmallAlbum");
    var album = playlist.GetProperty("Title");
    eleAlbumNameHeading.innerText = album;
    eleSmallAlbum.innerText = album;

    var eleSmallArtist = external.Property("eleSmallArtist");
    var Player = external.Property("Player");
    var track = Player.CurrentTrack;
    var artist = playlist.GetTrackProperty(track, "Artist");
    eleSmallArtist.innerText = artist;

    var eleCoverArt = external.Property("eleCoverArt");
    var coverArt = playlist.GetProperty("CoverArt");
    var eleCoverArtUnavailable = external.Property("eleCoverArtUnavailable");
    
    if(coverArt == null)
    {
        eleCoverArtUnavailable.style.display = "";
        eleCoverArt.style.display = "none";
    }
    else
    {
        eleCoverArt.src = coverArt;
        eleCoverArt.style.display = "";
        eleCoverArtUnavailable.style.display = "none";
    }

    var eleCopyrightText = external.Property("eleCopyrightText");
    var CopyrightText = playlist.GetProperty("Copyright");
    if(CopyrightText == null)
        CopyrightText = L_Copyright_Unavailable;
    eleCopyrightText.innerText = CopyrightText;
}

function FillCDRecordAlbum(playlist)
{
    var eleNewTracks = external.Property("CDRecord.eleNewTracks");
    var eleAlbumName = external.Property("CDRecord.eleAlbumName");
    var eleArtistName = external.Property("CDRecord.eleArtistName");

    var album = playlist.GetProperty("Title");
    if (album == null)
    {
        album = L_Unknown_Text;
    }
    eleAlbumName.innerText = album;

    var Player = external.Property("Player");
    var track = Player.CurrentTrack;
    var artist = playlist.GetTrackProperty(track, "Artist");
    if (artist == null)
    {
        artist = L_Unknown_Text;
    }
    eleArtistName.innerText = artist;

    var cRows = eleNewTracks.rows.length;
    var i;
    for (i = 0; i < cRows; i++)
    {
        eleNewTracks.deleteRow(0);
    }

    var rowNew;
    var cTracks = playlist.Tracks;
    for (i = 0; i < cTracks; i++)
    {
        rowNew = eleNewTracks.insertRow();
        rowNew.className = "trackrow";
        
        var cellIndexNo = rowNew.insertCell();
        cellIndexNo.className = "indexnocolumn";
        // index #
        cellIndexNo.innerText = (i + 1) + L_Period_Text;

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.className = "paddingtrackcolumn";

        var cellCheckBox = rowNew.insertCell();
        cellCheckBox.className = "checkboxcolumn";
        // check box
        cellCheckBox.innerHTML = "<INPUT ID=idCheck TYPE=CHECKBOX CHECKED VALUE='on'></INPUT>";

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.className = "paddingtrackcolumn";

        var cellTrackName = rowNew.insertCell();
        cellTrackName.className = "tracknamecolumnshort";
        // track title
        var trackName = playlist.GetTrackProperty(i, "Title");
        if (trackName == null)
        {
            trackName = L_NewTrack_Text + (i + 1);
        }
        cellTrackName.innerText = trackName;

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.className = "paddingtrackcolumn";

        var cellDuration = rowNew.insertCell();
        cellDuration.className = "trackdurationcolumn";
        // track duration
        cellDuration.innerText = FormatDurationInfo(playlist.GetTrackProperty(i, "Duration"));

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.className = "paddingtrackcolumn";

        var cellRecordingStatus = rowNew.insertCell();
        cellRecordingStatus.className = "trackrecordstatuscolumn";
        cellRecordingStatus.id = "idRecordingStatus";

        var cellPaddingTrack = rowNew.insertCell();
        cellPaddingTrack.className = "padright";
    }
}

function DoneRecordingAll()
{
    external.Property("Recording") = null;

    var eleNewTracks = external.Property("CDRecord.eleNewTracks");
    if (eleNewTracks)
    {
        var cRows = eleNewTracks.rows.length;
        // If we came here, it means that we are done processing all the tracks.
        // Let's enable them all for input again.
        for (var i = 0; i < cRows; i++)
        {
            var cells = eleNewTracks.rows[i].cells;
            if (cells.length > 0)
            {
                var check = cells[2].children.item("idCheck");
                if (check != null)
                {
                    check.disabled = false;
                }
            }
        }
        // Make the "Start Recording" button available again
        external.Property("CDRecord.buttonStartRecording").style.display = "";
        external.Property("CDRecord.buttonCancelRecording").style.display = "none";
    }
}

function OnStartRecording(indexStart)
{
    external.Property("Recording") = true;
    var fBeganCaching = false;
    var Player = external.Property("Player");
    var nDisk = Player.CurrentCD;
    if (nDisk >= 0)
    {
        external.Property("CDRecord.buttonStartRecording").style.display = "none";
        external.Property("CDRecord.buttonCancelRecording").style.display = "";
        
        var eleNewTracks = external.Property("CDRecord.eleNewTracks");
        var cRows = eleNewTracks.rows.length;
        for (var i = indexStart; i < cRows; i++)
        {
            var cells = eleNewTracks.rows[i].cells;
            if (cells.length > 0)
            {
                var check = cells[2].children.item("idCheck");
                if (check != null)
                {
                    check.disabled = true;
                    if (check.checked)
                    {
                        Player.BeginCacheTrack(nDisk, i, "");
                        fBeganCaching = true;
                        break;
                    }
                }
            }
        }
    }
    if (!fBeganCaching)
    {
        DoneRecordingAll();
    }
}

function OnCancelRecording()
{
    var Player = external.Property("Player");
    Player.CancelCache();

    // Pretend that we just processed the last track.
    external.Property("CDRecord.buttonStartRecording").style.display = "";
    external.Property("CDRecord.buttonCancelRecording").style.display = "none";
    DoneRecordingAll();
}

function OnDiscInserted_CD(nDisk)
{
    var eleNoCD = external.Property("eleNoCD");
    eleNoCD.style.display = "none";

    var eleInvalidCD = external.Property("eleInvalidCD");
    var eleNewAlbum = external.Property("eleNewAlbum");
    var eleTrackInfo = external.Property("eleTrackInfo");

    var Player = external.Property("Player");
    var playlist = Player.GetCDPlaylist(nDisk);
    if ((playlist == null) || (playlist.Type == -1))
    {
        eleNewAlbum.style.display = "none";
        eleTrackInfo.style.display = "none";
        eleInvalidCD.style.display = "";
    }
    else
    {
        eleInvalidCD.style.display = "none";

        var album = playlist.GetProperty("Title");
        if (album == null)
        {
            eleTrackInfo.style.display = "none";
            FillNewAlbum(playlist);
            eleNewAlbum.style.display = "";
        }
        else
        {
            eleNewAlbum.style.display = "none";
            FillTrackInfo(playlist);
            eleTrackInfo.style.display = "";
        }
    }
}

function OnDiscInserted_CDRecord(nDisk)
{
    var eleNoCD = external.Property("CDRecord.eleNoCD");
    eleNoCD.style.display = "none";

    var eleInvalidCD = external.Property("CDRecord.eleInvalidCD");
    var eleNewAlbum = external.Property("CDRecord.eleNewAlbum");

    var Player = external.Property("Player");
    var playlist = Player.GetCDPlaylist(nDisk);
    if ((playlist == null) || (playlist.Type == -1))
    {
        eleNewAlbum.style.display = "none";
        eleInvalidCD.style.display = "";
    }
    else
    {
        eleInvalidCD.style.display = "none";

        if (external.Property("Recording") == null)
        {
            FillCDRecordAlbum(playlist);
        }
        eleNewAlbum.style.display = "";
    }
}

// -----------------------------------
// Event handlers for the media player
// -----------------------------------

function OnDiscInserted(nDisk)
{
    //only update if the player actually switched to this disc, too
    var Player = external.Property("Player");
    var nCurrentCD = Player.CurrentCD;
    if (nDisk == nCurrentCD)
    {
        var placeCurrent = external.places.currentPlace.name;

        if (placeCurrent == "CD")
        {
            OnDiscInserted_CD(nDisk);
        }
        else if (placeCurrent == "CDRecord")
        {
            OnDiscInserted_CDRecord(nDisk);
        }

        var playlist = Player.GetCDPlaylist(nDisk);
        if ((Player.State != 2) && (playlist != null))
        {
            Player.Play();
        }
    }
}

function OnDiscRemoved_CD(nDisk)
{
    var eleNoCD = external.Property("eleNoCD");
    eleNoCD.style.display = "";

    var eleInvalidCD = external.Property("eleInvalidCD");
    eleInvalidCD.style.display = "none";

    var eleNewAlbum = external.Property("eleNewAlbum");
    eleNewAlbum.style.display = "none";

    var eleTrackInfo = external.Property("eleTrackInfo");
    eleTrackInfo.style.display = "none";
}

function OnDownloadDataAvailable(nIdCD)
{
    var Player = external.Property("Player");
    OnDiscInserted(Player.CurrentCD);
}
function OnDiscRemoved_CDRecord(nDisk)
{
    var eleNoCD = external.Property("CDRecord.eleNoCD");
    eleNoCD.style.display = "";

    var eleInvalidCD = external.Property("CDRecord.eleInvalidCD");
    eleInvalidCD.style.display = "none";

    var eleNewAlbum = external.Property("CDRecord.eleNewAlbum");
    eleNewAlbum.style.display = "none";
}

function OnDiscRemoved(nDisk)
{
    var placeCurrent = external.places.currentPlace.name;

    if (placeCurrent == "CD")
    {
        OnDiscRemoved_CD();
    }
    else if (placeCurrent == "CDRecord")
    {
        OnDiscRemoved_CDRecord();
    }
}

function HighlightCurrentTrack()
{
    var Player = external.Property("Player");
    var nDisk = Player.CurrentCD;
    if (nDisk >= 0)
    {
        var playlist = Player.GetCDPlaylist(nDisk);
        
        if ((playlist != null) && (playlist.Type == 0))
        {
            var eleNewAlbum = external.Property("eleNewAlbum");
            var track = Player.CurrentTrack;
            var i;

            if (eleNewAlbum.style.display == "")
            {
                var eleNewTracks = external.Property("eleNewTracks");
                
                for (i = 0; i < eleNewTracks.rows.length; i++)
                {
                    eleNewTracks.rows[i].className = "trackrow";
                }
                eleNewTracks.rows[track].className = "playingtrackrow";
            }
        }
    }
}

function OnRandomPlay()
{
    var MCHelp = external.Property("MCHelp");
    var Player = external.Property("Player");
    var playlist = Player.NewPlaylist;

    if (playlist)
    {
        MCHelp.MCGetRandomPlaylist(playlist);
        Player.Stop();
        Player.SetMusicPlaylist(playlist);
        Player.play();

    }
    return false;       
}

function OnPlay()
{
    var placeCurrent = external.places.currentPlace.name;

    if (placeCurrent == "CD")
    {
        var eleNewAlbum = external.Property("eleNewAlbum");
        if ((eleNewAlbum != null) && (eleNewAlbum.style.display == ""))
        {
            HighlightCurrentTrack();
        }
    }
}

function OnStop()
{
}

function OnTrackChanged(trackNew)
{
    var placeCurrent = external.places.currentPlace.name;

    if (placeCurrent == "CD")
    {
        var eleNewAlbum = external.Property("eleNewAlbum");
        if ((eleNewAlbum != null) && (eleNewAlbum.style.display == ""))
        {
            HighlightCurrentTrack();
        }
    }
}

function OnCDRecordPanelLoad()
{
    //HighlightTables();
    external.Property("CDRecord.eleNoCD") = idNoCD;
    external.Property("CDRecord.eleInvalidCD") = idInvalidCD;
    external.Property("CDRecord.eleNewAlbum") = idNewAlbum;
    external.Property("CDRecord.eleNewTracks") = idNewTracks;
    external.Property("CDRecord.eleAlbumName") = idAlbumName;
    external.Property("CDRecord.eleArtistName") = idArtistName;
    external.Property("CDRecord.buttonStartRecording") = idbuttonStartRecording;
    external.Property("CDRecord.buttonCancelRecording") = idbuttonCancelRecording;
}

function OnCacheProgress(nDisk, nTrack, nPercentComplete)
{
    var placeCurrent = external.places.currentPlace.name;

    if (placeCurrent == "CDRecord")
    {
        var eleNewTracks = external.Property("CDRecord.eleNewTracks");
        eleNewTracks.rows[nTrack].cells[8].innerText = nPercentComplete + L_Percent_Text;
    }
}

function OnCacheComplete(nDisk, nTrack, status)
{
    var eleNewTracks = external.Property("CDRecord.eleNewTracks");
    if (status == 1)
    {
        eleNewTracks.rows[nTrack].cells[8].innerText = L_Done_Text;
        eleNewTracks.rows[nTrack].cells[2].children.item("idCheck").checked = false;
        OnStartRecording(nTrack + 1);
    }
    else
    {
        eleNewTracks.rows[nTrack].cells[8].innerText = L_Cancelled_Text;
    }
}

function OnCacheError(nDisk, nTrack, hr)
{
    var eleNewTracks = external.Property("CDRecord.eleNewTracks");
    eleNewTracks.rows[nTrack].cells[8].innerText = L_Failed_Text;
    OnStartRecording(nTrack + 1);
}

//
// The following function can be used to change the view of the namespace control
// This is called from MyMusic.html and ChoosePl.html
//

function ChangeView(ViewID)
{
    if ((ViewID < NameSpace.CountViewTypes))
    {
        NameSpace.SetViewType(ViewID); 
    }
    return false;       
}

//
// The following function is called whenever a "new" playlist needs to be created.
//
function OnCreateNewPlaylist()
{
    external.Property("fNewPlaylist") = 1;
    return GoTo('MusicPlaylist')
}

