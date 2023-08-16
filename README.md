# React + TypeScript + Vite + Express + SpeechSynthesis

#### API

- The code for the api is in the `api` directory. This piece is basically responsible for sending a random response from the array defined in `data.js`.
- The api returns a response in form of a JSON object containing contents. The content string is in form of a subset of SSML that is defined later here.

#### APP

- The project is a basic react app, and such should come with all of the standard built ins of react.
- `ssml.ts` file in the api folder is responsible for fetching.
- `parse.ts` file in the utils folder is responsible for parsing content into sentences.
- `speech.ts` file contains an implementation for speech engine using the local window.speechSynthesis API.
- `useSpeech.ts` reactifies the speech engine implementation and returns the controls for playback and gives information about the currently spoken word and sentence.

## Goal

- Create an app that calls an api to fetch SSML content and then synthesizes this content into speech and renders a sentence and word UI for the same.
