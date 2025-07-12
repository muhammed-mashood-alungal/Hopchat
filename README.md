# 📨 HOPCHAT 
## Real-Time Client-to-Client Messaging using RabbitMQ

This project is a real-time, two-way messaging system using **NestJS** and **RabbitMQ** as the message broker. It simulates communication between two clients (Client A and Client B) via durable queues with manual acknowledgment.

>  A **basic UI** has also been added from my side to visually show incoming messages on the backend.

---

##  Features

- ✅ Send message from Client A → Client B using RabbitMQ
- ✅ Receive, log in Client-B Server and show in Client-B's UI  
- ✅ Two-way messaging (Client B → Client A)
- ✅ Durable queues with manual acknowledgment
- ✅ UI to view real-time received messages
- ✅ Dockerized setup for backend + RabbitMQ
- 🛠️ Error handling and retry logic 

---

## 🛠️ Tech Stack

- **Backend:** NestJS
- **Message Broker:** RabbitMQ 
- **UI (Frontend):** Basic React UI for displaying incoming messages & Sent Message
- **Dockerized:** Backend & RabbitMQ
- **Deployment:** EC2 Instance
- **Frontend Hosting:** Vercel

---

## ⚙️ Docker Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/muhammed-mashood-alungal/Hopchat.git
cd Hopchat
```
### 2. Start Backend and RabbitMQ
```bash
docker-compose up --build
```
### 3.Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔗Live Link
**Vercel Link** : https://hopchat-sigma.vercel.app/ 
