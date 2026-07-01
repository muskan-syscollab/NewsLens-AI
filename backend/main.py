from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from database import engine, Base
from auth import router
import models

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

# Static folders
app.mount("/css", StaticFiles(directory="../fronted/css"), name="css")
app.mount("/js", StaticFiles(directory="../fronted/js"), name="js")

templates = Jinja2Templates(directory="../fronted")

# Home Page
@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="home.html",
        context={}
    )

# Login Page
@app.get("/login-page", response_class=HTMLResponse)
def login_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={}
    )


# Register Page
@app.get("/register-page", response_class=HTMLResponse)
def register_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="register.html",
        context={}
    )


# Forgot Password Page
@app.get("/forgot-page", response_class=HTMLResponse)
def forgot_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="forgot.html",
        context={}
    )


# Dashboard Page
@app.get("/dashboard.html", response_class=HTMLResponse)
def dashboard_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="dashboard.html",
        context={}
    )


# Add News Page
@app.get("/add_news.html", response_class=HTMLResponse)
def add_news_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="add_news.html",
        context={}
    )


# Bookmarks Page
@app.get("/bookmarks-page", response_class=HTMLResponse)
def bookmarks_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="bookmarks.html",
        context={}
    )