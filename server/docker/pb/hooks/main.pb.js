onAfterBootstrap((e) => {
  console.log("App initialized!");
});

// const Discord = require(`${__hooks}/discord.js`);
//     const secrets = require(`${__hooks}/secrets.js`);
//     const webhook = new Discord(secrets.adminWebhook);
//     webhook.send("API endpoint test");

// when a user registers on the platform
onModelAfterCreate(
  (e) => {
    try {
      const table = e.model.tableName();
      const record = e.baseModelEvent.model;
      const Discord = require(`${__hooks}/discord.js`);
      const secrets = require(`${__hooks}/secrets.js`);
      const webhook = new Discord(secrets.adminWebhook);
      switch (table) {
        case "users":
          const user = e.model;
          webhook.send(
            "User registration",
            `**${user.email()}** has registered.`,
            `${secrets.baseURL}/users/${user.id}>`
          );
          break;
        case "posts":
          // TODO: format this better
          webhook.send(
            "Post creation",
            `**[${record.get("author")}](${secrets.baseURL}/users/${record.get(
              "author"
            )})** has created a new post titled \`${record.get(
              "title"
            )}\`\n> ${record.get("content")}`,
            `${secrets.baseURL}/posts/${record.get("id")}`
          );
          break;
        case "comments":
          webhook.send(
            "Comment creation",
            `**[${record.get("author")}](${secrets.baseURL}/users/${record.get(
              "author"
            )})** commented: \`\`\`\n${record.get("content")}\`\`\``,
            `${secrets.baseURL}/posts/${record.get("post")}#${record.get("id")}`
          );
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
  "users",
  "posts",
  "likes",
  "comments"
);

onModelAfterDelete(
  (e) => {
    const record = e.baseModelEvent.model;
    const Discord = require(`${__hooks}/discord.js`);
    const webhook = new Discord(secrets.adminWebhook);
    try {
      const secrets = require(`${__hooks}/secrets.js`);
      const table = e.model.tableName();
      switch (table) {
        case "posts":
          webhook.send(
            "Post deletion",
            `**[${record.get("author")}](${secrets.baseURL}/users/${record.get(
              "author"
            )})** has deleted their post titled \`${record.get(
              "title"
            )}\`\n> ${record.get("content")}`,
            secrets.baseURL
          );
          break;
        case "comments":
          webhook.send(
            "Comment deletion",
            `**[${record.get("author")}](${secrets.baseURL}/users/${record.get(
              "author"
            )})** commented: \`\`\`\n${record.get("content")}\`\`\``,
            secrets.baseURL
          );
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
  "comments",
  "posts"
);

// after successful login attempt
// TODO: make login attempts finite (w/ redis)
// onRecordAfterAuthWithPasswordRequest((e) => {
//     console.log(e.httpContext)
//     console.log(e.record)
//     console.log(e.identity)
//     console.log(e.password)
// })
