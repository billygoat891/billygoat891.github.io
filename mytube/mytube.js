function main()
{
    var urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has('video'))
    {
        document.write('invalid video<br><br><a href="mytube.html">go home</a>');
        return;
    }

    var videoUrlDecoded = urlParams.get('video').trim();
    var vtitle = document.getElementById('videotitle');
    vtitle.innerText = urlParams.get('title');
    var vembed = document.getElementById('vembed');
    vembed.setAttribute("src", `https://youtube.com/embed/${videoUrlDecoded}`);
}

main();