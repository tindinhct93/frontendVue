# ExcelUpload Frontend
Simple app for upload an excel files and save to the Database

Backend Github: https://github.com/tindinhct93/expressBackend.git

Demo link: http://exceluploadfrontend1234.s3-website-ap-southeast-1.amazonaws.com/


## Requirements:
A company need a system to upload some record to the database. The data has been prepared in excel. The system need to have this function:

a. It has a form for user to upload the files.

b. The contennt of the file must be in 3 columns: date, content, amount. The data must not be null.

c. The file can be save for reference and download in the future.

d. Each transaction will be one record in the Database.

## Design
This is some functions for us to handle above requirement:

![image](https://user-images.githubusercontent.com/65914484/170896960-d037e2f6-5e6c-42c9-9714-1eca4f75022d.png)

- **Frontend form**: It will accept the file from the user, validate the extensions, send the file to the server, receive the render the content just at to the datase.
- **Frontend history**: This component will render the transaction in the past.
- **Backend**: It will receive the excel file, parse the file from the user, return the error (if exits). It also store the file and add the content to the database. 

### 3. Defining data model

![image](https://user-images.githubusercontent.com/65914484/170896982-16ce8038-86c8-4332-8229-e084afc17e2f.png)

We will have a simple data model like this.
Each execl file will be one record in the History Table. One excel file will have many transcations, Each transcations will be one record in the Transaction table.

## How to run the application
This is the guide for the frontend. You also need a backend for this app, please refer:  https://github.com/tindinhct93/expressBackend.git
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## Frameworks, Libraries, Technology
The Frameworks/Libraries used in the project and their purposes:
- VueJS: JavaScript framework for building frontend.
- ExpressJS: Node.js web application framework.
- SequelizeJS: Promise-based Node.js ORM tool for connecting to the database.
- Multer: A node.js middleware for handling file upload.
- ExcelJS: A module for reading the content of excel file
- AWS S3 for store the file and host for this frontend.
- AWS Elastic Beanstalk for deploying backend applications
- Amazon RDS for store MySQL Database.



