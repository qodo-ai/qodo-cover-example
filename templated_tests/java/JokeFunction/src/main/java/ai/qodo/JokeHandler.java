package ai.qodo;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class JokeHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    private static final Logger log = LogManager.getLogger(JokeHandler.class);
    private final String check = "uspaaageyjtccfstuacmuyjqazwollym";

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        LambdaLogger logger = getLogger(context);

        String name = "No Name";
        try {
            String joke = fetchJoke();
            validate(event.getHeaders(),logger);
            if (event.getPathParameters() != null) {
                name = event.getPathParameters().getOrDefault("rename", "NO NAME SUPPLIED");
            }
            logger.log("Ready to call with name "+ name);
            joke = joke.replace("Chuck Norris", name);
            return new APIGatewayProxyResponseEvent().withStatusCode(200).withBody(joke);
        } catch (SecurityError er) {
            logger.log("Security Error");
            return new APIGatewayProxyResponseEvent().withStatusCode(401).withBody("Unauthorized");
        } catch (Exception e) {
            logger.log("Internal Server Error" + e.getMessage());
            return new APIGatewayProxyResponseEvent().withStatusCode(500).withBody("Internal Server Error");
        }
    }

    private LambdaLogger getLogger(Context context) {
        LambdaLogger logger;
        if (context != null && context.getLogger() != null) {
            logger = context.getLogger();
        } else {
            logger = new LambdaLogger() {
                @Override
                public void log(String message) {
                    System.out.println(message);
                }

                @Override
                public void log(byte[] message) {
                    System.out.println(new String(message));
                }
            };
        }
        return logger;
    }

    private void validate(Map<String, String> headers, LambdaLogger logger) throws SecurityError {
        boolean isValid = false;
        if (headers != null && headers.containsKey("token")) {
            if (headers.get("token").equals(check)) {
                isValid = true;
            }
        }
        if (!isValid) {
            logger.log("Invalid Headers "+ headers);
            throw new SecurityError();
        }
    }

    private String fetchJoke() {
        String joke = "No joke available";
        try {
            URL url = new URL("https://api.chucknorris.io/jokes/random?category=dev");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                JSONObject jsonResponse = new JSONObject(response.toString());
                joke = jsonResponse.getString("value");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return joke;
    }


}