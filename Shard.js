const { ShardingManager } = require('discord.js');
const config = require('./src/botconfig/principal.json')

const manager = new ShardingManager('./src/index.js', { token: config.token});
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();

