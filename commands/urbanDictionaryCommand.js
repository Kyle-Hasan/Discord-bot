const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
//command for searching up word on urban dictionary
module.exports = {
    data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("looks up definition of a word on urban dictionary")
    .addStringOption((option) => 
        option.setName('word').setDescription('word to get definition of')
        .setRequired(true),
    ),
    

    
    async execute(interaction){
        //creates query used inputted word
        const term = interaction.options.getString('word')
        const query = new URLSearchParams({ term });
       
       
       
        try{
             //gets information about word from urban dictionary api and converts it into json
            const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
            console.log(list)
            console.log(`https://api.urbandictionary.com/v0/define?${query}`)
            //if the list returns nothing or is empty, early exits function
            if(!list){
                interaction.reply("Can't find that word")
                return
            }
            //trims string if it's too large for embed
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            //puts first thing in list into answer
            const [answer] = list;
            //creates embed with information about first thing in list
            const embed = new MessageEmbed()
	        .setColor('#EFFF00')
	        .setTitle(term)
	        .setURL(answer.permalink)
	        .addFields(
		    { name: 'Definition', value: trim(answer.definition, 1024) },
		    { name: 'Example', value: trim(answer.example, 1024) },
		    { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
	          );

            interaction.reply({ embeds: [embed] });
        
        }
        catch(error){
            console.log(error)
            await interaction.reply(`can't find that word `)
        }

    }



}