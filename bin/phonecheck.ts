#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PhonecheckStack } from "../lib/phonecheck-stack";

const app = new cdk.App();
new PhonecheckStack(app, "PhonecheckStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});
