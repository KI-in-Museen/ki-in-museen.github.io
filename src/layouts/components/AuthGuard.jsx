import React, { useEffect, useState } from 'react';

export default function AuthGuard() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Funktion, um den Status zu prüfen
    const checkAuth = () => {
      // Prüfen, ob Clerk geladen und bereit ist
        
        if (!window.Clerk.user) {
          // Fall 1: Nicht eingeloggt -> Redirect
          console.log("AuthGuard: Kein User gefunden, leite um...");
          window.Clerk.redirectToSignIn();
        } else {
          // Fall 2: Eingeloggt -> Overlay entfernen, Seite freigeben
          // (Der eigentliche Content wird dann von <SignedIn> in Base.astro angezeigt)
          setShowOverlay(false);
        }
        return true; // Check war erfolgreich 
    };

    // 1. Sofort prüfen
    if (checkAuth()) return;

    // 2. Falls Clerk noch lädt: Intervall starten
    const intervalId = setInterval(() => {
      if (checkAuth()) {
        clearInterval(intervalId);
      }
    }, 50); // Alle 50ms prüfen

    // Cleanup beim Verlassen der Seite
    return () => clearInterval(intervalId);
  }, []);

  // Wenn wir eingeloggt sind (Overlay aus), rendern wir nichts (null).
  if (!showOverlay) {
    return null;
  }

  // Solange geprüft wird oder redirectet wird: Ladebildschirm/Blocker
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white text-black">
      <div className="text-center">
        <p className="text-xl font-semibold mb-2">Authentifizierung wird geprüft...</p>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    </div>
  );
}