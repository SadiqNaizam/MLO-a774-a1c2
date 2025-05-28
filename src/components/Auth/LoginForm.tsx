import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Define the Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }).min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(1, { message: 'Password is required.' }).min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

// Infer TypeScript type from the Zod schema
type LoginFormData = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Initialize react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example login logic (replace with actual API call)
    if (data.username === 'testuser' && data.password === 'password123') {
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
      // Potentially navigate to a dashboard or other page
    } else {
      setServerError('Invalid username or password.');
    }

    setIsLoading(false);
  };

  return (
    <Card className={cn(
      "w-full max-w-md", // Common width for login forms
      "bg-card text-card-foreground", // Theme-aware card styling
      "rounded-lg shadow-md", // Consistent with layout requirements
      className
    )}>
      <CardHeader className="p-6 pb-4"> {/* Standard padding, adjust as needed */}
        <CardTitle className="text-3xl font-bold text-card-foreground">
          Log in
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> {/* Vertical spacing for form elements */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Username" 
                      {...field} 
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      {...field} 
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {serverError && (
              // Display server-side errors
              <p className="text-sm font-medium text-destructive pt-1">{serverError}</p>
            )}

            <Button 
              type="submit" 
              variant="default" // Use default Shadcn button styling (primary color)
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          or,{' '}
          <Link 
            to="/signup" // Define your sign-up route
            className="font-medium text-primary hover:underline"
          >
            sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
