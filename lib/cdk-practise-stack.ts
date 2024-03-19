import { join } from "path";
import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';


export class CdkPractiseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambdaFilePath = join(__dirname, "..", "lambda", "index.ts");

    const myLambda = new NodejsFunction(this, "MyLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      functionName: "test-function",
      entry: myLambdaFilePath,
    });

    const api = new apiGateway.RestApi(this, 'demo-api');
    const photosResource = api.root.addResource('photos')
    const getPhotosLambdaIntegration = new apiGateway.LambdaIntegration(myLambda)

    photosResource.addMethod('GET', getPhotosLambdaIntegration);

  }
}
