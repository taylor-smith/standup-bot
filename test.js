const dotenv = require("dotenv");

try {
  dotenv.config();
} catch (err) {
  // noop
}

const CloudFunctions = require("./index");

(async () => {
  await CloudFunctions.SendStandup(getTestPubsubPayload());
})();

function getTestPubsubPayload() {
  const data = {};

  // two layers of "data" properties becausez of the way google pubsub delivers a message.
  // we put a "data" property in the payload itself, so ignore how weird this looks.
  return {
    messageId: "abcd-123-abcdef-567-abcc",
    data: Buffer.from(JSON.stringify({ data })).toString("base64")
  };
}
