const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenai(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message, // Pass the actual message
        temperature: 0.7, // Corrected value type
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    return res.data.choices[0].text;
}