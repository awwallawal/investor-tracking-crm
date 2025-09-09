# 5. API Specification

(See `docs/api-spec.yaml` for the full OpenAPI 3.0 specification. High-level summary below)

- **Authentication:** `POST /api/v1/auth/login`
- **Users:** `GET, POST /api/v1/users`, `GET, PUT /api/v1/users/{id}`
- **Investors:** `GET, POST /api/v1/investors`, `GET, PUT /api/v1/investors/{id}`
- **Projects:** `POST /api/v1/investors/{id}/projects`, `GET, PUT /api/v1/projects/{id}`
- **Interactions:** `POST /api/v1/projects/{id}/interactions`
- **File Uploads:** `POST /api/v1/interactions/upload-letter`
- **Lifecycle Stages:** `GET, POST, PUT, DELETE /api/v1/lifecycle-stages`
