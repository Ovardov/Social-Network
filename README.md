# Social-Network

## Table of Contents
1. [Application Configurations](https://github.com/Ovardov/Social-Network#application-configurations)
2. [Technology stack](https://github.com/Ovardov/Social-Network#technology-stack)
3. [Routing](https://github.com/Ovardov/Social-Network#routing)
4. [Data API](https://github.com/Ovardov/Social-Network#data-api)

## Application Configurations
1. Type in the terminal the following in both Server and Client directory:
```bash
npm install
```
2. Type in the terminal the following in both Server and Client directory:
```bash
npm start
```
3. Enjoy it!

## Technology stack
- React.js
- Express.js
- Node.js
- MongoDB
- SASS

## List of all functionalities
1. Register
2. Login
3. Logout
4. Profile Page
5. Add Post
6. Edit Post
7. Delete Post
8. Like Post
9. Dislike Post
10. Add Comment on Post
11. Edit Comment on Post
12. Delete Comment on Post
13. Add Profile Picture
14. Change Profile Picuture
15. Add Cover Picture
16. Change Cover Picture
17. Add User Info
17. Search Users

## Routing
Route | Description

/ | Public or Private Home page
/login | Login page
/register | Register page
/profile/:username | Profile page
/search | Search page

## DATA API

###### User
> - **username**: Username
> - **password**: Password
> - **name**: Name
> - **profilePicture**: Link to cloudinary
> - **coverPicture**: Link to cloudinary
> - **posts**: Collection of posts's id
> - **friends**: Collection of friends's id
> - **about**: User Bio
> - **work**: Workplace
> - **education**: Education
> - **home**: home
> - **relationshipStatus**: Relationship Status

###### Post
> - **author**: Author Id
> - **date**: Date
> - **description**: Post description
> - **image**: Link to cloudinary
> - **likes**: Collection of users's id
> - **comments**: Collection of comments's id

###### Comment
> - **author**: Author Id
> - **description**: Comment description
> - **post**: Post Id
