# suited-standup-bot

_Mornings got you like..._

![girl-crying](https://media.giphy.com/media/iaRxbSsPQV2IU/giphy.gif)

_A somewhat generic Slack message bot...for sending standups. Never forget to submit a standup again!_

To implement this bot you'll need:

* A [Github personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
* A [Slack webhook](https://api.slack.com/incoming-webhooks)
* Something to execute scheduled tasks. I am using Google Cloud Scheduler but it doesn't really matter.
* A Github repository to keep markdown files that the slackbot will pull from.

You'll use a separate GitHub repository to store your markdown files. I keep all mine at the root of the project but you can alter your Github repository location to put them wherever you want.

*Please note that the markdown filenames must be consistent with en-US formatting, except with dashes instead of slashes.*

Examples of filenames that will work:

- 12-25-2019.md
- 3-9-2019.md
- 6-31-2019.md

Examples of filenames that will not work:

- 12/25/2019.md
- 03-09-2019.md
- 06-31-2019.md

Messages must adhere to Slack's message formatting rules and have [limited formatting options](https://api.slack.com/messaging/composing/formatting#basics). In general, things like:
- *bold*
- _italics_
- `lists`

are ok while full-on markdown (headers, etc) are not. Upgrading to Slack's web api would help get around this.


Once you have all these togther, define these env variables:

```
GITHUB_USER_NAME=ThisIsYourGithubUserNameWithAnAccessTokenAssociated
GITHUB_ACCESS_TOKEN=ThisIsTheGithubAccessTokenThatYouCreated
GITHUB_API_ENDPOINT=https://api.github.com/repos/your-name/your-repo/contents
YOUR_NAME=ThisIsTheNameThatGoesInTheStandups
SLACK_WEBHOOK=ThisIsTheSlackWebhookYouCreated
```

Put the function in the cloud, schedule the cloud function to run when you need to report your standup, _et voila!_
