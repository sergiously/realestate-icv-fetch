import fetchConstants from '../../constants/fetch';

const getIcvFromCoordinates = async (latitude: number, longitude: number, timeoutMs: number = fetchConstants.DEFAULT_TIMEOUT): Promise<number | null> => {
  try {
    const response: any = await fetch(`https://icv.conicet.gov.ar/api/v1/value?latitude=${latitude}&longitude=${longitude}`, {
      signal: AbortSignal.timeout(timeoutMs)
    });

    if (response.status === 200) {
      const responseBody = response.json();
      return Number(responseBody.value);
    }
    return null;
  } catch (error) {
    console.error('Error fetching ICV value from conicet API!', error);
    throw error;
  }
};


export {
  getIcvFromCoordinates
};
