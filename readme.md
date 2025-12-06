# Smart Study Assistant – AI-Powered Notes Summarizer and Study Buddy

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Milestones & Timeline](#milestones--timeline)
- [System Architecture](#system-architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [References](#references)
- [Demo & GitHub](#demo--github)

---

## Introduction
The **Smart Study Assistant** is an AI-powered application designed to help students study more effectively. It allows users to:

- Upload notes and generate AI-powered summaries.
- Extract key concepts.
- Create interactive quizzes for active recall.
- Track progress through historical performance analytics.

The system integrates **user authentication** and a **PostgreSQL database** to securely store quiz results linked to individual users.

---

## Features

1. **Interactive Quiz Mode**  
   Users can take timed quizzes generated from uploaded notes.

2. **Real-Time Feedback**  
   Each answer is immediately checked with correct/incorrect highlights.

3. **User-Specific Results**  
   Completed quizzes are securely stored in PostgreSQL and linked to individual users.

4. **Historical Performance Analytics**  
   Users can view past quiz attempts, scores, completion times, and trends across multiple sessions.

5. **Enhanced UI/UX**  
   Smooth transitions, loading indicators, progress bars, and a responsive design for seamless user experience.

---

## Milestones & Timeline

| Milestone | Target Date | Work Done | Status |
|-----------|------------|-----------|--------|
| Milestone 1 – Backend setup, file upload, and text preprocessing | Sept 22, 2025 | FastAPI backend, file upload, text extraction | Completed |
| Midterm Report & Presentation – Summarization & key concept extraction | Oct 15, 2025 | Summarization model integration, key concepts extraction | Completed |
| Milestone 2 – Frontend development (React) + Summarization Integration | Oct 27, 2025 | React frontend connected to backend, summarization implemented | Completed |
| Milestone 3 – Question generation module | Nov 15, 2025 | NLP-based question generation integrated | Completed |
| Milestone 4 – Study Buddy interactive quiz system | Nov 30, 2025 | Interactive quiz mode with feedback and progress tracking | Completed |
| Final Report & Presentation | Dec 5, 2025 | Full demo submission and presentation | Completed |

---

## System Architecture
- **Frontend:** React.js with interactive quiz interface, results display, and analytics visualization.
- **Backend:** FastAPI serving endpoints for summarization, question generation, and quiz data management.
- **Database:** PostgreSQL stores user-specific quiz sessions, questions, answers, and scores.
- **Authentication:** Clerk ensures secure user login and access control.
- **AI/NLP Modules:** Summarization, key concept extraction, and question generation.

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShubhamKafle44/AI_Study_budddy.git
   cd AI_Study_budddy
   ```

2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up PostgreSQL database:
   - Create a database and configure connection in `.env`.

4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. Run the backend:
   ```bash
   uvicorn src.main:app --reload
   ```

6. Access the application at `http://localhost:3000`.

---

## Usage

1. Sign up or log in using Clerk authentication.
2. Upload your study notes (PDF, DOCX, TXT).
3. Generate AI-powered summaries and key concepts.
4. Start a quiz generated from your uploaded notes.
5. View real-time feedback and track historical quiz performance.

---

## Technologies Used
- **Backend:** FastAPI, Python, PyPDF2, spaCy  
- **Frontend:** React.js  
- **Database:** PostgreSQL  
- **Authentication:** Clerk  
- **Other Tools:** Chart.js for analytics, Async API calls for real-time feedback  

---

## Demo & GitHub
- **Live Demo:** [YouTube Demo](https://youtu.be/KvfGIpabS44)  
- **GitHub Repository:** [AI Study Buddy](https://github.com/ShubhamKafle44/AI_Study_budddy)

---

## References
- [FastAPI Documentation](https://fastapi.tiangolo.com/)  
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)  
- [React Documentation](https://react.dev/)  
- [PyPDF2 Documentation](https://pypdf2.readthedocs.io/)  
- [spaCy Documentation](https://spacy.io/)

---
