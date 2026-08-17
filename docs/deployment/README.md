# Mototrek Deployment & Infrastructure Guide

This directory documents deployment guidelines, environment configurations, and production release procedures.

## Components Deployment
1. **Frontend (`website/`)**: Deployed as static export or SSR Next.js Node.js server.
2. **Backend (`backend/`)**: Deployed as Node.js process service behind Nginx reverse proxy.
3. **Database (`database/`)**: Managed PostgreSQL / MySQL relational database instance with automated daily backup routines.
