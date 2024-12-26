# Buddy Bound
* The project for Mobile and Pervasive Computing (Course SE405 | UIT)
* Guided by Msc. Nguyễn Tấn Toàn
<p align="center">
<img src="https://res.cloudinary.com/dzvruudmw/image/upload/v1735231702/MapLocation_mpvhnd.jpg" />
</p>
 
## Introduction
Welcome to Buddy Bound project! This project is a mobile application developed to help users connect with people in family and friends by real-time tracking location. Moreover, the application also provides a place for storing and sharing moments by creating posts and showing the locations of posts on the map of group.   
## Features
* **Login/Register account**.
* **Location Tracking**.
* **Location History:** System automatically stores individual locations every hour. Afte 2 days, there will be a notification sent to user to determine if locations continue to be saved
* **Relationship Management:**: Set up relationship (Friend, Family) with other users. Besides, application also provides limit users function that prevent them see individual location on the map
* **Group Management:** Allow user to create groups with 2 types: Friend and Family
* **Setting management:** Manage user's permissions such as location tracking, contact in mobile
* **Post Management:** Alow user to create posts and share in the group with locations on the map. Members in the group can see and comment the posts
* **Album Management:** Users can create album from posts in certain period of time, search album by time of created date
* **Memorable Places Management:** Provide management functionalities such as adding, deleting, editing memorable places on the map with notes
## Some Screens of the application
* Login Screen
<p align="center">
<img src="https://res.cloudinary.com/dzvruudmw/image/upload/v1735233711/LoginScreen_rkvin1.png" />
</p>
* Home Screen
<p align="center">
<img src="https://res.cloudinary.com/dzvruudmw/image/upload/v1735233698/HomeScreen_o3j1eq.jpg" />
</p>
 
## Getting Started
**1. Clone Buddy Bound Api**  

Clone and run Buddy Bound Api from [BuddyBoundAPI](https://github.com/hoangphuc38/PlantStoreAPI.git)  

**2. Ensure that you have installed Docker**

**3. Go to "docker-compose.yml", run** 
```bash
docker compose -f "docker-compose.yaml" up -d --build
```
**4. Clone the project**
```bash
git clone https://github.com/hoangphuc38/Buddy_Bound
```
**5. Install npm dependencies**
```bash
npm install
```
**6. Ensure your environment has been set up to able to run React Native app**
**7.1 Run the app on Android emulator**
```bash
npm run android
```
**7.2 Run the app on real Android devices**
```bash
npx react-native run-android
```
## Contributors
[hoangphuc38](https://github.com/hoangphuc38) Email: 21522471@uit.edu.vn  
[DKhiem017](https://github.com/DKhiem017) Email: 21522115@uit.edu.vn  
[PhuGHs](https://github.com/PhuGHs) Email: 21522466@uit.edu.vn

If you have any questions, suggestions, or need assistance, please feel free to contact us using the above information.
