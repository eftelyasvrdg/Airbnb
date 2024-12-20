# 4458 - Airbnb Project Documentation

## Overview
In order to enable necessary features for engaging with property listings, this project focuses on developing an admin online interface and a backend system for a mobile app (Host). The project offers information on backend development and system architecture by examining REST APIs, database administration, and deployment.

---


## Technologies Used
- **Backend Development:** Node.js, JavaScript  
- **Database Management:** Azure Data Studio  
- **API Documentation & Testing:** Swagger  
- **Cloud Deployment:** Azure  
---

## Learning Outcomes

### **REST API Development**
- Designed and developed REST APIs with a focus on usability and security.
- Learned to test and document APIs effectively using Swagger.
- I was able to use the appropriate endpoint and simplify API testing without utilizing the frontend because of swagger.

### **Database Management**
- Gained experience creating and managing databases in Azure Data Studio.
- Built efficient database schemas to support the application.

### **System Architecture**
- Designed the system architecture to meet functional requirements.
- Selected technologies (Node.js, JavaScript) based on project needs.

### **Cloud Deployment**
- Learned the process of deploying backend applications to Azure.
- Faced and resolved deployment challenges, particularly with GitHub integration.

### **Problem-Solving**
- Researched and fixed deployment errors independently.
- Gained confidence in debugging and troubleshooting APIs.


---

## Mobile App (Host)

### **Features and Endpoints**

#### **1. Insert Listing**
- **Parameters:**
  - `No of People` (required)
  - `Country` (required)
  - `City` (required)
  - `Price` (required)
- **API Response:** `Status`
- **Description:** Enables hosts to add listings with essential details. These parameters are the minimum requirements, but additional ones can be included.
- **Authentication:** Yes  
- **Paging:** No  

#### **2. Query Listings**
- **Parameters:**
  - `Date` (required)
  - `No of People` (required)
  - `Country` (optional)
  - `City` (optional)
- **API Response:** `Listings`, `Rating`
- **Description:** Returns available listings based on the query. Listings with booked dates are excluded.
- **Authentication:** No  
- **Paging:** Yes  

#### **3. Book a Stay**
- **Parameters:**
  - `Date` (required)
  - `From` (required)
  - `To` (required)
  - `Names of People` (required)
- **API Response:** `Status` (Successful, Error)
- **Description:** Allows users to book a stay without requiring a payment transaction.
- **Authentication:** Yes  
- **Paging:** No  

#### **4. Review a Stay**
- **Parameters:**
  - `Stay Id` (required)
  - `Rating` (required)
  - `Comment` (optional)
- **API Response:** `Status` (Successful, Error)
- **Description:** Only users who have booked a stay can leave a review for it.
- **Authentication:** Yes  
- **Paging:** No  

---

## Admin Web Interface

### **Features and Endpoints**

#### **1. Report Listings with Ratings**
- **Parameters:**
  - `Country` (optional)
  - `City` (optional)
- **API Response:** `Listings`
- **Description:** Allows admins to filter and view listings based on ratings and location.
- **Authentication:** Yes  
- **Paging:** Yes  

---

## Challenges
### **Understanding Swagger**
- Found it difficult at first, but after a while realized how useful it was for testing and describing APIs.

### **Database Creation Without Workbench**
- The experience of switching to Azure Data Studio for database administration was different yet beneficial.
- I had trouble with a few things. For instance, I had no issues with the Azure database at my home API address, but I had a connection issue at school. I've included a query below so you can observe it if there are any issues.

### **Azure Deployment**
- Due to GitHub-related problems, deployment was one of the more difficult parts, but it provided valuable instructional moments.
- Once more, here Although I was unable to resolve the access issues I ran across, I did have a functional Azure address, which I have included below. I felt obligated to include this here even though I will send a more thorough email about it.

---

## Conclusion
My knowledge of database administration, cloud deployment, and REST API programming has greatly increased as a result of this project. It also helped me become more proficient in selecting the right technology and creating solutions that are scalable. I am thankful that I attempted this assignment in third grade, despite the fact that I did not complete it flawlessly. Although building APIs was the main objective, the experience also gave insights on system architecture, designing backend, and debugging in practical settings.

