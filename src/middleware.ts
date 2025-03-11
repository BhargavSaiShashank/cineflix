import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/sign-in', '/sign-up', '/forgot-password'];

// Define onboarding paths
const onboardingPaths = ['/onboarding/profile-setup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isOnboardingPath = onboardingPaths.some(path => pathname.startsWith(path));
  const isHomePage = pathname === '/';
  
  // Get the authentication token from cookies
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = !!token;
  
  // Get profile completion status from cookies
  const profileCompleted = request.cookies.get('profile-completed')?.value === 'true';
  
  // For debugging
  console.log(`Path: ${pathname}, isAuthenticated: ${isAuthenticated}, isPublicPath: ${isPublicPath}, profileCompleted: ${profileCompleted}, isHomePage: ${isHomePage}`);
  
  // If user is authenticated but hasn't completed profile setup
  // and is not already on the profile setup page or public pages
  if (isAuthenticated && !profileCompleted && !isOnboardingPath && !isPublicPath && !isHomePage) {
    console.log('Redirecting to profile setup');
    return NextResponse.redirect(new URL('/onboarding/profile-setup', request.url));
  }
  
  // Allow all other requests to proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}; 