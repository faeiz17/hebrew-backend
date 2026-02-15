---
name: node-ts-backend-architect
description: Comprehensive skill for building secure, scalable Node.js backends using TypeScript, Express, and Mongoose.
---

# 🚀 Node/TS Backend Architect Skill

Use this skill when developing or refactoring the `hebrew-backend`.

## 🏗️ Architectural Core

1. **Service Layer Pattern**: 
   - Controllers handle **Delivery** (parsing requests, sending responses).
   - Services handle **Business Logic** & **DB Operations**.
   - Models handle **Data Definitions**.

2. **Error Handling**:
   - Always wrap async controller logic in try/catch or an `asyncHandler`.
   - Distinguish between Operational Errors (400, 401, 403, 404) and Programmer Errors (500).

3. **Security First**:
   - **JWT**: Never send passwords back, even hashed. Use `select: false` in Mongoose.
   - **Validation**: Use Zod for every `req.body` and `req.params`.
   - **Sanitization**: Ensure inputs are trimmed and lowercased where applicable.

## 💾 Mongoose Best Practices

- Use **Middlewares** (`pre('save')`) for sensitive operations like hashing passwords.
- Use **Instance Methods** for logic related to a single document (e.g., `user.matchPassword`).
- Prefer `findByIdAndUpdate` with `{ new: true, runValidators: true }`.

## 🛠️ Tooling & Style

- **Strict TypeScript**: No `any`. Use interfaces for Models and Request schemas.
- **Naming Convention**: Use `[name].[type].ts` for all files (e.g., `user.controller.ts`, `auth.service.ts`).
- **Barrel Exports**: Maintain `index.ts` files in every folder to simplify imports.
- **ESM**: Use `import/export` syntax exclusively.

## ⚡ Performance & Scalability

- **Lean Queries**: Use `.lean()` in Mongoose for read-only operations to bypass document hydration.
- **Indexing**: Always index fields used in filters or sorting.
- **Async Efficiency**: Use `Promise.all()` for independent I/O tasks.

## 🛠️ Development Workflow

- **Logging**: Use structured logging (pino/winston) instead of `console.log`.
- **Validation**: Fail fast using Zod schemas at the network boundary (middleware).
- **Environment**: Validate that all required `.env` variables are present at startup.

## 📝 Change Manifest

Before making a change, verify:
- [ ] Is this logic in a Service?
- [ ] Is input validated by Zod?
- [ ] Is the route protected?
- [ ] Is the response typed?
