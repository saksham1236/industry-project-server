
# Indstry-project-server

Adding a back-end to serve images as resized accoring to width for responsiveness 




## Demo

Coming soon 😊


### Run Locally

Clone the project

```bash
  git clone https://github.com/saksham1236/industry-project-server
```

Go to the project directory

```bash
  cd /**folder that you cloned**/
```

Install dependencies

```bash
  npm install
```

Start the React Server

```bash
  npm start
```


## API Reference

#### Get image

```http
  GET /image/:imagename?width=${imageWidth (default = 300)}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imageName`      | `string` | **Required**. Searches for the image with that name in the database |