const TorrentStream = require('torrent-stream');
const fs = require('fs');

const movieList = require('./model/Movie');
// const FfmpegCommand = require('fluent-ffmpeg');
//
// const command = new FfmpegCommand();

// var express = require('express'),
//     ffmpeg = require('../index');
//
// var app = express();
//
// app.use(express.static(__dirname + '/flowplayer'));
//
// app.get('/', function(req, res) {
//     res.send('index.html');
// });
//
// app.get('/video/:filename', function(req, res) {
//     res.contentType('flv');
//     // make sure you set the correct path to your video file storage
//     var pathToMovie = '/path/to/storage/' + req.params.filename;
//     var proc = ffmpeg(pathToMovie)
//     // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
//         .preset('flashvideo')
//         // setup event handlers
//         .on('end', function() {
//             console.log('file has been converted succesfully');
//         })
//         .on('error', function(err) {
//             console.log('an error happened: ' + err.message);
//         })
//         // save to stream
//         .pipe(res, {end:true});
// });
//
// app.listen(4000);

// const magnet = 'magnet:?xt=urn:btih:1d82c75adef98fc3f44bc39f2a9c8f94dfb6e6b0&dn=Thor.Ragnarok.2017.720p.TS.x264.DUBLADO-.mp4&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969'
const magnet = 'magnet:?xt=urn:btih:3F282BA4754263BC746C684EB73A8C7E1D49D160&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337&tr=udp://tracker.intenetriors.net:13'
const opts = {
    // connections: 100,     // Max amount of peers to be connected to.
    // uploads: 10,          // Number of upload slots.
    tmp: 'streams',          // Root folder for the files storage.
    // Defaults to '/tmp' or temp folder specific to your OS.
    // Each torrent will be placed into a separate folder under /tmp/torrent-stream/{infoHash}
     path: 'streams/', // Where to save the files. Overrides `tmp`.
    // verify: true,         // Verify previously stored data before starting
    // Defaults to true
    // dht: true,            // Whether or not to use DHT to initialize the swarm.
    // Defaults to true
    // tracker: true,        // Whether or not to use trackers from torrent file or magnet link
    // Defaults to true
    // trackers: [
    //     'udp://tracker.openbittorrent.com:80',
    //     'udp://tracker.ccc.de:80'
    // ],
    // Allows to declare additional custom trackers to use
    // Defaults to empty
    // storage: myStorage()  // Use a custom storage backend rather than the default disk-backed one
};

const downloadTorrent = (magnet) => {
    return new Promise((resolve, reject) => {
        const Download = TorrentStream(magnet, opts);
        Download.on('ready', () => {

            // console.log("dffaegraergaesrgaeshrwsyjtrsthrsthrshrshtsryjetyjetyjndtyjdtjydtyjdtyjdtyjdtyjdtyjdtyjdjty");
            // console.log(Download.files[1]);
            // console.log("FINdffaegraergaesrgaeshrwsyjtrsthrsthrshrshtsryjetyjetyjndtyjdtjydtyjdtyjdtyjdtyjdtyjdtyjdjty");
            file = Download.files[1];
        //    Download.files.forEach(function (file) {
                // console.log('filename: da', file.name);
                console.log('filename: da', file.path);

                try{
                // if (file.path && file.path != "")
                if (fs.existsSync("/stream/"+file.path)) 
                var stream = fs.createReadStream("/streams/"+file.path);
                else
                var stream = file.createReadStream();
                } catch(err) {
                    console.log("c'est pas bon, c'est meme faux")
                // var stream = file.createReadStream();
                }
                // if (file.path && file.path != "")
                // var stream = fs.createReadStream("streams/"+file.path);
                // else
                // var stream = file.createReadStream();

//                console.log("----------------------------------------------------------------------------------------------------------");
  //              console.log(stream);
    //            console.log("----------------------------------------------------------------------------------------------------------");


                resolve({200: stream});

                // const writer = fs.createWriteStream(filePath);
        //    });
        });

        Download.on('download', () => {
            console.log(Download.swarm.downloaded);
        });

        Download.on('idle', () => {
            // resolve({200: 'OK'});
            Download.destroy();
            movieList.findOrCreate({})
        });
    })
};

module.exports = downloadTorrent;

// downloadTorrent(magnet)

//     .then(res => {
//         console.log(res)
//     }).catch(err => {
//     console.log(err)
// });