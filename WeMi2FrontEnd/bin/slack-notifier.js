
const { IncomingWebhook } = require('@slack/webhook');
const shell = require('shelljs');

(async() => {
  const webhookUrl = 'https://hooks.slack.com/services/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';
  // Creates the slack sender.
  const slackSender = new IncomingWebhook(webhookUrl);

  const [ gitlabVersion, gitlabPrevVersion ] = process.argv.slice(2);
  const gitlabChangelog = shell.exec(`git log --pretty=format:">• %h - %s" --abbrev-commit --no-merges v${gitlabPrevVersion}..v${gitlabVersion}`);

  // Setting up the slack options to notify the new release.
  const slackOptions = {
    attachments: [
      {
        color: 'good',
        author_name: 'Dev Team - WeMi',
        title: 'Release Candidate :dealwithit-parrot:',
        title_link: `https://us-south.git.cloud.ibm.com/rimoldi/WeMI2.0CdM/-/tags/${gitlabVersion}`,
        text: gitlabChangelog,
        fields: [
          {
            title: 'Version',
            value: `${gitlabVersion} :wave:`,
            short: true
          },
          {
            title: 'Release',
            value: `https://us-south.git.cloud.ibm.com/rimoldi/WeMI2.0CdM/-/tags/${gitlabVersion}`,
            short: true
          }
        ]
      }
    ]
  };

  // Notifies to Slack.
  await slackSender.send(slackOptions);
})();
