import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_apigateway,
  aws_lambda_nodejs,
  aws_lambda,
  aws_logs,
} from 'aws-cdk-lib';

export class RealEstateICVFetchStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const envVariables = {
      AWS_ACCOUNT_ID: Stack.of(this).account,
    };

    const esBuildSettings = {
      minify: true
    }

    const functionSettings = {
      handler: 'handler',
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      memorySize: 128,
      environment: {
        ...envVariables
      },
      logRetention: aws_logs.RetentionDays.ONE_WEEK,
      tracing: aws_lambda.Tracing.ACTIVE,
      bundling: esBuildSettings
    }

    const getICVByCoordinatesFunction = new aws_lambda_nodejs.NodejsFunction(
      this,
      'GetICVByCoordinatesFunction',
      {
        awsSdkConnectionReuse: true,
        entry: './src/api/getICVByCoordinates.ts',
        ...functionSettings
      }
    );

    const api = new aws_apigateway.RestApi(this, 'RealEstateICVApi', {
      restApiName: 'RealEstateICVApi',
      deployOptions: {
        tracingEnabled: true,
        dataTraceEnabled: true,
        loggingLevel: aws_apigateway.MethodLoggingLevel.INFO,
        metricsEnabled: true,
      }
    });

    const getIcvPath = api.root.addResource('getICVByCoordinates');
    getIcvPath.addMethod(
      'GET',
      new aws_apigateway.LambdaIntegration(getICVByCoordinatesFunction)
    );
  }
};
