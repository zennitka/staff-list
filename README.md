Here's a structured guide for your GitHub repository to help users set up and run your Discord bot:

---

# Discord Bot Setup Guide

Welcome to the Discord bot repository! This guide will walk you through setting up and running the bot.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- A Discord bot token (from the [Discord Developer Portal](https://discord.com/developers/applications))
- Access to the bot's `my_config.json` configuration file

## 1. Clone the Repository

To get started, clone this repository to your local machine:
```bash
git clone https://github.com/your-username/your-bot-repo.git
cd your-bot-repo
```

## 2. Install Dependencies

Navigate to the bot's directory and install dependencies with:
```bash
npm install
```

## 3. Set Up Configuration

In the root directory, create a `my_config.json` file and add the following configuration:
```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "clientId": "YOUR_CLIENT_ID_HERE",
  "guildId": "YOUR_GUILD_ID_HERE",
  "sub_type": {
    "Глава проекта": "ROLE_ID",
    "Куратор": "ROLE_ID",
    ...
  },
  "own_type": {
    "Основной персонал проекта": [
      "Глава проекта",
      "Куратор",
      ...
    ],
    ...
  },
  "own_color": {
    "Основной персонал проекта": "#E1004C",
    ...
  },
  "own_image": {
    "Основной персонал проекта": "URL_TO_IMAGE",
    ...
  },
  "own_sub": {
    "Основной персонал проекта": null,
    ...
  },
  "channel_id": "YOUR_CHANNEL_ID_HERE"
}
```

Replace `"YOUR_BOT_TOKEN_HERE"`, `"YOUR_CLIENT_ID_HERE"`, and `"YOUR_GUILD_ID_HERE"` with your bot's information from the Discord Developer Portal.

## 4. Run the Bot

Start the bot with:
```bash
node bot.js
```

The bot should now be running! You should see a message in the console saying, "Ready! Logged in as [Bot Username]".

## Commands & Events

- **Commands**: Add command files in the `commands` folder. Each command should have `data` and `execute` properties.
- **Events**: Add event files in the `events` folder to handle Discord events like `messageCreate` or `guildMemberAdd`.

## Troubleshooting

- Ensure that your bot token is correct and that the bot has permissions in your Discord server.
- Check that all required files (`my_config.json`, command files, event files) are properly set up.

For further assistance, feel free to create an issue or reach out to the contributors.

---

Feel free to customize this guide according to your specific setup and requirements!
