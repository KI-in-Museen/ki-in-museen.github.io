import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher([
  '/home(.*)',
  '/forum(.*)',
  '/', // <--- Füge dies hinzu, um die Startseite zu schützen
  // ODER: nutze '(.*)', wenn wirklich JEDE Seite eine Anmeldung erfordern soll
]);

export const onRequest = clerkMiddleware((auth, context) => {
  if (!auth().userId && isProtectedRoute(context.request)) {
    return auth().redirectToSignIn();
  }
});