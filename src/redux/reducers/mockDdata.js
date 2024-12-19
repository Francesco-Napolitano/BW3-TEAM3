// Array di possibili esperienze lavorative per gli utenti sidebar
const mockExperiences = [
  {
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    area: "Milano",
    description: "Sviluppo di applicazioni web responsive utilizzando React e Redux",
    startDate: "2022-01-01",
    endDate: "2023-12-31"
  },
  {
    role: "Full Stack Developer",
    company: "Digital Innovations",
    area: "Roma",
    description: "Implementazione di soluzioni end-to-end con Node.js e React",
    startDate: "2021-06-01",
    endDate: "2022-12-31"
  },
  {
    role: "Web Developer",
    company: "Creative Labs",
    area: "Torino",
    description: "Sviluppo di siti web e applicazioni usando tecnologie moderne",
    startDate: "2020-03-15",
    endDate: "2021-05-30"
  },
  {
    role: "Software Engineer",
    company: "Innovation Hub",
    area: "Bologna",
    description: "Progettazione e sviluppo di applicazioni enterprise",
    startDate: "2019-09-01",
    endDate: "2020-12-31"
  }
]

// Array di possibili percorsi formativi
const mockEducation = [
  {
    school: "Università di Milano",
    degree: "Laurea in Informatica",
    area: "Milano",
    description: "Specializzazione in sviluppo software e sistemi distribuiti",
    startDate: "2018-09-01",
    endDate: "2021-07-31"
  },
  {
    school: "EPICODE",
    degree: "Web Development Bootcamp",
    area: "Online",
    description: "Corso intensivo di sviluppo web full-stack",
    startDate: "2022-01-01",
    endDate: "2022-06-30"
  },
  {
    school: "Politecnico di Torino",
    degree: "Master in Computer Science",
    area: "Torino",
    description: "Focus su intelligenza artificiale e machine learning",
    startDate: "2019-09-01",
    endDate: "2021-07-31"
  },
  {
    school: "Digital Academy",
    degree: "Certificazione Frontend",
    area: "Roma",
    description: "Specializzazione in tecnologie frontend moderne",
    startDate: "2021-03-01",
    endDate: "2021-09-30"
  }
]

// Funzione per generare un numero casuale in un range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Funzione per mescolare e selezionare elementi casuali da un array
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export { mockExperiences, mockEducation, getRandomNumber, getRandomItems }
