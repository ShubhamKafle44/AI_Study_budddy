# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="Study Assistant API",
    description="API for document processing, summarization, and question generation",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api/v1", tags=["study"])

@app.get("/")
async def root():
    return {
        "message": "Study Assistant API",
        "version": "1.0.0",
        "endpoints": {
            "upload": "/api/v1/upload/",
            "generate_questions": "/api/v1/generate-questions/",
            "summarize": "/api/v1/summarize/",
            "study": "/api/v1/study/"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
