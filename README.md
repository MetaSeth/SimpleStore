---

# Simple Store Class Implementation

This repository contains a TypeScript implementation of a `Store` class, a structured storage utility. This class provides methods to manage and retrieve user-generated content and data.

## Features

- Store and retrieve JSON values.
- Handle nested keys using dot notation (`user.address.city`).
- Check serializability before storing values.
- Basic read and write management.

## Installation and Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/MetaSeth/SimpleStore/
```

2. Navigate to the repository directory:

```bash
cd SimpleStore
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To run the sample tests:

```bash
npm run test
```

You can also import the `Store` class into your TypeScript or JavaScript project and use it as demonstrated in the `store.ts` file.

## Design and Implementation Notes

- The `Store` class uses a recursive approach to navigate through nested keys.
- Serialization checks are performed using JSON's `stringify` method.
- Read and write operations are managed with basic concurrency checks.

## Enhancements

For real-world applications, the following enhancements can be considered:

1. Implement data size limits.
2. Introduce data expiration with TTL (Time-to-live).
3. Schema validation for stored data.

## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
