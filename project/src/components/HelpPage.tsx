import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const helpContent = {
  'report-incident': {
    title: 'How to Report an AI Safety Incident',
    content: `
### 🧾 How to Report an AI Safety Incident

Reporting incidents helps us improve AI systems and ensure user safety.

#### What qualifies as an AI Safety Incident?
- Biased or unfair AI behavior
- Hallucinated or incorrect outputs from AI models
- Data leaks or privacy breaches via AI systems
- Unexpected behavior in autonomous systems

#### Steps to Report:
1. Click the "Report New Incident" button on the main dashboard
2. Fill out the form with:
   - **Title**: A short, descriptive name
   - **Description**: What happened, how it was discovered, any consequences
   - **Severity**: Choose from Low, Medium, or High
3. Click "Submit"

> 💡 Your report will appear instantly on the dashboard and is visible for this session only.
    `
  },
  'glossary': {
    title: 'AI Safety Glossary',
    content: `
### 📘 AI Safety Glossary

Common terms and concepts related to AI safety:

- **Bias**: Systematic favoring or discrimination by an AI model
- **Hallucination**: When an AI model generates false or misleading information
- **Explainability**: The ability to understand how and why an AI makes decisions
- **Privacy Leak**: When sensitive or unintended data is exposed by an AI system
- **Autonomy**: AI systems making decisions or taking actions without human input
- **Model Audit**: The process of reviewing and evaluating an AI model for fairness, safety, and accuracy
- **Incident Reporting**: The act of logging a problem related to an AI system's behavior

> AI safety is about ensuring AI is used ethically, safely, and responsibly.
    `
  },
  'export': {
    title: 'How to Export Your Incident Reports',
    content: `
### 📤 Export Your Incident Reports

Currently, your reported incidents are stored in your browser memory (session only).

#### How to Export:
Click the **"Export to CSV"** button in the sidebar or top bar.

This will:
- Download a \`.csv\` file containing all incidents from the current session
- Include fields: \`Title\`, \`Description\`, \`Severity\`, \`Reported Date\`

> ⚠️ Note: Reports are **not saved** to a server. Export before closing the browser if you need to keep a copy.
    `
  },
  'learn-more': {
    title: 'Learn More About HumanChain',
    content: `
### 🔗 About HumanChain

**HumanChain** is a deep-tech AI safety company building a human-centric digital future.

We believe in:
- Ethical and transparent use of artificial intelligence
- Protecting users from AI-related harm or bias
- Creating tools and platforms for safer AI adoption

#### What We Do:
- Develop AI risk assessment tools
- Partner with industries to audit AI systems
- Build dashboards like this to monitor and log incidents

> "A safer AI is a better future for everyone."
    `
  }
};

const HelpPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const content = page ? helpContent[page as keyof typeof helpContent] : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Page not found</h1>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <Link
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.title}</h1>
          <div className="prose dark:prose-invert max-w-none">
            {content.content.split('\n').map((line, index) => (
              <p key={index} className="mb-4 text-gray-800 dark:text-gray-200">{line}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default HelpPage;