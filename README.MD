## Enviroment
java      - openjdk 11.0.13 2021-10-19
maven     - Apache Maven 3.8.4
node      - v14.18.0
npm       - 6.14.15
postgress - 14

angular
```
Angular CLI: 13.0.3
Node: 14.18.0
Package Manager: npm 6.14.15
OS: win32 x64

Angular: 13.0.2
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1300.3
@angular-devkit/build-angular   13.0.3
@angular-devkit/core            13.0.3
@angular-devkit/schematics      13.0.3
@angular/cli                    13.0.3
@schematics/angular             13.0.3
rxjs                            7.4.0
typescript                      4.4.4
```

## Assigment

Write an application to Review Restaurants

User must be able to create an account and log in.
Implement 2 roles with different permission levels
    * Regular User: Can rate and leave a comment for a restaurant
    * Admin: Can add/edit/delete, restaurants, users and reviews
Reviews should have:
    * A 5 star based rate
    * Date of the visit
    * Comment
When a Regular User logs in he will see a Restaurant List ordered by Rate Average
When a restaurant is selected, a detailed view should be presented showing:
    * The overall average rating
    * The highest rated review
    * The lowest rated review
    * Latest review showing with rate and comment
REST API. Make it possible to perform all user actions via the API, including authentication
In any case, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly.
Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
If it’s a web application, it must be a single-page application. All actions need to be done client side using AJAX, refreshing the page is not acceptable. 
Functional UI/UX design is needed.
You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.
Bonus: unit and e2e tests.