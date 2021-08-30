//contains all the shared variables for the Music player
const ytdl = require('ytdl-core');
const {
createAudioPlayer,
	
} = require('@discordjs/voice');
module.exports = {
    
    connection: undefined,
    
    stream : undefined,
    resource : undefined,
    player : createAudioPlayer(),
    queue : [],




}