// © 2025 nawwa. All Rights Reserved. 2025-03-24

// Import the required AWS SDK clients and commands for Node.js
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set the secret name and AWS region from environment variables
const secret_name = process.env.SECRET_NAME;
const region = process.env.AWS_REGION;

// Create an instance of SecretsManagerClient
const client = new SecretsManagerClient({
  region: region,
});

async function getSecret() {
  let response;

  try {
    // Send the GetSecretValueCommand to retrieve the secret
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    console.error("Error retrieving secret:", error);
    throw error;
  }

  // Extract and return the secret value
  const secret = response.SecretString;
  return secret;
}

// Example usage
getSecret()
  .then((secret) => {
    console.log("Retrieved secret:", secret);
    // Your code goes here
  })
  .catch((error) => {
    console.error("Failed to retrieve secret:", error);
  });

  //check copyright file