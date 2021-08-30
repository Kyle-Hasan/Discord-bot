const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');




module.exports = {
    data: new SlashCommandBuilder()
    .setName("user_info")
    .setDescription("gets info on a user")
    .addUserOption((option) => 
        option.setName('target').setDescription('Select a user')
        .setRequired(true),
    ),
    async execute(interaction){
        const member = interaction.options.getMember('target')
        const user = member.user
        let rolesArray = []
        //fills array of target member's roles(only members can have roles, users can't)
        for (let role of member.roles.cache.values()){
            rolesArray.push(role.name)
            console.log(role.name)
        }
        
        
        try{
            //creates embed
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user.username}`)
            
            
            .setDescription(`Info on <@${user.id}>`)
            //adds user information on embed
            .addFields(
                { name: 'Username', value: `${user.username}`, inline: true },
               
                { name: 'Tag', value: `${user.tag}`, inline: true },
                { name: 'Created at', value: `${user.createdAt}`, inline: true },
            )
            .addFields(
                {name : 'Is this user a bot? ', value: `${user.bot}`, inline : true},
                {name : 'Joined server at ', value : `${member.joinedAt}`, inline : true},


            )
            .addField('Roles ' , `${rolesArray}`)
            .setImage(user.displayAvatarURL())
            .setTimestamp()
            

        
        await interaction.reply({embeds : [exampleEmbed]})
        
        }
        catch(error){
            console.log(error)
            console.log(typeof(user))
            await interaction.reply(`you can't get info on  <@${user.id}>  `)
        }

    }



}