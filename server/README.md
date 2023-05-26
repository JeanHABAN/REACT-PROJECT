# CS477-2023-03-Workshop02
# Workshop 02
Please find below an Express application that connects to a local MongoDB instance, each document has the following structure for `schools` collection:
```JavaScript
{
    "_id":1,
    "name": "Maharishi International University",
    "code": "MIU",
    "address": "Fairfield, IA",
    "teachers": [
        {"_id":1, "name":"Asaad"},
        {"_id":2, "name":"Umur"}
    ],
    "courses":[
        {"_id":1, "title": "CS477", "students":[
            {"_id":1, "name":"John"},
            {"_id":2, "name":"Selin"}
        ]},
        {"_id":2, "title": "CS571", "students":[
            {"_id":1, "name":"Alican"},
            {"_id":2, "name":"Dean"}
        ]},
        {"_id":3, "title": "CS415", "students":[
            {"_id":1, "name":"Tina"},
            {"_id":2, "name":"Clyde"}
        ]}
    ]
}
```
Your are responsible on writing code to create routes in MVC model for the following functions.
1. Create a new school with name, code & address (code should be unique)
```
POST http://localhost:3000/schools 
With the body
{
    name: "Maharishi International University",
    code: "MIU",
    address: "Fairfield, IA"
}
```
2. Update address of an existing school
```
PUT http://localhost:3000/schools/{code} 
With the body
{
    name: "Maharishi International University 2"
}
```
3. Delete a school
```
DELETE http://localhost:3000/schools/{code} 
```
4. Add a teacher *(level 1)*
```
PUT http://localhost:3000/schools/{code}/teachers 
With the body
{
    _id: ObjectId("falfl;asdkfja;sdfjfadf),
    name: "Asaad"
}
```
5. Update an existing teacher by ID *(level 1)*
```
PATCH http://localhost:3000/schools/{code}/teachers/{id} 
With the body
{
    name: "Thao"
}
```
6. Delete an existing teacher by ID *(level 1)*
```
DELETE http://localhost:3000/schools/{code}/teachers/{id}
```
7. Add a new course with a title *(level 1)*
```
PUT http://localhost:3000/schools/{code}/courses 
With the body
{
    _id: ObjectId("falfl8asdkfja6sdfjfadf),//
    title: "CS477"
}
```
8. Add a new student to an existing course *(level 2)*
```
PUT http://localhost:3000/schools/{code}/courses/{id}/students 
With the body
{
    _id: ObjectId("falfl8asdkfja6sdfjfadf),//
    name: "Michael"
}
```
9. Update a student's name *(level 2)*
```
PATCH http://localhost:3000/schools/{code}/courses/{id}/students/{id} 
With the body
{
    name: "John"
}
```
10. Delete a student *(level 2)*
```
DELETE http://localhost:3000/schools/{code}/courses/{id}/students/{id} 
```
* New
11. Create a middleware to ensure the school code is unique when inserting a new school
12. Create a middleware to ensure the data containing _id as an ObjectId when inserting a course, a teacher, or a student
13. Get all schools
```
GET http://localhost:3000/schools
```
14. Get all teachers from a school
```
GET http://localhost:3000/schools/{code}/teachers
```
15. Get all courses from a school
```
GET http://localhost:3000/schools/{code}/courses
```
16. Get all students from a course and sort them if needed
```
GET http://localhost:3000/schools/{code}/courses/{id}/students?sort=true
```

```
