import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import apiConstants from '../constants/api';
import { isLatitudeValid, isLongitudeValid } from '../helper/validators/inputGetICVFromCoordinates';
import { getIcvFromCoordinates } from '../service/external/conicet-api';
import middy from '@middy/core';


const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const lat: number = parseFloat(event.queryStringParameters!.latitude as any);
  const lng: number = parseFloat(event.queryStringParameters!.longitude as any);

  if (!isLatitudeValid(lat) || !isLongitudeValid(lng)) {
    return {
      statusCode: 400,
      headers: { ...apiConstants.DEFAULT_HEADERS },
      body: JSON.stringify({ message: 'expected "latitude" and "longitude" query params to be valid coordinates' }),
    };
  }

  try {
    const icv = await getIcvFromCoordinates(lat, lng);

    if (!icv) {
      return {
        statusCode: 204,
        headers: { ...apiConstants.DEFAULT_HEADERS },
        body: JSON.stringify({ message: 'ICV value not found for given latitude/longitude coordinates' }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...apiConstants.DEFAULT_HEADERS },
      body: JSON.stringify({ result: icv }),
    };
  } catch (error) {
    console.error('Unexpected error occurred while trying to retrieve ICV value', error);

    return {
      statusCode: 500,
      headers: { ...apiConstants.DEFAULT_HEADERS },
      body: JSON.stringify({ message: apiConstants.DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE }),
    };
  }
};

const handler = middy(lambdaHandler);


export {
  handler
};
