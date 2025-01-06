import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_secretsmanager } from "aws-cdk-lib";

export class PhonecheckStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const recordingsBucket = new cdk.aws_s3.Bucket(
			this,
			"RecordingsBucket",
			{
				blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
				encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
				enforceSSL: true,
			},
		);

		const recordingsUser = new cdk.aws_iam.User(this, "RecordingsUser", {
			userName: "recording-user-phonecheck",
		});

		recordingsBucket.grantPut(recordingsUser);
		recordingsBucket.grantRead(recordingsUser);

		const accessKey = new cdk.aws_iam.AccessKey(
			this,
			"RecordingUserAccessKey",
			{
				user: recordingsUser,
			},
		);

		const recUserSecret = new aws_secretsmanager.Secret(
			this,
			"RecordingUserSecret",
			{
				description: "Access Key for uploading call recordings to S3",
				secretStringValue: accessKey.secretAccessKey,
			},
		);
	}
}
