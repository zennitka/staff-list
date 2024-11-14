const { Events, EmbedBuilder, Client, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { guildId } = require('../my_config.json');

function loadConfig() {
    const configPath = path.resolve(__dirname, '../config.json');
    try {
        const configData = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('Ошибка при чтении config.json:', error);
        return null;
    }
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            let config = loadConfig();
            if (!config) {
                console.error('Конфигурация не загружена. Завершение работы.');
                return;
            }

            const { channel_id, sub_type, own_type, own_color, own_image, own_sub } = config;

            const guild = await client.guilds.fetch(guildId);
            if (!guild) {
                console.error(`Гильдия с ID ${guildId} не найдена.`);
                return;
            }

            console.log(`Успешно получена гильдия: ${guild.name}`);

            const roles = await guild.roles.fetch();
            if (!roles) {
                console.error('Не удалось получить роли гильдии.');
                return;
            }

            console.log(`Количество ролей в гильдии: ${roles.size}`);

            let members = new Collection(); // Используем Collection для хранения участников

            async function fetchAllMembers() {
                let lastMemberId = null;

                while (true) {
                    const fetchedMembers = await guild.members.list({ limit: 1000, after: lastMemberId });

                    if (fetchedMembers.size === 0) {
                        break; // No more members to fetch
                    }

                    fetchedMembers.forEach(member => {
                        members.set(member.id, member);
                    });

                    lastMemberId = fetchedMembers.last().id;
                }
            }

            await fetchAllMembers(); // Получаем всех участников при инициализации

            console.log(`Количество участников в гильдии: ${members.size}`);

            if (!sub_type || typeof sub_type !== 'object') {
                console.error('Конфигурация sub_type некорректна или не определена.');
                return;
            }

            let embeds = [];

            function createEmbeds() {
                embeds = [];

                for (const typeName in own_type) {
                    if (Object.hasOwnProperty.call(own_type, typeName)) {
                        const typeRoles = own_type[typeName];
                        let typeDescription = '';

                        for (const roleName of typeRoles) {
                            const roleId = sub_type[roleName];

                            if (roleId) {
                                const subRoleId = own_sub[typeName];

                                const roleMembers = members.filter(member =>
                                    member.roles.cache.has(roleId) &&
                                    (!subRoleId || member.roles.cache.has(subRoleId))
                                );

                                if (roleMembers.size > 0) {
                                    const userMentions = roleMembers.map(member => member.user.toString());
                                    const formattedUsers = userMentions.map(user => `• ${user}`).join('\n');
                                    typeDescription += `**${roleName}**\n${formattedUsers}\n\n`;
                                }
                            } else {
                                console.error(`Роль "${roleName}" не найдена в конфигурации sub_type.`);
                            }
                        }

                        if (typeDescription) {
                            const embedColor = own_color[typeName] || 0x0099FF;
                            const embedImage = own_image[typeName] || null;

                            const embed = new EmbedBuilder()
                                .setColor(embedColor)
                                .setTitle(typeName)
                                .setDescription(typeDescription);

                            if (embedImage) {
                                embed.setThumbnail(embedImage);
                            }

                            embeds.push(embed);
                        }
                    }
                }
            }

            async function sendOrEditEmbeds(channel) {
                try {
                    const existingMessages = await channel.messages.fetch({ limit: 10 });

                    const botMessage = existingMessages.find(msg => msg.author.id === client.user.id);

                    if (botMessage) {
                        await botMessage.edit({ embeds: embeds });
                        console.log('Существующее сообщение обновлено.');
                    } else {
                        await channel.send({ embeds: embeds });
                        console.log('Отправлено новое сообщение с embeds.');
                    }
                } catch (error) {
                    console.error('Ошибка при отправке или изменении сообщения:', error);
                }
            }

            createEmbeds();

            const channel = await client.channels.fetch(channel_id);
            if (!channel) {
                console.error(`Канал с ID ${channel_id} не найден.`);
                return;
            }

            console.log(`Канал успешно получен: ${channel.name}`);

            await sendOrEditEmbeds(channel);

            async function updateMembersAndRoles() {
                try {
                    await fetchAllMembers(); // Обновляем список участников

                    console.log('Список участников и их ролей обновлен.');

                    config = loadConfig();
                    if (!config) {
                        console.error('Ошибка при обновлении конфигурации. Используется старая конфигурация.');
                    } else {
                        console.log('Конфигурация успешно обновлена.');
                    }

                    createEmbeds();
                    await sendOrEditEmbeds(channel);
                } catch (error) {
                    console.error('Ошибка при обновлении списка участников и их ролей:', error);
                }
            }

            updateMembersAndRoles(); // Initial update

            const updateInterval = 10 * 60 * 1000;

            setInterval(() => {
                updateMembersAndRoles();
            }, updateInterval);

        } catch (error) {
            console.error('Ошибка во время выполнения команды:', error);
        }
    }
};
