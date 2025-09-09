# 4. Data Models

## User

**Purpose:** Represents an authenticated user of the system with a specific role.

**TypeScript Interface:**
```typescript
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Staff' | 'Portal Administrator' | 'Director-General';
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- A `User` (Staff) can be assigned to many `Investors`.

---

## Investor

**Purpose:** Represents a company or individual investor that OYSIPA is engaged with.

**TypeScript Interface:**
```typescript
export interface Investor {
  _id: string;
  name: string;
  sector: string;
  countryOfOrigin: string;
  assignedTo: string; // User ID
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- An `Investor` has one assigned `User` (Staff).
- An `Investor` can have many `Projects`.

---

## Project

**Purpose:** Represents a specific investment project or venture undertaken by an investor.

**TypeScript Interface:**
```typescript
export interface Project {
  _id: string;
  investorId: string;
  title: string;
  description: string;
  lifecycleStage: string; // LifecycleStage ID
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- A `Project` belongs to one `Investor`.
- A `Project` can have many `InteractionLogs`.

---

## InteractionLog

**Purpose:** Represents a single point of contact or support activity related to a project. This is where the record of an uploaded letter will be stored.

**TypeScript Interface:**
```typescript
export interface InteractionLog {
  _id: string;
  projectId: string;
  userId: string;
  description: string;
  serviceCategory: string;
  letterUrl?: string;
  interactionDate: string;
  createdAt: string;
}
```

**Relationships:**
- An `InteractionLog` belongs to one `Project`.
- An `InteractionLog` is created by one `User`.

---

## LifecycleStage

**Purpose:** To store the defined stages of the investment pipeline, allowing them to be dynamically managed.

**TypeScript Interface:**
```typescript
export interface LifecycleStage {
  _id: string;
  name: string;
  description?: string;
  order: number;
}
```

**Relationships:**
- A `LifecycleStage` can be applied to many `Projects`.
