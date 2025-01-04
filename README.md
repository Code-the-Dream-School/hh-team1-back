# Back-End Repo for Node/React Practicum

This will be the API for the front-end React app part of your practicum project.

These instructions are for the **front-end team** so they can setup their local development environment to run
both the back-end server and their front-end app. You can go through these steps during your first group meeting
in case you need assistance from your mentors.

> The back-end server will be running on port 8000. The front-end app will be running on port 3000. You will need to run both the back-end server and the front-end app at the same time to test your app.

### Setting up local development environment

1. Create a folder to contain both the front-end and back-end repos
2. Clone this repository to that folder
3. Run `npm install` to install dependencies
4. Pull the latest version of the `main` branch (when needed)
5. Run `npm run dev` to start the development server
6. Open http://localhost:8000/api/v1/ with your browser to test.
7. Your back-end server is now running. You can now run the front-end app.

#### Running the back-end server in Visual Studio Code

Note: In the below example, the group's front-end repository was named `bb-practicum-team1-front` and the back-end repository was named `bb-practicum-team-1-back`. Your repository will have a different name, but the rest should look the same.
![vsc running](images/back-end-running-vsc.png)

#### Testing the back-end server API in the browser

![browser server](images/back-end-running-browser.png)

> Update the .node-version file to match the version of Node.js the **team** is using. This is used by Render.com to [deploy the app](https://render.com/docs/node-version).

### API Endpoints Summary

#### User Routes

1. Register
   - Method: POST
   - URL: http://localhost:8000/api/v1/user/register
   - JSON Request Body:
   ```
   {
    "firstName": "Amanda",
    "lastName": "Hockmuth",
    "email": "example@gmail.com",
    "password": "Password129",
    "city": "New York",
    "state": "NY"
    }
   ```
2. Login
   - Method: POST
   - URL: http://localhost:8000/api/v1/user/login
   - Credentials:
     - Username: Email(e.g., example@gmail.com)
     - Password: Password(e.g., Password123)

#### Itinerary Routes:

1. Get All Itinerary:
   - Method: GET
   - URL: http://localhost:8000/api/v1/itinerary/
2. Get Single Itinerary
   - Method: GET
   - URL: http://localhost:8000/api/v1/itinerary/:<id>
3. Create Itinerary
   - Method: POST
   - URL: http://localhost:8000/api/v1/itinerary/
   - JSON Request Body:
   ```
   {
   "name": "Event name",
   "date": "2024-12-29",
   "location": {
      "address": "6780 main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "11100",
      "coordinates": {
         "lat": 5,
         "lng": 5
      }
   },
   "user": "675bb5d8277e1a64f2033539"
   }
   ```
4. Update Itinerary

   - Method: PATCH
   - URL: http://localhost:8000/api/v1/itinerary/:<id>
   - JSON Request Body:
   ```
   {
   "name": "updated event name",
   "date": "updated date",
   "location": {
      "address": "updated address",
      "city": "updated city",
      "state": "updated state",
      "postalCode": "updated postalCode",
      "coordinates": {
         "lat": 5,
         "lng": 5
      }
   },
   "user": "675bb5d8277e1a64f2033539"
   }

   ```

5. Delete Itinerary
   - Method: DELETE
   - URL: http://localhost:8000/api/v1/itinerary/:<id>

#### Events Search Routes

- Method: GET
- URL: https://hh-team1-back.onrender.com/api/ticketmaster/events/Seattle/WA?dateRangeStart=2025-02-01&dateRangeEnd=2025-02-05

- Parameters:

  - city (required): Name of the city
  - stateCode (required): Two-letter state code
  - dateRangeStart (optional): Start date in YYYY-MM-DD format
  - dateRangeEnd (optional): End date in YYYY-MM-DD format

- Example requests:

  - `https://hh-team1-back.onrender.com/api/ticketmaster/events/Seattle/WA?dateRangeStart=2025-02-01&dateRangeEnd=2025-02-05`
  - `https://hh-team1-back.onrender.com/api/ticketmaster/events/Seattle/WA`
  - `https://hh-team1-back.onrender.com/api/ticketmaster/events/Seattle/WA//2024-02-01`

- Example JSON Response:
  ```
  {
     name: "Seattle Seahawks v Minnesota Vikings",
     dates: {
        startDate: "2024-12-22",
        startTime: "13:05:00"
     },
     ticketmasterId: "vvG1HZbFH8sU0m",
     url: "https://www.ticketmaster.com/seattle-seahawks-v-minnesota-vikings-seattle-washington-12-22-2024/event/0F00608F10C7692E",
     info: "Flex Schedule: Please be aware that there are certain games that are subject to flexible scheduling and the date and time of those games may be changed from what is currently reflected on the schedule and what may appear on the ticket. For more detailed information about NFL flexible scheduling procedures for the 2024 NFL Season, please visit https://www.nfl.com/schedules/flexible-scheduling-procedures. Value tickets are not eligible for resale. Resale activity may result in ticket cancellation without notice.",
     images: [
        "https://s1.ticketm.net/dam/a/2db/0bae3d29-946e-44fd-aebd-2618ce30b2db_RECOMENDATION_16_9.jpg",
        "https://s1.ticketm.net/dam/a/2db/0bae3d29-946e-44fd-aebd-2618ce30b2db_TABLET_LANDSCAPE_LARGE_16_9.jpg"
        ],
     venue: {
        name: "Lumen Field",
        address: "800 Occidental Ave S",
        city: "Seattle",
        state: "Washington",
        lat: "47.595083",
        lon: "-122.331607"
        },
     classification: "Sports"
  }
  ```
