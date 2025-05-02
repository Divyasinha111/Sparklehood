import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  { 
    id: 1, 
    title: "Biased Recommendation Algorithm", 
    description: "Algorithm consistently favored certain demographics in job recommendations, leading to decreased visibility of opportunities for underrepresented groups. The bias was detected during a routine audit of recommendation distribution patterns.", 
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z" 
  },
  { 
    id: 2, 
    title: "LLM Hallucination in Critical Info", 
    description: "Large Language Model provided incorrect safety procedure information when queried about emergency response protocols. This could have led to dangerous situations if the information had been followed in a real emergency.", 
    severity: "High", 
    reported_at: "2025-04-01T14:30:00Z" 
  },
  { 
    id: 3, 
    title: "Minor Data Leak via Chatbot", 
    description: "Chatbot inadvertently exposed non-sensitive user metadata in its responses. While no personally identifiable information was revealed, the incident highlights a potential vulnerability in the data handling protocols.", 
    severity: "Low", 
    reported_at: "2025-03-20T09:15:00Z" 
  },
  { 
    id: 4, 
    title: "AI Image Generator Creating Misleading Content", 
    description: "Users reported that the AI image generator was producing photorealistic images of events that never occurred, which were then circulated on social media as evidence of real incidents.", 
    severity: "High", 
    reported_at: "2025-04-05T16:45:00Z" 
  },
  { 
    id: 5, 
    title: "Voice Assistant Misinterpreting Emergency Commands", 
    description: "Several users reported that the voice assistant was inconsistently recognizing emergency commands, potentially delaying response times in critical situations.", 
    severity: "Medium", 
    reported_at: "2025-03-25T11:20:00Z" 
  }
];