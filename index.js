const axios = require("axios");
const atob = require("atob");

exports.SendStandup = async () => {
  if (!process.env.GITHUB_ACCESS_TOKEN)
    throw new Error("Cannot continue without Github personal access token");
  if (!process.env.GITHUB_USER_NAME) throw new Error("Cannot continue without Github user name");
  if (!process.env.SLACK_WEBHOOK) throw new Error("Cannot continue without Slack webhook");
  const today = new Date()
    .toLocaleDateString("en-US")
    .split("/")
    .join("-");
  console.log(today);
  const githubEndpoint = `${process.env.GITHUB_API_ENDPOINT}/${today}.md`;
  try {
    const ghRes = await axios.get(githubEndpoint, {
      auth: {
        username: process.env.GITHUB_USER_NAME,
        password: process.env.GITHUB_ACCESS_TOKEN
      }
    });
    if (ghRes.data.content) {
      const decodedMd = atob(ghRes.data.content);
      try {
        axios.post(process.env.SLACK_WEBHOOK, {
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*${process.env.YOUR_NAME}'s Standup for ${today}*`
              }
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: decodedMd
              }
            }
          ]
        });
      } catch (e) {
        console.error(`Error posting to Slack`);
        console.error(e);
      }
    } else {
      console.log("No standup today!");
      return;
    }
  } catch (e) {
    console.error("Error fetching github");
    console.error(e);
  }
};
