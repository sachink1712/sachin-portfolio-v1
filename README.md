# Sachin Kumar — AI/ML Engineer Portfolio

Professional portfolio web application showcasing production-grade LLM architectures, multi-agent systems, RAG pipelines, predictive analytics, and end-to-end data science projects.

## Cloud Run Deployment

To deploy this portfolio as a fully managed, containerized service on Google Cloud Run, execute the following single command from the project root:

```bash
gcloud run deploy sachin-portfolio --source . --region asia-south1 --platform managed --allow-unauthenticated --port 8080 --memory 512Mi --cpu 1 --min-instances 0 --max-instances 5
```

This builds the multi-stage Docker container via Google Cloud Build, pushes the artifact to Artifact Registry, provisions a Cloud Run revision bound to the assigned `$PORT`, and serves the FastAPI backend and minimal responsive frontend globally with automatic HTTPS.
