import axios from "axios";

const clientId = "1000.55SZBFZV8SS4REBBD5KA30TC0NZQWR";
const clientSecret = "8c47fe65823e1a82d4b9589aa1411b884e460e86b3";
const code =
  "1000.600912301b720bc3b10b50c85291a130.4aa1313093e29fce436a483c72126c13";
const redirectUri = "https://yourapp.com/callback";
const orgId = "708409578";
const workspaceId = "2165979000008577077";
const viewId = "2165979000008649517";
const configJson = {
  responseFormat: "json",
};
const encodedConfig = encodeURIComponent(JSON.stringify(configJson));

// Step 1: Obtain Access Token
async function getAccessToken() {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error.response.data);
  }
}

// Step 2: Make API Call to Zoho Analytics
async function getZohoAnalyticsData(accessToken) {
  const apiUrl = `https://analyticsapi.zoho.com/restapi/v2/workspaces/${workspaceId}/views/${viewId}/data?CONFIG=${encodedConfig}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "ZANALYTICS-ORGID": orgId,
        Authorization: `Zoho-oauthtoken ${accessToken}`,
      },
    });
    console.log("Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.response.data);
  }
}

// Execute the flow
async function execute() {
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      await getZohoAnalyticsData(accessToken);
    } else {
      console.error("No access token retrieved.");
    }
  } catch (error) {
    console.error("Error in execution:", error);
  }
}

execute();
