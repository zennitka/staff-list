const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId, guildId } = require('../my_config.json');

function getCommandFiles(dir, commandFiles = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getCommandFiles(filePath, commandFiles);
        } else if (file.endsWith('.js')) {
            commandFiles.push(filePath);
        }
    }
    return commandFiles;
}

const commandFiles = getCommandFiles(path.join(__dirname, '../commands'));
const currentCommands = [];

for (const file of commandFiles) {
    const command = require(path.resolve(file));
    if (command.data && command.data.name) {
        currentCommands.push(command.data.name);
    }
}

console.log('Current commands:', currentCommands);

async function cleanUpCommands() {
    const rest = new REST({ version: '10' }).setToken(token);

    try {
        const guildCommands = await rest.get(
            Routes.applicationGuildCommands(clientId, guildId)
        );

        for (const command of guildCommands) {
            if (!currentCommands.includes(command.name)) {
                await rest.delete(
                    Routes.applicationGuildCommand(clientId, guildId, command.id)
                );
                console.log(`Deleted guild command: ${command.name}`);
            }
        }

        const globalCommands = await rest.get(
            Routes.applicationCommands(clientId)
        );

        for (const command of globalCommands) {
            if (!currentCommands.includes(command.name)) {
                await rest.delete(
                    Routes.applicationCommand(clientId, command.id)
                );
                console.log(`Deleted global command: ${command.name}`);
            }
        }

        console.log('Command cleanup complete.');
    } catch (error) {
        console.error('Error while cleaning up commands:', error);
    }
}

cleanUpCommands();
