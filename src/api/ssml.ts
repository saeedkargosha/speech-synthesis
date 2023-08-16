const getSSML = async () => `<speak>
  Here is a number <w role='amazon:VBD'>read</w>
  as a cardinal number:
  <say-as >12345</say-as>.
  Here is a word spelled out:
  <say-as interpret-as='spell-out'>hello</say-as>.</speak>`;

export const SSMLService = {
  getSSML,
};
