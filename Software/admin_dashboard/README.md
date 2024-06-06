# Setup new project:
- Step 1: Create react app: `npx create-react-app admin-dashboard`

# Setup authentication with AWS Amplify and AWS Cognito:
- Step 2: Install amplify console: `npm install -g @aws-amplify/cli`
- Step 3: Config amplify profile: `amplify configure` . Ref: [Link](https://docs.amplify.aws/gen1/javascript/start/getting-started/installation/)
- Step 4: Add auth to project: `amplify add auth` . Ref: [Link](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/set-up-auth/)
- Step 5: Update your backend and deploy the service: `amplify push`
- Step 6: Add amplify UI: `npm install aws-amplify @aws-amplify/ui-react` . Ref: [Link](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/set-up-auth/#build-an-authentication-experience-using-the-authenticator)
- Step 7: Add federated identity provider sign-in (Google for example):
    + Go to [https://console.cloud.google.com/](https://console.cloud.google.com/), setup new project.
    + Go to new project, choose `APIs & Services`.
    + Config OAuth consent screen
    + Go to Credentials -> Create OAuth client ID 
    + Add Client ID and Client Secret

# Using login infomation:
- Step 8: [Get user](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-session/#retrieve-your-current-authenticated-user), [Get current session](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-session/#retrieve-a-user-session), [Refreshing session](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-session/#refreshing-sessions), [Refreshing session with social providers like Google,...](https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/manage-user-session/#refreshing-sessions-with-social-providers), 