const API_ENDPOINT = 'https://demo1030918.mockable.io/'

async function getRequest(url: string) {
  const response = await fetch(url)
  return response.json()
}

export async function getAppModes() {
  return await getRequest(API_ENDPOINT)
}
