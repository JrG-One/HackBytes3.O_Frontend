#  MockXpert – Your AI-Powered Mock Interview Platform

MockXpert is an intelligent web platform designed to simulate real-life interview scenarios using pre-hosted Large Language Models (LLMs) like OpenAI's ChatGPT. It also offers a resume analysis tool and feedback mechanisms to help users prepare more efficiently and confidently for job interviews.

---

##  Project Overview

**MockXpert** provides:

- **Interactive mock interviews** powered by AI  
- **Resume analysis** with actionable insights  
- **Performance analytics and scores** to improve interview skills  
- **User profiles** to track interview sessions and progress  
- **Authentication system** with secure login/signup  
- **Dashboard** to manage interview history and feedback  

This project is ideal for students, professionals, and job seekers who want to sharpen their interview skills through realistic, data-driven mock sessions.

---

## 🧾 Features

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| AI Mock Interviews    | Interactive question-answer simulation with GPT-based responses             |
| Resume Analyser       | Upload and get feedback on resume formatting, keywords, and structure       |
| Profile Portal        | View personal info, performance scores, and interview history               |
| Real-time Scoring     | Analyze fluency, accuracy, clarity, and relevance of your responses         |
| Secure Auth           | Login/signup with JWT-based authentication                                  |
| User Dashboard        | Central hub with personalized performance summaries                         |
| UI Components         | Reusable modular components with Tailwind CSS and Radix UI                  |

---

## Folder Structure (Frontend)

src/
├── assets/                     # Images, logos, icons
│
├── components/                 # Reusable UI components
│   ├── profilePage/            # Components for profile dashboard
│   │   ├── InterviewStats.jsx      # Graphs/stats of interview performance
│   │   └── PersonalInfo.jsx        # User profile data section
│   │
│   ├── ResumeAnalyser/         # Resume analysis related components
│   │   ├── UploadZone.jsx          # Upload drag-n-drop zone
│   │   ├── AnalysisStatus.jsx      # Displays resume scanning status
│   │   └── ResultTabs/            
│   │   └── ResultTabs/            
│   │       └──  FeedbackTabs.jsx  # Tabs for detailed resume feedback
│   │       └──  index.jsx         # Merges all the result features
│   │       └──  KeywordTabs.jsx   # Provides tips according to resume
│   │       └──  OverviewTabs.jsx  # Gives an overview about the resume ats score
|   |
│   │
│   ├── ui/                     # Generic interface components
│   │   ├── Feature.jsx             # Feature section on homepage
│   │   ├── Footers.jsx             # Footer for layout
│   │   ├── Navbar.jsx              # Top navbar with links
│   │   ├── Sidebar.jsx             # Sidebar navigation in dashboard
│   │   └── Testimonial.jsx         # User feedback/testimonial cards
│
├── pages/                      # Route pages
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── ResumeAnalysisPage.tsx
│   ├── PortalPage.tsx
│   ├── ProfilePage.tsx
│   └── ResourcePage.tsx
│
├── services/                   # API call logic
│   ├── interviewService.ts        # Handles all interview-related endpoints
│   └── authService.ts             # Handles login/signup calls
│
├── store/                      # Zustand-based state management
│   └── useAuthStore.ts
│
├── hooks/                      # Custom React hooks
│
├── Layout.tsx                  # Main layout wrapper
├── App.tsx                     # Root component with all routes
└── main.tsx                    # App entry point (Vite)



---

## ⚙️ Tech Stack

### 💻 Frontend
- **React.js** + **TypeScript**
- **Vite** as bundler
- **Tailwind CSS** for styling
- **Radix UI** for accessible UI primitives
- **Zustand** for global state management

### ☁️ Backend (planned)
- **Node.js** + **Express**
- **MongoDB** for data storage (user, sessions, resume, results)
- **Socket.io** for real-time interview interaction (future)
- **JWT** for authentication

###  AI Integration
- **OpenAI / GPT** for:
  - Mock interview simulation
  - Resume feedback generation
  - Scoring logic based on language and context understanding

---

##  Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/mockxpert.git

# Install dependencies
cd frontend
npm install

# If vite isn't recognized
npm install -g vite

# Run development server
npm run dev

##  Contributors

###  Team HackOps
- **Prateek Jaiswal**
- **Ojaswa Varshney**
- **Samarth Gangrade**
- **Adarsh Singh**
