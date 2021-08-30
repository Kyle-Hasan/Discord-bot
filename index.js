const {Client,Intents,Collection,Snowflake}= require('discord.js')
 require('dotenv').config()
 const fs = require('fs')
 const MusicConnection = require('./MusicConnection.js')
 //only hads .js files to array of commandFiles
 const commandsFiles = fs.readdirSync('./commands').filter(file=> file.endsWith('.js'))
const client = new Client({
    intents :[
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
        

    ]
})
//a collection is a part of discord js. It extends the map class from javascript and adds additional functionality. 
//first collection in array is to store non music commands, second colleciton is to store music commands
client.commands = [new Collection(), new Collection()]

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
//sets the key of each entry to the client.commands to be the command name, the actual command object is the value
for(const file of commandsFiles){
    const command = require(`./commands/${file}`)
    //puts the music and non music commands in different maps. This is because the music commands need to grouped
    //together with share resources(player, stream) to interact with each other while the non music commands do not

    if(!file.startsWith("Music")){
    console.log("registering non music command ")
    client.commands[0].set(command.data.name,command)
    }
    else{
        console.log("registering music command")
        client.commands[1].set(command.data.name, command)
        console.log("Music".concat(command.data.name))
    }
}

//turns on event listener for starting up bot
client.on("ready", ()=> console.log("ready to go"))

client.login(process.env.TOKEN, (err,token)=>{
    if(err){
        console.log("COULD NOT LOG IN ")
    }
    else{
        console.log(`token is ${token}`)
    }
})

//turns on event listener for seeing messages sent to channels
client.on("messageCreate", (message)=> {
    
    
})



async function print(){
let r = await client.guilds.fetch(process.env.guildId)
r.shardId = (process.env.guildId >> 22) % 1
console.log(r)

}
print()
//maps the guildID to it's respective MusicConnection if a voice connection exists in that guild
const MusicConnections = new Map(Snowflake, MusicConnection);
let MusicCommand = false
//creates event listener and handler for slash commands
//read more about the interaction object on the documentation for discords api
client.on('interactionCreate', async (interaction)=>{

     //makes sure that the interation is actually a command
    if(!interaction.isCommand()){
        return
    }
    //tries to see if the command is a non music command first
    let command = client.commands[0].get(interaction.commandName)
    MusicCommand = false
   //if it's not a non music command, tries to find it in the non music commands map(this is done in order to make sure
   // onlt registered commands are handled), otherwise errors could occur
    if(!command){
        command = client.commands[1].get(interaction.commandName)

        if(command){
            MusicCommand = true
        }
        //if it's not a music or non music command, then it doesn't exist and therefore doesn't need to be handled
        //further
        else{
            console.log("command doesnt exist")
            interaction.reply("This command doesnt exist")
            return 
        }
    }
    try {
        console.log(`running command with name ${interaction.commandName}`)
        //runs the execute function in the command object(every non music command should have one)
        if(MusicCommand == false ){
        await command.execute(interaction)
        }

        //handles music commands differently in order to group related music resources
        else{
            console.log("Music command playing")
            let musicConnection = MusicConnections.get(interaction.guild.id)
            
            if(!interaction.member.voice.channel){
                await interaction.reply("You need to be in a voice channel.")
                return
             }
            if(interaction.commandName == "play"){
            //creates a musicConnection for guild if it doesn't already exist and saves it
            if(!musicConnection){
                musicConnection = new MusicConnection(interaction)
                MusicConnections.set(interaction.guild.id,musicConnection)
            }
            musicConnection.enqueue(interaction)
        }
        //skip, pause , unpause and clear_queue commands can only be used if something is playing
        //aka a musicConnection exists
            else if(musicConnection){
                switch(interaction.commandName){
                    case "skip":
                        musicConnection.skip(interaction)
                        break
                    case "pause":
                        musicConnection.pause(interaction)
                        break
                    case "unpause":
                        musicConnection.unpause(interaction)
                        break
                    case "clear_queue":
                        musicConnection.clear(interaction)
                        break
                    }

            }
            
            else{
                interaction.reply("There's nothing playing")
            }
        /**else if(interaction.commandName == "skip" && musicConnection){
            musicConnection.skip(interaction)
        }
        else if(interaction.commandName == "pause" && musicConnection){
            musicConnection.pause(interaction)
        }
        else if(interaction.commandName == "unpause" && musicConnection){
            musicConnection.unpause(interaction)
        }
        else if(interaction.commandName == "clear_queue" && musicConnection){
            musicConnection.clear(interaction)
        }**/

        }
    }
    catch(error){
        console.log("index error")
        console.log(error)
    }
})