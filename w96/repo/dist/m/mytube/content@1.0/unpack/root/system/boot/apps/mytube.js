function main(argv) {
	
	const wnd = u96.ui.wnd({
		title: "mytube",
        html: "<center><h1>Loading...</h1></center>" + argv.toString()   
    
	});
	
    wnd.setHtml(`<iframe src="https://billygoat891.github.io/mytube/mytube.html" height="100%" width="100%" title="MyTube"></iframe>`)

	wnd.show();
}

// Register app

/*
 Arg 1: App name
 Arg 2: File associations
 Arg 3: Main function
*/
registerApp("mytube", [], main);
u96.shell.mkShortcut("c:/system/programs/Entertainment/mytube.link", "mytube", "mytube");

