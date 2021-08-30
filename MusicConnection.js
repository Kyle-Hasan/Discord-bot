const ytdl = require('play-dl');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
    VoiceConnectionDestroyedState,
} = require('@discordjs/voice');

//this class is used to make one music connection per server.

class MusicConnection{
    //creates voice connection to the channel the user who used the play command is in
    constructor(interaction){
        this.connection = joinVoiceChannel({ 
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        this.stream = undefined
        this.resource = undefined
        this.queue = []
        this.player = createAudioPlayer()
        this.player.on('stateChange', async  (oldState, newState) => {
            if (newState.status === AudioPlayerStatus.Idle && oldState.status !== AudioPlayerStatus.Idle) {
                // Turn on event listener for seeing when the player goes from non-idle to idle. This state change means that
                //the current song has finished playing.
                // The next song in the queue is then played, if it exists
                //if the queue is empty and the state goes to idle, then the connection can be destroyed since theres no
                //more songs to play
               if(this.queue.length == 0 ){
                   console.log("ending connection")
                   
                   
                   
                   console.log(this.connection._state.status)
               }
               else{
                   //plays next song in queue
                   console.log("next song playing state")
                   console.log(this.queue.toString())
                   await this.playSong()
               }
                
            } 
        });

    }

    async enqueue(interaction){
        //queues up current search query
        try{
        const search = interaction.options.getString('search')
        let yt_info = await ytdl.search(search, { limit : 1 })
        //puts the youtube url of first search result into music queue
        this.queue.push(yt_info[0].url);

        await interaction.reply(`put ${yt_info[0].url} into music queue`)
        //if the audio player is playing something already, returns without played song that was just queued up
        if(this.player.state.status == AudioPlayerStatus.Playing){
            return
        }
       await this.playSong()
    }
    catch(error){
        console.log(error)
    }


}

async playSong() {

    try{
        if(this.queue.length == 0){
            return
        }
        console.log("playing new song")
        //creates new stream from  url
        this.stream = await ytdl.stream(`${this.queue.shift()}`);
                
        this.resource = await createAudioResource(this.stream.stream, {
            inputType : this.stream.type}
        )
        
        //plays resource and puts on the voice connection for the channel        
        this.player.play(this.resource);
        
        this.connection.subscribe(this.player);
        }
        catch(error){
            
            console.log(error)
            
        }
}


async pause(interaction){

    if(this.player.state.status === AudioPlayerStatus.Idle){
        interaction.reply("There's nothing playing")
        return
    }
 this.player.pause()
 interaction.reply("Song has been paused")
}


async unpause(interaction){

    if(this.player.state.status === AudioPlayerStatus.Idle){
        interaction.reply("There's nothing playing")
        return
    }

 this.player.unpause()
 interaction.reply("Song has been unpaused")

}


async clear(interaction){
    if(this.player.state.status === AudioPlayerStatus.Idle){
        interaction.reply("There's nothing playing")
        return
    }

  this.queue = []
  interaction.reply("queue has been cleared")
}


async skip(interaction){
    console.log("hi")
    if(this.player.state.status === AudioPlayerStatus.Idle){
        interaction.reply("There's nothing playing")
        return
    }

    this.player.stop()
   
    interaction.reply("Song has been skipped")

}



}
module.exports = MusicConnection