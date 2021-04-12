## :globe_with_meridians: Project Introduction

**DayTripper Website** is a trip organizing platform for climbers.


## :sunny: Front-End ( Client )

- ReactJS
- Ant Design
 
 
**Pages:**

1. '/'                 -> home page
2. '/calendar'         -> see the dates with trips in a calendar form
3. '/login'            -> login for existing users
4. '/register'         -> register for new users
5. '/search'           -> search the avaible trips and sort them by different criteria
6. '/search/:date'     -> the same as the prevoius but with pre-defined date
7. '/profile'          -> change names or notification preferences                             (for logged users)
8. '/add'              -> add new trip                                                         (for logged users)
9. '/edit/:tripId'     -> edit an existing trip or delete it                                   (for logged users)(creator)
10. '/details/:tripId' -> see the full information about the trip, join or follow the creator  (for logged users)


## :waxing_crescent_moon: Back-End ( Server)

- ASP.NET Core
- MSSQL Server
- Entity Framework Core


**Endpoints:**
1.  '/areas'       GET POST PUT DELETE
2.  '/calendar'    GET POST PUT DELETE
3.  '/cities'      GET POST PUT DELETE
4.  '/crags'       GET POST PUT DELETE
5.  '/sectors'     GET POST PUT DELETE
6.  '/follows'     GET POST  -  DELETE
7.  '/login'        -  POST  -    -
8.  '/register'     -  POST  -    -
9.  '/tripDetails' GET POST PUT DELETE
10. '/trips'       GET  -    -    -
11. '/userTrips'   GET  -   PUT DELETE
11. '/profile'     GET  -   PUT   -


## :lock: DB Diagram
![](https://res.cloudinary.com/boulderbox/image/upload/v1618233369/dbdiagramfinal_b9yowa.jpg)
