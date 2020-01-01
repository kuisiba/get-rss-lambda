const aws = require('aws-sdk');
const Parser = require('rss-parser');
const parser = new Parser();
const s3 = new aws.S3();
const moment = require('moment-timezone');


const testUrl = 'https://note.com/gravestone11/rss';

const GenS3Params = (body) => {
  const currentTime = moment().toISOString();
  return {
    Bucket: "NoteRssDataBucket",
    Key: "data/" + currentTime + ".json",
    Body: JSON.stringify(body),
  }
}
exports.lambdaHandler = async (event, context) => {
    try {
      const feed = await parser.parseURL(testUrl);
      const s3Params = GenS3Params(feed);
      console.log(s3Params);
      await s3.putObject(s3Params);
    } catch (err) {
        console.log(err);
        return err;
    }

    return 'aaaaaa';
};
