## :globe_with_meridians: Project Introduction

**DayTripper Website** is a trip organizing platform for climbers.


## :sunny: Front-End ( Client )

- ReactJS
- Ant Design
 
**How to start:**

 - you need to have NodeJs installed
 - go to inside the 'Client' folder

- run the following to install all dependencies
```
npm install
```

- and to start the application run
```
npm start
```

* you might neede to go to 'Client\src\api\api.js' and change the host according to
  the server


**Pages:**

| Route            | Description                                                         |
|------------------|---------------------------------------------------------------------|
| /                | home page                                                           |
| /calendar        | see the dates with trips in a calendar form                         |
| /login           | login for existing users                                            |
| /register        |  register for new users                                             |
| /search          | search the avaible trips and sort them by different criteria        |
| /search/:date    | the same as the prevoius but with pre-defined date                  |
| /profile         | change names or notification preferences                            |
| /add             | add new trip                                                        |
| /edit/:tripId    | edit an existing trip or delete it                                  |
| /details/:tripId | see the full information about the trip, join or follow the creator |
| /notfound        | not found page                                                      |
| /unauthorized    | when the user doesn't have the rights to visit the page             |

## :waxing_crescent_moon: Back-End ( Server)

- ASP.NET Core
- MSSQL Server
- Entity Framework Core

**How to start:**

- you need to have .NET 5.0 and SQL Server installed
- go to inside the 'Server/Web/DayTripper.Web' folder

- run the following to start the application
```
dotnet run
```


**Endpoints:**
| Endpoint     | GET  | POST  | PUT   | DELETE |
|--------------|------|-------|-------|--------|
| /areas       | yes  | admin | admin | admin  |
| /cities      | yes  | admin | admin | admin  |
| /crags       | yes  | admin | admin | admin  |
| /sectors     | yes  | admin | admin | admin  |
| /follows     | auth | auth  |       | auth   |
| /calendar    | yes  |       |       |        |
| /login       |      | yes   |       |        |
| /register    |      | yes   |       |        |
| /trips       | yes  |       | 	  | 	   |
| /tripDetails | yes  | auth  | auth  | auth   |
| /userTrips   | yes  |       | yes   | yes    |
| /profile     | auth | 	  | auth  |        |

*admin = in administrator role
*auth = authorized / logged in

## :lock: DB Diagram
![](https://res.cloudinary.com/boulderbox/image/upload/v1618233369/dbdiagramfinal_b9yowa.jpg)
