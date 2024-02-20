# Welcome to the Recept Processor!

## Getting Started

#### Docker

Ensure you have Docker installed

#### Clone the Repository

```bash
git clone https://github.com/sofalere/receipt-processor.git
```

#### Run Webservice

```bash
docker compose up --build
```

#### Webservice is Running On:

http://localhost:3000/

***

## Testing
#### Run Tests

```bash
docker compose run server npm run test
```

***

## Features

#### Generates a unique id for each unique receipt added
POST "http://localhost:3000/receipts/process"

- a receipt is considered unique if no other saved receipts have the same purchase date, purchase time, and total

#### Calculates points for provided receipt
- the PointCalculator utility is responsible for this

#### Retrieves points given an id
GET "http://localhost:3000/receipts/:id/points"

- will return an error message if id does not exist

