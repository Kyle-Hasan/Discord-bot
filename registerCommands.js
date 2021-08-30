const { SlashCommandBuilder } = require('@discordjs/builders');
//REST is discord's rest api where we send our commands
const { REST } = require('@discordjs/rest');
//routes is used to the URI we send the commands to in the rest API
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')
require('dotenv').config()
//gets all the .js files in the commands directory
const commandFiles = fs.readdirSync('./commands').filter((file)=> file.endsWith('.js'))

const commands = []

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
//changes the command data to json to send to discord api and pushes to array(we need to send json data to discord's rest API)
//this array is sent to the discord api
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	
}
console.log(`commands files are ${commandFiles.toString()}`)

async function register () {
	try{
		//routes gets the URI for the client and guild, puts the commands inside the specified URI in discord's rest API
		await rest.put(Routes.applicationGuildCommands(process.env.clientId,process.env.guildId), {
			body: commands
		})

	}

	catch(error){
		console.log(error)
		console.log("couldnt register")
	}


}
register()