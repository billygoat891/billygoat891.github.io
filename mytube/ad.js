function main()
{
    var urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has('video'))
    {
        document.write('<head><meta http-equiv="refresh" content="1; URL=index.html" /></head>');
        return;
    }

    var videoUrlDecoded = urlParams.get('video').trim();
    var vembed = document.getElementById('vembed');
    vembed.setAttribute("src", `https://youtube.com/embed/${videoUrlDecoded}`);
}

main();
