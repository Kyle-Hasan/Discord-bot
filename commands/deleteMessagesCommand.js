const {SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("purges up to 100 messages")
    .addIntegerOption((option) => 
    option.setName('delete_amount')
    .setDescription('number of messages to delete(max 100)')
    .setRequired(true)
),
async execute(interaction){
    try{
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        await interaction.reply("You don't have permission for that")
        return;
    }
    let numMessages = interaction.options.getInteger('delete_amount')
    //bulk delete method can only delete 100 messages at a time, so if the user inputs
    //a number over 100, it is automatically set to 100
    if(numMessages >100){
        numMessages = 100
    }
    //if the user puts 0 or a negative number, function early returns and replies without deleting any messages
    if(numMessages <= 0){
      await  interaction.reply("Invalid number of messages")
      return;
    }
    await interaction.channel.bulkDelete(numMessages)
    await interaction.reply(`deleted ${numMessages} messages`)
}
catch(error){
    console.log(error)
}
    

}




}