import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getIcvFromCoordinates } from '../service/external/conicet-api';
import middy from '@middy/core';


const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const lat: number = parseFloat(event.queryStringParameters!.latitude as any);
  const lng: number = parseFloat(event.queryStringParameters!.longitude as any);

  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return {
      statusCode: 400,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'expected "latitude" and "longitude" query params to be valid coordinates' }),
    };
  }

  try {
    const icv = await getIcvFromCoordinates(lat, lng);

    if (!icv) {
      return {
        statusCode: 204,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: 'ICV value not found for given latitude/longitude coordinates' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ value: icv }),
    };
  } catch (error) {
    console.error('Unexpected error occurred while trying to retrieve ICV value', error);

    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'An internal server error has occurred. Please contact an administrator' }),
    };
  }
};

const handler = middy(lambdaHandler);


export {
  handler
};
