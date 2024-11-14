const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Sends you links to all servers the bot is in.'),
    async execute(interaction) {
        if (!interaction.user.id === '694104863600148534') {
            await interaction.reply('You do not have permission to use this command.');
            return;
        }

        const serverLinks = [];
        const guilds = interaction.client.guilds.cache;

        for (const [guildId, guild] of guilds) {
            try {

                if (guild.members.me.permissions.has(PermissionsBitField.Flags.CreateInstantInvite)) {
                    let channel = guild.channels.cache.find(ch => ch.type === 'GUILD_TEXT' && ch.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.CreateInstantInvite));

                    if (!channel) {
                        channel = guild.channels.cache.filter(ch => ch.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.CreateInstantInvite)).first();
                    }

                    // Create the invite and add it to the serverLinks array
                    if (channel) {
                        const invite = await channel.createInvite({ maxAge: 0, maxUses: 1 });
                        serverLinks.push(`${guild.name}: ${invite.url}`);
                    } else {
                        serverLinks.push(`${guild.name}: No channel available for creating an invite.`);
                    }
                } else {
                    serverLinks.push(`${guild.name}: Missing 'Create Instant Invite' permission.`);
                }
            } catch (error) {
                console.error(`Could not create invite for guild ${guild.name}:`, error);
                serverLinks.push(`${guild.name}: Error creating invite.`);
            }
        }

        if (serverLinks.length > 0) {
            await interaction.reply(`Here are the invite links for the servers the bot is in:\n${serverLinks.join('\n')}`);
        } else {
            await interaction.reply('The bot is not in any servers or no invite links could be generated.');
        }
    },
};
