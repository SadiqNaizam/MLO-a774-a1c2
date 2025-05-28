import React from 'react';
import LoginForm from '@/components/Auth/LoginForm'; // Assumes '@/' is an alias for 'src/' based on context code patterns

// This interface defines the structure of the data passed to onLoginSuccess.
// It should match the LoginFormData type inferred from the Zod schema in LoginForm.tsx.
interface LoginSuccessData {
  username: string;
  password: string; // LoginForm's onLoginSuccess callback passes the full form data including the password.
}

/**
 * LoginPage component.
 * This page renders the login form, centered on the screen.
 * It handles the successful login event from the LoginForm.
 */
const LoginPage: React.FC = () => {
  /**
   * Handles the successful login event.
   * @param data - The login form data, including username and password.
   */
  const handleLoginSuccess = (data: LoginSuccessData) => {
    console.log('Login successful. Data:', data);
    // In a real-world application, you would typically:
    // 1. Receive an authentication token or session information from the actual API call (simulated in LoginForm).
    // 2. Store this token/session securely (e.g., in HttpOnly cookies, localStorage, or a state management solution).
    // 3. Navigate the user to their dashboard or a protected area of the application.
    // For this demonstration, an alert is shown.
    // Note: Logging or extensively handling the raw password on the client-side after submission is generally discouraged for security reasons.
    // The LoginForm currently passes it as part of its `onLoginSuccess` data.
    alert(`Welcome, ${data.username}! Login successful.`);

    // Example of programmatic navigation if react-router-dom is set up:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate(); // Hook typically called at the component's top level
    // navigate('/dashboard');
  };

  return (
    // Overall page layout: A flex container that centers its content vertically and horizontally,
    // takes up the full screen height, and uses the application's background color.
    // This adheres to the 'overall' layout requirements:
    // { type: "Flex", definition: "justify-center items-center h-screen bg-background" }
    <div className="flex justify-center items-center h-screen bg-background">
      {/* 
        The LoginForm component is rendered here.
        It is already designed as a Card element and self-contained with styles 
        that match the 'mainContent' layout requirements (padding, background, rounding, shadow).
        The `onLoginSuccess` prop is passed to handle callback after successful form submission.
      */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
