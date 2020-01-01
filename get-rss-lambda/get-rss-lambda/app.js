const aws = require('aws-sdk');
const Parser = require('rss-parser');
const parser = new Parser();
const s3 = new aws.S3({
  region: 'ap-northeast-1',
});
const moment = require('moment-timezone');


const testUrl = 'https://note.com/gravestone11/rss';

const GenS3Params = (body) => {
  const currentTime = moment().toISOString();
  return {
    Bucket: "noterssdatabucket",
    Key: "data/" + currentTime + ".json",
    Body: JSON.stringify(body),
    ContentType: 'application/json',
  }
}
exports.lambdaHandler = async (event, context) => {
    try {
      // const feed = await parser.parseURL(testUrl);
      const s3Params = GenS3Params({"test": "test3"});
      // console.log(s3Params);
      s3.putObject(s3Params, function(err, data) {
        if (err) {
          console.log("====error===");
          console.log(err, err.stack);
        } else {
          console.log("====success===");
          console.log(data);
        }
      });
    } catch (err) {
        console.log(err);
        return err;
    }

    return 'aaaaaa';
};
