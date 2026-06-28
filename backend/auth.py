from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User, News
from ai import classify_news
from summarizer import summarize_news

router = APIRouter()


# ==========================
# DATABASE SESSION
# ==========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================
# REGISTER
# ==========================

class RegisterUser(BaseModel):
    name: str
    email: str
    password: str


@router.post("/register")
def register(user: RegisterUser, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }


# ==========================
# LOGIN
# ==========================

class LoginUser(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "User not found"
        }

    if existing_user.password != user.password:
        return {
            "message": "Incorrect password"
        }

    return {
        "message": "Login Successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }


# ==========================
# GET USERS
# ==========================

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# ==========================
# FORGOT PASSWORD
# ==========================

class ForgotPassword(BaseModel):
    email: str


@router.post("/forgot-password")
def forgot_password(
    user: ForgotPassword,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "Email not found"
        }

    return {
        "message": "User exists. Reset password page can be shown."
    }


# ==========================
# RESET PASSWORD
# ==========================

class ResetPassword(BaseModel):
    email: str
    new_password: str


@router.post("/reset-password")
def reset_password(
    user: ResetPassword,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "Email not found"
        }

    existing_user.password = user.new_password
    db.commit()

    return {
        "message": "Password Updated Successfully"
    }


# ==========================
# AI NEWS CLASSIFICATION
# ==========================

class NewsInput(BaseModel):
    title: str
    content: str


@router.post("/add-news")
def add_news(
    news: NewsInput,
    db: Session = Depends(get_db)
):

    summary = summarize_news(news.content)

    category = classify_news(
        news.title + " " + news.content
    )

    new_news = News(
        title=news.title,
        content=news.content,
        summary=summary,
        category=category
    )

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    return {
        "message": "News Added Successfully",
        "category": category,
        "summary": summary
    }
@router.get("/news")
def get_news(db: Session = Depends(get_db)):

    news = db.query(News).all()

    return [
        {
            "id": item.id,
            "title": item.title,
            "content": item.content,
            "summary": item.summary,
            "category": item.category
        }
        for item in news
    ]
@router.delete("/delete-news/{news_id}")
def delete_news(news_id: int, db: Session = Depends(get_db)):

    news = db.query(News).filter(News.id == news_id).first()

    if not news:
        return {"message": "News not found"}

    db.delete(news)
    db.commit()

    return {"message": "News deleted successfully"}