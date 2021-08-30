const { SlashCommandBuilder } = require('@discordjs/builders');
//this an example command file, every command file should follow a similar structure

//exports an object with a data property and execute function
module.exports = {
	data: new SlashCommandBuilder()
		.setName('bruh')
		.setDescription('Replies with Miku Nakano')
		.addStringOption((option) => 
        //syntax to make a command that requires the user to enter a string with 2 choices
		option.setName('input').setDescription('Enter a string')
		.setRequired(true)
		.addChoice("joe", "mama")
		.addChoice("choice", "results")

		)
		//optional input for user
		.addUserOption((option) => 
			option.setName('target').setDescription('Select a user')),
		
	async execute(interaction) {
        //you need to put this interation.reply in every command
		await interaction.reply('Miku Nakano');
		const string = interaction.options.getString('input')
        //gets the values the user inputted
		const user = interaction.options.getUser('target')
		const member = interaction.options.getMember('target');
	

console.log(`user ${user.username} and string ${string} and ${member.id}`);
	},
}