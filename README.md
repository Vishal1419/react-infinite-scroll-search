# Frontend Task - React, Typescript

Create a `React(v17)` application using `Typescript(v4)` which shows a tables with infinite-scrolling and a search bar.

## Technical specifications:

- Whole application will use **react hooks** only, i.e. no class component should be used.
- For styling: you can use `SCSS`, `styled-components` or `JSS`.
- Use **redux** for application global state management
  - [Optional] You can use [redux-saga](https://github.com/redux-saga/redux-saga) as middleware.
  - [Optional] To reduce redux boilerplate code you can use [redux-toolkit](https://github.com/reduxjs/redux-toolkit).
- Use **axios** for server api calls.
- Create **API mocks**, you can use [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) or any library of your choice or even create your own.
- Implement **infinite scrolling** in the table:
  - Suppose total items that could be fetched from server is 1000.
  - Then fetch only 20 items in a single request.
  - Further data should be fetched only when user scrolls down.
- Input to *search-bar* will send request to server, minimum 3 characters are required to send a server request.
- Try to reduce server request while user is typing in *search-bar*
- Clicking on any table-row will open a dialog which will show the detailed contents of that table row.
- Handle loading states.
- Handle **API errors** like `401` and `403` HTTP status codes

## API specifications

Create an API mocker with following specifications:

```HTTP
GET /students?searchTerm=<student-name>&limit=20&skip=20 HTTP/1.1

Response:

HTTP/1.1 200 OK
Content-Type: application/json

{
    "totalRecords": 1000,
    "students": [
        {
            "name": "<student name>",
            "avatarURL": "<user avatar url>",
            "lecturesAttended": 10,
            "totalLectures": 30,
            "marks": {
                "<subject-code>": {
                    "subjectTitle": "Introduction to mathematics",
                    "totalMarks": 100,
                    "markesObtained": 56
                },
                # <subject-code> is a dynamic key
            },
        },
        # remaining 19 items...
    ]
}
```

Example marks object to explain the `<subject-code>` dynamic key

```
{
    ...
    "marks": {
        "mth101": {
            "subjectTitle": "Introduction to mathematics",
            "totalMarks": 100,
            "markesObtained": 56
        },
        "eng112": {
            "subjectTitle": "English diagnostics",
            "totalMarks": 100,
            "markesObtained": 76
        }
    }
}
```

> Notes: All query parameters are optional.


# How to run this project:

Run this command to install project dependencies:
```
yarn
```

And then run this command to run the project:
```
yarn start
```

# Live Project Link
