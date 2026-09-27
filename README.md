# Vijay's Portfolio

A personal portfolio website built using the MERN Stack to showcase my projects, skills, internships and education.

## 🔗 Live Demo
[Click here to view portfolio](https://your-live-link.com)

---

## 👨‍💻 About Me
I am a final-year B.E. Computer Science & Engineering student. I am passionate about building web applications using the MERN stack and actively looking for internships and entry-level opportunities.

---

## 🛠️ Built With
- React.js
- Node.js
- Express.js
- MongoDB
- Vite
- JWT Authentication

---

## 📁 Sections
- Hero — Introduction and stats
- About — Bio and career goals
- Skills — Tech skills with progress bars
- Projects — My project showcase
- Experience — Internships and activities
- Education — Degree and certifications
- Contact — Contact form

---

## ⚙️ How to Run Locally

**1. Clone the project**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

**2. Install packages**
```bash
npm install
cd client && npm install && cd ..
```

**3. Add your .env file**
```
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

**4. Run the app**
```bash
# Terminal 1 - Backend
node server/index.js

# Terminal 2 - Frontend
cd client
npm run dev
```

**5. Open browser**
```
http://localhost:3000
```

## 📧 Contact form email delivery

The contact form stores each message in MongoDB and sends an email notification from the backend. Configure these environment variables on the backend host (never expose the SMTP password in the client):

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_google_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_email@gmail.com
```

For Gmail, enable 2-Step Verification and create an App Password for the account used by `EMAIL_USER`. Use that App Password for `EMAIL_PASS`, not your regular Google account password. `EMAIL_TO` is the inbox that receives contact messages and defaults to `EMAIL_USER`; `EMAIL_FROM` also defaults to `EMAIL_USER`. If using another SMTP provider, set its SMTP host, port, and credentials instead.

Set these variables in the backend's deployment environment as well as locally in `.env`; changing the sample file does not configure an already deployed server. If SMTP delivery fails, the form reports that the message was saved but that the notification could not be delivered. The saved message remains available in the admin dashboard.

---

## 📬 Contact Me
- Email: your mail
- Location:your address
- LinkedIn: [linkedin.com/in/yourname](https://linkedin.com/in/yourname)
- GitHub: [github.com/yourusername](https://github.com/yourusername)

---

Made with ❤️ 
