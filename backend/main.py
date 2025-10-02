from fastapi import FastAPI
from app.api import routes

app = FastAPI(title="Smart Study Assistant API")

# Include API routes
app.include_router(routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Smart Study Assistant!"}
