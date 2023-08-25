// const request = require("request");

module.exports = class Discord {
  /**
   *
   * @param {string} webhookURL Discord webhook url
   */
  constructor(webhookURL) {
    this.username = "Bytebound Admin";
    this.webhookURL = webhookURL;
  }
  /**
   * @param {string} title
   * @param {string} content
   * @param {URL | string} url
   */
  send(title, content, url) {
    const payload = {
      username: this.username,
      embeds: [
        {
          type: "rich",
          title,
          description: this.truncate(content),
          color: 0x277222,
          url,
        },
      ],
    };
    return $http.send({
      url: this.webhookURL,
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
      timeout: 60,
    });
  }
  truncate(str, n = 1300) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }
};
