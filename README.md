# Express Payload Sanitizer

Express Payload Sanitizer is a middleware package for Express.js that provides two essential utilities:
- **`cleanPayload`**: Cleans `req.body` by removing empty strings, `null` values, and empty objects.
- **`restrictRequest`**: Validates `req.body` to ensure no `null`, `undefined`, or invalid `NaN` values are present and return bad request as response to client side.

### Features

- **Lightweight**: Easy to integrate into any Express.js project.
- **Recursive Cleaning**: Handles nested objects and arrays.
- **Validation**: Enforces strict payload standards for your API.

---

## Installation

Install the package via NPM:

```bash
npm install express-payload-sanitizer
